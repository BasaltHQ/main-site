
"use client";

import Image from "next/image";
import { ArrowRight, BookOpen, Brain, Cpu, Globe, Share2, Shield, Zap, RefreshCw, Layers, GitMerge } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { BookSelector } from "@/components/manifesto/book-selector";
import { Book3D } from "@/components/manifesto/book-3d";

export default function ManifestoPage() {
    return (
        <div className="min-h-screen bg-[#020609] text-white overflow-x-hidden">
            {/* ... (Hero Code) ... */}

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 border-b border-cyan-900/30 overflow-hidden">
                {/* Background Grids - Animated */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30 fixed animate-[pulse_4s_ease-in-out_infinite]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(220,38,38,0.15),transparent_70%)] pointer-events-none" />

                <div className="relative z-10 max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/30 border border-red-800/50 mb-8 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]">
                        <Shield className="w-4 h-4 text-red-500" />
                        <span className="text-xs font-mono text-red-400 tracking-widest uppercase">Classified // L1_Doctrine // Eyes Only</span>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 uppercase glitch-text">
                        Neuromimetic <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
                            Architecture
                        </span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-xl md:text-2xl text-cyan-100/60 leading-relaxed font-light">
                        The static enterprise is dead. The future belongs to organizations that mimic the
                        <span className="text-white font-bold"> adaptive plasticity </span>
                        of the human brain.
                    </p>

                    {/* Interactive Book Selector */}
                    <BookSelector />

                </div>
            </section>

            {/* THE CAMPFIRE PROBLEM (From 'Growing Companies' Book) */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 relative bg-black">
                {/* Scanline Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left: The Narrative */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-sm font-bold text-teal-500 tracking-[0.2em] mb-4 uppercase flex items-center gap-2">
                                <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
                                The Origin Story
                            </h2>
                            <h3 className="text-4xl font-extrabold text-white mb-6">
                                The <span className="text-red-500">Campfire Problem</span>
                            </h3>
                        </div>

                        <div className="prose prose-invert prose-lg text-cyan-100/70 border-l-2 border-cyan-900/50 pl-6">
                            <p>
                                For 290,000 years, humans coordinated in bands of ~150. Everyone knew everyone. Information flowed without friction around the campfire.
                            </p>
                            <p>
                                Then came agriculture. Cities. Nations. We scaled beyond <strong>Dunbar's Number</strong>. To survive, we invented a hack called <span className="text-white font-bold">Hierarchy</span>.
                            </p>
                            <p>
                                Hierarchy solved scale, but at a terrible cost: <strong>it suppresses information.</strong> Today, in a world of exponential complexity, the hierarchical corporation is hitting its thermodynamic limit. It cannot process data fast enough to survive.
                            </p>
                            <p className="text-teal-400 font-bold italic">
                                "The human brain coordinates 86 billion neurons without a CEO. It is existence proof that massive non-hierarchical coordination is possible."
                            </p>
                        </div>
                    </div>

                    {/* Right: The Book Visual (Highly Animated) */}
                    <div className="relative flex justify-center py-20">
                        {/* Shadow underneath */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[200px] w-48 h-12 bg-black/60 blur-3xl animate-[pulse_4s_ease-in-out_infinite]" />

                        <Book3D
                            coverImage="/books/cover_nma.jpeg"
                            title="Neuromimetic Architecture Manual"
                            color="teal"
                            className="w-[320px] h-[480px]"
                        />
                    </div>
                </div>
            </section>

            {/* THE 4 DEVELOPMENTAL PRINCIPLES (From 'Neuro-Mimetic Architecture' Book) */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-cyan-950/20 border-t border-cyan-900/30">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-sm font-bold text-teal-500 tracking-[0.2em] mb-4 uppercase">The Foundation</h2>
                        <h3 className="text-4xl md:text-5xl font-extrabold text-white">
                            The 4 Principles of <br /> <span className="text-red-500">Neuro-Mimetic Design</span>
                        </h3>
                        <p className="mt-4 text-cyan-200/50 max-w-2xl mx-auto">
                            Extracted from <em>Neuromimetic Architecture</em>, Chapter 2.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Principle 1 */}
                        <div className="group p-8 bg-black/40 border border-cyan-900/50 rounded-xl hover:border-teal-500/50 transition-all hover:-translate-y-1 duration-300">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-teal-900/20 rounded-lg flex items-center justify-center border border-teal-500/20 group-hover:border-teal-500 group-hover:bg-teal-500/10 transition-colors">
                                    <Brain className="w-6 h-6 text-teal-400" />
                                </div>
                                <h4 className="text-xl font-bold text-white">01 // Self-Organization</h4>
                            </div>
                            <p className="text-cyan-100/60 leading-relaxed text-sm">
                                Neurons are not placed by a master architect. They migrate based on local chemical gradients. In a Cognitive Enterprise, teams and resources differentiate based on <span className="text-white">Market Signal Gradients</span>, not top-down org charts.
                            </p>
                        </div>

                        {/* Principle 2 */}
                        <div className="group p-8 bg-black/40 border border-cyan-900/50 rounded-xl hover:border-red-500/50 transition-all hover:-translate-y-1 duration-300">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-red-900/20 rounded-lg flex items-center justify-center border border-red-500/20 group-hover:border-red-500 group-hover:bg-red-500/10 transition-colors">
                                    <RefreshCw className="w-6 h-6 text-red-400" />
                                </div>
                                <h4 className="text-xl font-bold text-white">02 // Plasticity</h4>
                            </div>
                            <p className="text-cyan-100/60 leading-relaxed text-sm">
                                The brain rewires itself via <strong>Hebbian Learning</strong> ("neurons that fire together, wire together"). Your organization must automatically strengthen profitable connections and dissolve those that yield no value—without a meeting.
                            </p>
                        </div>

                        {/* Principle 3 */}
                        <div className="group p-8 bg-black/40 border border-cyan-900/50 rounded-xl hover:border-teal-500/50 transition-all hover:-translate-y-1 duration-300">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-teal-900/20 rounded-lg flex items-center justify-center border border-teal-500/20 group-hover:border-teal-500 group-hover:bg-teal-500/10 transition-colors">
                                    <GitMerge className="w-6 h-6 text-teal-400" />
                                </div>
                                <h4 className="text-xl font-bold text-white">03 // Redundancy & Degeneracy</h4>
                            </div>
                            <p className="text-cyan-100/60 leading-relaxed text-sm">
                                Efficiency is brittle. The brain survives injury because of <strong>Degeneracy</strong>—structurally different components capable of performing the same outcome. We engineer overlapping capabilities to ensure survival under chaos.
                            </p>
                        </div>

                        {/* Principle 4 */}
                        <div className="group p-8 bg-black/40 border border-cyan-900/50 rounded-xl hover:border-red-500/50 transition-all hover:-translate-y-1 duration-300">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-red-900/20 rounded-lg flex items-center justify-center border border-red-500/20 group-hover:border-red-500 group-hover:bg-red-500/10 transition-colors">
                                    <Layers className="w-6 h-6 text-red-400" />
                                </div>
                                <h4 className="text-xl font-bold text-white">04 // Hierarchical Modularity</h4>
                            </div>
                            <p className="text-cyan-100/60 leading-relaxed text-sm">
                                The brain has a hierarchy of <em>information processing</em>, not authority. Microcircuits form columns; columns form regions. We build nested, semi-autonomous modules that scale without creating bottlenecks.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* TRI-PHASIC MORPHOGENESIS (From 'Neuro-Mimetic Architecture' Book) */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 relative bg-black overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(220,38,38,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left: The Abstract Visual (Restored) */}
                    <div className="relative border border-cyan-800/30 bg-[#020609] rounded-xl overflow-hidden min-h-[500px] flex items-center justify-center group shadow-[0_0_50px_rgba(20,184,166,0.1)] order-2 lg:order-1">
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(20,184,166,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />

                        {/* Layered Animations */}
                        <div className="relative z-10 w-80 h-80">
                            {/* Outer Ring */}
                            <div className="absolute inset-0 border border-teal-500/10 rounded-full animate-[spin_20s_linear_infinite]" />
                            <div className="absolute inset-2 border border-dashed border-teal-500/20 rounded-full animate-[spin_30s_linear_infinite_reverse]" />

                            {/* Middle Ring */}
                            <div className="absolute inset-12 border border-red-500/10 rounded-full animate-[spin_15s_linear_infinite]" />
                            <div className="absolute inset-14 border-2 border-red-500/20 rounded-full flex items-center justify-center opacity-50">
                                <div className="w-1 h-full bg-red-500/20 animate-spin-slow" />
                            </div>

                            {/* Inner Core */}
                            <div className="absolute inset-24 bg-cyan-950/30 backdrop-blur-sm rounded-full border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                <Brain className="w-16 h-16 text-teal-400 animate-pulse" />
                            </div>

                            {/* Floating Labels */}
                            <div className="absolute -right-8 top-10 bg-black/80 border border-teal-500/50 px-3 py-1 text-[10px] text-teal-300 rounded font-mono backdrop-blur animate-float">
                                <span className="w-2 h-2 inline-block rounded-full bg-teal-500 mr-2 animate-pulse" />
                                CORTEX.SYS: ONLINE
                            </div>
                            <div className="absolute -left-4 bottom-20 bg-black/80 border border-red-500/50 px-3 py-1 text-[10px] text-red-300 rounded font-mono backdrop-blur animate-[float_4s_ease-in-out_infinite_1s]">
                                <span className="w-2 h-2 inline-block rounded-full bg-red-500 mr-2 animate-pulse" />
                                LIFECYCLE: ACTIVE
                            </div>
                        </div>
                    </div>
                    {/* Right: The Content */}
                    <div className="order-1 lg:order-2 space-y-12">
                        <div>
                            <h2 className="text-sm font-bold text-teal-500 tracking-[0.2em] mb-4 uppercase flex items-center gap-2">
                                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                                The Solution
                            </h2>
                            <h3 className="text-4xl font-extrabold text-white mb-6">
                                <span className="text-teal-400">Tri-Phasic</span> Morphogenesis
                            </h3>
                            <p className="text-lg text-cyan-100/70">
                                How do you actually build this? The manual prescribes a 3-stage transformation process, mirroring the development of the human cortex.
                            </p>
                        </div>

                        <div className="space-y-8 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-[2px] before:bg-cyan-900/50">
                            {/* Phase I */}
                            <div className="relative pl-16 group">
                                <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-[#020609] border border-teal-500/50 flex items-center justify-center z-10 group-hover:border-teal-400 group-hover:scale-110 transition-all">
                                    <span className="text-teal-500 font-mono text-sm">I</span>
                                </div>
                                <h5 className="font-bold text-white text-xl mb-1 group-hover:text-teal-300 transition-colors">Phase I: The Germinal Zone</h5>
                                <p className="text-xs uppercase tracking-widest text-teal-500/70 mb-2">Software Automation</p>
                                <p className="text-sm text-cyan-200/50">
                                    AI Agents act as <strong className="text-teal-200">Neural Stem Cells</strong> for cognitive labor.
                                </p>
                            </div>

                            {/* Phase II */}
                            <div className="relative pl-16 group">
                                <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-[#020609] border border-red-500/50 flex items-center justify-center z-10 group-hover:border-red-400 group-hover:scale-110 transition-all">
                                    <span className="text-red-500 font-mono text-sm">II</span>
                                </div>
                                <h5 className="font-bold text-white text-xl mb-1 group-hover:text-red-300 transition-colors">Phase II: Economic Tokenization</h5>
                                <p className="text-xs uppercase tracking-widest text-red-500/70 mb-2">Internal Capital Markets</p>
                                <p className="text-sm text-cyan-200/50">
                                    Turning teams into profit centers connected by value flows, not budgets.
                                </p>
                            </div>

                            {/* Phase III */}
                            <div className="relative pl-16 group">
                                <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-[#020609] border border-cyan-500/50 flex items-center justify-center z-10 group-hover:border-cyan-400 group-hover:scale-110 transition-all">
                                    <span className="text-cyan-500 font-mono text-sm">III</span>
                                </div>
                                <h5 className="font-bold text-white text-xl mb-1 group-hover:text-cyan-300 transition-colors">Phase III: The Cortical Plate</h5>
                                <p className="text-xs uppercase tracking-widest text-cyan-500/70 mb-2">Robotic Embodiment</p>
                                <p className="text-sm text-cyan-200/50">
                                    Terminally differentiated effectors executing physical actions in the real world.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Reader Friendly Version (CTA) */}
            <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#020609] to-cyan-950/30 border-t border-cyan-900/30">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center justify-between gap-16">

                    {/* Right: The Book Visual */}
                    <div className="flex-1 relative flex justify-center py-20">
                        {/* Shadow underneath */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[200px] w-56 h-16 bg-red-600/40 blur-[60px] animate-[pulse_4s_ease-in-out_infinite]" />

                        <Book3D
                            coverImage="/books/cover_gclb.jpeg"
                            title="Growing Companies Like Brains"
                            color="red"
                            // Standard 6x9 Trade Paperback Ratio is 2:3. 
                            // 320px width -> 480px height. 
                            // Current default is 300x480 (1:1.6). 6x9 is 1:1.5. 
                            // I'll adjust the component class if needed, but 320x480 is good.
                            className="w-[320px] h-[480px]"
                        />
                    </div>

                    {/* Sales Copy */}
                    <div className="flex-1 space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/30 border border-teal-800/50">
                            <BookOpen className="w-4 h-4 text-teal-400" />
                            <span className="text-xs font-mono text-teal-300 tracking-widest uppercase">Field Manual // Declassified</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                            Growing Companies <br />
                            <span className="text-red-500">Like Brains</span>
                        </h2>

                        <p className="text-xl text-cyan-100/70 leading-relaxed">
                            The theory helps you understand the machine. The manual helps you <span className="text-white font-bold">build it</span>.
                            <br /><br />
                            This reader-friendly guide strips away the academic density and gives you the raw, tactical steps to re-engineer your company into a self-repairing, self-optimizing organism.
                        </p>

                        <ul className="space-y-4 font-mono text-sm text-cyan-200/60">
                            <li className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                <span>Stop managing people. Start managing protocols.</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-75" />
                                <span>Eliminate operational latency.</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-150" />
                                <span>Scale complexity without scaling chaos.</span>
                            </li>
                        </ul>

                        <div className="pt-8 flex flex-col sm:flex-row gap-4">
                            <a
                                href="https://www.amazon.com/dp/B0G71WFSHK"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center justify-center gap-3 rounded-lg bg-red-600 px-8 py-4 text-white font-bold text-lg hover:bg-red-700 hover:scale-105 transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                            >
                                ORDER ON AMAZON <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <span className="text-xs text-cyan-200/30 flex items-center justify-center">
                                <Globe className="w-3 h-3 mr-1" />
                                WORLDWIDE SHIPPING AVAILABLE
                            </span>
                        </div>
                    </div>

                </div>
            </section >

            {/* THE NEURAL LINK: BASALTHQ INTEGRATION (New Section) */}
            < section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-cyan-900/30 bg-black relative overflow-hidden" >
                <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.05)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-sm font-bold text-teal-500 tracking-[0.2em] mb-4 uppercase">The Operating System</h2>
                        <h3 className="text-4xl md:text-5xl font-extrabold text-white">
                            The Digital <span className="text-teal-400">Cortex</span>
                        </h3>
                        <p className="mt-4 text-cyan-200/50 max-w-2xl mx-auto text-lg">
                            Theory is useless without tooling. Ledger1 is the only ERP suite architected specifically to implement Tri-Phasic Morphogenesis.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Module 1: ERP */}
                        <div className="p-6 border border-cyan-800/50 rounded-xl bg-cyan-950/20 backdrop-blur hover:border-teal-500 transition-colors group">
                            <div className="h-10 w-10 bg-teal-900/30 rounded-lg flex items-center justify-center mb-4 border border-teal-500/30 group-hover:scale-110 transition-transform">
                                <Cpu className="w-5 h-5 text-teal-400" />
                            </div>
                            <h4 className="text-lg font-bold text-white mb-1">BasaltERP</h4>
                            <p className="text-[10px] font-mono text-teal-500 w-full mb-3 border-b border-teal-500/20 pb-2">HIPPOCAMPUS (Memory)</p>
                            <p className="text-cyan-100/60 text-xs leading-relaxed">
                                The single source of truth. Stores "State Vectors" of every object, ensuring <strong>Zero Latency</strong> access to data.
                            </p>
                        </div>

                        {/* Module 2: CRM */}
                        <div className="p-6 border border-cyan-800/50 rounded-xl bg-cyan-950/20 backdrop-blur hover:border-red-500 transition-colors group">
                            <div className="h-10 w-10 bg-red-900/30 rounded-lg flex items-center justify-center mb-4 border border-red-500/30 group-hover:scale-110 transition-transform">
                                <Share2 className="w-5 h-5 text-red-400" />
                            </div>
                            <h4 className="text-lg font-bold text-white mb-1">BasaltCRM</h4>
                            <p className="text-[10px] font-mono text-red-500 w-full mb-3 border-b border-red-500/20 pb-2">AMYGDALA (Social)</p>
                            <p className="text-cyan-100/60 text-xs leading-relaxed">
                                Maps the social graph of customers, identifying <strong>Profit Gradients</strong> via emotional and transactional analysis.
                            </p>
                        </div>

                        {/* Module 3: BasaltEcho */}
                        <div className="p-6 border border-cyan-800/50 rounded-xl bg-cyan-950/20 backdrop-blur hover:border-white transition-colors group">
                            <div className="h-10 w-10 bg-gray-800/50 rounded-lg flex items-center justify-center mb-4 border border-white/30 group-hover:scale-110 transition-transform">
                                <Brain className="w-5 h-5 text-white" />
                            </div>
                            <h4 className="text-lg font-bold text-white mb-1">BasaltEcho</h4>
                            <p className="text-[10px] font-mono text-white/70 w-full mb-3 border-b border-white/20 pb-2">BROCA'S AREA (Speech)</p>
                            <p className="text-cyan-100/60 text-xs leading-relaxed">
                                Interprets unstructured natural language (voice/text) and translates it into structured <strong>Ontological Actions</strong>.
                            </p>
                        </div>

                        {/* Module 4: BasaltSurge */}
                        <div className="p-6 border border-cyan-800/50 rounded-xl bg-cyan-950/20 backdrop-blur hover:border-teal-500 transition-colors group">
                            <div className="h-10 w-10 bg-teal-900/30 rounded-lg flex items-center justify-center mb-4 border border-teal-500/30 group-hover:scale-110 transition-transform">
                                <Zap className="w-5 h-5 text-teal-400" />
                            </div>
                            <h4 className="text-lg font-bold text-white mb-1">BasaltSurge</h4>
                            <p className="text-[10px] font-mono text-teal-500 w-full mb-3 border-b border-teal-500/20 pb-2">VASCULAR (Resource)</p>
                            <p className="text-cyan-100/60 text-xs leading-relaxed">
                                Ensures liquidity (oxygen) reaches the value-added clusters, automating <strong>Capital Reallocation</strong>.
                            </p>
                        </div>

                        {/* Module 5: BasaltCMS (Coming Soon) */}
                        <div className="p-6 border border-cyan-900/30 rounded-xl bg-cyan-950/10 backdrop-blur opacity-70 hover:opacity-100 hover:border-teal-500/50 transition-all group relative overflow-hidden">
                            <div className="absolute top-3 right-3 px-2 py-0.5 bg-teal-950/50 border border-teal-500/30 rounded text-[9px] font-mono text-teal-400 uppercase tracking-wider">Coming Soon</div>
                            <div className="h-10 w-10 bg-teal-900/20 rounded-lg flex items-center justify-center mb-4 border border-teal-500/20 group-hover:scale-110 transition-transform grayscale group-hover:grayscale-0">
                                <Layers className="w-5 h-5 text-teal-400" />
                            </div>
                            <h4 className="text-lg font-bold text-white mb-1 text-opacity-80 group-hover:text-opacity-100">BasaltCMS</h4>
                            <p className="text-[10px] font-mono text-teal-500/70 w-full mb-3 border-b border-teal-500/10 pb-2">WERNICKE'S AREA (Meaning)</p>
                            <p className="text-cyan-100/40 text-xs leading-relaxed group-hover:text-cyan-100/60">
                                The semantic knowledge store. Organizes unstructured corporate wisdom into retrievable, context-aware <strong>Intelligence</strong>.
                            </p>
                        </div>

                        {/* Module 6: Vault (Coming Soon) */}
                        <div className="p-6 border border-red-900/30 rounded-xl bg-red-950/10 backdrop-blur opacity-70 hover:opacity-100 hover:border-red-500/50 transition-all group relative overflow-hidden">
                            <div className="absolute top-3 right-3 px-2 py-0.5 bg-red-950/50 border border-red-500/30 rounded text-[9px] font-mono text-red-400 uppercase tracking-wider">Coming Soon</div>
                            <div className="h-10 w-10 bg-red-900/20 rounded-lg flex items-center justify-center mb-4 border border-red-500/20 group-hover:scale-110 transition-transform grayscale group-hover:grayscale-0">
                                <Shield className="w-5 h-5 text-red-400" />
                            </div>
                            <h4 className="text-lg font-bold text-white mb-1 text-opacity-80 group-hover:text-opacity-100">BasaltVault</h4>
                            <p className="text-[10px] font-mono text-red-500/70 w-full mb-3 border-b border-red-500/10 pb-2">PREFRONTAL CORTEX (Control)</p>
                            <p className="text-cyan-100/40 text-xs leading-relaxed group-hover:text-cyan-100/60">
                                Multi-signature smart contract accounts. The executive function that enforces <strong>Governance Protocols</strong> and asset security.
                            </p>
                        </div>
                    </div>
                </div>
            </section >

            {/* WAR ROOM FOOTER (The Final Call) */}
            < section className="py-20 bg-red-950 border-t border-red-900 relative overflow-hidden" >
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50" />

                <div className="max-w-4xl mx-auto text-center relative z-10 px-4">
                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase mb-8">
                        The Doctrine is Clear. <br />
                        <span className="text-red-400">The Choice is Yours.</span>
                    </h2>
                    <p className="text-xl text-red-100/70 mb-10 leading-relaxed">
                        You can continue to run a 19th-century hierarchy in a 21st-century world. Or you can evolve. The tools are here. The manual is here.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <a
                            href="/get-started"
                            className="bg-white text-red-900 px-8 py-4 rounded font-bold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                        >
                            INITIATE UPGRADE <ArrowRight className="w-5 h-5" />
                        </a>
                        <a
                            href="https://www.amazon.com/dp/B0G71WFSHK"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-red-900/50 border border-red-500 text-white px-8 py-4 rounded font-bold text-lg hover:bg-red-900 transition-colors flex items-center justify-center gap-2"
                        >
                            READ THE MANUAL
                        </a>
                    </div>
                </div>
            </section >
        </div >
    );
}
