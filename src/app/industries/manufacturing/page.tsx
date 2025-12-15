import { Metadata } from "next";
import Link from "next/link";
import { Factory, Boxes, TrendingUp, Sparkles, Brain, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "AI-Powered Manufacturing ERP | 65% Faster Production | Ledger1",
  description: "Transform manufacturing operations with AI automation. 82% inventory accuracy, $520K average savings. Smart production management for manufacturers of all sizes.",
  keywords: "AI manufacturing ERP, smart factory software, automated inventory control, AI job costing, intelligent production planning",
  openGraph: {
    title: "AI-Powered Manufacturing ERP | Ledger1",
    description: "65% faster production cycles, 82% inventory accuracy",
    type: "website",
  },
};

export default function ManufacturingIndustryPage() {
  const benefits = [
    {
      icon: Brain,
      title: "AI-Optimized Production",
      description: "Machine learning algorithms optimize production schedules, predict equipment maintenance needs, and reduce downtime by 45%—delivering 65% faster production cycles.",
    },
    {
      icon: Boxes,
      title: "Intelligent Inventory Management",
      description: "AI tracks materials in real-time, predicts demand patterns, and automates reordering with 82% accuracy—eliminating stockouts and reducing carrying costs by 38%.",
    },
    {
      icon: Sparkles,
      title: "Predictive Cost Analytics",
      description: "Advanced algorithms analyze job costs across materials, labor, and overhead in real-time, identifying cost-saving opportunities that boost margins by 28%.",
    },
    {
      icon: TrendingUp,
      title: "Smart Quality Control",
      description: "AI-powered quality monitoring detects defects early, reduces waste by 42%, and maintains consistent product quality with automated inspection systems.",
    },
  ];

  const features = [
    "AI-driven production scheduling",
    "Smart BOM optimization",
    "Predictive maintenance alerts",
    "Automated inventory forecasting",
    "Real-time job costing analytics",
    "AI quality control monitoring",
    "Intelligent vendor management",
    "Predictive demand planning",
  ];

  const roiMetrics = [
    { value: "65%", label: "Faster Production", description: "AI-optimized scheduling reduces cycle time" },
    { value: "82%", label: "Inventory Accuracy", description: "Real-time tracking with ML predictions" },
    { value: "$520K", label: "Annual Savings", description: "Average ROI for mid-size manufacturer" },
    { value: "45%", label: "Less Downtime", description: "Predictive maintenance prevents failures" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-background to-background overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="mx-auto max-w-7xl relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
              <Factory className="h-4 w-4" />
              Manufacturing Industry • AI-Powered
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Smart Manufacturing with
              <span className="block bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent mt-2">
                AI-Driven Intelligence
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Transform your manufacturing operations with AI-powered automation delivering 65% faster production cycles and 82% inventory accuracy. Save an average of $520K annually with intelligent production planning and predictive analytics.
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
              Intelligent Automation for Modern Manufacturing
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI doesn't just track—it predicts, optimizes, and continuously improves your entire operation
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
              AI-Powered Manufacturing Features
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
                Proven Manufacturing ROI
              </h2>
              <p className="text-lg text-muted-foreground">
                Real results from AI-powered manufacturing operations
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-lg bg-background/50">
                <div className="text-4xl font-bold text-primary mb-2">8 months</div>
                <div className="text-sm font-medium mb-1">Average payback period</div>
                <div className="text-xs text-muted-foreground">Full ROI in under a year</div>
              </div>
              <div className="text-center p-6 rounded-lg bg-background/50">
                <div className="text-4xl font-bold text-primary mb-2">38%</div>
                <div className="text-sm font-medium mb-1">Reduction in carrying costs</div>
                <div className="text-xs text-muted-foreground">Through AI inventory optimization</div>
              </div>
              <div className="text-center p-6 rounded-lg bg-background/50">
                <div className="text-4xl font-bold text-primary mb-2">28%</div>
                <div className="text-sm font-medium mb-1">Margin improvement</div>
                <div className="text-xs text-muted-foreground">AI-driven cost optimization</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Transform Your Manufacturing Operations?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join manufacturers achieving 65% faster production with Ledger1's AI-first platform
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
