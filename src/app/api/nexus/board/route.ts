import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { BoardMember, Officer } from '@/lib/models'

export async function GET(req: NextRequest) {
    await dbConnect()
    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type') || 'all' // director, officer, all

    try {
        if (type === 'officer') {
            const officers = await Officer.find({ is_active: true }).sort({ title: 1 }).lean()
            return NextResponse.json({ officers })
        }
        if (type === 'director') {
            const directors = await BoardMember.find({ is_active: true }).sort({ seat_type: 1, name: 1 }).lean()
            return NextResponse.json({ directors })
        }

        // All
        const directors = await BoardMember.find({ is_active: true }).sort({ seat_type: 1, name: 1 }).lean()
        const officers = await Officer.find({ is_active: true }).sort({ title: 1 }).lean()
        return NextResponse.json({ directors, officers })
    } catch (error) {
        console.error('Board API error:', error)
        return NextResponse.json({ error: 'Failed to fetch board data' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    await dbConnect()
    const body = await req.json()
    const entityType = body.entity_type || 'director' // director or officer

    try {
        if (entityType === 'officer') {
            if (body.id) {
                await Officer.findByIdAndUpdate(body.id, { ...body, updated_at: new Date() })
            } else {
                await Officer.create(body)
            }
            return NextResponse.json({ success: true })
        }

        // Director
        if (body.id) {
            await BoardMember.findByIdAndUpdate(body.id, { ...body, updated_at: new Date() })
        } else {
            await BoardMember.create(body)
        }
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Board POST error:', error)
        return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    await dbConnect()
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    const type = searchParams.get('type') || 'director'

    try {
        if (type === 'officer') {
            await Officer.findByIdAndUpdate(id, { is_active: false, updated_at: new Date() })
        } else {
            await BoardMember.findByIdAndUpdate(id, { is_active: false, updated_at: new Date() })
        }
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Board DELETE error:', error)
        return NextResponse.json({ error: 'Failed to remove' }, { status: 500 })
    }
}
