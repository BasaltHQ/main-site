import { NextResponse, NextRequest } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { FinancialSnapshot, CustomKPI } from '@/lib/models'

export async function GET(req: NextRequest) {
    try {
        const subsidiaryId = req.nextUrl.searchParams.get('subsidiaryId')
        if (!subsidiaryId) return NextResponse.json({ error: 'subsidiaryId required' }, { status: 400 })
        await dbConnect()

        const snapshot = await FinancialSnapshot.findOne({ subsidiary_id: subsidiaryId })
            .sort({ period_end: -1 }).lean()

        const kpis = await CustomKPI.find({ subsidiary_id: subsidiaryId, is_headline: true })
            .sort({ display_order: 1 }).lean()

        return NextResponse.json({
            snapshot: snapshot ? JSON.parse(JSON.stringify(snapshot)) : null,
            kpis: (kpis || []).map((k: any) => ({ ...JSON.parse(JSON.stringify(k)), id: k._id.toString() }))
        })
    } catch (error: any) {
        console.error('Financials fetch error:', error)
        return NextResponse.json({ snapshot: null, kpis: [] })
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        await dbConnect()
        const snapshot = await FinancialSnapshot.create(body)
        return NextResponse.json({ success: true, id: snapshot._id.toString() }, { status: 201 })
    } catch (error: any) {
        console.error('Financials create error:', error)
        return NextResponse.json({ error: 'Failed to create snapshot' }, { status: 500 })
    }
}
