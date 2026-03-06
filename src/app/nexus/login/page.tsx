import AuthForm from '@/components/nexus/AuthForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Nexus Access | BasaltHQ',
    description: 'Secure access point for the BasaltHQ governance platform.',
}

export default function LoginPage() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,157,255,0.1),transparent_70%)]" />
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-20" />

            <div className="relative z-10 w-full flex flex-col items-center">
                <AuthForm />

                <div className="mt-8 text-center text-white/20 text-xs tracking-widest uppercase">
                    <p>© 2026 BasaltHQ</p>
                    <p className="mt-2">Restricted Access // Authorized Personnel Only</p>
                </div>
            </div>
        </div>
    )
}
