import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Bot, MessageSquare, Users, Utensils, Square as SquareIcon, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Integrations – Ledger1",
  description: "Connect Ledger1 to POS, ERP, HRIS, messaging, and analytics stacks. Toast, 7shifts, QuickBooks, Square, Slack, Teams, and more.",
  alternates: { canonical: "https://ledger1.ai/integrations" },
  openGraph: {
    title: "Integrations – Ledger1",
    description: "Connect Ledger1 to POS, ERP, HRIS, messaging, and analytics stacks.",
    url: "https://ledger1.ai/integrations",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Integrations – Ledger1",
    description: "Connect Ledger1 to POS, ERP, HRIS, messaging, and analytics stacks.",
  },
};

const integrations = [
  { name: "Toast POS", icon: Utensils, category: "POS" },
  { name: "7shifts", icon: Users, category: "Scheduling" },
  { name: "QuickBooks", icon: BookOpen, category: "Accounting" },
  { name: "Square", icon: SquareIcon, category: "POS" },
  { name: "Slack", icon: MessageSquare, category: "Messaging" },
  { name: "Microsoft Teams", icon: Users, category: "Messaging" },
  { name: "GraphQL API", icon: Bot, category: "Developers" },
];

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm text-primary mb-4">Ecosystem</div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Integrations</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">Connect your systems: POS, ERP, HRIS, messaging, analytics, and custom apps via GraphQL and webhooks.</p>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((int) => (
              <div key={int.name} className="glass-pane rounded-xl p-6 text-center">
                <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4">
                  <int.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-1">{int.name}</h3>
                <p className="text-xs text-muted-foreground">{int.category}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10 text-sm text-muted-foreground">
            Don’t see your system? Contact us at <a href="mailto:info@theutilitycompany.co" className="underline">info@theutilitycompany.co</a>.
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}


