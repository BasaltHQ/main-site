import type { Metadata } from "next";
import { FeaturesShowcase } from "@/components/sections/features-showcase";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Features – Ledger1",
  description: "Explore Ledger1's modular, AI-assisted ERP features: Varuni AI agent, industry packs, enterprise access controls, operations analytics, scheduling, and integrations.",
  alternates: { canonical: "https://ledger1.ai/features" },
  openGraph: {
    title: "Features – Ledger1",
    description: "Explore Ledger1's modular, AI-assisted ERP features.",
    url: "https://ledger1.ai/features",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Features – Ledger1",
    description: "Explore Ledger1's modular, AI-assisted backoffice features.",
  },
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm text-primary mb-4">Product</div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Platform Features</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">Everything you need to operate with clarity—from AI assistants to analytics, scheduling, and integrations.</p>
        </div>
      </section>
      <FeaturesShowcase />
      <Footer />
    </div>
  );
}
