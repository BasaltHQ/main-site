import { Metadata } from "next";
import Link from "next/link";
import { HardHat, FileText, Calculator, Sparkles, Brain, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "AI-Powered Construction ERP | 71% Faster Project Delivery | Ledger1",
  description: "Transform construction management with AI automation. 86% cost accuracy, $615K average savings. Smart job costing and predictive analytics for contractors.",
  keywords: "AI construction ERP, smart job costing, automated project tracking, AI bid management, intelligent construction analytics",
  openGraph: {
    title: "AI-Powered Construction ERP | Ledger1",
    description: "71% faster project delivery, 86% cost accuracy",
    type: "website",
  },
};

export default function ConstructionIndustryPage() {
  const benefits = [
    {
      icon: Brain,
      title: "AI-Powered Job Costing",
      description: "Machine learning analyzes historical project data to predict costs with 86% accuracy, automatically tracks expenses in real-time, and identifies cost overruns before they impact margins.",
    },
    {
      icon: Calculator,
      title: "Intelligent Bid Optimization",
      description: "AI analyzes past bids, market conditions, and material costs to recommend optimal pricing—increasing win rates by 43% while maintaining profitability.",
    },
    {
      icon: Sparkles,
      title: "Predictive Project Management",
      description: "Advanced algorithms forecast project timelines, predict delays with 79% accuracy, and automatically optimize resource allocation—delivering projects 71% faster.",
    },
    {
      icon: FileText,
      title: "Smart Change Order Management",
      description: "AI automatically detects scope changes, calculates cost impacts, and streamlines approval workflows—recovering 92% of additional costs from change orders.",
    },
  ];

  const features = [
    "AI job costing predictions",
    "Smart bid management",
    "Automated change order tracking",
    "Predictive timeline forecasting",
    "Intelligent subcontractor management",
    "Real-time equipment cost tracking",
    "AI-driven material optimization",
    "Automated compliance reporting",
  ];

  const roiMetrics = [
    { value: "71%", label: "Faster Delivery", description: "AI-optimized project scheduling" },
    { value: "86%", label: "Cost Accuracy", description: "Predictive job costing eliminates overruns" },
    { value: "$615K", label: "Annual Savings", description: "Average ROI for mid-size contractor" },
    { value: "92%", label: "Change Order Recovery", description: "AI captures all additional costs" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-background to-background overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="mx-auto max-w-7xl relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
              <HardHat className="h-4 w-4" />
              Construction Industry • AI-Powered
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Smart Construction with
              <span className="block bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent mt-2">
                AI-Driven Project Intelligence
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Transform your construction business with AI-powered automation delivering 71% faster project delivery and 86% cost accuracy. Save an average of $615K annually with intelligent job costing and predictive project management.
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
              Intelligent Automation for Construction Excellence
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI doesn't just track projects—it predicts outcomes, prevents overruns, and maximizes profitability
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
              AI-Powered Construction Features
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
                Proven Construction ROI
              </h2>
              <p className="text-lg text-muted-foreground">
                Real results from AI-powered construction management
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-lg bg-background/50">
                <div className="text-4xl font-bold text-primary mb-2">9 months</div>
                <div className="text-sm font-medium mb-1">Average payback period</div>
                <div className="text-xs text-muted-foreground">ROI realized within first year</div>
              </div>
              <div className="text-center p-6 rounded-lg bg-background/50">
                <div className="text-4xl font-bold text-primary mb-2">43%</div>
                <div className="text-sm font-medium mb-1">Higher bid win rate</div>
                <div className="text-xs text-muted-foreground">AI-optimized pricing</div>
              </div>
              <div className="text-center p-6 rounded-lg bg-background/50">
                <div className="text-4xl font-bold text-primary mb-2">79%</div>
                <div className="text-sm font-medium mb-1">Delay prediction accuracy</div>
                <div className="text-xs text-muted-foreground">Proactive problem solving</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Build Smarter Projects?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join contractors achieving 71% faster delivery with Ledger1's AI-first platform
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
