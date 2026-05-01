export interface Stakeholder {
    userId?: string;
    name: string;
    currentShares: number;
    currentOwnership: number;
    newOwnership?: number;
    dilutionPercent?: number;
    dilution?: number;
    actualChange?: number;
}

export function getDilutionSeverity(dilutionPercent: number): { color: string, description: string, level: string } {
    if (dilutionPercent < 5) return { color: 'green', description: 'Low Impact', level: 'low' };
    if (dilutionPercent < 15) return { color: 'yellow', description: 'Moderate Impact', level: 'moderate' };
    if (dilutionPercent < 30) return { color: 'orange', description: 'High Impact', level: 'high' };
    return { color: 'red', description: 'Severe Impact', level: 'severe' };
}

export function formatDilution(dilution: number, dilutionPercent: number): string {
    return `${dilution.toFixed(2)}% (${dilutionPercent.toFixed(2)}%)`;
}

export function calculateDilution(currentCapTable: Stakeholder[], newShares: number, valuationPre: number, valuationPost: number) {
    const totalCurrentShares = currentCapTable.reduce((sum, s) => sum + s.currentShares, 0);
    const newTotalShares = totalCurrentShares + newShares;
    
    return {
        valuationPre,
        valuationPost,
        newShares,
        totalShares: newTotalShares,
        stakeholders: currentCapTable.map(s => {
            const newOwnership = (s.currentShares / newTotalShares) * 100;
            const dilution = s.currentOwnership - newOwnership;
            const dilutionPercent = (dilution / s.currentOwnership) * 100;
            
            return {
                ...s,
                newOwnership,
                dilution,
                dilutionPercent,
                actualChange: dilution // Just mapping it
            };
        })
    };
}

export function calculateOwnershipWithNewInvestors(currentCapTable: Stakeholder[], investors: {name: string, shares: number}[]) {
    const totalCurrentShares = currentCapTable.reduce((sum, s) => sum + s.currentShares, 0);
    const newSharesTotal = investors.reduce((sum, inv) => sum + inv.shares, 0);
    const postTotalShares = totalCurrentShares + newSharesTotal;
    
    const updatedStakeholders = currentCapTable.map(s => ({
        ...s,
        newOwnership: (s.currentShares / postTotalShares) * 100
    }));
    
    const newInvestors = investors.map(inv => ({
        name: inv.name,
        currentShares: inv.shares,
        currentOwnership: 0,
        newOwnership: (inv.shares / postTotalShares) * 100
    }));
    
    return [...updatedStakeholders, ...newInvestors];
}

export function calculatePostMoneyValuation(investmentAmount: number, preMoney: number, totalShares: number) {
    // If preMoney is 0, let's assume it should have been preMoney
    // Actually the wizard calculates valuationPost = valuationPre + investmentAmount
    // but line 113 uses a placeholder or an old formula.
    return preMoney > 0 ? preMoney + investmentAmount : investmentAmount * 4; // fallback placeholder
}
