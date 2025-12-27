"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Check, Disc, Mail, Shield, ShieldCheck, Terminal, Zap, ChevronRight, Lock, Radio } from "lucide-react";
import { Footer } from "@/components/layout/footer";

export default function GetStartedPage() {
    const [activeTab, setActiveTab] = useState<'demo' | 'manual'>('demo');
    const [formState, setFormState] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        company: '',
        website: '',
        country: '',
        inquiry_type: 'Enterprise Architecture',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    // Typing effect for the header
    const [text, setText] = useState("");
    const fullText = "SYSTEM_INITIALIZATION_SEQUENCE";

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setText(fullText.slice(0, i));
            i++;
            if (i > fullText.length) clearInterval(interval);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const formSlug = "basalthq-contact-us-55230247";
            const apiEndpoint = "https://crm.basalthq.com/api/forms/submit";

            const payload = {
                form_slug: formSlug,
                data: formState,
                source_url: window.location.href,
                referrer: document.referrer
            };

            const response = await fetch(apiEndpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (result.success) {
                setIsSubmitted(true);
                if (result.redirect_url) {
                    window.location.href = result.redirect_url;
                }
            } else {
                setSubmitError(result.error || "Submission failed. Please try again or contact command@basalthq.com directly.");
            }
        } catch (error) {
            setSubmitError("Network error. Transmission blocked.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020609] text-white overflow-x-hidden selection:bg-teal-500/30 font-sans">

            {/* BACKGROUND MATRIX */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(4,13,18,0),rgba(2,6,9,1))]" />
            </div>

            {/* HEADER SECTION */}
            <header className="relative pt-24 pb-12 px-4 border-b border-cyan-900/30 bg-[#020609]/80 backdrop-blur-md z-20">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-teal-950/30 border border-teal-500/30 mb-8 animate-pulse">
                        <Terminal className="w-4 h-4 text-teal-500" />
                        <span className="text-xs font-mono text-teal-400 tracking-widest uppercase">Root // Access_Granted</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 font-mono text-white">
                        {text}<span className="animate-blink text-teal-500">_</span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-xl text-cyan-100/60 font-light leading-relaxed">
                        You are about to instantiate a new instance of the <span className="text-white font-bold">BasaltHQ Neural Operating System</span>.
                        Please select your integration vector.
                    </p>
                </div>
            </header>

            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                {/* PROTOCOL SELECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">

                    {/* OPTION 1: DEPLOY CORTEX (Demo) */}
                    <button
                        onClick={() => setActiveTab('demo')}
                        className={`group relative p-8 rounded-xl border text-left transition-all duration-300 overflow-hidden ${activeTab === 'demo'
                            ? 'bg-teal-950/20 border-teal-500 shadow-[0_0_50px_rgba(20,184,166,0.1)]'
                            : 'bg-[#050b10] border-cyan-900/30 hover:border-teal-500/50 hover:bg-teal-950/10'
                            }`}
                    >
                        <div className={`absolute top-0 right-0 p-4 opacity-50 transition-opacity ${activeTab === 'demo' ? 'opacity-100' : 'group-hover:opacity-100'}`}>
                            <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${activeTab === 'demo' ? 'border-teal-500 bg-teal-500/20' : 'border-gray-600'}`}>
                                {activeTab === 'demo' && <div className="w-2 h-2 rounded-full bg-teal-500" />}
                            </div>
                        </div>

                        <div className="mb-6 w-16 h-16 bg-teal-900/20 rounded-lg flex items-center justify-center border border-teal-500/20 group-hover:border-teal-500 group-hover:scale-110 transition-all">
                            <Zap className="w-8 h-8 text-teal-400" />
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">Deploy Cortex</h3>
                        <p className="text-cyan-100/50 mb-6 min-h-[48px]">
                            Initiate a guided integration with a BasaltHQ Solution Architect. For enterprise environments requiring custom ontology mapping.
                        </p>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm text-cyan-200/70">
                                <Check className="w-4 h-4 text-teal-500" /> <span>Full Architecture Review</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-cyan-200/70">
                                <Check className="w-4 h-4 text-teal-500" /> <span>Custom Ontology Design</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-cyan-200/70">
                                <Check className="w-4 h-4 text-teal-500" /> <span>White-Glove Migration</span>
                            </div>
                        </div>
                    </button>

                    {/* OPTION 2: READ THE PROTOCOLS (Docs/Book) */}
                    <button
                        onClick={() => window.open('https://www.amazon.com/dp/B0G71WFSHK', '_blank')}
                        className="group relative p-8 rounded-xl border text-left transition-all duration-300 overflow-hidden bg-[#050b10] border-cyan-900/30 hover:border-red-500/50 hover:bg-red-950/10"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                            <div className="w-6 h-6 rounded-full border border-gray-600 flex items-center justify-center group-hover:border-red-500">
                                <ArrowRight className="w-3 h-3 text-red-500 -rotate-45 group-hover:rotate-0 transition-transform" />
                            </div>
                        </div>

                        <div className="mb-6 w-16 h-16 bg-red-900/20 rounded-lg flex items-center justify-center border border-red-500/20 group-hover:border-red-500 group-hover:scale-110 transition-all">
                            <Disc className="w-8 h-8 text-red-400" />
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">Access Protocols</h3>
                        <p className="text-cyan-100/50 mb-6 min-h-[48px]">
                            Download the raw doctrinal data. Pure theory. No salesperson. Read the manual before you touch the machine.
                        </p>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm text-cyan-200/70">
                                <Radio className="w-4 h-4 text-red-500" /> <span>Amazon Hardcover / Kindle</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-cyan-200/70">
                                <Radio className="w-4 h-4 text-red-500" /> <span>Field Manual Access</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-cyan-200/70">
                                <Radio className="w-4 h-4 text-red-500" /> <span>Doctrinal Compliance</span>
                            </div>
                        </div>
                    </button>

                </div>


                {/* FORM SECTION (Only visible if 'demo' is active) */}
                {activeTab === 'demo' && (
                    <div className="max-w-3xl mx-auto bg-[#081218] border border-cyan-800/50 rounded-2xl p-8 md:p-12 relative overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500">
                        {/* Decorative Elements */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-500 opacity-50" />
                        <div className="absolute top-4 right-4 text-[10px] font-mono text-teal-500/50 border border-teal-500/20 px-2 py-1 rounded">
                            SECURE_TRANSMISSION // ENCRYPTED
                        </div>

                        {!isSubmitted ? (
                            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                {/* Row 1: Names */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-teal-500 uppercase tracking-wider">First Name *</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full bg-black/50 border border-cyan-900/50 rounded p-4 text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all outline-none font-mono"
                                            placeholder="Jane"
                                            value={formState.first_name}
                                            onChange={(e) => setFormState({ ...formState, first_name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-teal-500 uppercase tracking-wider">Last Name *</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full bg-black/50 border border-cyan-900/50 rounded p-4 text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all outline-none font-mono"
                                            placeholder="Doe"
                                            value={formState.last_name}
                                            onChange={(e) => setFormState({ ...formState, last_name: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Row 2: Contact */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-teal-500 uppercase tracking-wider">Comms Freq (Email) *</label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full bg-black/50 border border-cyan-900/50 rounded p-4 text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all outline-none font-mono"
                                            placeholder="name@company.com"
                                            value={formState.email}
                                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-teal-500 uppercase tracking-wider">Holonet (Phone)</label>
                                        <input
                                            type="tel"
                                            className="w-full bg-black/50 border border-cyan-900/50 rounded p-4 text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all outline-none font-mono"
                                            placeholder="+1 555-000-0000"
                                            value={formState.phone}
                                            onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Row 3: Company Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-teal-500 uppercase tracking-wider">Organization ID (Company)</label>
                                        <input
                                            type="text"
                                            className="w-full bg-black/50 border border-cyan-900/50 rounded p-4 text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all outline-none font-mono"
                                            placeholder="Acme Corp"
                                            value={formState.company}
                                            onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-teal-500 uppercase tracking-wider">Domain (Website)</label>
                                        <input
                                            type="text"
                                            className="w-full bg-black/50 border border-cyan-900/50 rounded p-4 text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all outline-none font-mono"
                                            placeholder="https://acme.org"
                                            value={formState.website}
                                            onChange={(e) => setFormState({ ...formState, website: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Row 4: Country & Inquiry */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-teal-500 uppercase tracking-wider">Region (Country)</label>
                                        <input
                                            type="text"
                                            className="w-full bg-black/50 border border-cyan-900/50 rounded p-4 text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all outline-none font-mono"
                                            placeholder="United States"
                                            value={formState.country}
                                            onChange={(e) => setFormState({ ...formState, country: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-teal-500 uppercase tracking-wider">Integration Vector *</label>
                                        <select
                                            required
                                            className="w-full bg-black/50 border border-cyan-900/50 rounded p-4 text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all outline-none font-mono appearance-none"
                                            value={formState.inquiry_type}
                                            onChange={(e) => setFormState({ ...formState, inquiry_type: e.target.value })}
                                        >
                                            <option value="Enterprise Architecture">Enterprise Architecture</option>
                                            <option value="Protocol Licensing">Protocol Licensing</option>
                                            <option value="Strategic Partnership">Strategic Partnership</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-teal-500 uppercase tracking-wider">Mission Parameters *</label>
                                    <textarea
                                        required
                                        rows={4}
                                        className="w-full bg-black/50 border border-cyan-900/50 rounded p-4 text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all outline-none font-mono resize-none"
                                        placeholder="Describe your current structural bottlenecks..."
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                    />
                                </div>

                                {submitError && (
                                    <div className="p-4 bg-red-950/30 border border-red-500/50 rounded text-red-200 text-sm font-mono flex items-center gap-2">
                                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                        ERROR: {submitError}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-teal-600 hover:bg-teal-500 text-black font-bold text-lg py-4 rounded transition-all flex items-center justify-center gap-2 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 mt-4"
                                >
                                    {isSubmitting ? (
                                        <span className="animate-pulse">TRANSMITTING...</span>
                                    ) : (
                                        <>
                                            <Lock className="w-5 h-5" /> INITIATE UPLOAD
                                        </>
                                    )}
                                </button>

                                <p className="text-center text-xs text-cyan-500/30 mt-4">
                                    By clicking above, you agree to allow BasaltHQ Cortex to scan your intake form for compatibility.
                                </p>
                            </form>
                        ) : (
                            <div className="text-center py-16 space-y-6 animate-in zoom-in duration-500">
                                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border border-green-500/50">
                                    <ShieldCheck className="w-10 h-10 text-green-500" />
                                </div>
                                <h3 className="text-3xl font-bold text-white">Transmission Received</h3>
                                <p className="text-cyan-200/60 max-w-md mx-auto">
                                    Your coordinates have been logged. A Solution Architect will attempt a handshake procedure shortly.
                                </p>
                                <div className="p-4 bg-black/50 border border-green-900/50 rounded text-xs font-mono text-green-500/70">
                                    STATUS: UPLOAD_COMPLETE<br />
                                    TICKET_ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                                </div>
                                <button
                                    onClick={() => window.location.href = '/'}
                                    className="text-white hover:text-teal-400 font-bold flex items-center justify-center gap-2 mx-auto pt-4 transition-colors"
                                >
                                    RETURN TO BASE <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>
                )}

            </main>

            <Footer />
        </div>
    );
}
