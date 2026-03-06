import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { DocumentAnnotation } from '@/lib/models'

// GET — Fetch annotations for a document (optionally filtered by page)
export async function GET(req: NextRequest) {
    const key = req.nextUrl.searchParams.get('key')
    if (!key) return NextResponse.json({ error: 'key required' }, { status: 400 })

    const page = req.nextUrl.searchParams.get('page')

    try {
        await dbConnect()
        const filter: any = { document_key: key }
        if (page) filter.page = parseInt(page)

        const annotations = await DocumentAnnotation.find(filter).sort({ created_at: 1 }).lean()
        return NextResponse.json({
            annotations: annotations.map((a: any) => ({
                id: a._id.toString(),
                document_key: a.document_key,
                page: a.page,
                type: a.type,
                x: a.x, y: a.y, width: a.width, height: a.height,
                text: a.text,
                user_email: a.user_email,
                user_name: a.user_name,
                user_color: a.user_color,
                created_at: a.created_at
            }))
        })
    } catch (error: any) {
        console.error('Annotations fetch error:', error)
        return NextResponse.json({ annotations: [] })
    }
}

// POST — Create a new annotation
export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        await dbConnect()

        const annotation = await DocumentAnnotation.create({
            document_key: body.document_key,
            page: body.page,
            type: body.type,
            x: body.x,
            y: body.y,
            width: body.width || 0,
            height: body.height || 0,
            text: body.text || '',
            user_email: body.user_email,
            user_name: body.user_name,
            user_color: body.user_color
        })

        return NextResponse.json({
            success: true,
            id: annotation._id.toString()
        }, { status: 201 })
    } catch (error: any) {
        console.error('Annotation create error:', error)
        return NextResponse.json({ error: 'Failed to create annotation' }, { status: 500 })
    }
}

// DELETE — Remove an annotation (only by the user who created it)
export async function DELETE(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id')
    const email = req.nextUrl.searchParams.get('email')
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

    try {
        await dbConnect()
        const annotation = await DocumentAnnotation.findById(id)
        if (!annotation) return NextResponse.json({ error: 'Not found' }, { status: 404 })
        if (annotation.user_email !== email) {
            return NextResponse.json({ error: 'Can only delete your own annotations' }, { status: 403 })
        }
        await DocumentAnnotation.findByIdAndDelete(id)
        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error('Annotation delete error:', error)
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
    }
}
