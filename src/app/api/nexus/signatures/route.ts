import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { SignatureRequest, Notification } from '@/lib/models'

// GET — List signature requests
export async function GET(req: NextRequest) {
    await dbConnect()
    try {
        const documentId = req.nextUrl.searchParams.get('document_id')
        const signerEmail = req.nextUrl.searchParams.get('signer_email')
        const id = req.nextUrl.searchParams.get('id')

        if (id) {
            const sr = await SignatureRequest.findById(id).lean()
            if (!sr) return NextResponse.json({ error: 'Not found' }, { status: 404 })
            return NextResponse.json({ request: { ...sr, _id: (sr as any)._id.toString() } })
        }

        const query: any = {}
        if (documentId) query.document_id = documentId
        if (signerEmail) query['signatories.email'] = signerEmail

        const requests = await SignatureRequest.find(query).sort({ created_at: -1 }).lean()
        const mapped = requests.map((r: any) => ({
            ...r,
            _id: r._id.toString()
        }))

        return NextResponse.json({ requests: mapped })
    } catch (error: any) {
        console.error('Signatures GET error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

// POST — Create a new signature request
export async function POST(req: NextRequest) {
    await dbConnect()
    try {
        const body = await req.json()
        const { document_id, document_title, document_hash, requested_by, signatories, fields, message, expires_at } = body

        const sr = await SignatureRequest.create({
            document_id,
            document_title,
            document_hash,
            requested_by,
            status: 'pending',
            message,
            fields: fields || [],
            signatories: (signatories || []).map((s: any) => ({
                ...s,
                status: 'pending'
            })),
            audit_trail: [{
                action: 'created',
                actor_email: requested_by.email,
                actor_name: requested_by.name,
                timestamp: new Date(),
                ip_address: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
                details: `Signature request created for "${document_title}" with ${signatories?.length || 0} signatories`
            }, {
                action: 'sent',
                actor_email: requested_by.email,
                actor_name: requested_by.name,
                timestamp: new Date(),
                ip_address: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
                details: `Sent to: ${(signatories || []).map((s: any) => s.name || s.email).join(', ')}`
            }],
            expires_at: expires_at ? new Date(expires_at) : undefined,
            created_at: new Date(),
            updated_at: new Date()
        })

        // Send notifications to each signatory
        const notifications = (signatories || []).map((s: any) => ({
            recipient_email: s.email,
            type: 'signature',
            title: `Signature Requested: ${document_title}`,
            body: `${requested_by.name || requested_by.email} is requesting your signature${s.capacity ? ` as ${s.capacity}` : ''} on "${document_title}".${message ? ` Message: ${message}` : ''}`,
            link: `/nexus/governance?tab=documents&sign=${sr._id.toString()}`,
            source_id: sr._id.toString(),
            created_at: new Date()
        }))
        if (notifications.length > 0) {
            await Notification.insertMany(notifications)
        }

        return NextResponse.json({ success: true, id: sr._id.toString() })
    } catch (error: any) {
        console.error('Signatures POST error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

// PATCH — Actions: fill_field, sign, decline, void, remind
export async function PATCH(req: NextRequest) {
    await dbConnect()
    try {
        const body = await req.json()
        const { id, action } = body
        const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
        const ua = req.headers.get('user-agent') || 'unknown'

        if (!id) return NextResponse.json({ error: 'Missing request id' }, { status: 400 })

        const sr = await SignatureRequest.findById(id)
        if (!sr) return NextResponse.json({ error: 'Signature request not found' }, { status: 404 })

        // ── fill_field ──
        if (action === 'fill_field') {
            const { field_id, value, actor_email, actor_name } = body
            const field = sr.fields.find((f: any) => f.field_id === field_id)
            if (!field) return NextResponse.json({ error: 'Field not found' }, { status: 404 })

            field.value = value
            field.filled_at = new Date()
            field.filled_by = actor_email

            // Update signatory status to in_progress if pending
            const signatory = sr.signatories.find((s: any) => s.email === actor_email)
            if (signatory && signatory.status === 'pending') {
                signatory.status = 'in_progress'
            }

            // Update overall status
            if (sr.status === 'pending') sr.status = 'in_progress'

            sr.audit_trail.push({
                action: 'field_filled',
                actor_email,
                actor_name,
                timestamp: new Date(),
                ip_address: ip,
                details: `Filled ${field.type} field "${field.label || field.field_id}" on page ${field.page}`
            })

            sr.updated_at = new Date()
            await sr.save()
            return NextResponse.json({ success: true })
        }

        // ── sign ──
        if (action === 'sign') {
            const { actor_email, actor_name, signature_data, initials_data } = body

            const signatory = sr.signatories.find((s: any) => s.email === actor_email)
            if (!signatory) return NextResponse.json({ error: 'Not a signatory on this request' }, { status: 403 })

            signatory.status = 'signed'
            signatory.signature_data = signature_data
            signatory.initials_data = initials_data
            signatory.signed_at = new Date()
            signatory.ip_address = ip
            signatory.user_agent = ua

            // Auto-fill any unfilled signature/initials fields assigned to this signer
            for (const field of sr.fields) {
                if (field.assigned_to === actor_email && !field.value) {
                    if (field.type === 'signature' && signature_data) {
                        field.value = signature_data
                        field.filled_at = new Date()
                        field.filled_by = actor_email
                    } else if (field.type === 'initials' && initials_data) {
                        field.value = initials_data
                        field.filled_at = new Date()
                        field.filled_by = actor_email
                    }
                }
            }

            sr.audit_trail.push({
                action: 'signed',
                actor_email,
                actor_name,
                timestamp: new Date(),
                ip_address: ip,
                details: `${actor_name || actor_email} signed${signatory.capacity ? ` as ${signatory.capacity}` : ''} (IP: ${ip})`
            })

            // Check if all signatories have signed
            const allSigned = sr.signatories.every((s: any) => s.status === 'signed')
            if (allSigned) {
                sr.status = 'completed'
                sr.completed_at = new Date()
                sr.audit_trail.push({
                    action: 'completed',
                    actor_email: 'system',
                    actor_name: 'System',
                    timestamp: new Date(),
                    ip_address: 'system',
                    details: `Document "${sr.document_title}" has been fully executed by all ${sr.signatories.length} signatories`
                })

                // Notify all signatories + requester of completion
                const completionEmails = new Set<string>([
                    sr.requested_by.email,
                    ...sr.signatories.map((s: any) => s.email)
                ])
                const completionNotifs = Array.from(completionEmails).map(email => ({
                    recipient_email: email,
                    type: 'signature',
                    title: `Document Fully Executed: ${sr.document_title}`,
                    body: `"${sr.document_title}" has been signed by all parties and is now fully executed.`,
                    link: `/nexus/governance?tab=documents&sign=${sr._id.toString()}`,
                    source_id: sr._id.toString(),
                    created_at: new Date()
                }))
                await Notification.insertMany(completionNotifs)
            } else {
                sr.status = 'in_progress'
                // Notify requester that one signer completed
                await Notification.create({
                    recipient_email: sr.requested_by.email,
                    type: 'signature',
                    title: `${actor_name || actor_email} Signed: ${sr.document_title}`,
                    body: `${actor_name || actor_email} has signed "${sr.document_title}"${signatory.capacity ? ` as ${signatory.capacity}` : ''}. ${sr.signatories.filter((s: any) => s.status === 'signed').length}/${sr.signatories.length} signatures complete.`,
                    link: `/nexus/governance?tab=documents&sign=${sr._id.toString()}`,
                    source_id: sr._id.toString(),
                    created_at: new Date()
                })
            }

            sr.updated_at = new Date()
            await sr.save()
            const updated = sr.toObject()
            updated._id = updated._id.toString()
            return NextResponse.json({ success: true, completed: allSigned, request: updated })
        }

        // ── decline ──
        if (action === 'decline') {
            const { actor_email, actor_name, reason } = body

            const signatory = sr.signatories.find((s: any) => s.email === actor_email)
            if (!signatory) return NextResponse.json({ error: 'Not a signatory' }, { status: 403 })

            signatory.status = 'declined'
            signatory.declined_at = new Date()
            signatory.decline_reason = reason || 'No reason provided'
            signatory.ip_address = ip

            sr.status = 'declined'
            sr.audit_trail.push({
                action: 'declined',
                actor_email,
                actor_name,
                timestamp: new Date(),
                ip_address: ip,
                details: `${actor_name || actor_email} declined to sign. Reason: ${reason || 'No reason provided'}`
            })

            // Notify requester
            await Notification.create({
                recipient_email: sr.requested_by.email,
                type: 'signature',
                title: `Signature Declined: ${sr.document_title}`,
                body: `${actor_name || actor_email} declined to sign "${sr.document_title}". Reason: ${reason || 'No reason provided'}`,
                link: `/nexus/governance?tab=documents&sign=${sr._id.toString()}`,
                source_id: sr._id.toString(),
                created_at: new Date()
            })

            sr.updated_at = new Date()
            await sr.save()
            return NextResponse.json({ success: true })
        }

        // ── void ──
        if (action === 'void') {
            const { actor_email, actor_name } = body
            sr.status = 'voided'
            sr.voided_at = new Date()
            sr.voided_by = actor_email
            sr.audit_trail.push({
                action: 'voided',
                actor_email,
                actor_name,
                timestamp: new Date(),
                ip_address: ip,
                details: `Signature request voided by ${actor_name || actor_email}`
            })

            // Notify all signatories
            const voidNotifs = sr.signatories
                .filter((s: any) => s.status === 'pending' || s.status === 'in_progress')
                .map((s: any) => ({
                    recipient_email: s.email,
                    type: 'signature',
                    title: `Signature Request Voided: ${sr.document_title}`,
                    body: `The signature request for "${sr.document_title}" has been voided by ${actor_name || actor_email}.`,
                    link: `/nexus/governance?tab=documents`,
                    source_id: sr._id.toString(),
                    created_at: new Date()
                }))
            if (voidNotifs.length > 0) await Notification.insertMany(voidNotifs)

            sr.updated_at = new Date()
            await sr.save()
            return NextResponse.json({ success: true })
        }

        // ── remind ──
        if (action === 'remind') {
            const { actor_email, actor_name } = body
            const pendingSignatories = sr.signatories.filter((s: any) => s.status === 'pending' || s.status === 'in_progress')

            const reminderNotifs = pendingSignatories.map((s: any) => ({
                recipient_email: s.email,
                type: 'signature',
                title: `Reminder: Signature Pending on ${sr.document_title}`,
                body: `${actor_name || actor_email} is reminding you to sign "${sr.document_title}"${s.capacity ? ` as ${s.capacity}` : ''}.`,
                link: `/nexus/governance?tab=documents&sign=${sr._id.toString()}`,
                source_id: sr._id.toString(),
                created_at: new Date()
            }))
            if (reminderNotifs.length > 0) await Notification.insertMany(reminderNotifs)

            sr.audit_trail.push({
                action: 'reminder_sent',
                actor_email,
                actor_name,
                timestamp: new Date(),
                ip_address: ip,
                details: `Reminder sent to: ${pendingSignatories.map((s: any) => s.name || s.email).join(', ')}`
            })

            sr.updated_at = new Date()
            await sr.save()
            return NextResponse.json({ success: true })
        }

        return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
    } catch (error: any) {
        console.error('Signatures PATCH error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

// DELETE — Remove a draft signature request
export async function DELETE(req: NextRequest) {
    await dbConnect()
    try {
        const id = req.nextUrl.searchParams.get('id')
        if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

        const sr = await SignatureRequest.findById(id)
        if (!sr) return NextResponse.json({ error: 'Not found' }, { status: 404 })

        if (sr.status !== 'draft' && sr.status !== 'voided') {
            return NextResponse.json({ error: 'Can only delete draft or voided requests' }, { status: 400 })
        }

        await SignatureRequest.findByIdAndDelete(id)
        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error('Signatures DELETE error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
