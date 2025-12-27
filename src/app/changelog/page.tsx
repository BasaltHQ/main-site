import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Changelog – BasaltHQ",
  description: "Product updates, new features, and improvements.",
  alternates: { canonical: "https://basalthq.com/changelog" },
};

const entries = [
  { date: "2025-01-10", title: "Standalone pages & SEO", items: ["Features, Pricing, About, Contact, Case Studies pages", "Privacy, Terms, Security statements", "Docs & Help placeholders", "Status & Changelog"] },
];

export default function ChangelogPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Changelog</h1>
          <p className="text-lg text-muted-foreground">What’s new in BasaltHQ.</p>
        </div>
      </section>
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-6">
          {entries.map((entry) => (
            <div key={entry.date} className="glass-pane rounded-xl p-6">
              <div className="text-sm text-muted-foreground">{entry.date}</div>
              <h2 className="text-xl font-semibold mb-2">{entry.title}</h2>
              <ul className="list-disc pl-5 text-sm text-muted-foreground">
                {entry.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}


