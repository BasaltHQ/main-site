import { Metadata } from "next";
import Link from "next/link";
import { Code, Rocket, Users, Sparkles, Brain, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "AI-Powered Tech Company ERP | 92% Faster Financial Close | Ledger1",
  description: "Transform startup & SaaS operations with AI automation. 97% revenue recognition accuracy, $450K average savings. Smart financial management for tech companies.",
  keywords: "AI tech company ERP, startup accounting, SaaS billing automation, AI revenue recognition, intelligent financial software",
  openGraph: {
    title: "AI-Powered Technology ERP | Ledger1",
    description: "92% faster financial close, 97% accuracy",
    type: "website",
  },
};

export default function TechnologyIndustryPage() {
  const benefits = [
    {
      icon: Brain,
      title: "AI Revenue Recognition",
      description: "Machine learning automates ASC 606 compliance, handles complex subscription models, and processes revenue with 97% accuracy—eliminating manual errors and audit risks.",
    },
    {
      icon: Rocket,
      title: "Intelligent Cash Flow Forecasting",
      description: "AI analyzes burn rate, runway, and growth metrics to predict cash needs with 94% accuracy—helping you plan fundraising and manage resources proactively.",
    },
    {
      icon: Sparkles,
      title: "Smart Subscription Analytics",
      description: "Advanced algorithms track MRR, ARR, churn, and LTV automatically—providing real-time insights that improve retention by 46% and optimize pricing strategies.",
    },
    {
      icon: Users,
      title: "Automated Investor Reporting",
      description: "AI generates investor-ready financial reports, cap tables, and KPI dashboards in minutes—reducing reporting time by 92% and improving stakeholder confidence.",
    },
  ];

  const features = [
    "AI subscription billing automation",
    "Smart revenue recognition (ASC 606)",
    "Automated MRR/ARR tracking",
    "Predictive cash flow forecasting",
    "AI-powered cap table management",
    "Real-time burn rate monitoring",
    "Intelligent KPI dashboards",
    "Multi-currency support",
  ];

  const roiMetrics = [
    { value: "92%", label: "Faster Close", description: "AI-automated financial processes" },
    { value: "97%", label: "Accuracy", description: "ML-powered revenue recognition" },
    { value: "$450K", label: "Annual Savings", description: "Average ROI for Series A startup" },
    { value: "46%", label: "Better Retention", description: "AI subscription analytics" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-background to-background overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="mx-auto max-w-7xl relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
              <Code className="h-4 w-4" />
              Technology Industry • AI-Powered
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Financial Intelligence for
              <span className="block bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent mt-2">
                High-Growth Tech Companies
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Scale your tech company with AI-powered automation delivering 92% faster financial close and 97% revenue recognition accuracy. Save an average of $450K annually with intelligent forecasting and automated reporting.
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
              Intelligent Automation for Tech Scale-Ups
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI doesn't just process transactions—it powers growth, impresses investors, and scales with you
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
              AI-Powered Tech Company Features
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
                Proven Tech Company ROI
              </h2>
              <p className="text-lg text-muted-foreground">
                Real results from AI-powered financial operations
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-lg bg-background/50">
                <div className="text-4xl font-bold text-primary mb-2">3 months</div>
                <div className="text-sm font-medium mb-1">Average payback period</div>
                <div className="text-xs text-muted-foreground">Fastest ROI for startups</div>
              </div>
              <div className="text-center p-6 rounded-lg bg-background/50">
                <div className="text-4xl font-bold text-primary mb-2">94%</div>
                <div className="text-sm font-medium mb-1">Forecast accuracy</div>
                <div className="text-xs text-muted-foreground">AI cash flow predictions</div>
              </div>
              <div className="text-center p-6 rounded-lg bg-background/50">
                <div className="text-4xl font-bold text-primary mb-2">92%</div>
                <div className="text-sm font-medium mb-1">Less reporting time</div>
                <div className="text-xs text-muted-foreground">Automated investor reports</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Scale Your Tech Company?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join innovative startups achieving 92% faster close with Ledger1's AI-first platform
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
