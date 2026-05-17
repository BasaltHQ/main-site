
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/blog/posts';
import { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
    title: 'Blog | BasaltHQ — Enterprise AI Infrastructure Insights',
    description: 'Insights on agentic AI, enterprise infrastructure, automated compliance, and intelligent physical endpoints.',
};

export default function BlogIndex() {
    // Collect all hubs, sorted newest first
    const hubs = BLOG_POSTS.filter(p => p.isHub).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // For each hub, find its spokes (posts that list this hub in relatedSlugs)
    const clusters = hubs.map(hub => ({
        hub,
        spokes: BLOG_POSTS
            .filter(p => !p.isHub && p.relatedSlugs.includes(hub.slug))
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    }));

    // Any orphan posts not linked to any hub
    const allClusteredSlugs = new Set(clusters.flatMap(c => [c.hub.slug, ...c.spokes.map(s => s.slug)]));
    const orphans = BLOG_POSTS.filter(p => !allClusteredSlugs.has(p.slug));

    return (
        <div className="min-h-screen bg-black text-white selection:bg-[#119dff] selection:text-white font-sans">
            <StructuredData data={{
                '@context': 'https://schema.org',
                '@type': 'Blog',
                name: 'BasaltHQ Enterprise AI Blog',
                description: 'Insights on agentic AI, enterprise infrastructure, automated compliance, and intelligent physical endpoints.',
                publisher: {
                    '@type': 'Organization',
                    name: 'BasaltHQ'
                }
            }} />

            <main className="pt-32 pb-24 max-w-7xl mx-auto">
                <div className="text-center px-6 mb-16">
                    <span className="text-xs font-mono tracking-[0.3em] text-[var(--primary,#119dff)] mb-4 block">SYS.JOURNAL</span>
                    <h1 className="text-5xl md:text-8xl font-bold mt-4 mb-8 leading-tight tracking-tight">
                        THE BLOG
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                        Dispatches from the enterprise AI frontier.
                    </p>
                </div>

                {/* Render each hub cluster */}
                {clusters.map((cluster, clusterIndex) => (
                    <section key={cluster.hub.slug} className={clusterIndex > 0 ? 'mt-24' : ''}>
                        {/* Cluster divider for non-first clusters */}
                        {clusterIndex > 0 && (
                            <div className="flex items-center gap-4 px-6 mb-12">
                                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                <span className="text-[10px] font-mono tracking-[0.3em] text-gray-600 uppercase">Series {clusterIndex + 1}</span>
                                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                            </div>
                        )}

                        {/* Hub Article — Featured */}
                        <Link
                            href={`/blog/${cluster.hub.slug}`}
                            className="group block mx-6 mb-10 rounded-2xl overflow-hidden border border-white/5 hover:border-[var(--primary,#119dff)]/30 transition-all duration-500"
                        >
                            <div className="relative aspect-[21/9] overflow-hidden">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                    style={{ backgroundImage: `url(${cluster.hub.coverImage})` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="px-3 py-1 bg-[var(--primary,#119dff)] text-black text-[10px] font-mono tracking-wider rounded-full font-bold">
                                            HUB ARTICLE
                                        </span>
                                        <span className="text-xs font-mono text-gray-400">{cluster.hub.category}</span>
                                        <span className="text-xs font-mono text-gray-500">{cluster.hub.readTime}</span>
                                    </div>
                                    <h2 className="text-2xl md:text-4xl font-bold mb-4 group-hover:text-[var(--primary,#119dff)] transition-colors leading-tight max-w-4xl">
                                        {cluster.hub.title}
                                    </h2>
                                    <p className="text-gray-400 max-w-3xl leading-relaxed hidden md:block">
                                        {cluster.hub.excerpt}
                                    </p>
                                </div>
                            </div>
                        </Link>

                        {/* Spoke Articles for this cluster */}
                        {cluster.spokes.length > 0 && (
                            <div className="grid md:grid-cols-2 gap-6 px-6">
                                {cluster.spokes.map((post) => (
                                    <Link
                                        key={post.slug}
                                        href={`/blog/${post.slug}`}
                                        className="group glass-panel rounded-2xl overflow-hidden border border-white/5 hover:border-[var(--primary,#119dff)]/30 transition-all duration-500 hover:-translate-y-1"
                                    >
                                        <div className="relative aspect-[16/9] overflow-hidden">
                                            <div
                                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                                style={{ backgroundImage: `url(${post.coverImage})` }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="text-[10px] font-mono text-[var(--primary,#119dff)] tracking-widest uppercase">{post.category}</span>
                                                <span className="text-[10px] font-mono text-gray-600">•</span>
                                                <span className="text-[10px] font-mono text-gray-500">{post.readTime}</span>
                                            </div>
                                            <h3 className="text-lg font-bold mb-3 group-hover:text-[var(--primary,#119dff)] transition-colors leading-snug">
                                                {post.title}
                                            </h3>
                                            <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                                                {post.excerpt}
                                            </p>
                                            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                                                <span className="text-xs font-mono text-gray-500">{post.author}</span>
                                                <span className="text-xs font-mono text-gray-600">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </section>
                ))}

                {/* Orphan articles (not linked to any hub) */}
                {orphans.length > 0 && (
                    <section className="mt-24">
                        <div className="flex items-center gap-4 px-6 mb-12">
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                            <span className="text-[10px] font-mono tracking-[0.3em] text-gray-600 uppercase">More Insights</span>
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        </div>
                        <div className="grid md:grid-cols-2 gap-6 px-6">
                            {orphans.map((post) => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}`}
                                    className="group glass-panel rounded-2xl overflow-hidden border border-white/5 hover:border-[var(--primary,#119dff)]/30 transition-all duration-500 hover:-translate-y-1"
                                >
                                    <div className="relative aspect-[16/9] overflow-hidden">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                            style={{ backgroundImage: `url(${post.coverImage})` }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-[10px] font-mono text-[var(--primary,#119dff)] tracking-widest uppercase">{post.category}</span>
                                            <span className="text-[10px] font-mono text-gray-600">•</span>
                                            <span className="text-[10px] font-mono text-gray-500">{post.readTime}</span>
                                        </div>
                                        <h3 className="text-lg font-bold mb-3 group-hover:text-[var(--primary,#119dff)] transition-colors leading-snug">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                                            <span className="text-xs font-mono text-gray-500">{post.author}</span>
                                            <span className="text-xs font-mono text-gray-600">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}

