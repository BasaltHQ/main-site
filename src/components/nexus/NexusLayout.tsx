// This file is being replaced by a Client Component structure to support mobile state.
// We will modify this file to simply fetch data and pass it to NexusShell.
import { redirect } from 'next/navigation'
import NexusShell from './NexusShell'
import ThirdWebProviderWrapper from './ThirdWebProvider'
import { getCurrentProfile } from '@/app/nexus/actions'

export default async function NexusLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const profile = await getCurrentProfile()

    if (!profile) {
        redirect('/nexus/login')
    }

    const role = profile?.role || 'investor'
    const name = profile?.full_name || profile?.email || 'User'
    const company = profile?.company_name || 'BasaltHQ Investor'

    return (
        <ThirdWebProviderWrapper>
            <NexusShell
                role={role}
                name={name}
                company={company}
                userEmail={profile?.email || ''}
            >
                {children}
            </NexusShell>
        </ThirdWebProviderWrapper>
    )
}
