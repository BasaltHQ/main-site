export type Proposal = {
    id: string;
    title: string;
    description: string;
    rationale?: string;
    status: 'draft' | 'voting' | 'approved' | 'rejected';
    voteEndAt?: Date;
    proposedChanges: {
        round_name?: string;
        amount?: number;
        valuation_pre?: number;
        valuation_post?: number;
    };
    dilutionImpact?: {
        stakeholders: any[];
    }
}

export async function getVotingResults(proposalId: string) {
    return {
        votesFor: 100,
        votesAgainst: 10,
        forPercentage: 90,
        againstPercentage: 10,
        threshold: 50,
        isApproved: true
    }
}

export async function hasUserVoted(proposalId: string) {
    return false
}

export async function getProposalById(proposalId: string): Promise<Proposal | null> {
    return {
        id: proposalId,
        title: 'Initial Seed Round Authorization',
        description: 'Authorize the board to complete the initial seed round financing.',
        status: 'approved',
        proposedChanges: {
            round_name: 'Seed',
            amount: 2500000,
            valuation_pre: 10000000,
            valuation_post: 12500000
        }
    }
}
