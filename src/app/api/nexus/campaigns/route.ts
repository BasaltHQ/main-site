import { NextResponse, NextRequest } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { Campaign } from '@/lib/models'

export async function GET(req: NextRequest) {
    try {
        const subsidiaryId = req.nextUrl.searchParams.get('subsidiaryId')
        await dbConnect()

        const query = subsidiaryId ? { $or: [{ subsidiary: subsidiaryId }, { subsidiary_id: subsidiaryId }] } : {}
        const data = await Campaign.find(query).sort({ created_at: -1 }).lean()

        const campaigns = data.map((c: any) => ({
            id: c._id.toString(),
            name: c.name,
            roundType: c.round_type || c.type || 'seed',
            targetAmount: c.target_amount || 0,
            totalCommitted: c.total_committed || c.raised_amount || 0,
            totalWired: c.total_wired || 0,
            totalClosed: c.total_closed || 0,
            numberOfInvestors: c.number_of_investors || 0,
            status: c.status || 'active',
            launchDate: c.launch_date || c.created_at,
            targetCloseDate: c.target_close_date || null,
            preMoneyValuation: c.pre_money_valuation || c.valuation || 0,
            valuationType: c.valuation_type || 'pre_money',
        }))

        return NextResponse.json({ campaigns })
    } catch (error: any) {
        console.error('Campaigns fetch error:', error)
        return NextResponse.json({ campaigns: [] })
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const { campaignId, status } = await req.json()
        if (!campaignId || !status) {
            return NextResponse.json({ error: 'campaignId and status required' }, { status: 400 })
        }

        const validStatuses = ['draft', 'active', 'closing', 'closed', 'cancelled']
        if (!validStatuses.includes(status)) {
            return NextResponse.json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` }, { status: 400 })
        }

        await dbConnect()
        const updated = await Campaign.findByIdAndUpdate(
            campaignId,
            { status, updated_at: new Date() },
            { new: true }
        ).lean()

        if (!updated) {
            return NextResponse.json({ error: 'Campaign not found' }, { status: 404 })
        }

        return NextResponse.json({ success: true, status: (updated as any).status })
    } catch (error: any) {
        console.error('Campaign status update error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
