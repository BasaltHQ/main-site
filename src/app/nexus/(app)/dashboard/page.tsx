import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import { Profile } from '@/lib/models'
import InvestorDashboard from '@/components/nexus/InvestorDashboard'
import AdminDashboard from '@/components/nexus/AdminDashboard'
import MedallionStrip from '@/components/nexus/MedallionStrip'

export default async function DashboardPage() {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) return null

    await dbConnect()

    // Fetch Role from MongoDB
    const userProfile = await Profile.findById((session.user as any).id).lean()

    const role = userProfile?.role || 'investor'
    const isAdmin = ['admin', 'superadmin'].includes(role)

    // Convert Mongoose document to plain object for client components
    const profile = JSON.parse(JSON.stringify(userProfile || {}))

    return (
        <div className="space-y-8">
            {session.user && <MedallionStrip userId={(session.user as any).id} />}

            <header>
                <h1 className="text-3xl font-rajdhani font-bold text-white uppercase tracking-wider">
                    {isAdmin ? 'Management Console' : 'Investor Dashboard'}
                </h1>
                <p className="text-white/40 text-sm mt-1">
                    {isAdmin
                        ? 'Oversee fundraising, investors, and document distribution.'
                        : 'Track your investments, documents, and network status.'}
                </p>
            </header>

            {isAdmin ? (
                <AdminDashboard profile={profile} />
            ) : (
                <InvestorDashboard profile={profile} />
            )}
        </div>
    )
}
