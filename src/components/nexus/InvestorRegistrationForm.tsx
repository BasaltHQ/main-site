'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, ChevronRight, ChevronLeft, Loader2, DollarSign, Building, User, Target } from 'lucide-react'

const INVESTOR_TYPES = [
    { value: 'individual', label: 'Individual', icon: User },
    { value: 'entity', label: 'Entity / Corporation', icon: Building },
    { value: 'trust', label: 'Trust', icon: Target }
]

export default function InvestorRegistrationForm() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [successMsg, setSuccessMsg] = useState<string | null>(null)

    // Form Details
    const [form, setForm] = useState({
        email: '',
        password: '',
        fullName: '',
        investorType: 'individual',
        annualIncome: '',
        netWorth: '',
    })

    const handleNext = () => setStep(2)
    const handlePrev = () => setStep(1)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const payload = {
                email: form.email,
                password: form.password,
                full_name: form.fullName,
                requested_role: 'investor',
                accreditation_info: {
                    investor_type: form.investorType,
                    annual_income: parseInt(form.annualIncome || '0'),
                    net_worth: parseInt(form.netWorth || '0'),
                }
            }

            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || 'Registration failed')
            }

            setSuccessMsg(data.message)
            setStep(3)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full max-w-lg">
            <div className="p-10 rounded-2xl bg-black/40 backdrop-blur-2xl border border-white/10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#119dff] to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-light text-white mb-2 tracking-wide font-rajdhani">
                        INVESTOR ONBOARDING
                    </h2>
                    <p className="text-[#119dff]/60 text-sm uppercase tracking-widest">
                        BasaltHQ Capital Formation
                    </p>
                </div>

                {step === 1 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div>
                            <label className="block text-[10px] font-bold text-[#119dff]/80 mb-2 uppercase tracking-widest">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={form.fullName}
                                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                                required
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-[#119dff]/50 focus:ring-1 focus:ring-[#119dff]/50 transition-all font-medium"
                                placeholder="E.g. Satoshi Nakamoto"
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-[#119dff]/80 mb-2 uppercase tracking-widest">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                required
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-[#119dff]/50 focus:ring-1 focus:ring-[#119dff]/50 transition-all font-medium"
                                placeholder="investor@domain.com"
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-[#119dff]/80 mb-2 uppercase tracking-widest">
                                Secure Password
                            </label>
                            <input
                                type="password"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                required
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-[#119dff]/50 focus:ring-1 focus:ring-[#119dff]/50 transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={!form.email || !form.password || !form.fullName}
                            className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-3.5 rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-4 text-xs uppercase tracking-widest"
                        >
                            Next Step <ChevronRight size={16} />
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div>
                            <label className="block text-[10px] font-bold text-[#119dff]/80 mb-3 uppercase tracking-widest">
                                Investor Entity Type
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                {INVESTOR_TYPES.map(({ value, label, icon: Icon }) => (
                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() => setForm({ ...form, investorType: value })}
                                        className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                                            form.investorType === value
                                                ? 'border-[#119dff] bg-[#119dff]/10 text-white'
                                                : 'border-white/10 bg-black/50 text-white/40 hover:text-white/80 hover:border-white/20'
                                        }`}
                                    >
                                        <Icon size={20} className="mb-2" />
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-center leading-tight">{label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-[#119dff]/80 mb-2 uppercase tracking-widest flex items-center gap-1">
                                <DollarSign size={12} /> Estimated Annual Income (USD)
                            </label>
                            <input
                                type="number"
                                value={form.annualIncome}
                                onChange={(e) => setForm({ ...form, annualIncome: e.target.value })}
                                required
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-[#119dff]/50 transition-all font-rajdhani text-lg"
                                placeholder="250,000"
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-[#119dff]/80 mb-2 uppercase tracking-widest flex items-center gap-1">
                                <DollarSign size={12} /> Estimated Net Worth (USD)
                            </label>
                            <p className="text-[10px] text-white/40 mb-2 -mt-1">Excluding primary residence.</p>
                            <input
                                type="number"
                                value={form.netWorth}
                                onChange={(e) => setForm({ ...form, netWorth: e.target.value })}
                                required
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-[#119dff]/50 transition-all font-rajdhani text-lg"
                                placeholder="1,500,000"
                            />
                        </div>

                        {error && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center">
                                {error}
                            </div>
                        )}

                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={handlePrev}
                                className="px-5 bg-black/50 hover:bg-white/5 border border-white/10 rounded-lg text-white/60 transition-colors flex items-center justify-center"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-gradient-to-r from-[#119dff] to-[#0d7acc] hover:from-[#3db3ff] hover:to-[#119dff] text-white font-bold py-3.5 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-2 text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(17,157,255,0.3)]"
                            >
                                {loading ? <Loader2 className="animate-spin" size={16} /> : 'Submit Application'}
                            </button>
                        </div>
                    </form>
                )}

                {step === 3 && (
                    <div className="text-center py-6 animate-in zoom-in-95 duration-500">
                        <div className="w-20 h-20 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="text-green-400" size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3 font-rajdhani">Application Submitted</h3>
                        <p className="text-white/60 text-sm mb-8 leading-relaxed">
                            {successMsg || "Your investor application and accreditation details have been submitted to BasaltHQ and are pending review."}
                        </p>
                        
                        <Link 
                            href="/nexus/login"
                            className="inline-flex items-center justify-center px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-xs font-bold uppercase tracking-widest transition-all"
                        >
                            Return to Login
                        </Link>
                    </div>
                )}
            </div>

            {step < 3 && (
                <div className="mt-8 text-center">
                    <p className="text-white/40 text-xs">
                        Already have an approved account?{' '}
                        <Link href="/nexus/login" className="text-[#119dff] hover:text-white transition-colors uppercase tracking-widest font-bold">
                            Login Here
                        </Link>
                    </p>
                </div>
            )}
        </div>
    )
}
