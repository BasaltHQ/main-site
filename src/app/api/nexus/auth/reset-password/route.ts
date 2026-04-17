import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Profile } from '@/lib/models';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    try {
        const { token, password } = await req.json();

        if (!token || !password) {
            return NextResponse.json({ error: 'Token and new password are required' }, { status: 400 });
        }

        await dbConnect();

        const user = await Profile.findOne({
            reset_token: token,
            reset_token_expiry: { $gt: new Date() }
        });

        if (!user) {
            return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await Profile.updateOne(
            { _id: user._id },
            {
                $set: { password: hashedPassword },
                $unset: { reset_token: "", reset_token_expiry: "" }
            }
        );

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Reset password error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
