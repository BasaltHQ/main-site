'use client'

import { useState, useEffect } from 'react'
import { PieChart, Users, Plus, Trash2, Save, AlertTriangle, Check } from 'lucide-react'
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { getCapTableTransactions, getCapTableInvites, createCapTableInvite, getOrCreateGenesisCampaign, createInitialGrantTransaction } from '@/app/nexus/actions'

export default function CapTableManager({ subsidiaryId, authorizedShares = 10000000 }: { subsidiaryId: string, authorizedShares?: number }) {
    const [shareholders, setShareholders] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [editMode, setEditMode] = useState(false)

    // New Entry State
    const [newHolder, setNewHolder] = useState({ name: '', role: 'Adjusted Grant', shares: '' })

    const COLORS = ['#119dff', '#4B5563', '#7C3AED', '#EAB308', '#D97706', '#9333EA', '#DB2777']

    useEffect(() => {
        fetchCapTable()
    }, [subsidiaryId])

    const fetchCapTable = async () => {
        setLoading(true)
        try {
            const txs = await getCapTableTransactions(subsidiaryId);
            if (txs) {
                // Aggregating by User/Name
                const map = new Map<string, number>()
                const roleMap = new Map<string, string>()

                txs.forEach((tx: any) => {
                    const name = tx.user?.full_name || tx.notes || 'Unknown' // Notes often hold name for manual grants
                    const shares = Number(tx.share_count || 0)
                    map.set(name, (map.get(name) || 0) + shares)
                    if (tx.type === 'initial_grant') roleMap.set(name, 'Founder/Early')
                    else roleMap.set(name, 'Investor')
                })

                const list = Array.from(map.entries()).map(([name, shares]) => ({
                    name,
                    shares,
                    role: roleMap.get(name) || 'Shareholder',
                    percentage: (shares / authorizedShares) * 100
                }))

                setShareholders(list)
            }
        } catch (e) { console.error(e) }
        setLoading(false)
    }



    // State for Invites
    const [invites, setInvites] = useState<any[]>([])
    const [inviteEmail, setInviteEmail] = useState('')

    useEffect(() => {
        fetchCapTable()
        fetchInvites()
    }, [subsidiaryId])

    const fetchInvites = async () => {
        try {
            const data = await getCapTableInvites(subsidiaryId);
            if (data) setInvites(data);
        } catch (e) { console.error(e) }
    }

    const handleAddGrant = async () => {
        if (!newHolder.shares) return

        const isEmail = newHolder.name.includes('@')

        if (isEmail) {
            // Invite Flow
            try {
                await createCapTableInvite({
                    subsidiary_id: subsidiaryId,
                    email: newHolder.name,
                    shares: parseFloat(newHolder.shares),
                    role: newHolder.role || 'Investor'
                });
                console.log(`[MOCK EMAIL SERVICE] Sending invite to ${newHolder.name} for ${newHolder.shares} shares in ${subsidiaryId}`)
                alert(`Invite sent to ${newHolder.name}`)
                setNewHolder({ name: '', role: 'Adjusted Grant', shares: '' })
                fetchInvites()
                // Mock notification
                console.log(`[NOTIFICATION] Admins notified of new invite sent to ${newHolder.name}`)
            } catch (error: any) {
                alert('Error sending invite: ' + error.message)
            }
        } else {
            // Direct Grant Flow (Existing)
            try {
                // Find or Create Genesis Round
                const genesis = await getOrCreateGenesisCampaign(subsidiaryId);

                await createInitialGrantTransaction({
                    campaign_id: genesis?._id || genesis?.id,
                    amount: 0, // Grant, usually $0 cost basis for founders or par value
                    status: 'completed',
                    type: 'initial_grant',
                    share_count: parseFloat(newHolder.shares),
                    notes: newHolder.name // Storing name in notes for manual entry
                });
                setNewHolder({ name: '', role: 'Adjusted Grant', shares: '' })
                fetchCapTable()
                // Mock notification
                console.log(`[NOTIFICATION] Cap table updated: ${newHolder.name} added with ${newHolder.shares} shares`)
            } catch (error: any) {
                alert('Failed to add grant: ' + error.message)
            }
        }
    }

    // Calc stats
    const totalAllocated = shareholders.reduce((acc, curr) => acc + curr.shares, 0)
    const totalUnallocated = Math.max(0, authorizedShares - totalAllocated)

    const chartData = [
        ...shareholders,
        { name: 'Unallocated', shares: totalUnallocated, role: 'Treasury', percentage: (totalUnallocated / authorizedShares) * 100 }
    ]

    return (
        <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden shadow-xl animate-fadeIn">
            <div className="p-6 border-b border-white/10 bg-white/[0.02] flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-bold font-rajdhani text-white uppercase tracking-wider flex items-center gap-2">
                        <PieChart className="text-[#119dff]" size={20} /> Cap Table
                    </h3>
                    <p className="text-xs text-white/40 mt-1">
                        Total Shares Authorized: <span className="text-white font-mono">{new Intl.NumberFormat('en-US').format(authorizedShares)}</span>
                    </p>
                </div>
                {!editMode ? (
                    <button
                        onClick={() => setEditMode(true)}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-wider text-white transition-colors"
                    >
                        Edit / Manual Entry
                    </button>
                ) : (
                    <button
                        onClick={() => setEditMode(false)}
                        className="px-4 py-2 bg-[#119dff] hover:bg-[#0d7acc] rounded-lg text-xs font-bold uppercase tracking-wider text-white transition-colors"
                    >
                        Done
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left: Visualization */}
                <div className="h-[400px] p-6 relative flex items-center justify-center border-b lg:border-b-0 lg:border-r border-white/10">
                    <ResponsiveContainer width="100%" height="100%">
                        <RechartsPie>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={120}
                                paddingAngle={2}
                                dataKey="shares"
                                stroke="none"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.name === 'Unallocated' ? '#1a1a1a' : COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }}
                                itemStyle={{ color: '#fff' }}
                                formatter={(val: any) => new Intl.NumberFormat('en-US').format(val) + ' Shares'}
                            />
                            <Legend verticalAlign="bottom" height={36} />
                        </RechartsPie>
                    </ResponsiveContainer>
                    {/* Center Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-3xl font-bold text-white font-rajdhani">
                            {((totalAllocated / authorizedShares) * 100).toFixed(1)}%
                        </span>
                        <span className="text-[10px] text-white/40 uppercase tracking-widest">Allocated</span>
                    </div>
                </div>

                {/* Right: List & Entry */}
                <div className="p-6 overflow-y-auto max-h-[400px] bg-white/[0.01]">
                    {editMode && (
                        <div className="mb-6 space-y-4">
                            <div className="p-4 bg-[#119dff]/10 border border-[#119dff]/20 rounded-xl space-y-4">
                                <h4 className="text-xs font-bold text-[#119dff] uppercase tracking-wider flex items-center gap-2">
                                    <Plus size={14} /> Add Grant / Invite
                                </h4>
                                <p className="text-[10px] text-white/40">Enter name for manual grant, or email to invite external user.</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Name or Email (e.g. founder@basalthq.com)"
                                        className="col-span-2 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#119dff]"
                                        value={newHolder.name}
                                        onChange={(e) => setNewHolder({ ...newHolder, name: e.target.value })}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Shares"
                                        className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#119dff]"
                                        value={newHolder.shares}
                                        onChange={(e) => setNewHolder({ ...newHolder, shares: e.target.value })}
                                    />
                                    <button
                                        onClick={handleAddGrant}
                                        disabled={!newHolder.shares || !newHolder.name}
                                        className="bg-[#119dff] hover:bg-[#0d7acc] disabled:opacity-50 text-white rounded-lg font-bold text-xs uppercase tracking-wider transition-colors"
                                    >
                                        {newHolder.name.includes('@') ? 'Send Invite' : 'Add Grant'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {invites.length > 0 && (
                        <div className="mb-6">
                            <h4 className="text-[10px] uppercase text-white/40 mb-2 font-bold tracking-widest">Pending Invites</h4>
                            <div className="space-y-2">
                                {invites.map(inv => (
                                    <div key={inv.id} className="flex justify-between items-center p-3 bg-white/5 border border-white/5 rounded-lg border-dashed">
                                        <div>
                                            <p className="text-sm font-medium text-white">{inv.email}</p>
                                            <p className="text-xs text-white/40">{new Intl.NumberFormat('en-US').format(inv.shares)} Shares • Pending</p>
                                        </div>
                                        <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <table className="w-full text-left text-sm text-white/60">
                        <thead className="text-[10px] uppercase tracking-widest text-white/30 font-medium">
                            <tr>
                                <th className="pb-3">Shareholder</th>
                                <th className="pb-3 text-right">Shares</th>
                                <th className="pb-3 text-right">%</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {chartData.filter(d => d.name !== 'Unallocated').map((entry, i) => (
                                <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                                    <td className="py-3 items-center gap-2 flex">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                                        <span className="text-white font-medium">{entry.name}</span>
                                    </td>
                                    <td className="py-3 text-right font-mono text-white/80">
                                        {new Intl.NumberFormat('en-US').format(entry.shares)}
                                    </td>
                                    <td className="py-3 text-right font-mono text-[#119dff]">
                                        {entry.percentage.toFixed(2)}%
                                    </td>
                                </tr>
                            ))}
                            {/* Unallocated Row */}
                            <tr className="border-t border-white/10 bg-white/[0.01] italic">
                                <td className="py-3 flex items-center gap-2 pl-4">
                                    <div className="w-2 h-2 rounded-full bg-[#333]" />
                                    Unallocated Treasury
                                </td>
                                <td className="py-3 text-right font-mono opacity-50">
                                    {new Intl.NumberFormat('en-US').format(totalUnallocated)}
                                </td>
                                <td className="py-3 text-right font-mono opacity-50">
                                    {((totalUnallocated / authorizedShares) * 100).toFixed(2)}%
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
