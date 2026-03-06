import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { Notification } from '@/lib/models'

// GET — Fetch notifications for a user
export async function GET(req: NextRequest) {
    try {
        await dbConnect()
        const email = req.nextUrl.searchParams.get('email')
        if (!email) return NextResponse.json({ notifications: [] })

        const notifications = await Notification.find({ recipient_email: email })
            .sort({ created_at: -1 })
            .limit(50)
            .lean()

        const mapped = notifications.map((n: any) => ({
            id: n._id.toString(),
            ...n,
            _id: undefined
        }))

        return NextResponse.json({ notifications: mapped })
    } catch (error: any) {
        console.error('Notifications GET error:', error)
        return NextResponse.json({ notifications: [] })
    }
}

// PATCH — Mark notification(s) as read
export async function PATCH(req: NextRequest) {
    try {
        await dbConnect()
        const body = await req.json()

        if (body.markAllRead && body.email) {
            await Notification.updateMany(
                { recipient_email: body.email, read: false },
                { read: true }
            )
        } else if (body.id) {
            await Notification.findByIdAndUpdate(body.id, { read: true })
        }

        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error('Notifications PATCH error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
