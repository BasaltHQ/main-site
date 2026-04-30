const fs = require('fs');

function dedupe(file) {
    try {
        let content = fs.readFileSync(file, 'utf8');
        let locations = JSON.parse(content);
        
        let unique = [];
        let seen = new Set();
        
        for (let loc of locations) {
            let originalSlug = loc.slug;
            let counter = 1;
            while (seen.has(loc.slug)) {
                loc.slug = originalSlug + '-' + counter;
                counter++;
            }
            seen.add(loc.slug);
            unique.push(loc);
        }
        
        fs.writeFileSync(file, JSON.stringify(unique, null, 2), 'utf8');
        console.log('Deduped ' + file + '. Total: ' + unique.length);
    } catch (e) {
        console.error('Error with ' + file, e);
    }
}

dedupe('u:\\BasaltHQ\\main-site\\src\\lib\\data\\locations.json');
dedupe('i:\\VRMint\\tuc-homepage\\src\\lib\\data\\locations.json');
