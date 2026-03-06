import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { Profile } from '@/lib/models'
import bcrypt from 'bcryptjs'

// GET: Check if Nexus has been initialized (any admin exists)
export async function GET() {
    try {
        await dbConnect()
        const adminExists = await Profile.findOne({ role: { $in: ['admin', 'superadmin'] } })
        return NextResponse.json({ initialized: !!adminExists })
    } catch (error: any) {
        console.error("Init check error:", error)
        return NextResponse.json({ initialized: false }) // Show button if DB unreachable
    }
}

// POST: Create the initial admin account (only works if no admin exists)
export async function POST(req: Request) {
    try {
        const { email, password, full_name, position_title } = await req.json()

        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required." }, { status: 400 })
        }

        await dbConnect()

        // Safety check: if an admin already exists, reject
        const existingAdmin = await Profile.findOne({ role: { $in: ['admin', 'superadmin'] } })
        if (existingAdmin) {
            return NextResponse.json({ message: "Nexus has already been initialized." }, { status: 403 })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const admin = await Profile.create({
            email,
            password: hashedPassword,
            full_name: full_name || 'Nexus Administrator',
            position_title: position_title || '',
            role: 'superadmin',
            status: 'approved'
        })

        return NextResponse.json({
            message: "Nexus initialized successfully. You can now log in.",
            user: { email: admin.email, id: admin._id }
        }, { status: 201 })
    } catch (error: any) {
        console.error("Nexus init error:", error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}
