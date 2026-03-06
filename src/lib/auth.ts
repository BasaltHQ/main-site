import { NextAuthOptions } from "next-auth";
import importCredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "./mongodb";
import { Profile } from "./models";
import bcrypt from "bcryptjs";

// @ts-ignore
const CredentialsProvider = importCredentialsProvider.default || importCredentialsProvider;

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                await dbConnect();
                if (!credentials?.email || !credentials.password) return null;
                const user = await Profile.findOne({ email: credentials.email });
                if (!user) return null;
                const isValid = await bcrypt.compare(credentials.password, user.password);
                if (!isValid) return null;

                // Approval gating — existing profiles without status field are treated as approved
                const status = user.status || 'approved'
                if (status === 'pending_approval') {
                    throw new Error('Your access request is pending administrator approval.')
                }
                if (status === 'suspended') {
                    throw new Error('Your account has been suspended. Contact an administrator.')
                }

                return { id: user._id.toString(), email: user.email, name: user.full_name, role: user.role };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = (user as any).role;
                token.name = user.name;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                (session.user as any).id = token.id as string;
                (session.user as any).role = token.role;
                session.user.name = token.name as string;
            }
            return session;
        }
    },
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/nexus/login",
    }
}
