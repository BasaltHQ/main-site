import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { getAllPosts } from "@/lib/blog/posts";

export const metadata: Metadata = {
  title: "Blog – BasaltHQ",
  description: "Product announcements, research, and customer stories.",
  alternates: { canonical: "https://basalthq.com/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <div className="min-h-screen">
      <section className="relative py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Blog</h1>
          <p className="text-lg text-muted-foreground">Product updates and industry perspectives.</p>
        </div>
      </section>
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center text-muted-foreground">Posts coming soon.</div>
          ) : (
            <ul className="space-y-8">
              {posts.map((post) => {
                const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                });
                return (
                  <li key={post.slug} className="border border-border/50 rounded-xl p-6 bg-card/40">
                    <div className="text-xs text-muted-foreground mb-2">{formattedDate}</div>
                    <h2 className="text-2xl font-semibold mb-2">
                      <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-muted-foreground">{post.description}</p>
                    <div className="mt-4">
                      <Link href={`/blog/${post.slug}`} className="text-sm font-medium text-primary hover:underline">
                        Read more →
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}


