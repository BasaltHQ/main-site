import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { UserPreference } from '@/lib/models'

// GET — Fetch user's annotation color preference
export async function GET(req: NextRequest) {
    const email = req.nextUrl.searchParams.get('email')
    if (!email) return NextResponse.json({ error: 'email required' }, { status: 400 })

    try {
        await dbConnect()
        const pref = await UserPreference.findOne({ user_email: email }).lean() as any
        return NextResponse.json({ annotation_color: pref?.annotation_color || null })
    } catch (error: any) {
        console.error('User preference fetch error:', error)
        return NextResponse.json({ annotation_color: null })
    }
}

// POST — Save user's annotation color preference
export async function POST(req: NextRequest) {
    try {
        const { email, annotation_color } = await req.json()
        if (!email || !annotation_color) {
            return NextResponse.json({ error: 'email and annotation_color required' }, { status: 400 })
        }

        await dbConnect()
        await UserPreference.findOneAndUpdate(
            { user_email: email },
            { annotation_color, updated_at: new Date() },
            { upsert: true }
        )

        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error('User preference save error:', error)
        return NextResponse.json({ error: 'Failed to save preference' }, { status: 500 })
    }
}
