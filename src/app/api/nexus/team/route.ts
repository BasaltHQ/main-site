import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { Profile, BoardMember, Officer } from '@/lib/models'

export async function GET() {
    await dbConnect()

    try {
        // Get all profiles
        const profiles = await Profile.find({}).sort({ created_at: -1 }).lean()

        // Get all board members and officers (including inactive for full picture)
        const directors = await BoardMember.find({ is_active: true }).lean()
        const officers = await Officer.find({ is_active: true }).lean()

        // For each profile, find matching governance roles by email
        const enriched = profiles.map((p: any) => {
            const matchedDirectors = directors.filter((d: any) =>
                d.email && p.email && d.email.toLowerCase() === p.email.toLowerCase()
            ).map((d: any) => ({
                _id: d._id.toString(),
                type: 'director',
                title: d.title || 'Director',
                seat_type: d.seat_type,
                seat_class: d.seat_class,
                linked: d.user_id === p._id.toString()
            }))

            const matchedOfficers = officers.filter((o: any) =>
                o.email && p.email && o.email.toLowerCase() === p.email.toLowerCase()
            ).map((o: any) => ({
                _id: o._id.toString(),
                type: 'officer',
                title: o.title,
                department: o.department,
                linked: o.user_id === p._id.toString()
            }))

            return {
                ...p,
                _id: p._id.toString(),
                governance_roles: [...matchedDirectors, ...matchedOfficers]
            }
        })

        // Find unlinked governance roles (no user_id set and no email match to any profile)
        const profileEmails = profiles.map((p: any) => p.email?.toLowerCase()).filter(Boolean)

        const unlinkedDirectors = directors.filter((d: any) =>
            !d.user_id && (!d.email || !profileEmails.includes(d.email?.toLowerCase()))
        ).map((d: any) => ({
            _id: d._id.toString(),
            type: 'director',
            name: d.name,
            email: d.email,
            title: d.title || 'Director',
            seat_type: d.seat_type
        }))

        const unlinkedOfficers = officers.filter((o: any) =>
            !o.user_id && (!o.email || !profileEmails.includes(o.email?.toLowerCase()))
        ).map((o: any) => ({
            _id: o._id.toString(),
            type: 'officer',
            name: o.name,
            email: o.email,
            title: o.title
        }))

        return NextResponse.json({
            profiles: enriched,
            unlinked_roles: [...unlinkedDirectors, ...unlinkedOfficers]
        })
    } catch (error) {
        console.error('Team GET error:', error)
        return NextResponse.json({ error: 'Failed to fetch team data' }, { status: 500 })
    }
}

export async function PATCH(req: NextRequest) {
    await dbConnect()
    const body = await req.json()
    const { action, profile_id } = body

    if (!profile_id) {
        return NextResponse.json({ error: 'Profile ID required' }, { status: 400 })
    }

    try {
        const profile = await Profile.findById(profile_id)
        if (!profile) {
            return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
        }

        if (action === 'approve') {
            const { role, link_roles } = body
            // link_roles: [{ id: string, type: 'director' | 'officer' }]

            // Update profile status and role
            profile.status = 'approved'
            profile.role = role || profile.requested_role || 'investor'
            profile.updated_at = new Date()
            await profile.save()

            // Link governance roles by setting user_id
            if (link_roles?.length) {
                for (const lr of link_roles) {
                    if (lr.type === 'director') {
                        await BoardMember.findByIdAndUpdate(lr.id, { user_id: profile_id, updated_at: new Date() })
                    } else if (lr.type === 'officer') {
                        await Officer.findByIdAndUpdate(lr.id, { user_id: profile_id, updated_at: new Date() })
                    }
                }
            }

            return NextResponse.json({ success: true })
        }

        if (action === 'link') {
            // Link a specific governance role to this profile
            const { role_id, role_type } = body
            if (role_type === 'director') {
                await BoardMember.findByIdAndUpdate(role_id, { user_id: profile_id, email: profile.email, updated_at: new Date() })
            } else if (role_type === 'officer') {
                await Officer.findByIdAndUpdate(role_id, { user_id: profile_id, email: profile.email, updated_at: new Date() })
            }
            return NextResponse.json({ success: true })
        }

        if (action === 'unlink') {
            const { role_id, role_type } = body
            if (role_type === 'director') {
                await BoardMember.findByIdAndUpdate(role_id, { user_id: null, updated_at: new Date() })
            } else if (role_type === 'officer') {
                await Officer.findByIdAndUpdate(role_id, { user_id: null, updated_at: new Date() })
            }
            return NextResponse.json({ success: true })
        }

        if (action === 'suspend') {
            profile.status = 'suspended'
            profile.updated_at = new Date()
            await profile.save()
            return NextResponse.json({ success: true })
        }

        if (action === 'update_role') {
            const { role } = body
            profile.role = role
            profile.updated_at = new Date()
            await profile.save()
            return NextResponse.json({ success: true })
        }

        return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
    } catch (error) {
        console.error('Team PATCH error:', error)
        return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 })
    }
}
