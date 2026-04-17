import mongoose from 'mongoose';
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

import { 
    CorporateDocument, 
    VerificationDocument, 
    DataRoomFile, 
    GovernanceMemo, 
    Resolution 
} from '../src/lib/models'; // Note: running via standard TS so paths might need to resolve securely

async function migrateMongoUrls() {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string, {
        dbName: process.env.DB_NAME || 'nexus'
    });
    console.log('Connected to MongoDB');

    let totalModified = 0;

    const oldPrefix = 'https://s3.us-west-or.io.cloud.ovh.us/basaltsurge/nexus/';
    const newPrefix = 'https://s3.us-west-or.io.cloud.ovh.us/basalthqs3/nexus/'; // Using the lowercased bucket name in URL structure!

    // Helper to replace generic URL strings in a doc
    async function searchAndReplace(ModelClass: mongoose.Model<any>, fields: string[]) {
        let count = 0;
        const query = fields.map(f => ({ [f]: { $regex: 'basaltsurge/nexus' } }));
        const docs = await ModelClass.find({ $or: query });
        
        for (const doc of docs) {
            let modified = false;
            for (const field of fields) {
                if (doc[field] && typeof doc[field] === 'string' && doc[field].includes('basaltsurge/nexus')) {
                    doc[field] = doc[field].replace(oldPrefix, newPrefix);
                    modified = true;
                }
            }
            if (modified) {
                await doc.save();
                count++;
                totalModified++;
            }
        }
        console.log(`Updated ${count} documents in ${ModelClass.modelName}`);
    }

    // CorporateDocument
    await searchAndReplace(CorporateDocument, ['file_url']);
    
    // VerificationDocument
    await searchAndReplace(VerificationDocument, ['file_url']);
    
    // DataRoomFile
    await searchAndReplace(DataRoomFile, ['url']);
    
    // GovernanceMemo uses mixed schemas, sometimes attachments[] has `file_url`
    try {
        const memos = await GovernanceMemo.find({});
        let memoCount = 0;
        for (const doc of memos) {
            let modified = false;
            if (doc.attachments && Array.isArray(doc.attachments)) {
                for (let i=0; i<doc.attachments.length; i++) {
                    if (doc.attachments[i].file_url && doc.attachments[i].file_url.includes('basaltsurge/nexus')) {
                        doc.attachments[i].file_url = doc.attachments[i].file_url.replace(oldPrefix, newPrefix);
                        modified = true;
                    }
                }
            }
            if (modified) {
                doc.markModified('attachments');
                await doc.save();
                memoCount++;
                totalModified++;
            }
        }
        console.log(`Updated ${memoCount} documents in GovernanceMemo`);
    } catch(e: any) { console.error('Error with GovernanceMemo:', e.message); }

    // Resolution uses supporting_documents[] and attachments[]
    try {
        const resolutions = await Resolution.find({});
        let resCount = 0;
        for (const doc of resolutions) {
            let modified = false;
            if (doc.supporting_documents && Array.isArray(doc.supporting_documents)) {
                for (let i=0; i<doc.supporting_documents.length; i++) {
                    if (doc.supporting_documents[i].url && doc.supporting_documents[i].url.includes('basaltsurge/nexus')) {
                        doc.supporting_documents[i].url = doc.supporting_documents[i].url.replace(oldPrefix, newPrefix);
                        modified = true;
                    }
                }
            }
            if (modified) {
                doc.markModified('supporting_documents');
                await doc.save();
                resCount++;
                totalModified++;
            }
        }
        console.log(`Updated ${resCount} documents in Resolution`);
    } catch(e: any) { console.error('Error with Resolution:', e.message); }

    console.log(`Database sync complete. Total documents modified: ${totalModified}`);
    mongoose.disconnect();
}

migrateMongoUrls().catch(console.error);
