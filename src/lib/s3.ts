import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const s3 = new S3Client({
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION || 'us-west-or',
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY || '',
        secretAccessKey: process.env.S3_SECRET_KEY || '',
    },
    forcePathStyle: true, // Required for OVHcloud / non-AWS S3-compatible endpoints
})

const BUCKET = process.env.S3_BUCKET_NAME || 'basaltsurge'

export async function uploadToS3(buffer: Buffer, key: string, contentType: string): Promise<string> {
    await s3.send(new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: buffer,
        ContentType: contentType,
        ACL: 'public-read',
    }))

    // Construct public URL
    const endpoint = process.env.S3_ENDPOINT || ''
    return `${endpoint}/${BUCKET}/${key}`
}

export { s3, BUCKET }
