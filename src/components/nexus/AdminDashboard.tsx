import dbConnect from '@/lib/mongodb'
import { Transaction, Campaign, Profile } from '@/lib/models'
import { Users, DollarSign, FileText, TrendingUp, Plus, ExternalLink } from 'lucide-react'
import Link from 'next/link'

async function getAdminStats() {
    await dbConnect()

    // 1. Total Raised
    const txs = await Transaction.find({ status: 'completed', type: 'investment' }).select('amount').lean()
    const totalRaised = txs.reduce((acc, curr: any) => acc + (Number(curr.amount) || 0), 0)

    // 2. Total Campaigns
    const activeCampaigns = await Campaign.find({ status: 'active' }).lean()

    // 3. Active Investors
    const investorCount = await Profile.countDocuments({ role: 'investor' })

    // 4. Pending Requests (recent signups)
    const recentUsers = await Profile.find().sort({ created_at: -1 }).limit(5).lean()

    return {
        totalRaised,
        investorCount,
        activeCampaigns: JSON.parse(JSON.stringify(activeCampaigns)),
        recentUsers: JSON.parse(JSON.stringify(recentUsers))
    }
}

export default async function AdminDashboard({ profile }: { profile: any }) {
    const stats = await getAdminStats()

    // Format currency
    const formatUSD = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount)

    const statCards = [
        { label: 'Total Raised', value: formatUSD(stats.totalRaised), change: 'Live', icon: DollarSign },
        { label: 'Active Investors', value: stats.investorCount.toString(), change: 'Total', icon: Users },
        { label: 'Active Campaigns', value: stats.activeCampaigns.length.toString(), change: 'Open', icon: TrendingUp },
        { label: 'Pending Docs', value: '0', change: '--', icon: FileText }, // Placeholder until doc system
    ]

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat) => (
                    <div key={stat.label} className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-[#119dff]/10 rounded-lg text-[#119dff] group-hover:text-[#3db3ff] transition-colors">
                                <stat.icon size={20} />
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.change === 'Live' ? 'bg-green-500/10 text-green-400' : 'bg-white/5 text-white/40'
                                }`}>
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-3xl font-bold font-rajdhani text-white mb-1">{stat.value}</h3>
                        <p className="text-white/40 text-xs uppercase tracking-wider">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Fundraising Operations - New Section */}
            <div className="bg-gradient-to-br from-[#119dff]/10 via-purple-500/5 to-black/40 border border-[#119dff]/20 rounded-2xl p-8">
                <h2 className="text-2xl font-bold font-rajdhani text-white mb-6 flex items-center gap-3">
                    <TrendingUp className="text-[#119dff]" size={28} />
                    Fundraising Operations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link href="/nexus/ventures" className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#119dff]/30 rounded-xl p-6 transition-all group">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-[#119dff]/20 rounded-lg">
                                <DollarSign className="text-[#119dff]" size={24} />
                            </div>
                            <h3 className="text-white font-bold text-lg">Ventures Workspace</h3>
                        </div>
                        <p className="text-white/60 text-sm mb-4">Manage all subsidiary operations: campaigns, cap table, financials, data room & compliance</p>
                        <div className="flex items-center gap-2 text-[#119dff] group-hover:gap-3 transition-all">
                            <span className="text-sm font-medium">Open Workspace</span>
                            <ExternalLink size={16} />
                        </div>
                    </Link>

                    <Link href="/nexus/my-investments" className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#119dff]/30 rounded-xl p-6 transition-all group">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-cyan-500/20 rounded-lg">
                                <Users className="text-cyan-400" size={24} />
                            </div>
                            <h3 className="text-white font-bold text-lg">Investor Portal</h3>
                        </div>
                        <p className="text-white/60 text-sm mb-4">View investor perspective - portfolio, updates, and metrics</p>
                        <div className="flex items-center gap-2 text-[#119dff] group-hover:gap-3 transition-all">
                            <span className="text-sm font-medium">Preview Portal</span>
                            <ExternalLink size={16} />
                        </div>
                    </Link>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-black/40 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-lg font-bold font-rajdhani text-white mb-6 flex items-center gap-2">
                        <Users className="text-[#119dff]" size={20} />
                        Recent Users
                    </h3>
                    <div className="space-y-4">
                        {stats.recentUsers.map((user: any) => (
                            <div key={user._id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#119dff]/20 to-orange-500/20 flex items-center justify-center text-[#119dff] font-bold text-xs">
                                        {user.full_name?.charAt(0) || user.email?.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">{user.full_name || 'User'}</p>
                                        <p className="text-xs text-white/40">{user.email}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <span className="px-3 py-1.5 bg-white/5 text-white/40 text-xs rounded-lg uppercase tracking-wider">
                                        {user.role}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {stats.recentUsers.length === 0 && (
                            <p className="text-white/40 text-sm text-center py-4">No users found.</p>
                        )}
                    </div>
                    <Link href="/nexus/manage/investors" className="block text-center mt-6 text-xs text-[#119dff] hover:text-[#3db3ff] uppercase tracking-widest">
                        View All Users
                    </Link>
                </div>

                <div className="bg-black/40 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold font-rajdhani text-white flex items-center gap-2">
                            <TrendingUp className="text-[#119dff]" size={20} />
                            Active Campaigns
                        </h3>
                        <Link href="/nexus/ventures" className="p-2 hover:bg-white/10 rounded-lg text-[#119dff] transition-colors">
                            <Plus size={18} />
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {stats.activeCampaigns.map((campaign: any) => (
                            <div key={campaign._id} className="p-4 bg-gradient-to-r from-red-900/10 to-orange-900/10 border border-[#119dff]/20 rounded-xl">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-semibold text-white">{campaign.name}</h4>
                                    <span className="text-xs px-2 py-1 bg-[#119dff]/20 text-[#119dff] rounded-full uppercase tracking-wider">{campaign.status}</span>
                                </div>
                                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-2">
                                    <div
                                        className="bg-gradient-to-r from-[#119dff] to-orange-500 h-full rounded-full"
                                        style={{ width: `${Math.min(((campaign.raised_amount || 0) / (campaign.target_amount || 1)) * 100, 100)}%` }}
                                    />
                                </div>
                                <div className="flex justify-between text-xs text-white/60">
                                    <span>{formatUSD(campaign.raised_amount || 0)} Raised</span>
                                    <span>Target: {formatUSD(campaign.target_amount || 0)}</span>
                                </div>
                            </div>
                        ))}
                        {stats.activeCampaigns.length === 0 && (
                            <p className="text-white/40 text-sm text-center py-4">No active campaigns.</p>
                        )}
                    </div>
                    <Link href="/nexus/ventures" className="block text-center mt-6 text-xs text-[#119dff] hover:text-[#3db3ff] uppercase tracking-widest">
                        Manage Campaigns
                    </Link>
                </div>
            </div>
        </div>
    )
}
