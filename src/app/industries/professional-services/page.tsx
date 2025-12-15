import { Metadata } from "next";
import Link from "next/link";
import { Briefcase, Users, Clock, Sparkles, Brain, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "AI-Powered Professional Services ERP | 84% More Billable Hours | Ledger1",
  description: "Transform consulting & services with AI automation. 91% time tracking accuracy, $495K average savings. Smart resource management for professional firms.",
  keywords: "AI professional services ERP, smart time tracking, automated project billing, AI resource management, intelligent consulting software",
  openGraph: {
    title: "AI-Powered Professional Services ERP | Ledger1",
    description: "84% more billable hours captured, 91% accuracy",
    type: "website",
  },
};

export default function ProfessionalServicesIndustryPage() {
  const benefits = [
    {
      icon: Brain,
      title: "AI-Powered Time Capture",
      description: "Machine learning automatically tracks billable activities with 91% accuracy, suggests time entries based on patterns, and captures 84% more billable hours that would otherwise be lost.",
    },
    {
      icon: Users,
      title: "Intelligent Resource Allocation",
      description: "AI analyzes team skills, availability, and project requirements to optimize staffing—increasing utilization rates by 67% while preventing burnout and maintaining quality.",
    },
    {
      icon: Sparkles,
      title: "Predictive Project Profitability",
      description: "Advanced algorithms forecast project outcomes, identify at-risk engagements early, and recommend corrective actions—improving margins by 41% across all projects.",
    },
    {
      icon: Clock,
      title: "Smart Billing Automation",
      description: "AI generates accurate invoices, applies correct billing rates, handles complex arrangements, and sends payment reminders—reducing AR cycles by 58% and improving cash flow.",
    },
  ];

  const features = [
    "AI time tracking & suggestions",
    "Smart resource optimization",
    "Predictive project analytics",
    "Automated billing generation",
    "Intelligent capacity planning",
    "AI client profitability analysis",
    "Smart retainer management",
    "Real-time utilization tracking",
  ];

  const roiMetrics = [
    { value: "84%", label: "More Billable Hours", description: "AI captures previously lost time" },
    { value: "91%", label: "Time Accuracy", description: "ML-powered activity tracking" },
    { value: "$495K", label: "Annual Savings", description: "Average ROI for 50-person firm" },
    { value: "67%", label: "Higher Utilization", description: "AI-optimized resource allocation" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-background to-background overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="mx-auto max-w-7xl relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
              <Briefcase className="h-4 w-4" />
              Professional Services • AI-Powered
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Maximize Profitability with
              <span className="block bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent mt-2">
                AI-Driven Service Delivery
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Transform your professional services firm with AI-powered automation capturing 84% more billable hours and delivering 91% time tracking accuracy. Save an average of $495K annually with intelligent resource management and predictive analytics.
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
              Intelligent Automation for Service Excellence
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI doesn't just track time—it maximizes billable hours, optimizes resources, and grows profitability
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
              AI-Powered Professional Services Features
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
                Proven Professional Services ROI
              </h2>
              <p className="text-lg text-muted-foreground">
                Real results from AI-powered service delivery
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-lg bg-background/50">
                <div className="text-4xl font-bold text-primary mb-2">5 months</div>
                <div className="text-sm font-medium mb-1">Average payback period</div>
                <div className="text-xs text-muted-foreground">Fastest ROI in services</div>
              </div>
              <div className="text-center p-6 rounded-lg bg-background/50">
                <div className="text-4xl font-bold text-primary mb-2">58%</div>
                <div className="text-sm font-medium mb-1">Faster AR collection</div>
                <div className="text-xs text-muted-foreground">AI-automated billing</div>
              </div>
              <div className="text-center p-6 rounded-lg bg-background/50">
                <div className="text-4xl font-bold text-primary mb-2">41%</div>
                <div className="text-sm font-medium mb-1">Margin improvement</div>
                <div className="text-xs text-muted-foreground">Predictive profitability</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Maximize Your Firm's Profitability?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join professional services firms capturing 84% more billable hours with Ledger1's AI-first platform
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
