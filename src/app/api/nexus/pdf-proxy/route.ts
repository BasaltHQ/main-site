import { NextRequest, NextResponse } from 'next/server'
import { s3, BUCKET } from '@/lib/s3'
import { GetObjectCommand } from '@aws-sdk/client-s3'

// Proxy PDF files from S3 to avoid CORS and URL format issues
export async function GET(req: NextRequest) {
    const key = req.nextUrl.searchParams.get('key')
    if (!key) return NextResponse.json({ error: 'Missing key parameter' }, { status: 400 })

    try {
        const command = new GetObjectCommand({ Bucket: BUCKET, Key: key })
        const response = await s3.send(command)

        if (!response.Body) {
            return NextResponse.json({ error: 'Empty response from S3' }, { status: 404 })
        }

        // Convert the readable stream to a buffer
        const chunks: Uint8Array[] = []
        const reader = response.Body as any
        for await (const chunk of reader) {
            chunks.push(chunk)
        }
        const buffer = Buffer.concat(chunks)

        return new NextResponse(buffer, {
            status: 200,
            headers: {
                'Content-Type': response.ContentType || 'application/pdf',
                'Content-Disposition': 'inline',
                'Cache-Control': 'public, max-age=3600',
            }
        })
    } catch (error: any) {
        console.error('PDF proxy error:', error)
        return NextResponse.json({ error: 'Failed to fetch PDF from S3' }, { status: 500 })
    }
}
