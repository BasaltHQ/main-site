export interface Stakeholder {
    name: string;
    currentOwnership: number;
    newOwnership?: number;
    dilutionPercent?: number;
    dilution?: number;
    actualChange?: number;
}

export function getDilutionSeverity(dilutionPercent: number): { color: string, description: string } {
    if (dilutionPercent < 5) return { color: 'green', description: 'Low Impact' };
    if (dilutionPercent < 15) return { color: 'yellow', description: 'Moderate Impact' };
    if (dilutionPercent < 30) return { color: 'orange', description: 'High Impact' };
    return { color: 'red', description: 'Severe Impact' };
}

export function formatDilution(dilution: number, dilutionPercent: number): string {
    return `${dilution.toFixed(2)}% (${dilutionPercent.toFixed(2)}%)`;
}
