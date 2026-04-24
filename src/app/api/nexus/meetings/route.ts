import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { BoardMeeting, BoardMember } from '@/lib/models'
import { sendMeetingScheduledEmail } from '@/lib/aws/ses'

export async function GET(req: NextRequest) {
    await dbConnect()
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '50')

    try {
        const query: any = {}
        if (status) query.status = status

        const meetings = await BoardMeeting.find(query)
            .sort({ date: -1 })
            .limit(limit)
            .lean()

        return NextResponse.json({ meetings })
    } catch (error) {
        console.error('Meetings GET error:', error)
        return NextResponse.json({ error: 'Failed to fetch meetings' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    await dbConnect()
    const body = await req.json()

    try {
        if (body.id) {
            await BoardMeeting.findByIdAndUpdate(body.id, { ...body, updated_at: new Date() })
        } else {
            await BoardMeeting.create(body)

            // SES: notify all active directors of the scheduled meeting
            const directors = await BoardMember.find({ is_active: true }).lean();
            const dateStr = body.date ? new Date(body.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'TBD';
            for (const d of directors as any[]) {
                if (d.email) {
                    sendMeetingScheduledEmail(d.email, body.title, body.meeting_type || 'regular', dateStr, body.time, body.location)
                        .catch(err => console.error(`[SES] Meeting notification to ${d.email} failed:`, err));
                }
            }
        }
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Meetings POST error:', error)
        return NextResponse.json({ error: 'Failed to save meeting' }, { status: 500 })
    }
}

export async function PATCH(req: NextRequest) {
    await dbConnect()
    const body = await req.json()

    try {
        const { id, ...updates } = body
        if (!id) return NextResponse.json({ error: 'Meeting ID required' }, { status: 400 })

        await BoardMeeting.findByIdAndUpdate(id, { ...updates, updated_at: new Date() })
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Meetings PATCH error:', error)
        return NextResponse.json({ error: 'Failed to update meeting' }, { status: 500 })
    }
}
