import { NextResponse, NextRequest } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { ActivityLog } from '@/lib/models'

export async function GET(req: NextRequest) {
    try {
        const subsidiaryId = req.nextUrl.searchParams.get('subsidiaryId')
        const filter = req.nextUrl.searchParams.get('filter') || 'all'
        await dbConnect()

        let query: any = {}
        if (subsidiaryId) query.subsidiary_id = subsidiaryId
        if (filter !== 'all') query.activity_category = filter

        const data = await ActivityLog.find(query).sort({ created_at: -1 }).limit(100).lean()
        const activities = (data || []).map((a: any) => ({
            id: a._id.toString(), actorEmail: a.actor_email || 'System', actorRole: a.actor_role,
            activityType: a.activity_type, activityCategory: a.activity_category,
            action: a.action, resourceType: a.resource_type || '', resourceName: a.resource_name || '',
            description: a.description || '', createdAt: a.created_at, status: a.status,
        }))

        // Stats
        const totalActivities = await ActivityLog.countDocuments(subsidiaryId ? { subsidiary_id: subsidiaryId } : {})
        const userIds = await ActivityLog.distinct('user_id', { user_id: { $ne: null } })
        const today = new Date(); today.setHours(0, 0, 0, 0)
        const todayQuery: any = { created_at: { $gte: today } }
        if (subsidiaryId) todayQuery.subsidiary_id = subsidiaryId
        const todayActivities = await ActivityLog.countDocuments(todayQuery)
        const failedQuery: any = { status: 'failed' }
        if (subsidiaryId) failedQuery.subsidiary_id = subsidiaryId
        const failedActivities = await ActivityLog.countDocuments(failedQuery)

        return NextResponse.json({
            activities,
            stats: { totalActivities, uniqueUsers: userIds.length, todayActivities, failedActivities }
        })
    } catch (error: any) {
        console.error('Activity fetch error:', error)
        return NextResponse.json({ activities: [], stats: { totalActivities: 0, uniqueUsers: 0, todayActivities: 0, failedActivities: 0 } })
    }
}
