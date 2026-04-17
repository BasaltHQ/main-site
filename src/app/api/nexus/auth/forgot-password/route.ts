import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Profile } from '@/lib/models';
import crypto from 'crypto';
import { sendPasswordResetEmail } from '@/lib/aws/ses';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        await dbConnect();

        const user = await Profile.findOne({ email });

        if (!user) {
            // Return success even if user not found to prevent email enumeration
            return NextResponse.json({ success: true });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours

        await Profile.updateOne({ email }, { $set: { reset_token: resetToken, reset_token_expiry: resetTokenExpiry } });

        const emailSent = await sendPasswordResetEmail(email, resetToken);

        if (!emailSent) {
            return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Forgot password error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
