const https = require('https');
const fs = require('fs');

const POPULAR_CITIES = [
    'New York', 'London', 'Tokyo', 'Dubai', 'Singapore', 'Paris',
    'Los Angeles', 'San Francisco', 'Chicago', 'Miami', 'Toronto', 'Vancouver',
    'Berlin', 'Frankfurt', 'Munich', 'Amsterdam', 'Zurich', 'Geneva',
    'Sydney', 'Melbourne', 'Hong Kong', 'Seoul', 'Shanghai', 'Beijing',
    'Mumbai', 'Bangalore', 'New Delhi', 'Sao Paulo', 'Rio de Janeiro', 'Mexico City',
    'Madrid', 'Barcelona', 'Rome', 'Milan', 'Stockholm', 'Oslo', 'Copenhagen',
    'Vienna', 'Dublin', 'Brussels', 'Lisbon', 'Athens', 'Warsaw', 'Prague',
    'Bangkok', 'Jakarta', 'Kuala Lumpur', 'Manila', 'Ho Chi Minh City', 'Taipei',
    'Johannesburg', 'Cape Town', 'Cairo', 'Lagos', 'Nairobi', 'Riyadh', 'Tel Aviv',
    'Istanbul', 'Moscow', 'Buenos Aires', 'Santiago', 'Bogota', 'Lima'
];

https.get('https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json', (res) => {
    let data = Buffer.alloc(0);
    res.on('data', chunk => { data = Buffer.concat([data, chunk]); });
    res.on('end', () => {
        try {
            const str = data.toString('utf8');
            const cities = JSON.parse(str);
            
            const selected = [];
            const seenSlugs = new Set();
            
            // 1. Force add all popular cities first
            for (const popCity of POPULAR_CITIES) {
                // Find matching city in dataset
                const match = cities.find(c => c.name.toLowerCase() === popCity.toLowerCase());
                if (match && !isNaN(match.lat) && !isNaN(match.lng)) {
                    let slug = match.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + match.country.toLowerCase();
                    if (!seenSlugs.has(slug)) {
                        selected.push({
                            name: match.name,
                            country: match.country,
                            lat: parseFloat(match.lat),
                            lng: parseFloat(match.lng),
                            slug: slug
                        });
                        seenSlugs.add(slug);
                    }
                }
            }
            
            // 2. Group the rest by country to get global spread
            const byCountry = {};
            for (let c of cities) {
                if (!byCountry[c.country]) byCountry[c.country] = [];
                byCountry[c.country].push(c);
            }
            
            let remainingNeeded = 600 - selected.length;
            let addedFromGlobal = [];
            
            // Pick up to 3 from each country for the rest
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
            
            // Shuffle the global additions so they aren't alphabetized
            addedFromGlobal.sort(() => 0.5 - Math.random());
            
            // Add exactly enough to reach 600
            for (let i = 0; i < remainingNeeded && i < addedFromGlobal.length; i++) {
                selected.push(addedFromGlobal[i]);
            }
            
            // Optional: shuffle the whole thing so the top 50 aren't exclusively at the top of the grid
            selected.sort(() => 0.5 - Math.random());
            
            // Ensure slugs are perfectly unique just in case
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
            console.log('Successfully generated ' + selected.length + ' cities with popular hubs included.');
        } catch (e) {
            console.error(e);
        }
    });
});
