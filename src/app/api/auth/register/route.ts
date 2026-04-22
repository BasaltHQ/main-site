import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { Profile } from '@/lib/models'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
    try {
        const body = await req.clone().json()
        const { email, password, full_name, requested_role } = body

        if (!email || !password) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
        }

        await dbConnect()

        // Check existing
        const existingUser = await Profile.findOne({ email })
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        // ALL users start as pending_approval per user requirement
        const user = await Profile.create({
            email,
            password: hashedPassword,
            full_name: full_name || email.split('@')[0],
            role: requested_role || 'investor',
            status: 'pending_approval',
            requested_role: requested_role || 'investor'
        })

        // If investor and they passed accreditation info, save it
        const { accreditation_info } = body;
        if (accreditation_info) {
            const { AccreditationResponse, InvestorProfile } = await import('@/lib/models');
            
            await InvestorProfile.create({
                id: user._id.toString(),
                onboarding_step: 'complete' // skip old onboarding
            });

            await AccreditationResponse.create({
                investor_id: user._id.toString(),
                investor_type: accreditation_info.investor_type || 'individual',
                annual_income: accreditation_info.annual_income || 0,
                net_worth: accreditation_info.net_worth || 0,
                responses: accreditation_info,
                determination: 'pending', // admin needs to review
                verified_status: 'pending'
            });
        }

        return NextResponse.json({
            message: "Your access request has been submitted. An administrator will review and approve your application.",
            pending: true,
            user: { email: user.email, id: user._id }
        }, { status: 201 })
    } catch (error: any) {
        console.error("Registration error:", error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}
