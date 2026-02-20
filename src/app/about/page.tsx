import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/about";
import { TeamSection } from "@/components/sections/team-section";

export const metadata: Metadata = {
  title: "About Us – BasaltHQ",
  description: "Learn about BasaltHQ's mission to empower Main Street businesses with Fortune 500 technology. Meet our team driving innovation in enterprise software.",
  alternates: { canonical: "https://basalthq.com/about" },
  openGraph: {
    title: "About Us – BasaltHQ",
    description: "Learn about BasaltHQ's mission to empower Main Street businesses.",
    url: "https://basalthq.com/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us – BasaltHQ",
    description: "Learn about BasaltHQ's mission to empower Main Street businesses.",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm text-primary mb-4">Company</div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">About BasaltHQ</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">Empowering Main Street with enterprise-grade technology—building the future of business operations.</p>
        </div>
      </section>
      <AboutSection />
      <TeamSection />
    </div>
  );
}
