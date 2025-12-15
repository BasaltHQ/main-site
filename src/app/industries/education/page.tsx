import { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, BookOpen, Users, Sparkles, Brain, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "AI-Powered Education ERP | 87% Faster Grant Processing | Ledger1",
  description: "Transform educational finances with AI automation. 95% compliance accuracy, $385K average savings. Smart fund accounting for schools and universities.",
  keywords: "AI education ERP, school accounting software, automated grant management, AI fund accounting, intelligent education analytics",
  openGraph: {
    title: "AI-Powered Education ERP | Ledger1",
    description: "87% faster grant processing, 95% compliance",
    type: "website",
  },
};

export default function EducationIndustryPage() {
  const benefits = [
    {
      icon: Brain,
      title: "AI Fund Accounting",
      description: "Machine learning automatically categorizes transactions across restricted and unrestricted funds with 95% accuracy—ensuring compliance and eliminating manual errors in fund tracking.",
    },
    {
      icon: BookOpen,
      title: "Intelligent Grant Management",
      description: "AI tracks grant spending, monitors compliance requirements, and automates reporting—processing grants 87% faster while maintaining 98% accuracy in allocation and documentation.",
    },
    {
      icon: Sparkles,
      title: "Predictive Budget Planning",
      description: "Advanced algorithms analyze enrollment trends, revenue patterns, and expenditures to forecast budgets with 93% accuracy—helping institutions plan proactively and avoid shortfalls.",
    },
    {
      icon: Users,
      title: "Smart Enrollment Financial Forecasting",
      description: "AI predicts enrollment changes, tuition revenue, and financial aid needs—optimizing resource allocation and improving retention by 44% through data-driven decisions.",
    },
  ];

  const features = [
    "AI fund accounting automation",
    "Smart grant tracking & reporting",
    "Automated compliance monitoring",
    "Predictive budget forecasting",
    "AI tuition billing optimization",
    "Real-time financial aid tracking",
    "Intelligent cost allocation",
    "Multi-campus consolidation",
  ];

  const roiMetrics = [
    { value: "87%", label: "Faster Processing", description: "AI-automated grant workflows" },
    { value: "95%", label: "Compliance Accuracy", description: "ML-powered fund tracking" },
    { value: "$385K", label: "Annual Savings", description: "Average ROI for 2,000-student school" },
    { value: "44%", label: "Better Retention", description: "Predictive financial planning" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-background to-background overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="mx-auto max-w-7xl relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
              <GraduationCap className="h-4 w-4" />
              Education Industry • AI-Powered
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Financial Intelligence for
              <span className="block bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent mt-2">
                Educational Excellence
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Transform educational finances with AI-powered automation delivering 87% faster grant processing and 95% compliance accuracy. Save an average of $385K annually with intelligent fund accounting and predictive planning.
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
              Intelligent Automation for Educational Institutions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI doesn't just track funds—it ensures compliance, forecasts needs, and maximizes resources
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
              AI-Powered Education Features
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
                Proven Education ROI
              </h2>
              <p className="text-lg text-muted-foreground">
                Real results from AI-powered educational finance
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-lg bg-background/50">
                <div className="text-4xl font-bold text-primary mb-2">6 months</div>
                <div className="text-sm font-medium mb-1">Average payback period</div>
                <div className="text-xs text-muted-foreground">Fast ROI realization</div>
              </div>
              <div className="text-center p-6 rounded-lg bg-background/50">
                <div className="text-4xl font-bold text-primary mb-2">98%</div>
                <div className="text-sm font-medium mb-1">Grant allocation accuracy</div>
                <div className="text-xs text-muted-foreground">AI-powered tracking</div>
              </div>
              <div className="text-center p-6 rounded-lg bg-background/50">
                <div className="text-4xl font-bold text-primary mb-2">93%</div>
                <div className="text-sm font-medium mb-1">Budget forecast accuracy</div>
                <div className="text-xs text-muted-foreground">Predictive planning</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Transform Educational Finance?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join institutions achieving 95% compliance with Ledger1's AI-first platform
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
