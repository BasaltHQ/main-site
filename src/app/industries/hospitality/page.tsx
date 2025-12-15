import { Metadata } from "next";
import Link from "next/link";
import { Hotel, Calendar, TrendingUp, Sparkles, Brain, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "AI-Powered Hospitality ERP | 83% Higher RevPAR | Ledger1",
  description: "Transform hotel operations with AI automation. 96% occupancy optimization, $395K average savings. Smart revenue management for hospitality businesses.",
  keywords: "AI hospitality ERP, hotel management software, AI revenue management, automated occupancy optimization, intelligent hospitality analytics",
  openGraph: {
    title: "AI-Powered Hospitality ERP | Ledger1",
    description: "83% higher RevPAR, 96% occupancy optimization",
    type: "website",
  },
};

export default function HospitalityIndustryPage() {
  const benefits = [
    {
      icon: Brain,
      title: "AI Revenue Management",
      description: "Machine learning analyzes market demand, competition, and booking patterns to optimize room rates dynamically—increasing RevPAR by 83% while maintaining high occupancy.",
    },
    {
      icon: Calendar,
      title: "Intelligent Occupancy Forecasting",
      description: "AI predicts booking trends with 96% accuracy, optimizes overbooking strategies, and maximizes room utilization—reducing no-shows by 68% and vacancy costs by 71%.",
    },
    {
      icon: Sparkles,
      title: "Smart Labor Optimization",
      description: "Advanced algorithms forecast guest volume and service needs to create optimal staffing schedules—reducing labor costs by 34% while improving guest satisfaction scores by 47%.",
    },
    {
      icon: TrendingUp,
      title: "Predictive Maintenance & Cost Control",
      description: "AI monitors property maintenance needs, predicts equipment failures, and optimizes vendor management—reducing emergency repairs by 62% and extending asset lifespan by 39%.",
    },
  ];

  const features = [
    "AI dynamic pricing optimization",
    "Smart occupancy forecasting",
    "Automated revenue analytics",
    "Predictive labor scheduling",
    "AI guest preference tracking",
    "Real-time performance dashboards",
    "Intelligent cost allocation",
    "Multi-property consolidation",
  ];

  const roiMetrics = [
    { value: "83%", label: "Higher RevPAR", description: "AI-optimized dynamic pricing" },
    { value: "96%", label: "Forecast Accuracy", description: "ML-powered occupancy predictions" },
    { value: "$395K", label: "Annual Savings", description: "Average ROI for 100-room hotel" },
    { value: "47%", label: "Better Guest Scores", description: "Optimized service delivery" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-background to-background overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="mx-auto max-w-7xl relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
              <Hotel className="h-4 w-4" />
              Hospitality Industry • AI-Powered
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Hospitality Excellence with
              <span className="block bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent mt-2">
                AI-Driven Intelligence
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Transform your hospitality business with AI-powered automation delivering 83% higher RevPAR and 96% occupancy forecast accuracy. Save an average of $395K annually with intelligent revenue management and predictive analytics.
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
              Intelligent Automation for Hospitality Excellence
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI doesn't just manage bookings—it maximizes revenue, optimizes operations, and delights guests
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
              AI-Powered Hospitality Features
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
                Proven Hospitality ROI
              </h2>
              <p className="text-lg text-muted-foreground">
                Real results from AI-powered hospitality operations
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-lg bg-background/50">
                <div className="text-4xl font-bold text-primary mb-2">5 months</div>
                <div className="text-sm font-medium mb-1">Average payback period</div>
                <div className="text-xs text-muted-foreground">Fast ROI realization</div>
              </div>
              <div className="text-center p-6 rounded-lg bg-background/50">
                <div className="text-4xl font-bold text-primary mb-2">68%</div>
                <div className="text-sm font-medium mb-1">Fewer no-shows</div>
                <div className="text-xs text-muted-foreground">AI booking predictions</div>
              </div>
              <div className="text-center p-6 rounded-lg bg-background/50">
                <div className="text-4xl font-bold text-primary mb-2">34%</div>
                <div className="text-sm font-medium mb-1">Lower labor costs</div>
                <div className="text-xs text-muted-foreground">Smart scheduling</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Maximize Your Hospitality Revenue?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join hotels achieving 83% higher RevPAR with Ledger1's AI-first platform
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
