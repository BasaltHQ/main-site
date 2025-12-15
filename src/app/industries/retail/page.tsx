import { Metadata } from "next";
import Link from "next/link";
import { ShoppingBag, Store, TrendingUp, Sparkles, Brain, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "AI-Powered Retail ERP | 89% Inventory Accuracy | Ledger1",
  description: "Transform retail operations with AI automation. 73% faster checkout, $380K average savings. Smart POS integration and predictive analytics for modern retailers.",
  keywords: "AI retail ERP, smart POS integration, automated inventory sync, AI demand forecasting, intelligent retail analytics",
  openGraph: {
    title: "AI-Powered Retail ERP | Ledger1",
    description: "89% inventory accuracy, 73% faster operations",
    type: "website",
  },
};

export default function RetailIndustryPage() {
  const benefits = [
    {
      icon: Brain,
      title: "AI-Powered Demand Forecasting",
      description: "Machine learning analyzes historical sales, seasonality, and trends to predict demand with 89% accuracy—optimizing stock levels and preventing $200K+ in lost sales annually.",
    },
    {
      icon: Store,
      title: "Intelligent Omnichannel Sync",
      description: "AI automatically synchronizes inventory across all locations and channels in real-time, reducing stock discrepancies by 94% and enabling seamless buy-online-pickup-in-store.",
    },
    {
      icon: Sparkles,
      title: "Smart Pricing & Promotions",
      description: "Advanced algorithms optimize pricing strategies, predict promotion effectiveness, and maximize margins—increasing overall profitability by 32% while staying competitive.",
    },
    {
      icon: TrendingUp,
      title: "Predictive Customer Insights",
      description: "AI analyzes purchase patterns to predict customer behavior, personalize experiences, and increase repeat purchases by 47%—driving long-term customer value.",
    },
  ];

  const features = [
    "AI demand forecasting",
    "Real-time omnichannel inventory",
    "Smart POS integration",
    "Predictive pricing optimization",
    "Automated reorder alerts",
    "AI customer analytics",
    "Intelligent promotion planning",
    "Multi-location performance tracking",
  ];

  const roiMetrics = [
    { value: "89%", label: "Inventory Accuracy", description: "AI-powered real-time tracking" },
    { value: "73%", label: "Faster Operations", description: "Automated workflows save time" },
    { value: "$380K", label: "Annual Savings", description: "Average ROI for 5-location retailer" },
    { value: "47%", label: "More Repeat Sales", description: "AI-driven customer insights" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-background to-background overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="mx-auto max-w-7xl relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
              <ShoppingBag className="h-4 w-4" />
              Retail Industry • AI-Powered
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Next-Generation Retail with
              <span className="block bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent mt-2">
                AI-Driven Commerce
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Transform your retail business with AI-powered automation delivering 89% inventory accuracy and 73% faster operations. Save an average of $380K annually with intelligent demand forecasting and omnichannel optimization.
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
              Intelligent Automation for Modern Retail
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI doesn't just process transactions—it predicts demand, optimizes pricing, and grows your business
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
              AI-Powered Retail Features
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
                Proven Retail ROI
              </h2>
              <p className="text-lg text-muted-foreground">
                Real results from AI-powered retail operations
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-lg bg-background/50">
                <div className="text-4xl font-bold text-primary mb-2">7 months</div>
                <div className="text-sm font-medium mb-1">Average payback period</div>
                <div className="text-xs text-muted-foreground">Fast ROI realization</div>
              </div>
              <div className="text-center p-6 rounded-lg bg-background/50">
                <div className="text-4xl font-bold text-primary mb-2">94%</div>
                <div className="text-sm font-medium mb-1">Fewer stock discrepancies</div>
                <div className="text-xs text-muted-foreground">AI omnichannel sync</div>
              </div>
              <div className="text-center p-6 rounded-lg bg-background/50">
                <div className="text-4xl font-bold text-primary mb-2">32%</div>
                <div className="text-sm font-medium mb-1">Profitability increase</div>
                <div className="text-xs text-muted-foreground">Smart pricing optimization</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Transform Your Retail Business?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join retailers achieving 89% inventory accuracy with Ledger1's AI-first platform
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
