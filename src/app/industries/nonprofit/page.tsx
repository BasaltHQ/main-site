import { Metadata } from "next";
import Link from "next/link";
import { Heart, DollarSign, FileText, Sparkles, Brain, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "AI-Powered Nonprofit ERP | 91% Better Donor Retention | Ledger1",
  description: "Transform nonprofit operations with AI automation. 97% grant compliance, $315K average savings. Smart fund accounting for charitable organizations.",
  keywords: "AI nonprofit ERP, charity accounting software, automated donor management, AI grant tracking, intelligent nonprofit analytics",
  openGraph: {
    title: "AI-Powered Nonprofit ERP | Ledger1",
    description: "91% better donor retention, 97% compliance",
    type: "website",
  },
};

export default function NonprofitIndustryPage() {
  const benefits = [
    {
      icon: Brain,
      title: "AI Donor Intelligence",
      description: "Machine learning analyzes giving patterns, predicts donor behavior, and identifies at-risk relationships—improving retention by 91% and increasing lifetime value by 73%.",
    },
    {
      icon: DollarSign,
      title: "Intelligent Fund Accounting",
      description: "AI automatically categorizes transactions across restricted and unrestricted funds with 97% accuracy—ensuring compliance and providing transparent reporting for stakeholders.",
    },
    {
      icon: Sparkles,
      title: "Predictive Grant Success",
      description: "Advanced algorithms analyze grant requirements, track spending compliance, and automate reporting—increasing grant approvals by 68% and reducing administrative time by 84%.",
    },
    {
      icon: FileText,
      title: "Smart Impact Reporting",
      description: "AI generates comprehensive impact reports, tracks program outcomes, and visualizes mission effectiveness—strengthening donor confidence and improving fundraising by 56%.",
    },
  ];

  const features = [
    "AI donor behavior prediction",
    "Smart fund accounting",
    "Automated grant compliance",
    "Predictive fundraising analytics",
    "AI impact measurement",
    "Real-time donation tracking",
    "Intelligent Form 990 preparation",
    "Multi-program cost allocation",
  ];

  const roiMetrics = [
    { value: "91%", label: "Better Retention", description: "AI-powered donor intelligence" },
    { value: "97%", label: "Compliance", description: "ML-automated fund tracking" },
    { value: "$315K", label: "Annual Savings", description: "Average ROI for $5M budget nonprofit" },
    { value: "68%", label: "More Grants Approved", description: "Predictive success optimization" },
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
              Non-Profit Sector • AI-Powered
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Mission Impact with
              <span className="block bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent mt-2">
                AI-Driven Intelligence
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Amplify your nonprofit's impact with AI-powered automation delivering 91% better donor retention and 97% grant compliance. Save an average of $315K annually with intelligent fund accounting and predictive analytics.
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
              Intelligent Automation for Mission-Driven Organizations
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI doesn't just track donations—it grows support, ensures compliance, and amplifies impact
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
              AI-Powered Nonprofit Features
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
                Proven Nonprofit ROI
              </h2>
              <p className="text-lg text-muted-foreground">
                Real results from AI-powered nonprofit operations
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-lg bg-background/50">
                <div className="text-4xl font-bold text-primary mb-2">7 months</div>
                <div className="text-sm font-medium mb-1">Average payback period</div>
                <div className="text-xs text-muted-foreground">Fast ROI realization</div>
              </div>
              <div className="text-center p-6 rounded-lg bg-background/50">
                <div className="text-4xl font-bold text-primary mb-2">84%</div>
                <div className="text-sm font-medium mb-1">Less admin time</div>
                <div className="text-xs text-muted-foreground">AI-automated workflows</div>
              </div>
              <div className="text-center p-6 rounded-lg bg-background/50">
                <div className="text-4xl font-bold text-primary mb-2">56%</div>
                <div className="text-sm font-medium mb-1">Fundraising improvement</div>
                <div className="text-xs text-muted-foreground">Impact-driven reporting</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Amplify Your Organization's Impact?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join nonprofits achieving 91% donor retention with Ledger1's AI-first platform
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
