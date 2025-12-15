import type { Metadata } from "next";
import { CaseStudies } from "@/components/sections/case-studies";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Case Studies – Ledger1",
  description: "Real results from restaurants and hospitality using Ledger1 and Varuni. Explore success stories, metrics, and testimonials.",
  alternates: { canonical: "https://ledger1.ai/case-studies" },
  openGraph: {
    title: "Case Studies – Ledger1",
    description: "Real results from restaurants and hospitality using Ledger1 and Varuni.",
    url: "https://ledger1.ai/case-studies",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies – Ledger1",
    description: "Real results from restaurants and hospitality using Ledger1 and Varuni.",
  },
};

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm text-primary mb-4">Proof</div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Customer Stories</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">See how operators achieve extraordinary results with Ledger1’s AI-powered platform.</p>
        </div>
      </section>
      <CaseStudies />
      <Footer />
    </div>
  );
}


