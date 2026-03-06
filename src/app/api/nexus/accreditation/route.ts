import { NextResponse, NextRequest } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { AccreditationResponse, VerificationDocument, InvestorProfile } from '@/lib/models'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export async function GET(req: NextRequest) {
    try {
        await dbConnect()
        const data = await AccreditationResponse.find({}).sort({ created_at: -1 }).lean()

        // Populate investor info
        const accreditations = await Promise.all((data || []).map(async (a: any) => {
            const investor = await InvestorProfile.findOne({ id: a.investor_id }).lean()
            return { ...JSON.parse(JSON.stringify(a)), id: a._id.toString(), investor: investor ? JSON.parse(JSON.stringify(investor)) : null }
        }))

        return NextResponse.json({ accreditations })
    } catch (error: any) {
        console.error('Accreditation fetch error:', error)
        return NextResponse.json({ accreditations: [] })
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const { accreditationId, status, notes } = await req.json()
        const session = await getServerSession(authOptions)
        if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        await dbConnect()

        await AccreditationResponse.findByIdAndUpdate(accreditationId, {
            verified_status: status,
            verified_by: (session.user as any).id,
            verified_at: new Date(),
        })

        if (status === 'verified') {
            const accreditation = await AccreditationResponse.findById(accreditationId).lean() as any
            if (accreditation) {
                await InvestorProfile.updateOne(
                    { id: accreditation.investor_id },
                    { accreditation_status: accreditation.determination, accreditation_verified_at: new Date() }
                )
            }
        }

        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error('Accreditation update error:', error)
        return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
    }
}
