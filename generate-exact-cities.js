const fs = require('fs');
const https = require('https');

const TOP_CITIES = [
    { name: "New York", country: "US", lat: 40.7128, lng: -74.0060, slug: "new-york-us" },
    { name: "Los Angeles", country: "US", lat: 34.0522, lng: -118.2437, slug: "los-angeles-us" },
    { name: "San Francisco", country: "US", lat: 37.7749, lng: -122.4194, slug: "san-francisco-us" },
    { name: "Chicago", country: "US", lat: 41.8781, lng: -87.6298, slug: "chicago-us" },
    { name: "Miami", country: "US", lat: 25.7617, lng: -80.1918, slug: "miami-us" },
    { name: "Austin", country: "US", lat: 30.2672, lng: -97.7431, slug: "austin-us" },
    { name: "Seattle", country: "US", lat: 47.6062, lng: -122.3321, slug: "seattle-us" },
    { name: "Boston", country: "US", lat: 42.3601, lng: -71.0589, slug: "boston-us" },
    { name: "Washington DC", country: "US", lat: 38.9072, lng: -77.0369, slug: "washington-dc-us" },
    { name: "London", country: "GB", lat: 51.5074, lng: -0.1278, slug: "london-gb" },
    { name: "Tokyo", country: "JP", lat: 35.6762, lng: 139.6503, slug: "tokyo-jp" },
    { name: "Dubai", country: "AE", lat: 25.2048, lng: 55.2708, slug: "dubai-ae" },
    { name: "Singapore", country: "SG", lat: 1.3521, lng: 103.8198, slug: "singapore-sg" },
    { name: "Paris", country: "FR", lat: 48.8566, lng: 2.3522, slug: "paris-fr" },
    { name: "Berlin", country: "DE", lat: 52.5200, lng: 13.4050, slug: "berlin-de" },
    { name: "Toronto", country: "CA", lat: 43.6510, lng: -79.3470, slug: "toronto-ca" },
    { name: "Sydney", country: "AU", lat: -33.8688, lng: 151.2093, slug: "sydney-au" },
    { name: "Hong Kong", country: "HK", lat: 22.3193, lng: 114.1694, slug: "hong-kong-hk" },
    { name: "Seoul", country: "KR", lat: 37.5665, lng: 126.9780, slug: "seoul-kr" },
    { name: "Mumbai", country: "IN", lat: 19.0760, lng: 72.8777, slug: "mumbai-in" },
    { name: "Sao Paulo", country: "BR", lat: -23.5505, lng: -46.6333, slug: "sao-paulo-br" }
];

https.get('https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json', (res) => {
    let data = Buffer.alloc(0);
    res.on('data', chunk => { data = Buffer.concat([data, chunk]); });
    res.on('end', () => {
        try {
            const cities = JSON.parse(data.toString('utf8'));
            let selected = [...TOP_CITIES];
            let seenSlugs = new Set(TOP_CITIES.map(c => c.slug));

            // Group the rest by country to get global spread
            const byCountry = {};
            for (let c of cities) {
                if (!byCountry[c.country]) byCountry[c.country] = [];
                byCountry[c.country].push(c);
            }
            
            let addedFromGlobal = [];
            for (const country in byCountry) {
                const countryCities = byCountry[country].sort(() => 0.5 - Math.random());
                const toPick = Math.min(3, countryCities.length);
                for (let i = 0; i < toPick; i++) {
                    const c = countryCities[i];
                    if (isNaN(c.lat) || isNaN(c.lng)) continue;
                    
                    let slug = c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + c.country.toLowerCase();
                    if (!seenSlugs.has(slug)) {
                        addedFromGlobal.push({
                            name: c.name,
                            country: c.country,
                            lat: parseFloat(c.lat),
                            lng: parseFloat(c.lng),
                            slug: slug
                        });
                        seenSlugs.add(slug);
                    }
                }
            }
            
            // Shuffle the global additions
            addedFromGlobal.sort(() => 0.5 - Math.random());
            
            // Add exactly enough to reach 600
            let remainingNeeded = 600 - selected.length;
            for (let i = 0; i < remainingNeeded && i < addedFromGlobal.length; i++) {
                selected.push(addedFromGlobal[i]);
            }
            
            // Dedupe exactly once more to be strictly safe
            let uniqueSlugs = new Set();
            for (let loc of selected) {
                let originalSlug = loc.slug;
                let counter = 1;
                while (uniqueSlugs.has(loc.slug)) {
                    loc.slug = originalSlug + '-' + counter;
                    counter++;
                }
                uniqueSlugs.add(loc.slug);
            }
            
            fs.writeFileSync('u:\\BasaltHQ\\main-site\\src\\lib\\data\\locations.json', JSON.stringify(selected, null, 2), 'utf8');
            console.log('Successfully generated ' + selected.length + ' cities with hardcore popular hubs included.');
        } catch (e) {
            console.error(e);
        }
    });
});
