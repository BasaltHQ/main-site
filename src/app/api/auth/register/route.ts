import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { Profile } from '@/lib/models'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
    try {
        const { email, password, full_name, requested_role } = await req.json()

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

        // Investors get approved immediately; team/director/officer need admin approval
        const needsApproval = requested_role && requested_role !== 'investor'

        const user = await Profile.create({
            email,
            password: hashedPassword,
            full_name: full_name || email.split('@')[0],
            role: needsApproval ? 'pending' : 'investor',
            status: needsApproval ? 'pending_approval' : 'approved',
            requested_role: requested_role || 'investor'
        })

        if (needsApproval) {
            return NextResponse.json({
                message: "Your access request has been submitted. An administrator will review and approve your application.",
                pending: true,
                user: { email: user.email, id: user._id }
            }, { status: 201 })
        }

        return NextResponse.json({ message: "User registered successfully", user: { email: user.email, id: user._id } }, { status: 201 })
    } catch (error: any) {
        console.error("Registration error:", error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}
