export type InvestorStatus = {
    isVerified: boolean;
    verificationPending: boolean;
    accreditationStatus: string;
    residenceState?: string;
    residenceCountry?: string;
    isUSPerson?: boolean;
    canInvest?: boolean;
    investmentLimit?: {
        maxInvestment: number;
        totalInvested: number;
        remainingCapacity: number;
        limitDescription?: string;
        legalReference?: string;
    }
}

export async function getInvestorStatus(userId: string): Promise<InvestorStatus> {
    return {
        isVerified: true,
        verificationPending: false,
        accreditationStatus: 'accredited',
        isUSPerson: true,
        canInvest: true,
        residenceState: 'NY',
        residenceCountry: 'USA',
        investmentLimit: {
            maxInvestment: 999999999999,
            totalInvested: 0,
            remainingCapacity: 999999999999,
            limitDescription: 'No limit for accredited investors',
            legalReference: 'Reg D 506(c)'
        }
    }
}

export const ACCREDITATION_BADGES: Record<string, any> = {
    accredited: { label: 'Accredited', description: 'Verified Accredited Investor', color: 'green' },
    unknown: { label: 'Unknown', description: 'Requires Verification', color: 'gray' },
}

export const VERIFICATION_BADGES = {
    verified: { label: 'Verified', color: 'green' },
    pending: { label: 'Pending', color: 'yellow' },
    needs_more_info: { label: 'Action Required', color: 'red' },
}

export function formatInvestmentLimit(limit: any) {
    if (limit.maxInvestment >= 999999999999) return 'Unlimited'
    return `$${limit.maxInvestment.toLocaleString()}`
}

export function getInvestmentLimitExplanation(status: string, isUS: boolean | undefined) {
    if (status === 'accredited') return 'As an accredited investor, you have no statutory investment limits.'
    return 'Investment limits apply.'
}
