import { Metadata } from "next";
import Link from "next/link";
import { Heart, Shield, TrendingUp, Sparkles, Brain, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "AI-Powered Healthcare ERP | 78% Less Manual Work | Ledger1",
  description: "Transform healthcare finances with AI automation. 95% faster claims processing, $430K average savings. HIPAA-compliant ERP for hospitals, clinics, and medical practices.",
  keywords: "AI healthcare ERP, automated medical billing, HIPAA compliant accounting, hospital financial software, AI revenue cycle management",
  openGraph: {
    title: "AI-Powered Healthcare ERP | Ledger1",
    description: "78% reduction in manual work, 95% faster claims processing",
    type: "website",
  },
};

export default function HealthcareIndustryPage() {
  const benefits = [
    {
      icon: Brain,
      title: "AI-Powered Revenue Cycle",
      description: "Intelligent automation processes claims 95% faster with AI-driven coding suggestions, denial prediction, and automated follow-ups that recover 40% more revenue.",
    },
    {
      icon: Shield,
      title: "Intelligent Compliance",
      description: "AI continuously monitors for HIPAA compliance, automatically flags anomalies, and provides real-time audit trails—reducing compliance violations by 99%.",
    },
    {
      icon: Sparkles,
      title: "Predictive Analytics",
      description: "Machine learning forecasts cash flow patterns, predicts patient payment behavior, and optimizes collection strategies for 35% improvement in receivables.",
    },
    {
      icon: TrendingUp,
      title: "Automated Workflows",
      description: "AI handles 78% of manual data entry, automatically reconciles accounts, and provides intelligent recommendations that save 25+ hours per week.",
    },
  ];

  const features = [
    "AI-powered insurance claim processing",
    "Intelligent denial prediction & prevention",
    "Automated patient billing with payment plans",
    "Real-time compliance monitoring",
    "Predictive cash flow analytics",
    "Smart supply chain optimization",
    "Automated revenue cycle management",
    "AI-driven financial insights dashboard",
  ];

  const roiMetrics = [
    { value: "78%", label: "Less Manual Work", description: "AI automation eliminates repetitive tasks" },
    { value: "95%", label: "Faster Processing", description: "Claims processed in minutes, not days" },
    { value: "$430K", label: "Annual Savings", description: "Average ROI for 50-bed facility" },
    { value: "40%", label: "Revenue Recovery", description: "More denied claims successfully recovered" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-background to-background overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="mx-auto max-w-7xl relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
              <Heart className="h-4 w-4" />
              Healthcare Industry • AI-Powered
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              AI-Driven Financial Management for
              <span className="block bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent mt-2">
                Healthcare Providers
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Transform healthcare financial operations with AI-powered automation that delivers 78% reduction in manual work and 95% faster claims processing. Save an average of $430K annually while maintaining HIPAA compliance.
            </p>

            {/* ROI Metrics Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
              {roiMetrics.map((metric, index) => (
                <div key={index} className="p-4 rounded-lg bg-card border border-border">
                  <div className="text-3xl font-bold text-primary mb-1">{metric.value}</div>
                  <div className="text-sm font-semibold mb-1">{metric.label}</div>
                  <div className="text-xs text-muted-foreground">{metric.description}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://calendly.com/founders-tuc/ledger1-info-session"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-primary/80 px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Sparkles className="h-5 w-5" />
                See AI in Action
              </a>
              <Link
                href="#features"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-primary/20 bg-card px-8 py-4 text-base font-medium hover:bg-primary/5 hover:border-primary/40 transition-all"
              >
                Explore AI Features
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AI Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Brain className="h-4 w-4" />
              AI-First Technology
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Intelligent Automation That Transforms Healthcare Finance
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI doesn't just digitize—it thinks, learns, and optimizes your entire revenue cycle
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group p-8 rounded-xl border border-border bg-card hover:shadow-2xl hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-muted/30 to-background">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              AI-Powered Healthcare Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every feature enhanced with intelligent automation and machine learning
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-lg bg-background border border-border hover:border-primary/50 hover:shadow-lg transition-all"
              >
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-background to-background border border-primary/20 p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Massive ROI, Proven Results
              </h2>
              <p className="text-lg text-muted-foreground">
                See the impact AI-powered financial management delivers
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-lg bg-background/50">
                <div className="text-4xl font-bold text-primary mb-2">6 months</div>
                <div className="text-sm font-medium mb-1">Average payback period</div>
                <div className="text-xs text-muted-foreground">ROI realized in first year</div>
              </div>
              <div className="text-center p-6 rounded-lg bg-background/50">
                <div className="text-4xl font-bold text-primary mb-2">25+ hrs</div>
                <div className="text-sm font-medium mb-1">Saved per week per staff</div>
                <div className="text-xs text-muted-foreground">Reinvested in patient care</div>
              </div>
              <div className="text-center p-6 rounded-lg bg-background/50">
                <div className="text-4xl font-bold text-primary mb-2">99.8%</div>
                <div className="text-sm font-medium mb-1">Claim accuracy rate</div>
                <div className="text-xs text-muted-foreground">AI-powered validation</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Experience AI-Powered Healthcare Finance?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join leading healthcare organizations achieving 78% efficiency gains with Ledger1's AI-first platform
          </p>
          <a
            href="https://calendly.com/founders-tuc/ledger1-info-session"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-primary/80 px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Sparkles className="h-5 w-5" />
            Schedule Your AI Demo
          </a>
        </div>
      </section>
    </div>
  );
}
