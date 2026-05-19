import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOCATIONS_PATH = path.join(__dirname, '../src/lib/data/locations.json');

// Tier-1 Global Tech Hubs
const TECH_HUBS = [
    { name: 'San Francisco', lat: 37.7749, lng: -122.4194, type: 'AI & Software' },
    { name: 'New York', lat: 40.7128, lng: -74.0060, type: 'Finance & Media' },
    { name: 'London', lat: 51.5074, lng: -0.1278, type: 'Fintech & DeepMind' },
    { name: 'Tokyo', lat: 35.6762, lng: 139.6503, type: 'Robotics & Hardware' },
    { name: 'Singapore', lat: 1.3521, lng: 103.8198, type: 'Logistics & Finance' },
    { name: 'Berlin', lat: 52.5200, lng: 13.4050, type: 'Enterprise Software' },
    { name: 'Tel Aviv', lat: 32.0853, lng: 34.7818, type: 'Cybersecurity' },
    { name: 'Bangalore', lat: 12.9716, lng: 77.5946, type: 'IT Services' },
];

// Haversine formula to calculate distance between two coordinates in km
function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return R * c;
}

// Compliance mapping based on country codes
const COMPLIANCE_REGIMES = {
    'EU': ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE'],
    'US': ['US'],
    'CA': ['CA'],
    'UK': ['GB'],
    'APAC_STRICT': ['JP', 'SG', 'AU', 'NZ', 'KR'],
};

function getRegionAndCompliance(countryCode) {
    if (COMPLIANCE_REGIMES.EU.includes(countryCode)) return { region: 'EMEA', regime: 'GDPR (EU)', focus: 'Data Sovereignty & Privacy-First AI' };
    if (COMPLIANCE_REGIMES.UK.includes(countryCode)) return { region: 'EMEA', regime: 'UK GDPR', focus: 'Financial Services & Open Banking AI' };
    if (COMPLIANCE_REGIMES.US.includes(countryCode)) return { region: 'NORAM', regime: 'CCPA / State-Level', focus: 'High-Scale Autonomous Workforce' };
    if (COMPLIANCE_REGIMES.CA.includes(countryCode)) return { region: 'NORAM', regime: 'PIPEDA', focus: 'Resource & Public Sector Automation' };
    if (COMPLIANCE_REGIMES.APAC_STRICT.includes(countryCode)) return { region: 'APAC', regime: 'Strict Localization', focus: 'Supply Chain & Manufacturing Autonomy' };
    
    // Default fallback mappings
    if (['BR', 'MX', 'AR', 'CO', 'CL'].includes(countryCode)) return { region: 'LATAM', regime: 'Emerging Frameworks', focus: 'Logistics & Nearshore IT Augmentation' };
    if (['AE', 'SA', 'IL', 'ZA'].includes(countryCode)) return { region: 'MEA', regime: 'Sector-Specific', focus: 'Energy, Smart Cities & Cybersecurity' };
    
    return { region: 'GLOBAL', regime: 'International Standard', focus: 'General Enterprise Automation' };
}

async function run() {
    console.log('Loading locations data...');
    const rawData = fs.readFileSync(LOCATIONS_PATH, 'utf-8');
    const locations = JSON.parse(rawData);
    console.log(`Processing ${locations.length} locations...`);

    const enriched = locations.map(loc => {
        // 1. Calculate proximity to nearest tech hub
        let nearestHub = TECH_HUBS[0];
        let minDistance = Infinity;

        for (const hub of TECH_HUBS) {
            const dist = getDistance(loc.lat, loc.lng, hub.lat, hub.lng);
            if (dist < minDistance) {
                minDistance = dist;
                nearestHub = hub;
            }
        }

        // 2. Determine Regional data
        const regionData = getRegionAndCompliance(loc.country);

        // 3. Calculate an Enterprise Market Complexity Score (0-10) based on distance to tech hub
        // Closer to hub = higher complexity/readiness
        let readinessScore = 100 - Math.min(Math.round(minDistance / 100), 50); // Min score is 50
        
        // 4. Determine primary localized industry based on proximity and region
        let primaryIndustry = regionData.focus;
        if (minDistance < 500) {
            // Within 500km of a major hub, inherit its ecosystem
            primaryIndustry = `${nearestHub.type} Ecosystem Integration`;
        }

        // 5. Generate Target ROI based on region labor costs (heuristic)
        let projectedRoi = '250%+';
        if (regionData.region === 'NORAM' || regionData.region === 'EMEA') {
            projectedRoi = '400%+'; // Higher labor cost = higher ROI for automation
        } else if (regionData.region === 'APAC') {
            projectedRoi = '300%+';
        }

        return {
            ...loc,
            region: regionData.region,
            complianceRegime: regionData.regime,
            primaryIndustry: primaryIndustry,
            aiReadinessScore: readinessScore,
            nearestTechHub: nearestHub.name,
            distanceToHubKm: Math.round(minDistance),
            projectedRoi: projectedRoi
        };
    });

    console.log('Enrichment complete. Writing back to locations.json...');
    fs.writeFileSync(LOCATIONS_PATH, JSON.stringify(enriched, null, 2));
    console.log('Success! Locations enriched.');
}

run().catch(console.error);
