import type { Metadata } from "next";
import { PricingSection } from "@/components/sections/pricing-section";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Pricing – Ledger1",
  description: "Simple, transparent pricing for Ledger1. Starter, Pro, and Scale plans with optional add-ons and enterprise options.",
  alternates: { canonical: "https://ledger1.ai/pricing" },
  openGraph: {
    title: "Pricing – Ledger1",
    description: "Simple, transparent pricing for Ledger1.",
    url: "https://ledger1.ai/pricing",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing – Ledger1",
    description: "Simple, transparent pricing for Ledger1.",
  },
};

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm text-primary mb-4">Plans</div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Pricing</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">Choose a plan that fits your operations today and scales with you tomorrow.</p>
        </div>
      </section>
      <PricingSection />
      <Footer />
    </div>
  );
}


