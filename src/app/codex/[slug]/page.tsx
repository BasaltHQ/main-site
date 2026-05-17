import { notFound } from 'next/navigation';
import { CODEX } from '@/lib/data/codex';
import Link from 'next/link';
import StructuredData from '@/components/StructuredData';
import { Metadata } from 'next';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return CODEX.map((item) => ({
        slug: item.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const term = CODEX.find((t) => t.slug === slug);

    if (!term) {
        return { title: 'Term Not Found' };
    }

    return {
        title: `What is ${term.term}? | The Codex | BasaltHQ`,
        description: term.definition,
    };
}

export default async function CodexPage({ params }: Props) {
    const { slug } = await params;
    const term = CODEX.find((t) => t.slug === slug);

    if (!term) {
        notFound();
    }

    const jsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': 'DefinedTerm',
            name: term.term,
            description: term.definition,
            inDefinedTermSet: 'https://basalthq.com/codex'
        },
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://basalthq.com' },
                { '@type': 'ListItem', position: 2, name: 'Codex', item: 'https://basalthq.com/codex' },
                { '@type': 'ListItem', position: 3, name: term.term },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white selection:bg-[#119dff] selection:text-white font-sans">
            <StructuredData data={jsonLd} />

            <div className="relative pt-32 pb-24 px-6 overflow-hidden">
                <div className="absolute top-0 right-0 p-64 bg-[#119dff]/5 rounded-full blur-[100px] pointer-events-none" />

                <main className="max-w-4xl mx-auto relative z-10">
                    <div className="mb-12">
                        <Link href="/codex" className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-2">
                            ← Back to Codex
                        </Link>
                    </div>

                    <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-[var(--primary,#119dff)] mb-8">
                        {term.category.toUpperCase()}
                    </span>

                    <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                        {term.term}
                    </h1>

                    <div className="text-2xl text-white font-light leading-relaxed mb-12 border-l-4 border-[var(--primary,#119dff)] pl-8">
                        {term.definition}
                    </div>

                    <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                        <p>{term.longDescription}</p>
                    </div>

                    <div className="mt-24 border-t border-white/10 pt-12">
                        {/* Related Concepts */}
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">Related Concepts</h3>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {CODEX
                                .filter(t => term.relatedSlugs.includes(t.slug))
                                .map(related => (
                                    <Link key={related.slug} href={`/codex/${related.slug}`} className="block p-4 border border-white/5 hover:border-[var(--primary,#119dff)]/30 rounded-xl bg-white/5 transition-colors group">
                                        <div className="text-[var(--primary,#119dff)] text-xs mb-1 group-hover:text-white transition-colors">See also:</div>
                                        <div className="font-bold">{related.term}</div>
                                        <div className="text-xs text-gray-500 mt-1 line-clamp-2">{related.definition}</div>
                                    </Link>
                                ))
                            }
                        </div>

                        {/* Same Category */}
                        {CODEX.filter(t => t.category === term.category && t.slug !== term.slug && !term.relatedSlugs.includes(t.slug)).length > 0 && (
                            <div className="mt-12">
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">More in {term.category}</h3>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {CODEX
                                        .filter(t => t.category === term.category && t.slug !== term.slug && !term.relatedSlugs.includes(t.slug))
                                        .slice(0, 3)
                                        .map(related => (
                                            <Link key={related.slug} href={`/codex/${related.slug}`} className="block p-4 border border-white/5 hover:border-white/20 rounded-xl bg-white/5 transition-colors group">
                                                <div className="text-gray-600 text-xs mb-1">{related.category}</div>
                                                <div className="font-bold group-hover:text-[var(--primary,#119dff)] transition-colors">{related.term}</div>
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
