"use client";

import { Box, Activity, Brain, Server, Share2, Workflow, Database, Zap, Cpu } from "lucide-react";

export function OntologyExplainer() {
    return (
        <section className="py-24 bg-[#020609] relative overflow-hidden border-t border-cyan-900/20">

            {/* Background Ambience */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-[100px]" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-24 relative z-10">
                    <div className="inline-flex items-center gap-2 mb-4 text-red-500 font-mono text-xs tracking-[0.2em] uppercase">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                        System_Status: Online
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
                        Construct Your <span className="text-teal-500">Digital Twin</span>
                    </h2>
                    <p className="text-lg text-cyan-200/60 max-w-2xl mx-auto">
                        The Ledger1 Ontology is not just software. It is a living model of your business reality, composed of three fundamental atoms.
                    </p>
                </div>

                {/* The Three Atoms */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">

                    {/* 1. Objects */}
                    <div className="group relative p-8 rounded-2xl bg-cyan-950/20 border border-cyan-900/50 backdrop-blur-sm hover:bg-cyan-900/20 transition-all duration-500 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* Radar Sweep Effect for Objects */}
                        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(20,184,166,0.1)_90deg,transparent_180deg)] animate-radar-spin opacity-30 pointer-events-none" />

                        <div className="w-14 h-14 rounded-xl bg-cyan-900/30 border border-teal-500/30 flex items-center justify-center mb-6 text-teal-400 group-hover:scale-110 group-hover:text-teal-300 transition-all duration-300 shadow-[0_0_15px_rgba(20,184,166,0.2)]">
                            <Database className="w-7 h-7" />
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2 font-mono">
                            <span className="text-teal-500">01.</span> LIVE_OBJECTS
                        </h3>
                        <p className="text-cyan-200/50 text-sm leading-relaxed mb-6">
                            Every asset, customer, and inventory item is a persistent digital object. Not a database row, but a living entity with state and history.
                        </p>

                        {/* Micro-Viz: Pulse Ring */}
                        <div className="h-24 rounded-lg bg-black/40 border border-cyan-900/30 p-3 relative overflow-hidden flex items-center justify-center">
                            <div className="relative">
                                <div className="absolute -inset-4 border border-teal-500/30 rounded-full animate-pulse-ring" />
                                <div className="w-3 h-3 rounded-full bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.8)]" />
                            </div>
                            <div className="absolute top-3 right-3 text-[10px] text-teal-500 font-mono">ID: A7-X9</div>
                            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-teal-500/10 to-transparent" />
                        </div>
                    </div>

                    {/* 2. Actions */}
                    <div className="group relative p-8 rounded-2xl bg-cyan-950/20 border border-cyan-900/50 backdrop-blur-sm hover:bg-cyan-900/20 transition-all duration-500">
                        {/* Red accent for Actions */}
                        <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="w-14 h-14 rounded-xl bg-red-950/30 border border-red-500/30 flex items-center justify-center mb-6 text-red-500 group-hover:scale-110 group-hover:text-red-400 transition-all duration-300 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                            <Zap className="w-7 h-7" />
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2 font-mono">
                            <span className="text-red-500">02.</span> KINETIC_ACTIONS
                        </h3>
                        <p className="text-cyan-200/50 text-sm leading-relaxed mb-6">
                            Workflows that fire automatically. When an Object changes state, an Action is triggered instantly. No human latency.
                        </p>

                        {/* Micro-Viz: Loading Bar */}
                        <div className="h-24 rounded-lg bg-black/40 border border-red-900/30 p-3 relative overflow-hidden flex items-center justify-center">
                            <div className="w-full h-[5px] bg-red-950/30 rounded-full overflow-hidden">
                                <div className="h-full bg-red-500 rounded-full animate-loading-bar shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                            </div>
                        </div>
                    </div>

                    {/* 3. Decisions */}
                    <div className="group relative p-8 rounded-2xl bg-cyan-950/20 border border-cyan-900/50 backdrop-blur-sm hover:bg-cyan-900/20 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="w-14 h-14 rounded-xl bg-slate-800/50 border border-slate-600/30 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                            <Brain className="w-7 h-7" />
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2 font-mono">
                            <span className="text-slate-400">03.</span> DECISIONS
                        </h3>
                        <p className="text-cyan-200/50 text-sm leading-relaxed mb-6">
                            AI that reasons over your Objects and Actions to make autonomous decisions. The system suggests, you approve.
                        </p>

                        {/* Micro-Viz: Neural Grid Flicker */}
                        <div className="h-24 rounded-lg bg-black/40 border border-slate-700/30 p-3 relative overflow-hidden grid grid-cols-4 gap-2 content-center">
                            <div className="h-3 rounded bg-teal-500/20 animate-flicker" style={{ animationDelay: '0s' }} />
                            <div className="h-3 rounded bg-teal-500/20 animate-flicker" style={{ animationDelay: '0.5s' }} />
                            <div className="h-3 rounded bg-teal-500/20 animate-flicker" style={{ animationDelay: '1.2s' }} />
                            <div className="h-3 rounded bg-teal-500/20 animate-flicker" style={{ animationDelay: '2.5s' }} />

                            <div className="h-3 rounded bg-teal-500/20 animate-flicker" style={{ animationDelay: '0.3s' }} />
                            <div className="h-3 rounded bg-teal-500/20 animate-flicker" style={{ animationDelay: '1.8s' }} />
                            <div className="h-3 rounded bg-teal-500/20 animate-flicker" style={{ animationDelay: '0.9s' }} />
                            <div className="h-3 rounded bg-teal-500/20 animate-flicker" style={{ animationDelay: '1.5s' }} />
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
