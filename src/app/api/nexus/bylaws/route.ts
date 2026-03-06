import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { Bylaw } from '@/lib/models'

export async function GET(req: NextRequest) {
    await dbConnect()
    const { searchParams } = new URL(req.url)
    const docType = searchParams.get('document_type')
    const currentOnly = searchParams.get('current') !== 'false'

    try {
        const query: any = {}
        if (docType) query.document_type = docType
        if (currentOnly) query.is_current = true

        const bylaws = await Bylaw.find(query)
            .sort({ document_type: 1, article_number: 1, section_number: 1 })
            .lean()

        return NextResponse.json({ bylaws })
    } catch (error) {
        console.error('Bylaws GET error:', error)
        return NextResponse.json({ error: 'Failed to fetch bylaws' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    await dbConnect()
    const body = await req.json()

    try {
        if (body.id) {
            // Amendment: archive old version & create new
            const existing = await Bylaw.findById(body.id)
            if (existing) {
                const amendment = {
                    amended_at: new Date(),
                    resolution_id: body.resolution_id || '',
                    previous_content: existing.content,
                    description: body.amendment_description || 'Amendment'
                }

                existing.content = body.content
                existing.title = body.title || existing.title
                existing.last_amended = new Date()
                existing.version = (existing.version || 1) + 1
                existing.amendment_history.push(amendment)
                existing.updated_at = new Date()

                // Update Delaware filing info if provided
                if (body.filed_with_delaware !== undefined) {
                    existing.filed_with_delaware = body.filed_with_delaware
                    existing.delaware_filing_date = body.delaware_filing_date
                    existing.delaware_filing_number = body.delaware_filing_number
                }

                await existing.save()
            }
        } else {
            await Bylaw.create({
                ...body,
                effective_date: body.effective_date || new Date(),
                version: 1,
                is_current: true
            })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Bylaws POST error:', error)
        return NextResponse.json({ error: 'Failed to save bylaw' }, { status: 500 })
    }
}
