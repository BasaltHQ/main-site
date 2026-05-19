import { notFound } from 'next/navigation';
import LOCATIONS from '@/lib/data/locations.json';
import Link from 'next/link';
import StructuredData from '@/components/StructuredData';

interface Props {
    params: Promise<{ slug: string }>;
}

export const revalidate = 604800; // Cache for 1 week (ISR)
export const dynamicParams = true; // Allow rendering of non-statically generated paths

export async function generateStaticParams() {
    // Generate the top 600 statically for performance. The rest will be SSR/ISR on demand.
    return LOCATIONS.slice(0, 600).map((loc: any) => ({
        slug: loc.slug,
    }));
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const location: any = LOCATIONS.find((loc: any) => loc.slug === slug);
    if (!location) return { title: 'Not Found' };

    return {
        title: `Premier AI Agency in ${location.name} | BasaltHQ`,
        description: `BasaltHQ specializes in agentic AI implementations for ${location.name}, ${location.country}. We architect autonomous workforce solutions aligned with ${location.complianceRegime || 'local'} compliance and ${location.primaryIndustry || 'enterprise'} focus.`,
    };
}

export default async function LocationPage({ params }: Props) {
    const { slug } = await params;
    const location: any = LOCATIONS.find((loc: any) => loc.slug === slug);

    if (!location) {
        notFound();
    }

    const breadcrumbLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://basalthq.com' },
            { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://basalthq.com/locations' },
            { '@type': 'ListItem', position: 3, name: location.name },
        ]
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-[#119dff] selection:text-white font-rajdhani">
            <StructuredData data={breadcrumbLd} />

            {/* Hero Section */}
            <div className="relative pt-32 pb-24 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-20 pointer-events-none" />
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#119dff]/10 rounded-full blur-[150px] pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="mb-12">
                        <Link href="/locations" className="text-sm font-mono text-white/40 hover:text-[#119dff] transition-colors flex items-center gap-2">
                            ← GLOBAL NETWORK
                        </Link>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#119dff]/10 border border-[#119dff]/20 text-xs font-mono text-[#119dff] mb-6">
                                <span className="w-2 h-2 rounded-full bg-[#119dff] animate-pulse" />
                                AI AGENCY: {location.name.toUpperCase()}
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-wide">
                                Transforming <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#119dff] to-[#0d7acc]">{location.name}</span> Enterprises with Agentic AI.
                            </h1>
                            <p className="text-xl text-white/60 font-sans font-light leading-relaxed mb-10">
                                BasaltHQ is the premier AI implementation agency servicing {location.name}. We don't just build chatbots; we architect autonomous agent swarms that permanently reduce OPEX and scale output infinitely.
                            </p>

                            <div className="flex gap-4">
                                <Link href="/contact" className="px-8 py-4 bg-[#119dff] hover:bg-[#ff553e] text-white font-bold tracking-widest uppercase rounded-lg transition-all shadow-[0_0_20px_rgba(245,64,41,0.3)]">
                                    Book Strategy Call
                                </Link>
                            </div>
                        </div>

                        {/* Minimap / Stats Card */}
                        <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-8 border border-white/10 lg:mt-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#119dff]/10 rounded-full blur-3xl pointer-events-none" />
                            
                            <h3 className="text-xl font-bold mb-8 border-b border-white/10 pb-4">Deployment Metrics: {location.name}</h3>
                            
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <div className="text-xs text-white/40 font-mono uppercase tracking-wider mb-1">Country / Code</div>
                                    <div className="text-2xl font-bold">{location.country}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-white/40 font-mono uppercase tracking-wider mb-1">Coordinates</div>
                                    <div className="text-lg font-bold font-mono text-[#119dff]">{location.lat.toFixed(2)}, {location.lng.toFixed(2)}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-white/40 font-mono uppercase tracking-wider mb-1">AI Readiness</div>
                                    <div className="text-2xl font-bold text-green-500">{location.aiReadinessScore}/100</div>
                                </div>
                                <div>
                                    <div className="text-xs text-white/40 font-mono uppercase tracking-wider mb-1">Proximity Hub</div>
                                    <div className="text-lg font-bold text-white">{location.nearestTechHub} ({location.distanceToHubKm}km)</div>
                                </div>
                                <div>
                                    <div className="text-xs text-white/40 font-mono uppercase tracking-wider mb-1">Compliance</div>
                                    <div className="text-sm font-bold text-white">{location.complianceRegime}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-white/40 font-mono uppercase tracking-wider mb-1">Projected ROI</div>
                                    <div className="text-2xl font-bold text-white">{location.projectedRoi}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <main className="px-6 pb-24 max-w-7xl mx-auto">
                {/* The DPF Framework */}
                <div className="mb-24">
                    <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
                        <span className="w-12 h-1 bg-[#119dff]" />
                        The Autonomous Advantage in {location.name}
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-black/40 p-8 rounded-2xl border border-white/5 hover:border-[#119dff]/30 transition-all">
                            <div className="w-12 h-12 rounded-xl bg-[#119dff]/10 border border-[#119dff]/20 flex items-center justify-center mb-6 text-[#119dff] font-bold text-xl">1</div>
                            <h3 className="text-xl font-bold mb-4 text-white">Total Process Automation</h3>
                            <p className="text-white/60 text-sm font-sans leading-relaxed">
                                We map your existing operational workflows and replace entire administrative and operational departments with specialized, reasoning LLM agents operating 24/7.
                            </p>
                        </div>
                        <div className="bg-black/40 p-8 rounded-2xl border border-white/5 hover:border-[#119dff]/30 transition-all">
                            <div className="w-12 h-12 rounded-xl bg-[#119dff]/10 border border-[#119dff]/20 flex items-center justify-center mb-6 text-[#119dff] font-bold text-xl">2</div>
                            <h3 className="text-xl font-bold mb-4 text-white">{location.complianceRegime} Native</h3>
                            <p className="text-white/60 text-sm font-sans leading-relaxed">
                                Our agentic deployments in {location.country} are architected from the ground up to respect local data sovereignty laws and compliance frameworks.
                            </p>
                        </div>
                        <div className="bg-black/40 p-8 rounded-2xl border border-white/5 hover:border-[#119dff]/30 transition-all">
                            <div className="w-12 h-12 rounded-xl bg-[#119dff]/10 border border-[#119dff]/20 flex items-center justify-center mb-6 text-[#119dff] font-bold text-xl">3</div>
                            <h3 className="text-xl font-bold mb-4 text-white">Infinite Scaling</h3>
                            <p className="text-white/60 text-sm font-sans leading-relaxed">
                                Say goodbye to hiring bottlenecks in {location.name}. Need 100 more customer service reps or analysts? We simply spin up 100 more parallel agents at virtually zero marginal cost.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Industry Solutions */}
                <div className="mb-32">
                    <div className="glass-panel p-12 rounded-3xl border border-[#119dff]/20 bg-gradient-to-br from-[#050505] to-[#1a0505] relative overflow-hidden">
                        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h3 className="text-4xl font-bold mb-6 text-white">Dominate the {location.name} Market.</h3>
                                <p className="text-xl text-white/60 font-sans leading-relaxed mb-8">
                                    The {location.region || 'global'} market requires specialized architectures. Our deployments in {location.name} are heavily indexed on <strong>{location.primaryIndustry}</strong>, ensuring your agentic infrastructure is perfectly aligned with regional economic advantages.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-3 text-white/80"><div className="w-2 h-2 bg-[#119dff] rounded-full" /> {location.complianceRegime} Automated Compliance</li>
                                    <li className="flex items-center gap-3 text-white/80"><div className="w-2 h-2 bg-[#119dff] rounded-full" /> Agentic Customer Support</li>
                                    <li className="flex items-center gap-3 text-white/80"><div className="w-2 h-2 bg-[#119dff] rounded-full" /> Financial Data Parsing & Reasoning</li>
                                    <li className="flex items-center gap-3 text-white/80"><div className="w-2 h-2 bg-[#119dff] rounded-full" /> Localized Talent Augmentation</li>
                                </ul>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-black/50 p-6 rounded-2xl border border-white/10 text-center">
                                    <div className="text-3xl mb-3 text-[#119dff]">⚡</div>
                                    <div className="font-bold tracking-widest uppercase text-sm">Speed</div>
                                </div>
                                <div className="bg-black/50 p-6 rounded-2xl border border-white/10 text-center">
                                    <div className="text-3xl mb-3 text-[#119dff]">🎯</div>
                                    <div className="font-bold tracking-widest uppercase text-sm">Precision</div>
                                </div>
                                <div className="bg-black/50 p-6 rounded-2xl border border-white/10 text-center">
                                    <div className="text-3xl mb-3 text-[#119dff]">📉</div>
                                    <div className="font-bold tracking-widest uppercase text-sm">Cost Reduction</div>
                                </div>
                                <div className="bg-black/50 p-6 rounded-2xl border border-white/10 text-center">
                                    <div className="text-3xl mb-3 text-[#119dff]">🚀</div>
                                    <div className="font-bold tracking-widest uppercase text-sm">Growth</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl font-bold mb-6">Ready to deploy AI in {location.name}?</h2>
                    <p className="text-white/60 mb-8 font-sans">
                        Schedule a technical discovery call with our architects to map out exactly how we can automate your core business functions.
                    </p>
                    <Link href="/contact" className="group relative inline-flex items-center gap-3 px-10 py-5 bg-[#119dff] text-white font-bold tracking-widest uppercase rounded-xl overflow-hidden shadow-[0_0_30px_rgba(245,64,41,0.4)]">
                        <span className="relative z-10">Start the Implementation</span>
                        <svg className="w-5 h-5 relative z-10 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                        <div className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </Link>
                </div>
            </main>
        </div>
    );
}
