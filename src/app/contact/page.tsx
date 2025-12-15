import type { Metadata } from "next";
import { CTASection } from "@/components/sections/cta-section";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Contact – Ledger1",
  description: "Get in touch with Ledger1. Book a demo, contact sales, or schedule an info session.",
  alternates: { canonical: "https://ledger1.ai/contact" },
  openGraph: {
    title: "Contact – Ledger1",
    description: "Book a demo or contact our team.",
    url: "https://ledger1.ai/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact – Ledger1",
    description: "Book a demo or contact our team.",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <CTASection />
      <Footer />
    </div>
  );
}