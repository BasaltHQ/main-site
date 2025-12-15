export type TaxonomyItem = {
    slug: string;
    name: string;
    shortName?: string;
    description: string;
    icon?: string;
};

export const INDUSTRIES: TaxonomyItem[] = [
    {
        slug: 'restaurants',
        name: 'Restaurants & Hospitality',
        shortName: 'Restaurants',
        description: 'Optimize thin margins with predictive inventory and autonomous staff scheduling.'
    },
    {
        slug: 'retail',
        name: 'Retail & E-Commerce',
        shortName: 'Retail',
        description: 'Unify online and offline sales with a single real-time inventory ontology.'
    },
    {
        slug: 'service-fleets',
        name: 'Field Service Fleets',
        shortName: 'Fleets',
        description: 'Dispatch autonomous agents to coordinate your human workforce and assets.'
    },
    {
        slug: 'manufacturing',
        name: 'Boutique Manufacturing',
        shortName: 'Manufacturing',
        description: 'Connect raw materials to final delivery with end-to-end supply chain intelligence.'
    },
    {
        slug: 'cannabis',
        name: 'Cannabis Operations',
        shortName: 'Cannabis',
        description: 'Automate compliance and seed-to-sale tracking with a specialized regulatory ontology.'
    },
    {
        slug: 'self-storage',
        name: 'Self-Storage & Real Estate',
        shortName: 'Self-Storage',
        description: 'Automate leasing, access control, and payment collections with zero human intervention.'
    }
];

export const FEATURES: TaxonomyItem[] = [
    {
        slug: 'inventory',
        name: 'Predictive Inventory',
        description: 'Stop guessing. Let the Ontology predict what you need before you need it.'
    },
    {
        slug: 'crm',
        name: 'Autonomous CRM',
        description: 'Turn every customer interaction into a data point for your relational graph.'
    },
    {
        slug: 'voice-agents',
        name: 'Voice AI Agents',
        description: 'Replace call centers with intelligent voice agents that understand your business context.'
    },
    {
        slug: 'payments',
        name: 'Crypto & Fiat Payments',
        description: 'Accept value in any form, anywhere, with instant cross-chain settlement.'
    },
    {
        slug: 'staffing',
        name: 'AI Staff Scheduling',
        description: 'Optimize workforce allocation based on real-time demand signals.'
    }
];

export const ROLES: TaxonomyItem[] = [
    {
        slug: 'owner',
        name: 'Business Owner',
        description: 'Regain control of your time. Let the system run the operations.'
    },
    {
        slug: 'cfo',
        name: 'CFO / Controller',
        description: 'Absolute financial visibility with real-time audit trails and automated reconciliation.'
    },
    {
        slug: 'cto',
        name: 'Technical Lead',
        description: 'A composable, API-first architecture that scales without technical debt.'
    },
    {
        slug: 'ops',
        name: 'Operations Manager',
        description: 'Streamline workflows and eliminate bottlenecks with kinetic action triggers.'
    }
];

export function getIndustry(slug: string) {
    return INDUSTRIES.find(i => i.slug === slug);
}

export function getFeature(slug: string) {
    return FEATURES.find(f => f.slug === slug);
}

export function getRole(slug: string) {
    return ROLES.find(r => r.slug === slug);
}
