'use client'

import { useEffect, useState } from 'react'
import { getMedallions } from '@/app/nexus/actions'
import { Award, Building2 } from 'lucide-react'

// Medallion Interface
interface Medallion {
    id: string
    subsidiaryName: string
    role: string // 'Admin' | 'Investor'
    logoUrl?: string
    shares?: number
}

// Mock logo colors for stubs since we don't have real logos yet
const MOCK_COLORS = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-orange-500 to-red-500',
    'from-green-500 to-emerald-500'
]

export default function MedallionStrip({ userId }: { userId: string }) {
    const [medallions, setMedallions] = useState<Medallion[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchMedallions()
    }, [userId])

    const fetchMedallions = async () => {
        if (!userId) return

        try {
            const data = await getMedallions(userId)
            setMedallions((data || []) as Medallion[])
        } catch (e) {
            console.error(e)
        }

        setLoading(false)
    }

    if (loading) return null

    if (medallions.length === 0) return null

    return (
        <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex gap-4">
                {medallions.map((medallion, idx) => (
                    <div
                        key={medallion.id}
                        className="group flex flex-col items-center justify-center p-4 min-w-[120px] bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-[#119dff]/30 transition-all cursor-pointer relative overflow-hidden"
                    >
                        {/* Glow Effect */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${MOCK_COLORS[idx % MOCK_COLORS.length]} opacity-0 group-hover:opacity-10 transition-opacity`} />

                        {/* Medallion Icon */}
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${MOCK_COLORS[idx % MOCK_COLORS.length]} p-0.5 shadow-lg mb-3 ring-2 ring-black/50 group-hover:scale-110 transition-transform duration-300`}>
                            <div className="w-full h-full bg-black/90 rounded-full flex items-center justify-center backdrop-blur-xl">
                                <Building2 size={20} className="text-white" />
                            </div>
                        </div>

                        {/* Text */}
                        <h4 className="text-white font-bold text-xs text-center font-rajdhani truncate w-full mb-1">
                            {medallion.subsidiaryName}
                        </h4>
                        <span className="text-[10px] text-white/40 uppercase tracking-wider font-medium px-2 py-0.5 rounded-full bg-white/5 border border-white/5 group-hover:border-white/20 transition-colors">
                            {medallion.role}
                        </span>

                        {/* Tooltip hint in UI for shares if avail */}
                        {medallion.shares && (
                            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-green-500 animate-pulse" title="Active Equity Holder" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
