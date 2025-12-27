import { notFound } from "next/navigation";
import { INDUSTRIES, FEATURES, ROLES, getIndustry, getFeature, getRole } from "@/lib/seo-taxonomy";
import { ArrowRight, CheckCircle, Zap, Shield, Database, Network, Cpu, Mic, Terminal, AlertTriangle, Target } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

// --- Metadata Generation ---
export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
    const { slug } = await params;
    const [segment1, segment2] = slug;

    const industry = getIndustry(segment1);
    const feature = getFeature(segment2); // Optional second segment

    if (!industry) return { title: "Target Not Found" };

    if (feature) {
        return {
            title: `${industry.name} ${feature.name} | BasaltHQ Ontology`,
            description: `Deploy the ${feature.name} weapon system for ${industry.name}. Dominate your market with the BasaltHQ Main Street Ontology.`,
        };
    }

    return {
        title: `${industry.name} Dominance Platform | BasaltHQ`,
        description: `The Operating System for ${industry.name} Supremacy. Automate operations, assets, and decisions. Survival is optional.`,
    };
}


export default async function SEOPage({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params;
    const [segment1, segment2] = slug;

    // 1. Try to match Industry
    const industry = getIndustry(segment1);

    if (!industry) {
        return notFound();
    }

    // 2. Try to match Feature (if exists)
    const feature = segment2 ? getFeature(segment2) : null;

    // --- Content Generators ---

    const getHeadline = () => {
        if (feature) {
            return (
                <>
                    Deploy <span className="text-red-500">{feature.name}</span> for {industry.shortName} <span className="text-red-500">Dominance</span>
                </>
            );
        }
        return (
            <>
                Construct the <span className="text-red-500">{industry.name}</span> Ontology
            </>
        );
    };

    return (
        <div className="min-h-screen bg-[#020408] pt-24 font-sans text-slate-300 selection:bg-red-900 selection:text-white">
            {/* HUD Overlay */}
            <div className="fixed inset-0 pointer-events-none z-50">
                <div className="absolute top-8 left-8 w-64 h-24 border-l border-t border-red-900/40 opacity-50" />
                <div className="absolute bottom-8 right-8 w-64 h-24 border-r border-b border-red-900/40 opacity-50" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
            </div>

            {/* Hero Section */}
            <section className="relative py-32 overflow-hidden border-b border-red-900/10">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-red-900/5 to-transparent" />

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

                    <div className="flex flex-col md:flex-row gap-12 items-start">
                        <div className="flex-1">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/20 border border-red-900/30 text-xs font-mono mb-8 text-red-500 animate-pulse">
                                <Target className="w-3 h-3" />
                                TARGET_SECTOR: {industry.slug.toUpperCase()}{feature ? ` :: ${feature.slug.toUpperCase()}` : ''}
                            </div>

                            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 text-white leading-tight uppercase">
                                {getHeadline()}
                            </h1>

                            <p className="text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed border-l-2 border-red-500/50 pl-6">
                                {industry.description} Generic software is a liability. You need an operating system built for war.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <a href="https://calendly.com/founders-tuc/ledger1-demo-session" className="group relative bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-bold uppercase tracking-wider flex items-center gap-3 overflow-hidden transition-all">
                                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                                    <span className="relative">Initialize System</span>
                                    <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>

                        {/* Cybernetic Visual */}
                        <div className="w-full md:w-1/3">
                            <div className="relative aspect-square border border-red-900/30 bg-black/40 backdrop-blur-sm p-8 flex flex-col justify-between overflow-hidden group">
                                <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                                <div className="flex justify-between items-start text-xs font-mono text-red-700">
                                    <span>SYS_READY</span>
                                    <span>{new Date().getFullYear()}.{new Date().getMonth() + 1}</span>
                                </div>

                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-red-500/10 rounded-full animate-spin-slow" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-red-500/20 rounded-full animate-reverse-spin" />

                                <div className="relative text-center z-10">
                                    <Database className="w-16 h-16 text-red-600 mx-auto mb-4 animate-pulse" />
                                    <div className="text-red-500 font-mono text-sm tracking-widest typing-effect">
                                        UPLOADING_ONTOLOGY...
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="h-0.5 w-full bg-red-900/20 overflow-hidden">
                                            <div className="h-full bg-red-600/50 w-1/3 animate-loading-bar" style={{ animationDelay: `${i * 0.2}s` }} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* "Why You Are Losing" Section */}
            <section className="py-24 relative border-b border-white/5">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="order-2 md:order-1 relative">
                            <div className="absolute -left-4 top-0 w-1 h-24 bg-red-600" />
                            <h2 className="text-3xl font-bold text-white mb-6 uppercase tracking-tight">
                                Generic Software is <span className="text-red-600">Surrender</span>
                            </h2>
                            <p className="text-lg text-slate-400 leading-relaxed mb-8">
                                Your competitors are using Excel and legacy ERPs. They are blind.
                                BasaltHQ constructs a high-fidelity digital twin of your {industry.shortName} reality.
                                We don't just track data. We track truth.
                            </p>
                            <ul className="space-y-6">
                                <li className="flex items-start gap-4 group">
                                    <div className="w-8 h-8 rounded bg-red-950/30 border border-red-900/50 flex items-center justify-center group-hover:bg-red-600 group-hover:text-black transition-colors">
                                        <Terminal className="w-4 h-4 text-red-500 group-hover:text-black" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm uppercase mb-1">Object Permanence</h4>
                                        <p className="text-sm text-slate-500">Pre-configured definitions for every {industry.shortName} asset class.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4 group">
                                    <div className="w-8 h-8 rounded bg-red-950/30 border border-red-900/50 flex items-center justify-center group-hover:bg-red-600 group-hover:text-black transition-colors">
                                        <Zap className="w-4 h-4 text-red-500 group-hover:text-black" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm uppercase mb-1">Kinetic Execution</h4>
                                        <p className="text-sm text-slate-500">Workflows that trigger instantly upon state changes. Zero latency.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Stats Grid */}
                        <div className="order-1 md:order-2 grid grid-cols-2 gap-4">
                            <div className="p-6 border border-white/10 bg-white/5 backdrop-blur">
                                <div className="text-4xl font-mono text-white mb-2">100<span className="text-red-500">%</span></div>
                                <div className="text-xs uppercase text-slate-500">Visibility</div>
                            </div>
                            <div className="p-6 border border-white/10 bg-white/5 backdrop-blur">
                                <div className="text-4xl font-mono text-white mb-2">0<span className="text-red-500">ms</span></div>
                                <div className="text-xs uppercase text-slate-500">Indecision</div>
                            </div>
                            <div className="col-span-2 p-6 border border-red-900/30 bg-red-950/10 backdrop-blur">
                                <div className="flex items-center gap-2 mb-2">
                                    <AlertTriangle className="w-4 h-4 text-red-500" />
                                    <span className="text-xs uppercase text-red-500 font-bold">Threat Detected</span>
                                </div>
                                <div className="text-sm text-slate-400">
                                    Market consolidation is accelerating in the {industry.shortName} sector. Adapt or perish.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Module Matrix */}
            {!feature && (
                <section className="py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between mb-16 border-b border-white/10 pb-4">
                            <h2 className="text-2xl font-bold text-white uppercase tracking-wider">
                                Available Weapons
                            </h2>
                            <div className="text-xs font-mono text-slate-500">Inventory: {FEATURES.length} Modules</div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {FEATURES.slice(0, 3).map((f) => (
                                <Link href={`/solutions/${industry.slug}/${f.slug}`} key={f.slug} className="group relative p-8 h-full border border-white/10 hover:border-red-600/50 bg-[#0a0a0a] transition-all overflow-hidden hover:-translate-y-1">
                                    <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                                        <ArrowRight className="w-5 h-5 -rotate-45 text-red-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-500 transition-colors">{f.name}</h3>
                                    <p className="text-slate-400 text-sm mb-6 leading-relaxed bg-transparent relative z-10">{f.description}</p>

                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
                                        <div className="h-full bg-red-600 w-0 group-hover:w-full transition-all duration-500" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
