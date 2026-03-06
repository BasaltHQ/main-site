import { NextRequest, NextResponse } from 'next/server'
import { uploadToS3 } from '@/lib/s3'

// POST — Upload a PDF file to S3
export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        const file = formData.get('file') as File | null
        const folder = (formData.get('folder') as string) || 'nexus/documents'

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 })
        }

        // Validate PDF
        if (file.type !== 'application/pdf') {
            return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 })
        }

        // Max 50MB
        if (file.size > 50 * 1024 * 1024) {
            return NextResponse.json({ error: 'File too large (max 50MB)' }, { status: 400 })
        }

        const buffer = Buffer.from(await file.arrayBuffer())
        const timestamp = Date.now()
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
        const key = `${folder}/${timestamp}_${safeName}`

        const url = await uploadToS3(buffer, key, file.type)

        return NextResponse.json({
            success: true,
            url,
            key,       // S3 object key for proxy retrieval
            file_name: file.name,
            file_size: file.size,
        })
    } catch (error: any) {
        console.error('Upload error:', error)
        return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 })
    }
}
