import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '@/lib/blog/posts';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return BLOG_POSTS.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = BLOG_POSTS.find((p) => p.slug === slug);

    if (!post) {
        return { title: 'Post Not Found' };
    }

    return {
        title: `${post.title} | BasaltHQ Blog`,
        description: post.metaDescription,
    };
}

export default async function BlogPost({ params }: Props) {
    const { slug } = await params;
    const post = BLOG_POSTS.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    const related = BLOG_POSTS.filter(p => post.relatedSlugs.includes(p.slug));

    const jsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.metaDescription,
            author: {
                '@type': 'Person',
                name: post.author,
            },
            datePublished: post.date,
            image: `https://basalthq.com${post.coverImage}`,
            publisher: {
                '@type': 'Organization',
                name: 'BasaltHQ',
            }
        },
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://basalthq.com' },
                { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://basalthq.com/blog' },
                { '@type': 'ListItem', position: 3, name: post.title },
            ]
        }
    ];

    // Split content into sections for image interleaving
    const sections = post.content.split('\n\n## ').map((s, i) => i === 0 ? s : '## ' + s);

    return (
        <div className="min-h-screen bg-black text-white selection:bg-[#119dff] selection:text-white font-sans">
            <StructuredData data={jsonLd} />

            <div className="relative pt-28 overflow-hidden">
                {/* Hero Cover with side vignette */}
                <div className="relative max-w-4xl mx-auto px-6">
                    <div className="relative rounded-2xl overflow-hidden">
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-auto object-cover max-h-[450px]"
                        />
                        {/* Side vignettes */}
                        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent" />
                        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent" />
                        {/* Bottom vignette */}
                        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
                        {/* Top vignette */}
                        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black to-transparent" />
                    </div>
                </div>

                <main className="max-w-4xl mx-auto relative z-10 px-6 mt-8">
                    {/* Post Meta */}
                    <div className="mb-8">
                        <Link href="/blog" className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-2 mb-8">
                            ← Back to Blog
                        </Link>

                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            {post.isHub && (
                                <span className="px-3 py-1 bg-[#119dff] text-black text-[10px] font-mono tracking-wider rounded-full font-bold">
                                    HUB ARTICLE
                                </span>
                            )}
                            <span className="text-xs font-mono text-[#119dff] tracking-widest uppercase">{post.category}</span>
                            <span className="text-xs font-mono text-gray-500">{post.readTime}</span>
                            <span className="text-xs font-mono text-gray-600">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                            {post.title}
                        </h1>

                        <div className="flex items-center gap-4 pb-8 border-b border-white/10">
                            <div className="w-10 h-10 rounded-full bg-[#119dff]/20 flex items-center justify-center text-[#119dff] font-bold text-sm">
                                {post.author.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                                <span className="text-sm font-semibold text-white">{post.author}</span>
                                <p className="text-xs text-gray-500">BasaltHQ</p>
                            </div>
                        </div>
                    </div>

                    {/* Article Body */}
                    <article className="prose prose-invert prose-lg max-w-none">
                        {sections.map((section, index) => (
                            <div key={index}>
                                <div
                                    className="blog-content text-gray-300 leading-relaxed"
                                    dangerouslySetInnerHTML={{
                                        __html: section
                                            .replace(/^## (.+)$/gm, '<h2 class="text-2xl md:text-3xl font-bold text-white mt-16 mb-6">$1</h2>')
                                            .replace(/^### (.+)$/gm, '<h3 class="text-xl md:text-2xl font-bold text-white mt-10 mb-4">$1</h3>')
                                            .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                                            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#119dff] hover:underline transition-colors">$1</a>')
                                            .replace(/^- \*\*(.+?)\*\*(.*)$/gm, '<div class="flex gap-3 items-start my-3"><span class="w-1.5 h-1.5 bg-[#119dff] rounded-full mt-2.5 flex-shrink-0"></span><span><strong class="text-white">$1</strong>$2</span></div>')
                                            .replace(/^- (.+)$/gm, '<div class="flex gap-3 items-start my-3"><span class="w-1.5 h-1.5 bg-[#119dff] rounded-full mt-2.5 flex-shrink-0"></span><span>$1</span></div>')
                                            .replace(/^(\d+)\. \*\*(.+?)\*\*(.*)$/gm, '<div class="flex gap-3 items-start my-3"><span class="text-[#119dff] font-mono text-sm font-bold min-w-[1.5rem]">$1.</span><span><strong class="text-white">$2</strong>$3</span></div>')
                                            .replace(/\n\n/g, '</p><p class="mb-6">')
                                    }}
                                />

                                {/* Interleave body images */}
                                {index > 0 && index <= post.bodyImages.length && (
                                    <div className="my-12 rounded-xl overflow-hidden border border-white/10 relative">
                                        <Image
                                            src={post.bodyImages[index - 1]}
                                            alt={`${post.title} illustration ${index}`}
                                            width={896}
                                            height={504}
                                            className="w-full h-auto"
                                            loading="lazy"
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </article>

                    {/* Related Articles */}
                    {related.length > 0 && (
                        <div className="mt-24 pt-12 pb-24 border-t border-white/10">
                            <h3 className="text-xs font-mono tracking-widest text-gray-500 mb-8">RELATED ARTICLES</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {related.map(rel => (
                                    <Link
                                        key={rel.slug}
                                        href={`/blog/${rel.slug}`}
                                        className="group glass-panel rounded-xl p-6 border border-white/5 hover:border-[#119dff]/30 transition-all duration-300"
                                    >
                                        <span className="text-[10px] font-mono text-[#119dff] tracking-widest uppercase">{rel.category}</span>
                                        <h4 className="text-lg font-bold mt-2 mb-2 group-hover:text-[#119dff] transition-colors leading-snug">
                                            {rel.title}
                                        </h4>
                                        <p className="text-gray-500 text-sm line-clamp-2">{rel.excerpt}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Back to Hub CTA */}
                    {!post.isHub && (() => {
                        const parentHub = BLOG_POSTS.find(p => p.isHub && post.relatedSlugs.includes(p.slug));
                        if (!parentHub) return null;
                        return (
                            <div className="mt-12 mb-24 text-center">
                                <Link
                                    href={`/blog/${parentHub.slug}`}
                                    className="inline-block px-8 py-4 bg-[#119dff]/10 border border-[#119dff]/30 rounded-xl text-[#119dff] font-mono text-sm tracking-wider hover:bg-[#119dff]/20 transition-all"
                                >
                                    ← READ THE HUB ARTICLE: {parentHub.title.toUpperCase()}
                                </Link>
                            </div>
                        );
                    })()}
                </main>
            </div>
        </div>
    );
}
