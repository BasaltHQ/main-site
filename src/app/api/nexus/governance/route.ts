import { NextResponse, NextRequest } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { GovernanceRule } from '@/lib/models'

export async function GET(req: NextRequest) {
    try {
        const subsidiaryId = req.nextUrl.searchParams.get('subsidiaryId')
        if (!subsidiaryId) return NextResponse.json({ error: 'subsidiaryId required' }, { status: 400 })
        await dbConnect()

        const data = await GovernanceRule.find({ subsidiary_id: subsidiaryId, is_active: true }).lean()
        const rules = (data || []).map((r: any) => ({
            id: r._id.toString(), subsidiaryId: r.subsidiary_id, ruleType: r.rule_type,
            title: r.title, description: r.description, requiresApproval: r.requires_approval,
            approvalThreshold: r.approval_threshold, voteWeightType: r.vote_weight_type,
            eligibleVoters: r.eligible_voters, votingPeriodDays: r.voting_period_days,
            noticePeriodDays: r.notice_period_days, founderVeto: r.founder_veto,
            boardApprovalRequired: r.board_approval_required, requiresUnanimous: r.requires_unanimous,
            exemptions: r.exemptions, isActive: r.is_active,
        }))

        return NextResponse.json({ rules })
    } catch (error: any) {
        console.error('Governance fetch error:', error)
        return NextResponse.json({ rules: [] })
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        await dbConnect()

        if (body.id) {
            await GovernanceRule.findByIdAndUpdate(body.id, body)
            return NextResponse.json({ success: true })
        }

        const rule = await GovernanceRule.create(body)
        return NextResponse.json({ success: true, id: rule._id.toString() }, { status: 201 })
    } catch (error: any) {
        console.error('Governance create error:', error)
        return NextResponse.json({ error: 'Failed to save rule' }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get('id')
        if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
        await dbConnect()
        await GovernanceRule.findByIdAndUpdate(id, { is_active: false })
        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error('Governance delete error:', error)
        return NextResponse.json({ error: 'Failed to delete rule' }, { status: 500 })
    }
}
