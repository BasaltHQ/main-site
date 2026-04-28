import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { Resolution, BoardMember } from '@/lib/models'
import { sendResolutionCreatedEmail, sendResolutionOutcomeEmail } from '@/lib/aws/ses'

// Categories that trigger §4.4 unanimous founder consent
const PROTECTED_CATEGORIES = [
    'bylaw_amendment', 'certificate_amendment', 'stock_issuance',
    'merger_acquisition', 'debt_authorization'
]

// §8.6A debt threshold
const DEBT_THRESHOLD = 50000

export async function GET(req: NextRequest) {
    await dbConnect()
    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type')
    const status = searchParams.get('status')
    const category = searchParams.get('category')

    try {
        const query: any = {}
        if (type) query.resolution_type = type
        if (status) query.status = status
        if (category) query.category = category

        const resolutions = await Resolution.find(query)
            .sort({ created_at: -1 })
            .lean()

        // Self-healing check for prematurely approved/rejected resolutions
        const activeDirectorsCount = await BoardMember.countDocuments({ is_active: true })
        const totalEligibleVoters = Math.max(1, activeDirectorsCount)

        for (const res of resolutions as any[]) {
            if (res.status === 'voting' || res.status === 'approved' || res.status === 'rejected') {
                let trueStatus = 'voting'
                
                // Fixed Algebra: Unanimous consent required for ALL resolutions
                if (res.votes_against > 0) {
                    trueStatus = 'rejected'
                } else if (res.votes_for >= totalEligibleVoters) {
                    trueStatus = 'approved'
                }

                // If the current status doesn't match the mathematical reality, heal it
                if (res.status !== trueStatus) {
                    console.log(`[Self-Healing] Reverting prematurely ${res.status} resolution ${res._id} to ${trueStatus}.`)
                    
                    if (trueStatus === 'voting') {
                        await Resolution.updateOne({ _id: res._id }, { $set: { status: 'voting' }, $unset: { approved_at: "" } })
                        res.status = 'voting'
                        delete res.approved_at
                    } else if (trueStatus === 'approved') {
                        const d = new Date()
                        await Resolution.updateOne({ _id: res._id }, { $set: { status: 'approved', approved_at: d } })
                        res.status = 'approved'
                        res.approved_at = d
                    } else if (trueStatus === 'rejected') {
                        await Resolution.updateOne({ _id: res._id }, { $set: { status: 'rejected' }, $unset: { approved_at: "" } })
                        res.status = 'rejected'
                        delete res.approved_at
                    }
                }
            }
        }

        return NextResponse.json({ resolutions })
    } catch (error) {
        console.error('Resolutions GET error:', error)
        return NextResponse.json({ error: 'Failed to fetch resolutions' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    await dbConnect()
    const body = await req.json()

    try {
        // Auto-detect protected actions (§4.4 unanimous consent)
        if (PROTECTED_CATEGORIES.includes(body.category)) {
            body.requires_unanimous_consent = true
            body.protected_action_type = body.category
            body.resolution_type = 'unanimous_consent'
            body.approval_threshold = 100
        }

        // §8.6A debt gating
        if (body.category === 'debt_authorization' && body.debt_amount && body.debt_amount > DEBT_THRESHOLD) {
            body.requires_unanimous_consent = true
            body.protected_action_type = 'debt_over_50k'
        }

        // Generate resolution number
        const count = await Resolution.countDocuments()
        const year = new Date().getFullYear()
        body.resolution_number = `BR-${year}-${String(count + 1).padStart(3, '0')}`
        body.proposed_at = new Date()

        if (body.id) {
            await Resolution.findByIdAndUpdate(body.id, { ...body, updated_at: new Date() })
        } else {
            const res = await Resolution.create(body)

            // SES: notify all active directors of new resolution
            const resId = res._id.toString();
            const directors = await BoardMember.find({ is_active: true }).lean();
            for (const d of directors as any[]) {
                if (d.email) {
                    sendResolutionCreatedEmail(d.email, body.title, body.resolution_number, body.category || 'general', body.proposed_by || 'Board', resId)
                        .catch(err => console.error(`[SES] Resolution notification to ${d.email} failed:`, err));
                }
            }
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Resolutions POST error:', error)
        return NextResponse.json({ error: 'Failed to save resolution' }, { status: 500 })
    }
}

export async function PATCH(req: NextRequest) {
    await dbConnect()
    const body = await req.json()

    try {
        const { id, action, ...data } = body
        if (!id) return NextResponse.json({ error: 'Resolution ID required' }, { status: 400 })

        const resolution = await Resolution.findById(id)
        if (!resolution) return NextResponse.json({ error: 'Resolution not found' }, { status: 404 })

        if (action === 'vote') {
            // Add vote
            const existingVoteIdx = resolution.votes.findIndex(
                (v: any) => v.member_id === data.member_id
            )
            const voteEntry = {
                member_id: data.member_id,
                member_name: data.member_name,
                vote: data.vote,
                voted_at: new Date(),
                notes: data.notes || ''
            }

            if (existingVoteIdx >= 0) {
                resolution.votes[existingVoteIdx] = voteEntry
            } else {
                resolution.votes.push(voteEntry)
            }

            // Tally
            resolution.votes_for = resolution.votes.filter((v: any) => v.vote === 'for').length
            resolution.votes_against = resolution.votes.filter((v: any) => v.vote === 'against').length
            resolution.votes_abstain = resolution.votes.filter((v: any) => v.vote === 'abstain').length

            // Check if resolution should be auto-approved/rejected
            const activeDirectorsCount = await BoardMember.countDocuments({ is_active: true })
            const totalEligibleVoters = Math.max(1, activeDirectorsCount)

            // Fixed Algebra: Unanimous consent required for ALL resolutions
            if (resolution.votes_against > 0) {
                resolution.status = 'rejected'
            } else if (resolution.votes_for >= totalEligibleVoters) {
                resolution.status = 'approved'
                resolution.approved_at = new Date()
            }

            resolution.updated_at = new Date()
            await resolution.save()

            // SES: if resolution reached a final outcome, notify all voters
            if (resolution.status === 'approved' || resolution.status === 'rejected') {
                const voterEmails = new Set<string>();
                for (const v of resolution.votes) {
                    // Resolve member_id to email via BoardMember
                    const director = await BoardMember.findById(v.member_id).lean() as any;
                    if (director?.email) voterEmails.add(director.email);
                }
                for (const email of voterEmails) {
                    sendResolutionOutcomeEmail(email, resolution.title, resolution.resolution_number, resolution.status as 'approved' | 'rejected', id)
                        .catch(err => console.error(`[SES] Resolution outcome to ${email} failed:`, err));
                }
            }
        } else {
            // General update (status, filing, etc.)
            await Resolution.findByIdAndUpdate(id, { ...data, updated_at: new Date() })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Resolutions PATCH error:', error)
        return NextResponse.json({ error: 'Failed to update resolution' }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    await dbConnect()
    const id = req.nextUrl.searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Resolution ID required' }, { status: 400 })

    try {
        await Resolution.findByIdAndDelete(id)
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Resolutions DELETE error:', error)
        return NextResponse.json({ error: 'Failed to delete resolution' }, { status: 500 })
    }
}
