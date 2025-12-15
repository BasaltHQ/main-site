import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Press – Ledger1",
  description: "Press resources and media inquiries for Ledger1.",
  alternates: { canonical: "https://ledger1.ai/press" },
};

export default function PressPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Press</h1>
          <p className="text-lg text-muted-foreground mb-6">For media inquiries, contact <a href="mailto:info@theutilitycompany.co" className="underline">info@theutilitycompany.co</a>.</p>
          <div className="glass-pane rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-2">Brand Assets</h2>
            <ul className="list-disc pl-5 text-muted-foreground">
              <li>Logos: /l1logows.png, /socialbanner.jpg</li>
              <li>Company: Ledger1 (a Utility Company product)</li>
              <li>Location: Santa Fe, New Mexico</li>
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}


