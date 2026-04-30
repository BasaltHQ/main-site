const https = require('https');
const fs = require('fs');

https.get('https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json', (res) => {
    let data = Buffer.alloc(0);
    res.on('data', chunk => { data = Buffer.concat([data, chunk]); });
    res.on('end', () => {
        try {
            const str = data.toString('utf8');
            const cities = JSON.parse(str);
            
            // Group by country
            const byCountry = {};
            for (let c of cities) {
                if (!byCountry[c.country]) byCountry[c.country] = [];
                byCountry[c.country].push(c);
            }
            
            const selected = [];
            
            // We want roughly 600 total. There are ~240 country codes in the dataset.
            // If we take up to 3 from each country, we'll get around 600-700.
            for (const country in byCountry) {
                // Shuffle the country's cities
                const countryCities = byCountry[country].sort(() => 0.5 - Math.random());
                const toPick = Math.min(3, countryCities.length);
                for (let i = 0; i < toPick; i++) {
                    const c = countryCities[i];
                    selected.push({
                        name: c.name,
                        country: c.country,
                        lat: parseFloat(c.lat),
                        lng: parseFloat(c.lng),
                        slug: c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + c.country.toLowerCase()
                    });
                }
            }
            
            // Shuffle the final list so the grid is mixed up visually
            selected.sort(() => 0.5 - Math.random());
            
            // Dedupe slugs
            let unique = [];
            let seen = new Set();
            for (let loc of selected) {
                // Keep only valid coordinates
                if (isNaN(loc.lat) || isNaN(loc.lng)) continue;

                let originalSlug = loc.slug;
                let counter = 1;
                while (seen.has(loc.slug)) {
                    loc.slug = originalSlug + '-' + counter;
                    counter++;
                }
                seen.add(loc.slug);
                unique.push(loc);
                
                // Limit to 600 max
                if (unique.length >= 600) break;
            }
            
            fs.writeFileSync('u:\\BasaltHQ\\main-site\\src\\lib\\data\\locations.json', JSON.stringify(unique, null, 2), 'utf8');
            console.log('Successfully generated global dataset of ' + unique.length + ' cities.');
        } catch (e) {
            console.error(e);
        }
    });
});
