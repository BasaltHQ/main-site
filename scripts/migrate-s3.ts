import { S3Client, ListObjectsV2Command, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
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

async function streamToBuffer(stream: any): Promise<Buffer> {
  const chunks: any[] = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk: any) => chunks.push(Buffer.from(chunk)));
    stream.on('error', (err: any) => reject(err));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
  });
}

async function migrateS3() {
  const oldS3 = new S3Client({
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY || '',
      secretAccessKey: process.env.S3_SECRET_KEY || ''
    },
    forcePathStyle: true
  });

  const newS3 = new S3Client({
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.S3_NEW_ACCESS_KEY || '',
      secretAccessKey: process.env.S3_NEW_SERIAL_KEY || ''
    },
    forcePathStyle: true
  });

  const oldBucket = process.env.S3_BUCKET_NAME || '';
  let newBucket = process.env.S3_NEW_BUCKET_NAME || '';
  if (newBucket.toLowerCase() !== newBucket) {
      console.log(`Warning: Lowercasing new bucket name from ${newBucket} to ${newBucket.toLowerCase()}`);
      newBucket = newBucket.toLowerCase();
  }

  console.log(`Ensuring new bucket exists...`);
  try {
      const { CreateBucketCommand } = await import('@aws-sdk/client-s3');
      await newS3.send(new CreateBucketCommand({ Bucket: newBucket }));
      console.log(`Created bucket ${newBucket}`);
  } catch (e: any) {
      if (!e.message.includes('BucketAlreadyExists') && !e.message.includes('BucketAlreadyOwnedByYou')) {
          console.log(`CreateBucket note: ${e.message}`);
      }
  }

  console.log(`Starting migration from ${oldBucket} to ${newBucket} (Prefix: 'nexus/')...`);

  let continuationToken: string | undefined = undefined;
  let totalMigrated = 0;
  
  do {
    const listResponse: any = await oldS3.send(new ListObjectsV2Command({
      Bucket: oldBucket,
      Prefix: 'nexus/',
      ContinuationToken: continuationToken
    }));
    
    const items = listResponse.Contents || [];
    if (items.length > 0) {
        console.log(`Fetched batch of ${items.length} objects.`);
    }

    for (const item of items) {
      if (!item.Key) continue;
      
      try {
          const getObj = await oldS3.send(new GetObjectCommand({
              Bucket: oldBucket,
              Key: item.Key
          }));
          
          if (!getObj.Body) continue;

          console.log(`Reading: ${item.Key} (${item.Size} bytes)`);
          const buffer = await streamToBuffer(getObj.Body);
          
          console.log(`Writing: ${item.Key} target: ${newBucket}`);
          await newS3.send(new PutObjectCommand({
              Bucket: newBucket,
              Key: item.Key,
              Body: buffer,
              ContentType: getObj.ContentType || 'application/pdf',
              ACL: 'public-read'
          }));
          
          totalMigrated++;
      } catch(e: any) {
          console.error(`Failed to migrate ${item.Key}:`, e.message);
      }
    }
    
    continuationToken = listResponse.NextContinuationToken;
  } while (continuationToken);

  console.log(`\nMigration complete. Total files securely migrated: ${totalMigrated}`);
}

migrateS3().catch(console.error);
