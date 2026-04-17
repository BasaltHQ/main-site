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
    DataRoomFile, 
    Resolution,
    GovernanceMemo
} from '../src/lib/models';

async function checkMongoDb() {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string, {
        dbName: process.env.DB_NAME || 'nexus'
    });

    const corpDocs = await CorporateDocument.find({}).limit(5).lean();
    console.log('--- CorporateDocument Samples ---');
    corpDocs.forEach(d => console.log(`ID: ${d._id}, file_url: ${d.file_url}, file_key: ${d.file_key}`));

    const drFiles = await DataRoomFile.find({}).limit(5).lean();
    console.log('\n--- DataRoomFile Samples ---');
    drFiles.forEach(d => console.log(`ID: ${d._id}, url: ${d.url}`));

    const resolutions = await Resolution.find({}).limit(5).lean();
    console.log('\n--- Resolution Samples ---');
    resolutions.forEach(d => {
        console.log(`ID: ${d._id}`);
        console.log(`supporting docs:`, d.supporting_documents?.map((x:any)=>x.url));
    });

    const memos = await GovernanceMemo.find({}).limit(10).lean();
    console.log('\n--- GovernanceMemo Samples ---');
    memos.forEach(d => {
        console.log(`ID: ${d._id}`);
        console.log(`attachments:`, d.attachments?.map((x:any)=>x.file_url));
    });
}

checkMongoDb().catch(console.error);
