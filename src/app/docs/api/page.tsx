import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "API Documentation – Ledger1 (Coming Soon)",
  description: "GraphQL schema, REST endpoints, webhooks, auth, and SDKs. Coming soon.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://ledger1.ai/docs/api" },
};

export default function ApiDocsComingSoonPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-sm bg-primary/10 text-primary px-3 py-1 rounded-full mb-4">Coming Soon</div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">API Documentation</h1>
          <p className="text-lg text-muted-foreground">GraphQL schema, REST endpoints, webhooks, authentication, and SDKs are on the way. Join the waitlist below.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="glass-pane rounded-xl p-6">
            <form action="https://forms.gle" method="get" className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input className="w-full rounded-md bg-muted border border-border px-3 py-2" placeholder="your@email.com" />
              </div>
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-semibold">Join Waitlist</button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}


