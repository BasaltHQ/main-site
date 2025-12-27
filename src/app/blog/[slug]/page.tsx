import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { getAllPosts, getPostBySlug } from "@/lib/blog/posts";

type PageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Post not found" };
  const url = `https://basalthq.com/blog/${post.slug}`;
  return {
    title: `${post.title} – BasaltHQ Blog`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) return notFound();

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  const renderContent = (text: string) => {
    const blocks = text.trim().split(/\n{2,}/);
    return (
      <div className="space-y-6 leading-7">
        {blocks.map((block, index) => {
          const trimmed = block.trim();
          // Headings
          if (/^###\s+/.test(trimmed)) {
            return (
              <h3 key={index} className="text-xl font-semibold tracking-tight">{trimmed.replace(/^###\s+/, "")}</h3>
            );
          }
          if (/^##\s+/.test(trimmed)) {
            return (
              <h2 key={index} className="text-2xl font-semibold tracking-tight">{trimmed.replace(/^##\s+/, "")}</h2>
            );
          }
          // Lists
          if (/^-\s+/.test(trimmed)) {
            const items = trimmed.split(/\n/).map((line) => line.replace(/^[-*]\s+/, "").trim()).filter(Boolean);
            return (
              <ul key={index} className="list-disc pl-6 space-y-2">
                {items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );
          }
          // Paragraph
          return (
            <p key={index}>{trimmed}</p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <article className="relative py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary">← Back to Blog</Link>
          </div>
          {post.coverImage && (
            <div className="mb-8 overflow-hidden rounded-xl border border-border/50">
              <Image src={post.coverImage} alt={post.title} width={1200} height={630} className="w-full h-auto" />
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">{post.title}</h1>
          <div className="text-sm text-muted-foreground mb-10 flex items-center gap-2 flex-wrap">
            <span>{formattedDate}</span>
            {post.author && <>
              <span>•</span>
              <span>{post.author}</span>
            </>}
            {post.tags && post.tags.length > 0 && (
              <>
                <span>•</span>
                <div className="flex items-center gap-2">
                  {post.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-full bg-muted text-foreground text-xs border border-border/50">{t}</span>
                  ))}
                </div>
              </>
            )}
          </div>
          {renderContent(post.content)}
        </div>
      </article>
      <Footer />
    </div>
  );
}


