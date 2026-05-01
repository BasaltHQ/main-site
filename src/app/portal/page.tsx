'use client';

import dynamic from 'next/dynamic';
import { PortalSection } from '@/components/sections/portal-section';
import { ArrowRight, Shield, Clock, DollarSign, Zap, CheckCircle2 } from 'lucide-react';

const PortalBackground = dynamic(() => import('@/components/portal/PortalBackground'), { ssr: false });

export default function PortalPage() {
    return (
        <div className="min-h-screen flex flex-col bg-[#030303] text-white relative overflow-hidden">
            {/* ── Floating Shape Background ── */}
            <PortalBackground />

            <div className="flex-grow relative z-10">
                <PortalSection />

                {/* ── Stats Strip ── */}
                <section className="border-y border-white/[0.05] bg-white/[0.01]">
                    <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { value: '7+', label: 'Tools in one platform', icon: <Zap size={20} className="text-[hsl(171,65%,58%)]" /> },
                            { value: '$0', label: 'To get started', icon: <DollarSign size={20} className="text-emerald-400" /> },
                            { value: '1', label: 'Login for everything', icon: <Shield size={20} className="text-blue-400" /> },
                            { value: '24/7', label: 'AI-powered support', icon: <Clock size={20} className="text-purple-400" /> },
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                                    {stat.icon}
                                </div>
                                <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">{stat.value}</p>
                                <p className="text-xs text-white/30 uppercase tracking-widest font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── How It Works ── */}
                <section className="max-w-5xl mx-auto px-6 py-24">
                    <div className="text-center mb-16">
                        <p className="text-xs uppercase tracking-[0.2em] text-[hsl(171,65%,58%)] font-bold mb-3">How it works</p>
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Up and running in 60 seconds</h2>
                        <p className="mt-3 text-white/30 text-base max-w-xl mx-auto">No credit card. No demo call. No 47-step onboarding.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                step: '01',
                                title: 'Sign in with anything',
                                desc: 'Google, Apple, email, phone — pick whatever is fastest. One account unlocks every tool.',
                                color: 'hsl(171, 65%, 58%)',
                            },
                            {
                                step: '02',
                                title: 'Pick the tools you need',
                                desc: 'Start with CRM, add legal ops later. Use one app or all seven — it\'s your call.',
                                color: 'hsl(24, 100%, 50%)',
                            },
                            {
                                step: '03',
                                title: 'Cancel the rest',
                                desc: 'Stop paying for Salesforce, LegalZoom, and five other subscriptions. You\'re covered.',
                                color: 'hsl(280, 70%, 55%)',
                            },
                        ].map((item, i) => (
                            <div key={i} className="relative group">
                                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 h-full hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300">
                                    <span className="text-5xl font-black opacity-[0.06] absolute top-4 right-6">{item.step}</span>
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold mb-5 border"
                                        style={{ color: item.color, borderColor: item.color, backgroundColor: `color-mix(in srgb, ${item.color}, transparent 90%)` }}>
                                        {item.step}
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                                    <p className="text-sm text-white/35 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Why Switch ── */}
                <section className="border-y border-white/[0.05] bg-white/[0.01]">
                    <div className="max-w-5xl mx-auto px-6 py-24">
                        <div className="text-center mb-16">
                            <p className="text-xs uppercase tracking-[0.2em] text-[hsl(171,65%,58%)] font-bold mb-3">Why switch</p>
                            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Built different, on purpose</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { title: 'AI-native, not AI-bolted-on', desc: 'Every tool was built from day one with AI at the core — not sprinkled on as a marketing afterthought.' },
                                { title: 'One bill, not ten', desc: 'Stop juggling Salesforce + HubSpot + LegalZoom + Stripe + Dialpad. We consolidated the stack.' },
                                { title: 'Free to start, fair to scale', desc: 'No $150/seat/month traps. Start free, upgrade only when you outgrow the free tier.' },
                                { title: 'Data flows between tools', desc: 'Your CRM leads feed into your forms, your contracts sync with governance, payments tie into ERP — automatically.' },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 p-6 rounded-2xl border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all">
                                    <CheckCircle2 size={20} className="text-[hsl(171,65%,58%)] shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                                        <p className="text-xs text-white/30 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Final CTA ── */}
                <section className="max-w-4xl mx-auto px-6 py-28 text-center">
                    <div className="relative">
                        {/* Glow behind CTA */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-[400px] h-[200px] rounded-full blur-[100px] bg-[hsl(171,65%,58%)] opacity-[0.06]" />
                        </div>

                        <div className="relative z-10">
                            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                                Ready to simplify<br />your business?
                            </h2>
                            <p className="mt-4 text-white/30 text-base max-w-lg mx-auto">
                                Join hundreds of businesses that replaced their bloated software stack with BasaltHQ. Free forever to start.
                            </p>
                            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                                <a
                                    href="#portal"
                                    className="group px-8 py-4 rounded-2xl text-base font-bold transition-all flex items-center gap-3 bg-gradient-to-r from-[hsl(171,65%,58%)] to-[hsl(171,65%,45%)] text-black hover:shadow-[0_0_40px_rgba(76,206,181,0.3)] hover:scale-[1.02]"
                                >
                                    Get Started Free
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                                <a
                                    href="https://basalthq.com/contact"
                                    className="px-8 py-4 rounded-2xl text-base font-medium border border-white/[0.1] text-white/50 hover:text-white/80 hover:border-white/[0.2] hover:bg-white/[0.03] transition-all"
                                >
                                    Talk to a human
                                </a>
                            </div>
                            <p className="mt-6 text-[11px] text-white/15">No credit card required · Delaware C-Corp · SOC 2 aligned</p>
                        </div>
                    </div>
                </section>
            </div>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/[0.04] py-10 bg-[#030303]">
                <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-white/20 text-xs">
                        &copy; {new Date().getFullYear()} BasaltHQ, Inc. &middot; Delaware C-Corp &middot; All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-white/20 text-xs">
                        <a href="/privacy" className="hover:text-white/40 transition-colors">Privacy</a>
                        <a href="/terms" className="hover:text-white/40 transition-colors">Terms</a>
                        <a href="/" className="hover:text-white/40 transition-colors">Home</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
