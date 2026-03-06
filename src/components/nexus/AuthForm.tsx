'use client'

import { useState, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2, Shield } from 'lucide-react'

export default function AuthForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [requestedRole, setRequestedRole] = useState('investor')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<string | null>(null)
    const [isSignUp, setIsSignUp] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [pendingApproval, setPendingApproval] = useState(false)
    const router = useRouter()

    // Initialize Nexus state
    const [checkingInit, setCheckingInit] = useState(true)
    const [initialized, setInitialized] = useState(false)
    const [showInitForm, setShowInitForm] = useState(false)
    const [initEmail, setInitEmail] = useState('')
    const [initPassword, setInitPassword] = useState('')
    const [initName, setInitName] = useState('')
    const [initTitle, setInitTitle] = useState('')
    const [initLoading, setInitLoading] = useState(false)
    const [initMessage, setInitMessage] = useState<string | null>(null)

    useEffect(() => {
        fetch('/api/nexus/initialize')
            .then(r => r.json())
            .then(data => setInitialized(data.initialized))
            .catch((e) => {
                console.error('Init check failed:', e)
                setInitialized(false) // Show button if check fails
            })
            .finally(() => setCheckingInit(false))
    }, [])

    const handleInit = async (e: React.FormEvent) => {
        e.preventDefault()
        setInitLoading(true)
        setInitMessage(null)

        try {
            const res = await fetch('/api/nexus/initialize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: initEmail, password: initPassword, full_name: initName, position_title: initTitle })
            })
            const data = await res.json()

            if (!res.ok) throw new Error(data.message || 'Initialization failed')

            setInitMessage(data.message)
            setInitialized(true)
            setShowInitForm(false)

            // Pre-fill login fields for convenience
            setEmail(initEmail)
            setPassword(initPassword)
        } catch (error: any) {
            setInitMessage(error.message)
        } finally {
            setInitLoading(false)
        }
    }

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage(null)

        try {
            if (isSignUp) {
                const res = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password, full_name: fullName || undefined, requested_role: requestedRole })
                })

                const data = await res.json()

                if (!res.ok) {
                    throw new Error(data.message || 'Registration failed')
                }

                // If pending approval, show message, don't auto-login
                if (data.pending) {
                    setPendingApproval(true)
                    setMessage(data.message)
                    return
                }

                const loginRes = await signIn('credentials', { email, password, redirect: false })
                if (loginRes?.error) {
                    throw new Error(loginRes.error)
                }

                router.push('/nexus/dashboard')
                router.refresh()
            } else {
                const res = await signIn('credentials', { email, password, redirect: false })
                if (res?.error) {
                    // Show the actual error message from auth (approval gating, suspension, etc.)
                    throw new Error(res.error)
                }
                router.push('/nexus/dashboard')
                router.refresh()
            }
        } catch (error: any) {
            setMessage(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full max-w-md space-y-6">
            {/* Main Auth Card */}
            <div className="p-8 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-light text-white mb-2 tracking-wide font-vox">
                        {isSignUp ? 'ACCESS REQUEST' : 'BASALT NEXUS'}
                    </h2>
                    <p className="text-[#119dff]/60 text-sm uppercase tracking-widest">
                        BasaltHQ Governance Platform
                    </p>
                </div>

                <form onSubmit={handleAuth} className="space-y-6">
                    <div>
                        <label className="block text-xs font-medium text-[#119dff]/80 mb-2 uppercase tracking-wider">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#119dff]/50 focus:ring-1 focus:ring-[#119dff]/50 transition-all"
                            placeholder="investor@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-[#119dff]/80 mb-2 uppercase tracking-wider">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#119dff]/50 focus:ring-1 focus:ring-[#119dff]/50 transition-all"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-[#119dff] transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Full Name (Sign Up only) */}
                    {isSignUp && (
                        <div>
                            <label className="block text-xs font-medium text-[#119dff]/80 mb-2 uppercase tracking-wider">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#119dff]/50 focus:ring-1 focus:ring-[#119dff]/50 transition-all"
                                placeholder="Your full name"
                            />
                        </div>
                    )}

                    {/* Role Selector (Sign Up only) */}
                    {isSignUp && (
                        <div>
                            <label className="block text-xs font-medium text-[#119dff]/80 mb-2 uppercase tracking-wider">
                                Registering As
                            </label>
                            <select
                                value={requestedRole}
                                onChange={(e) => setRequestedRole(e.target.value)}
                                className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#119dff]/50 focus:ring-1 focus:ring-[#119dff]/50 transition-all text-sm"
                                style={{ colorScheme: 'dark' }}
                            >
                                <option value="investor" className="bg-[#111] text-white">Investor</option>
                                <option value="team" className="bg-[#111] text-white">Team Member</option>
                                <option value="director" className="bg-[#111] text-white">Director</option>
                                <option value="officer" className="bg-[#111] text-white">Officer</option>
                            </select>
                            {requestedRole !== 'investor' && (
                                <p className="text-[10px] text-amber-400/60 mt-1.5 flex items-center gap-1">
                                    <Shield size={10} /> Requires administrator approval
                                </p>
                            )}
                        </div>
                    )}

                    {message && (
                        <div className={`p-4 rounded-lg text-sm ${pendingApproval ? 'bg-amber-500/20 text-amber-300 border-amber-500/20' : message.includes('successfully') ? 'bg-green-500/20 text-green-400' : 'bg-red-900/20 text-red-400'} border border-white/5`}>
                            {pendingApproval && <Shield size={14} className="inline mr-2 text-amber-400" />}
                            {message}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-[#119dff] to-[#0d7acc] hover:from-[#3db3ff] hover:to-[#119dff] text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                    >
                        {loading && <Loader2 className="animate-spin" size={18} />}
                        <span className="tracking-widest uppercase text-sm">
                            {isSignUp ? 'Request Access' : 'Enter Nexus'}
                        </span>
                    </button>

                    <div className="text-center">
                        <button
                            type="button"
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="text-white/40 text-xs hover:text-[#119dff] transition-colors uppercase tracking-widest"
                        >
                            {isSignUp ? 'Already have an account? Login' : 'New Director/Officer/Investor? Request Access'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Initialize Nexus — only shown if no admin exists */}
            {!checkingInit && !initialized && (
                <div className="rounded-2xl bg-black/40 backdrop-blur-xl border border-amber-500/20 shadow-2xl overflow-hidden transition-all">
                    {!showInitForm ? (
                        <button
                            onClick={() => setShowInitForm(true)}
                            className="w-full p-4 flex items-center justify-center gap-3 text-amber-400 hover:bg-amber-500/5 transition-colors"
                        >
                            <Shield size={18} />
                            <span className="text-xs font-bold uppercase tracking-widest">Initialize Nexus</span>
                        </button>
                    ) : (
                        <form onSubmit={handleInit} className="p-6 space-y-4">
                            <div className="text-center mb-4">
                                <p className="text-amber-400 text-xs uppercase tracking-widest font-bold">Create Admin Account</p>
                                <p className="text-white/30 text-[10px] mt-1">This can only be done once.</p>
                            </div>

                            <div>
                                <label className="block text-[10px] font-medium text-amber-400/80 mb-1.5 uppercase tracking-wider">Full Name</label>
                                <input
                                    type="text"
                                    value={initName}
                                    onChange={(e) => setInitName(e.target.value)}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-amber-500/50 transition-all text-sm"
                                    placeholder="Admin Name"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-medium text-amber-400/80 mb-1.5 uppercase tracking-wider">Position / Title</label>
                                <input
                                    type="text"
                                    value={initTitle}
                                    onChange={(e) => setInitTitle(e.target.value)}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-amber-500/50 transition-all text-sm"
                                    placeholder="e.g. Director, Officer, CEO"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-medium text-amber-400/80 mb-1.5 uppercase tracking-wider">Admin Email</label>
                                <input
                                    type="email"
                                    value={initEmail}
                                    onChange={(e) => setInitEmail(e.target.value)}
                                    required
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-amber-500/50 transition-all text-sm"
                                    placeholder="admin@basalthq.com"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-medium text-amber-400/80 mb-1.5 uppercase tracking-wider">Admin Password</label>
                                <input
                                    type="password"
                                    value={initPassword}
                                    onChange={(e) => setInitPassword(e.target.value)}
                                    required
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-amber-500/50 transition-all text-sm"
                                    placeholder="••••••••"
                                />
                            </div>

                            {initMessage && (
                                <div className={`p-3 rounded-lg text-xs ${initMessage.includes('successfully') ? 'bg-green-500/20 text-green-400' : 'bg-red-900/20 text-red-400'} border border-white/5`}>
                                    {initMessage}
                                </div>
                            )}

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowInitForm(false)}
                                    className="flex-1 py-2.5 text-white/40 hover:text-white text-xs uppercase tracking-wider border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={initLoading}
                                    className="flex-1 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs uppercase tracking-wider rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {initLoading && <Loader2 className="animate-spin" size={14} />}
                                    Initialize
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            )}
        </div>
    )
}

