const fs = require('fs');

function fixFile(file) {
    try {
        let content = fs.readFileSync(file);
        // Clean BOM if present
        if (content[0] === 0xEF && content[1] === 0xBB && content[2] === 0xBF) {
            content = content.slice(3);
        }
        // Also clean UTF-16 LE BOM just in case
        if (content[0] === 0xFF && content[1] === 0xFE) {
            content = content.slice(2);
        }
        
        // Let's decode properly
        let str = content.toString('utf8');
        // Replace hidden invisible zero-width spaces or BOMs
        str = str.replace(/^\uFEFF/g, '');

        const json = JSON.parse(str);
        
        // Write it explicitly as utf8
        fs.writeFileSync(file, JSON.stringify(json, null, 2), 'utf8');
        console.log('Fixed ' + file);
    } catch (e) {
        console.error('Error in ' + file + ':', e);
    }
}

fixFile('u:\\BasaltHQ\\main-site\\src\\lib\\data\\locations.json');
fixFile('i:\\VRMint\\tuc-homepage\\src\\lib\\data\\locations.json');
