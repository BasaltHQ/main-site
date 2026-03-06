'use client'

import { useEffect, useState } from 'react'
import InvestorPortal from '@/components/nexus/fundraising/InvestorPortal'
import { logActivity } from '../../actions'

export default function MyInvestmentsPage() {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        checkAccess()
    }, [])

    async function checkAccess() {
        try {
            await logActivity('page_view', 'viewed', 'investor_portal', 'Viewed investor portal')
        } catch (e) { }
        setLoading(false)
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#119dff]"></div>
            </div>
        )
    }

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white font-rajdhani mb-2">My Investments</h1>
                <p className="text-white/60">Track your portfolio and stay updated</p>
            </div>

            <InvestorPortal />
        </div>
    )
}
