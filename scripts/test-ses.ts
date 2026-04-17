import fs from 'fs';

let envRaw = '';
try { envRaw += fs.readFileSync('.env.local', 'utf-8') + '\n'; } catch(e){}
try { envRaw += fs.readFileSync('.env', 'utf-8') + '\n'; } catch(e){}
envRaw.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if(match) {
        let val = match[2] || '';
        if (val.startsWith('"') && val.endsWith('"') || val.startsWith("'") && val.endsWith("'")) val = val.substring(1, val.length - 1);
        process.env[match[1]] = val;
    }
});

console.log('AWS_ACCESS_KEY_ID =', process.env.AWS_ACCESS_KEY_ID?.substring(0, 5) + '...');
console.log('SES_FROM_ADDRESS =', process.env.SES_FROM_ADDRESS);

// override for testing
process.env.SES_FROM_ADDRESS = 'sysadm';

import { sendPasswordResetEmail } from '../src/lib/aws/ses';

async function test() {
    console.log('Attempting to send email...');
    try {
        const result = await sendPasswordResetEmail('sysadm@basalthq.com', 'test-1234');
        console.log('Send result:', result);
    } catch (e: any) {
        console.error('Unhandled error in send:', e);
    }
}
test();
