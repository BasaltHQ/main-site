import { NextResponse, NextRequest } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { ComplianceTask } from '@/lib/models'

export async function GET(req: NextRequest) {
    try {
        const subsidiaryId = req.nextUrl.searchParams.get('subsidiaryId')
        const filter = req.nextUrl.searchParams.get('filter') || 'all'
        if (!subsidiaryId) return NextResponse.json({ error: 'subsidiaryId required' }, { status: 400 })
        await dbConnect()

        let query: any = { subsidiary_id: subsidiaryId }
        if (filter === 'pending') query.status = { $in: ['pending', 'in_progress'] }
        else if (filter === 'overdue') query.status = 'overdue'
        else if (filter === 'completed') query.status = { $in: ['filed', 'completed'] }

        const data = await ComplianceTask.find(query).sort({ due_date: 1 }).lean()
        const tasks = (data || []).map((t: any) => ({
            id: t._id.toString(), taskType: t.task_type, title: t.title,
            description: t.description || '', jurisdiction: t.jurisdiction || '',
            dueDate: t.due_date, status: t.status, priority: t.priority,
            filingReference: t.filing_reference || '', assignedTo: t.assigned_to || '',
        }))

        return NextResponse.json({ tasks })
    } catch (error: any) {
        console.error('Compliance fetch error:', error)
        return NextResponse.json({ tasks: [] })
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        await dbConnect()
        const task = await ComplianceTask.create(body)
        return NextResponse.json({ success: true, id: task._id.toString() }, { status: 201 })
    } catch (error: any) {
        console.error('Compliance create error:', error)
        return NextResponse.json({ error: 'Failed to create task' }, { status: 500 })
    }
}
