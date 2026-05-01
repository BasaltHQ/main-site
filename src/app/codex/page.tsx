import Link from 'next/link';
import { CODEX } from '@/lib/data/codex';
import { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
    title: 'The Codex | Enterprise AI Knowledge Graph | BasaltHQ',
    description: 'The definitive lexicon for the agentic enterprise. Master 30+ critical concepts—from Swarm Intelligence and Zero-Trust Architecture to Retrieval-Augmented Generation.',
};

export default function CodexIndex() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-[#119dff] selection:text-white font-sans">
            <StructuredData data={{
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                name: 'The BasaltHQ Codex',
                description: 'The definitive lexicon for the agentic enterprise.',
                publisher: {
                    '@type': 'Organization',
                    name: 'BasaltHQ'
                }
            }} />

            <main className="pt-32 pb-24 max-w-7xl mx-auto">
                <div className="text-center px-6 mb-16">
                    <span className="text-xs font-mono tracking-[0.3em] text-[var(--primary,#119dff)] mb-4 block">KNOWLEDGE GRAPH</span>
                    <h1 className="text-5xl md:text-8xl font-bold mt-4 mb-8 leading-tight tracking-tight">
                        THE CODEX
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                        Decoding the language of the agentic enterprise.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
                    {CODEX.map((term) => (
                        <Link
                            key={term.slug}
                            href={`/codex/${term.slug}`}
                            className="group glass-panel p-8 rounded-2xl border border-white/5 hover:border-[var(--primary,#119dff)]/30 transition-all duration-300 hover:bg-white/5"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest border border-gray-800 px-2 py-1 rounded">
                                    {term.category}
                                </span>
                                <span className="text-[var(--primary,#119dff)] opacity-0 group-hover:opacity-100 transition-opacity">
                                    →
                                </span>
                            </div>
                            <h2 className="text-2xl font-bold mb-4 group-hover:text-[var(--primary,#119dff)] transition-colors">
                                {term.term}
                            </h2>
                            <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                                {term.definition}
                            </p>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
