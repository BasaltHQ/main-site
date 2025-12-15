import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "System Status – Ledger1",
  description: "Current system status and uptime information.",
  alternates: { canonical: "https://ledger1.ai/status" },
};

export default function StatusPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">System Status</h1>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-sm">All systems operational</div>
        </div>
      </section>
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="glass-pane rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-2">Components</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full"></span> API</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full"></span> Web App</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full"></span> Integrations</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full"></span> Databases</li>
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}


