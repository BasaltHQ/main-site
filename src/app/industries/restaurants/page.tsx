import { Metadata } from "next";
import Link from "next/link";
import { UtensilsCrossed, ChefHat, DollarSign, Sparkles, Brain, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "AI-Powered Restaurant ERP | 76% Lower Food Costs | Ledger1",
  description: "Transform restaurant operations with AI automation. 93% inventory accuracy, $285K average savings. Smart menu engineering and predictive analytics for restaurants.",
  keywords: "AI restaurant ERP, smart POS integration, automated food cost tracking, AI menu optimization, intelligent restaurant analytics",
  openGraph: {
    title: "AI-Powered Restaurant ERP | Ledger1",
    description: "76% lower food costs, 93% inventory accuracy",
    type: "website",
  },
};

export default function RestaurantsIndustryPage() {
  const benefits = [
    {
      icon: Brain,
      title: "AI Menu Engineering",
      description: "Machine learning analyzes sales data, ingredient costs, and customer preferences to optimize menu pricing and composition—increasing profitability by 54% while maintaining customer satisfaction.",
    },
    {
      icon: ChefHat,
      title: "Intelligent Food Cost Control",
      description: "AI tracks every ingredient in real-time, predicts waste patterns, and automatically adjusts par levels—reducing food costs by 76% and eliminating 89% of spoilage waste.",
    },
    {
      icon: Sparkles,
      title: "Predictive Demand Forecasting",
      description: "Advanced algorithms analyze historical sales, weather, events, and trends to predict demand with 91% accuracy—optimizing prep schedules and reducing overproduction by 68%.",
    },
    {
      icon: DollarSign,
      title: "Smart Labor Optimization",
      description: "AI analyzes traffic patterns and sales forecasts to create optimal staffing schedules—reducing labor costs by 32% while maintaining service quality and eliminating overtime.",
    },
  ];

  const features = [
    "AI recipe cost tracking",
    "Smart POS integration",
    "Predictive inventory management",
    "Automated vendor price comparison",
    "AI menu optimization",
    "Real-time food cost analytics",
    "Intelligent prep scheduling",
    "Dynamic labor forecasting",
  ];

  const roiMetrics = [
    { value: "76%", label: "Lower Food Costs", description: "AI-powered waste reduction & optimization" },
    { value: "93%", label: "Inventory Accuracy", description: "Real-time ingredient tracking" },
    { value: "$285K", label: "Annual Savings", description: "Average ROI for 3-location restaurant" },
    { value: "68%", label: "Less Overproduction", description: "Predictive demand forecasting" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-background to-background overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="mx-auto max-w-7xl relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
              <UtensilsCrossed className="h-4 w-4" />
              Restaurant Industry • AI-Powered
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Transform Restaurant Operations with
              <span className="block bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent mt-2">
                AI-Driven Intelligence
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Revolutionize your restaurant with AI-powered automation delivering 76% reduction in food costs and 93% inventory accuracy. Save an average of $285K annually with intelligent menu engineering and predictive demand forecasting.
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
              Intelligent Automation for Restaurant Excellence
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI doesn't just track ingredients—it optimizes menus, predicts demand, and maximizes profitability
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
              AI-Powered Restaurant Features
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
                Proven Restaurant ROI
              </h2>
              <p className="text-lg text-muted-foreground">
                Real results from AI-powered restaurant operations
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-lg bg-background/50">
                <div className="text-4xl font-bold text-primary mb-2">4 months</div>
                <div className="text-sm font-medium mb-1">Average payback period</div>
                <div className="text-xs text-muted-foreground">Fastest ROI in hospitality</div>
              </div>
              <div className="text-center p-6 rounded-lg bg-background/50">
                <div className="text-4xl font-bold text-primary mb-2">89%</div>
                <div className="text-sm font-medium mb-1">Less food waste</div>
                <div className="text-xs text-muted-foreground">AI-powered tracking</div>
              </div>
              <div className="text-center p-6 rounded-lg bg-background/50">
                <div className="text-4xl font-bold text-primary mb-2">54%</div>
                <div className="text-sm font-medium mb-1">Profitability increase</div>
                <div className="text-xs text-muted-foreground">Menu optimization</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Transform Your Restaurant's Profitability?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join restaurants reducing food costs by 76% with Ledger1's AI-first platform
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
