/**
 * Accredited Investor Determination Logic
 * Based on SEC Rule 501 of Regulation D
 */

export type InvestorType = 'individual' | 'entity' | 'trust'

export interface AccreditationCriteria {
    investorType: InvestorType
    // Individual criteria
    annualIncome?: number        // Past 2-year average individual income
    jointIncome?: number         // Past 2-year average joint income with spouse
    netWorth?: number            // Net worth excluding primary residence
    hasSeriesLicense?: boolean   // Series 7, 65, or 82 license
    licenseType?: string         // Which series license
    // Entity criteria
    entityAssets?: number        // Total entity assets
    allOwnersAccredited?: boolean // All equity owners are accredited
    is501c3?: boolean            // Is a 501(c)(3) organization
    // Trust criteria
    trustAssets?: number         // Total trust assets
    trustorAccredited?: boolean  // Trust formed by accredited investor (revocable)
}

export type AccreditationStatus = 'non_accredited' | 'accredited' | 'qualified_purchaser'

export interface AccreditationResult {
    status: AccreditationStatus
    reasoning: string[]
    verificationNeeded: string[]
}

/**
 * Determines accreditation status based on SEC Rule 501 criteria.
 * 
 * Accredited Investor qualifications:
 * - Individual income ≥ $200,000 (or $300,000 joint) for past 2 years
 * - Net worth ≥ $1,000,000 (excluding primary residence)
 * - Series 7, 65, or 82 license holder
 * - Entity with ≥ $5,000,000 in assets
 * - Entity where all equity owners are accredited investors
 * - Trust with ≥ $5,000,000 in assets
 * - Trust formed by an accredited investor (revocable trust)
 * 
 * Qualified Purchaser (higher tier):
 * - Individual with ≥ $5,000,000 in investments
 * - Entity with ≥ $25,000,000 in investments
 */
export function determineAccreditation(criteria: AccreditationCriteria): AccreditationResult {
    const reasoning: string[] = []
    const verificationNeeded: string[] = []
    let isAccredited = false
    let isQualifiedPurchaser = false

    if (criteria.investorType === 'individual') {
        // Income test
        if ((criteria.annualIncome ?? 0) >= 200_000) {
            isAccredited = true
            reasoning.push(`Individual annual income of $${(criteria.annualIncome ?? 0).toLocaleString()} meets the $200,000 threshold.`)
            verificationNeeded.push('Tax returns or W-2s for the past 2 years')
            verificationNeeded.push('Written confirmation from CPA, attorney, or broker-dealer')
        }

        if ((criteria.jointIncome ?? 0) >= 300_000) {
            isAccredited = true
            reasoning.push(`Joint annual income of $${(criteria.jointIncome ?? 0).toLocaleString()} meets the $300,000 threshold.`)
            verificationNeeded.push('Joint tax returns for the past 2 years')
        }

        // Net worth test
        if ((criteria.netWorth ?? 0) >= 1_000_000) {
            isAccredited = true
            reasoning.push(`Net worth of $${(criteria.netWorth ?? 0).toLocaleString()} (excluding primary residence) meets the $1,000,000 threshold.`)
            verificationNeeded.push('Bank and brokerage statements (within last 90 days)')
            verificationNeeded.push('Credit report for liability verification')
        }

        // Qualified Purchaser test
        if ((criteria.netWorth ?? 0) >= 5_000_000) {
            isQualifiedPurchaser = true
            reasoning.push(`Net worth of $${(criteria.netWorth ?? 0).toLocaleString()} qualifies as a Qualified Purchaser ($5M+ in investments).`)
        }

        // Professional license test
        if (criteria.hasSeriesLicense) {
            isAccredited = true
            reasoning.push(`Holder of ${criteria.licenseType || 'Series 7/65/82'} license qualifies as a "knowledgeable employee" under SEC rules.`)
            verificationNeeded.push('Copy of active securities license')
            verificationNeeded.push('FINRA BrokerCheck verification')
        }

        // Non-qualifying
        if (!isAccredited) {
            reasoning.push('Individual income below $200,000 threshold.')
            reasoning.push('Joint income below $300,000 threshold (if applicable).')
            reasoning.push('Net worth below $1,000,000 threshold (excluding primary residence).')
            reasoning.push('No qualifying professional securities licenses held.')
        }
    } else if (criteria.investorType === 'entity') {
        // Entity assets test
        if ((criteria.entityAssets ?? 0) >= 5_000_000) {
            isAccredited = true
            reasoning.push(`Entity total assets of $${(criteria.entityAssets ?? 0).toLocaleString()} meet the $5,000,000 threshold.`)
            verificationNeeded.push('Entity financial statements (audited preferred)')
            verificationNeeded.push('Formation documents (Certificate of Incorporation, Operating Agreement, etc.)')
        }

        // Qualified Purchaser for entities
        if ((criteria.entityAssets ?? 0) >= 25_000_000) {
            isQualifiedPurchaser = true
            reasoning.push(`Entity assets of $${(criteria.entityAssets ?? 0).toLocaleString()} qualify as a Qualified Purchaser ($25M+ in investments).`)
        }

        // All owners accredited
        if (criteria.allOwnersAccredited) {
            isAccredited = true
            reasoning.push('All equity owners of the entity are accredited investors.')
            verificationNeeded.push('Accreditation verification for each equity owner')
        }

        // 501(c)(3)
        if (criteria.is501c3 && (criteria.entityAssets ?? 0) >= 5_000_000) {
            reasoning.push('501(c)(3) organization with $5M+ in assets qualifies under SEC Rule 501(a)(3).')
            verificationNeeded.push('IRS determination letter confirming 501(c)(3) status')
        }

        if (!isAccredited) {
            reasoning.push('Entity assets below $5,000,000 threshold.')
            reasoning.push('Not all equity owners verified as accredited investors.')
        }
    } else if (criteria.investorType === 'trust') {
        // Trust assets test
        if ((criteria.trustAssets ?? 0) >= 5_000_000) {
            isAccredited = true
            reasoning.push(`Trust total assets of $${(criteria.trustAssets ?? 0).toLocaleString()} meet the $5,000,000 threshold.`)
            verificationNeeded.push('Trust agreement')
            verificationNeeded.push('Trust financial statements or asset verification')
        }

        // Trustor accredited (revocable trust)
        if (criteria.trustorAccredited) {
            isAccredited = true
            reasoning.push('Trust was formed by an accredited investor (revocable trust provision under SEC Rule 501(a)(7)).')
            verificationNeeded.push('Trust agreement showing revocable status')
            verificationNeeded.push('Accreditation verification for the trustor/grantor')
        }

        if (!isAccredited) {
            reasoning.push('Trust assets below $5,000,000 threshold.')
            reasoning.push('Trustor/grantor accreditation not verified.')
        }
    }

    // Deduplicate verification items
    const uniqueVerification = [...new Set(verificationNeeded)]

    return {
        status: isQualifiedPurchaser ? 'qualified_purchaser' : isAccredited ? 'accredited' : 'non_accredited',
        reasoning,
        verificationNeeded: uniqueVerification,
    }
}
