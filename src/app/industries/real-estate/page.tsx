import { Metadata } from "next";
import Link from "next/link";
import { Building2, Home, DollarSign, Sparkles, Brain, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "AI-Powered Real Estate ERP | 88% Faster Lease Processing | Ledger1",
  description: "Transform property management with AI automation. 94% rent collection rate, $340K average savings. Smart portfolio management for real estate professionals.",
  keywords: "AI real estate ERP, smart property management, automated lease tracking, AI portfolio analytics, intelligent real estate software",
  openGraph: {
    title: "AI-Powered Real Estate ERP | Ledger1",
    description: "88% faster lease processing, 94% collection rate",
    type: "website",
  },
};

export default function RealEstateIndustryPage() {
  const benefits = [
    {
      icon: Brain,
      title: "AI-Powered Tenant Screening",
      description: "Machine learning analyzes credit history, rental patterns, and risk factors to predict tenant reliability with 96% accuracy—reducing defaults by 73% and protecting your investment.",
    },
    {
      icon: Home,
      title: "Intelligent Property Analytics",
      description: "AI tracks market trends, occupancy rates, and maintenance costs to optimize rental pricing—increasing ROI by 52% while maintaining competitive rates.",
    },
    {
      icon: Sparkles,
      title: "Predictive Maintenance",
      description: "Advanced algorithms forecast maintenance needs, schedule preventive repairs, and reduce emergency costs by 67%—extending property lifespan and tenant satisfaction.",
    },
    {
      icon: DollarSign,
      title: "Smart Rent Collection",
      description: "AI automates payment reminders, predicts late payments, and optimizes collection strategies—achieving 94% on-time collection rate and reducing AR by 61%.",
    },
  ];

  const features = [
    "AI tenant screening & scoring",
    "Smart lease management",
    "Automated rent collection",
    "Predictive maintenance scheduling",
    "AI property valuation",
    "Portfolio performance analytics",
    "Intelligent vacancy prediction",
    "Real-time cash flow forecasting",
  ];

  const roiMetrics = [
    { value: "88%", label: "Faster Processing", description: "AI-automated lease workflows" },
    { value: "94%", label: "Collection Rate", description: "Smart payment reminders & tracking" },
    { value: "$340K", label: "Annual Savings", description: "Average ROI for 50-unit portfolio" },
    { value: "73%", label: "Fewer Defaults", description: "AI-powered tenant screening" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-background to-background overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="mx-auto max-w-7xl relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
              <Building2 className="h-4 w-4" />
              Real Estate Industry • AI-Powered
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Smart Property Management with
              <span className="block bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent mt-2">
                AI-Driven Intelligence
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Transform your real estate portfolio with AI-powered automation delivering 88% faster lease processing and 94% rent collection rate. Save an average of $340K annually with intelligent property management and predictive analytics.
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
              Intelligent Automation for Real Estate Excellence
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI doesn't just manage properties—it predicts trends, optimizes returns, and maximizes portfolio value
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
              AI-Powered Real Estate Features
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
                Proven Real Estate ROI
              </h2>
              <p className="text-lg text-muted-foreground">
                Real results from AI-powered property management
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-lg bg-background/50">
                <div className="text-4xl font-bold text-primary mb-2">6 months</div>
                <div className="text-sm font-medium mb-1">Average payback period</div>
                <div className="text-xs text-muted-foreground">Fast ROI realization</div>
              </div>
              <div className="text-center p-6 rounded-lg bg-background/50">
                <div className="text-4xl font-bold text-primary mb-2">67%</div>
                <div className="text-sm font-medium mb-1">Lower maintenance costs</div>
                <div className="text-xs text-muted-foreground">Predictive AI scheduling</div>
              </div>
              <div className="text-center p-6 rounded-lg bg-background/50">
                <div className="text-4xl font-bold text-primary mb-2">52%</div>
                <div className="text-sm font-medium mb-1">ROI improvement</div>
                <div className="text-xs text-muted-foreground">AI pricing optimization</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Optimize Your Property Portfolio?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join real estate professionals achieving 94% collection rates with Ledger1's AI-first platform
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
