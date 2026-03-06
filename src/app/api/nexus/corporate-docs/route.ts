import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { CorporateDocument, Notification } from '@/lib/models'

// GET — List corporate documents
export async function GET(req: NextRequest) {
    try {
        await dbConnect()
        const category = req.nextUrl.searchParams.get('category')
        const query: any = {}
        if (category && category !== 'all') query.category = category

        const docs = await CorporateDocument.find(query).sort({ created_at: -1 }).lean()
        const mapped = docs.map((d: any) => ({
            id: d._id.toString(),
            title: d.title,
            description: d.description || '',
            category: d.category || 'other',
            department: d.department || '',
            file_url: d.file_url || '',
            file_name: d.file_name || '',
            file_size: d.file_size || 0,
            file_type: d.file_type || 'application/pdf',
            uploaded_by: d.uploaded_by || '',
            status: d.status || 'active',
            effective_date: d.effective_date,
            version: d.version || 1,
            tags: d.tags || [],
            comments: (d.comments || []).map((c: any) => ({
                user_email: c.user_email,
                user_name: c.user_name,
                text: c.text,
                created_at: c.created_at
            })),
            created_at: d.created_at
        }))

        return NextResponse.json({ documents: mapped })
    } catch (error: any) {
        console.error('Corporate docs GET error:', error)
        return NextResponse.json({ documents: [] })
    }
}

// POST — Create a new corporate document
export async function POST(req: NextRequest) {
    try {
        await dbConnect()
        const body = await req.json()

        const doc = await CorporateDocument.create({
            title: body.title,
            description: body.description,
            category: body.category || 'other',
            department: body.department,
            file_url: body.file_url,
            file_name: body.file_name,
            file_size: body.file_size,
            file_type: body.file_type || 'application/pdf',
            uploaded_by: body.uploaded_by,
            notify_recipients: body.notify_recipients || [],
            status: body.status || 'active',
            effective_date: body.effective_date ? new Date(body.effective_date) : undefined,
            tags: body.tags || [],
            created_at: new Date(),
            updated_at: new Date()
        })

        // Send notifications to selected recipients
        if (body.notify_recipients?.length > 0) {
            const notifications = body.notify_recipients.map((email: string) => ({
                recipient_email: email,
                type: 'document',
                title: `New Document: ${body.title}`,
                body: body.description || `A new corporate document has been uploaded: ${body.title}`,
                link: `/nexus/governance?tab=documents`,
                source_id: doc._id.toString(),
                created_at: new Date()
            }))
            await Notification.insertMany(notifications)
        }

        return NextResponse.json({ success: true, id: doc._id.toString() })
    } catch (error: any) {
        console.error('Corporate docs POST error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

// PATCH — Add a comment to a document
export async function PATCH(req: NextRequest) {
    try {
        await dbConnect()
        const body = await req.json()
        const { id, comment } = body

        if (!id || !comment) {
            return NextResponse.json({ error: 'Missing id or comment' }, { status: 400 })
        }

        await CorporateDocument.findByIdAndUpdate(id, {
            $push: {
                comments: {
                    user_email: comment.user_email,
                    user_name: comment.user_name,
                    text: comment.text,
                    created_at: new Date()
                }
            },
            updated_at: new Date()
        })

        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error('Corporate docs PATCH error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

// DELETE — Remove a document
export async function DELETE(req: NextRequest) {
    try {
        await dbConnect()
        const id = req.nextUrl.searchParams.get('id')
        if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

        await CorporateDocument.findByIdAndDelete(id)
        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error('Corporate docs DELETE error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
