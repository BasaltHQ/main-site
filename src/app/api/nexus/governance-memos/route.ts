import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { GovernanceMemo, Notification, BoardMember, Officer } from '@/lib/models'

// GET — List memos/proposals/reports
export async function GET(req: NextRequest) {
    try {
        await dbConnect()
        const type = req.nextUrl.searchParams.get('type')
        const department = req.nextUrl.searchParams.get('department')
        const status = req.nextUrl.searchParams.get('status')

        const query: any = {}
        if (type && type !== 'all') query.type = type
        if (department && department !== 'all') query.department = department
        if (status && status !== 'all') query.status = status

        const memos = await GovernanceMemo.find(query).sort({ created_at: -1 }).lean()
        const mapped = memos.map((m: any) => ({
            id: m._id.toString(),
            title: m.title,
            type: m.type,
            department: m.department,
            author_email: m.author_email || '',
            author_name: m.author_name || '',
            content: m.content || '',
            summary: m.summary || '',
            priority: m.priority || 'normal',
            status: m.status || 'draft',
            notify_recipients: m.notify_recipients || [],
            notify_all_directors: m.notify_all_directors || false,
            notify_all_officers: m.notify_all_officers || false,
            attachments: (m.attachments || []).map((a: any) => ({
                file_name: a.file_name,
                file_url: a.file_url,
                file_size: a.file_size,
                uploaded_at: a.uploaded_at
            })),
            requires_response: m.requires_response || false,
            response_deadline: m.response_deadline,
            responses: (m.responses || []).map((r: any) => ({
                user_email: r.user_email,
                user_name: r.user_name,
                response: r.response,
                comment: r.comment,
                responded_at: r.responded_at
            })),
            reference_number: m.reference_number || '',
            tags: m.tags || [],
            messages: (m.messages || []).map((msg: any) => ({
                user_email: msg.user_email,
                user_name: msg.user_name,
                text: msg.text,
                created_at: msg.created_at
            })),
            published_at: m.published_at,
            created_at: m.created_at
        }))

        return NextResponse.json({ memos: mapped })
    } catch (error: any) {
        console.error('Governance memos GET error:', error)
        return NextResponse.json({ memos: [] })
    }
}

// POST — Create or update a memo/proposal/report
export async function POST(req: NextRequest) {
    try {
        await dbConnect()
        const body = await req.json()

        // Generate reference number
        const count = await GovernanceMemo.countDocuments({ type: body.type })
        const prefix = body.type === 'memo' ? 'MEMO' : body.type === 'proposal' ? 'PROP' : 'RPT'
        const year = new Date().getFullYear()
        const refNumber = `${prefix}-${year}-${String(count + 1).padStart(3, '0')}`

        const memo = await GovernanceMemo.create({
            title: body.title,
            type: body.type,
            department: body.department,
            author_email: body.author_email,
            author_name: body.author_name,
            content: body.content,
            summary: body.summary,
            priority: body.priority || 'normal',
            status: body.status || 'draft',
            notify_recipients: body.notify_recipients || [],
            notify_all_directors: body.notify_all_directors || false,
            notify_all_officers: body.notify_all_officers || false,
            notify_departments: body.notify_departments || [],
            attachments: body.attachments || [],
            requires_response: body.requires_response || false,
            response_deadline: body.response_deadline ? new Date(body.response_deadline) : undefined,
            reference_number: refNumber,
            tags: body.tags || [],
            published_at: body.status === 'published' ? new Date() : undefined,
            created_at: new Date(),
            updated_at: new Date()
        })

        // Build notification recipient list
        const recipientEmails = new Set<string>(body.notify_recipients || [])

        if (body.notify_all_directors) {
            const directors = await BoardMember.find({ is_active: true }).lean()
            directors.forEach((d: any) => { if (d.email) recipientEmails.add(d.email) })
        }
        if (body.notify_all_officers) {
            const officers = await Officer.find({ is_active: true }).lean()
            officers.forEach((o: any) => { if (o.email) recipientEmails.add(o.email) })
        }

        // Resolve department-level targeting
        const depts = body.notify_departments || []
        if (depts.length > 0) {
            const deptDirectors = await BoardMember.find({ is_active: true, department: { $in: depts } }).lean()
            deptDirectors.forEach((d: any) => { if (d.email) recipientEmails.add(d.email) })
            const deptOfficers = await Officer.find({ is_active: true, department: { $in: depts } }).lean()
            deptOfficers.forEach((o: any) => { if (o.email) recipientEmails.add(o.email) })
        }

        // Create notifications
        if (recipientEmails.size > 0) {
            const typeLabel = body.type.charAt(0).toUpperCase() + body.type.slice(1)
            const notifications = Array.from(recipientEmails).map(email => ({
                recipient_email: email,
                type: body.type,
                title: `New ${typeLabel}: ${body.title}`,
                body: body.summary || `A new ${body.type} has been created in ${body.department}: ${body.title}`,
                link: `/nexus/governance?tab=memos`,
                source_id: memo._id.toString(),
                created_at: new Date()
            }))
            await Notification.insertMany(notifications)
        }

        return NextResponse.json({ success: true, id: memo._id.toString(), reference_number: refNumber })
    } catch (error: any) {
        console.error('Governance memos POST error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

// PATCH — Update status or add response
export async function PATCH(req: NextRequest) {
    try {
        await dbConnect()
        const body = await req.json()

        if (body.response) {
            await GovernanceMemo.findByIdAndUpdate(body.id, {
                $push: {
                    responses: {
                        user_email: body.response.user_email,
                        user_name: body.response.user_name,
                        response: body.response.response,
                        comment: body.response.comment,
                        responded_at: new Date()
                    }
                },
                updated_at: new Date()
            })
        } else if (body.message) {
            // Post a message to the memo's message board
            await GovernanceMemo.findByIdAndUpdate(body.id, {
                $push: {
                    messages: {
                        user_email: body.message.user_email,
                        user_name: body.message.user_name,
                        text: body.message.text,
                        created_at: new Date()
                    }
                },
                updated_at: new Date()
            })
        } else if (body.status) {
            const update: any = { status: body.status, updated_at: new Date() }
            if (body.status === 'published') update.published_at = new Date()
            await GovernanceMemo.findByIdAndUpdate(body.id, update)
        }

        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error('Governance memos PATCH error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

// DELETE — Remove a memo
export async function DELETE(req: NextRequest) {
    try {
        await dbConnect()
        const id = req.nextUrl.searchParams.get('id')
        if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

        await GovernanceMemo.findByIdAndDelete(id)
        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error('Governance memos DELETE error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
