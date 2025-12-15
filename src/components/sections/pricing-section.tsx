"use client";

import { useState } from "react";
import { Check, Star, Zap, Crown, ArrowRight, Bitcoin, Bot, Cpu } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$499",
    period: "month",
    description: "Perfect for single-location restaurants beginning their digital transformation journey.",
    features: [
      "AI assistant: Essential insights (up to 200 AI messages/month)",
      "Inventory: Stock tracking, low-stock alerts, movement analytics, ABC analysis, waste tracking, turnover monitoring",
      "Data export: CSV/XLSX/PDF formats for all reports",
      "Team: Role-based access control, secure authentication with 2FA/JWT",
      "Integrations: Toast Standard (employees/restaurants), GraphQL API",
      "Support: Email with 1 business-day response time",
      "License: 1 location, up to 3 admin seats"
    ],
    limitations: [],
    popular: false,
    savings: "",
    cta: "Book a Call"
  },
  {
    name: "Pro",
    price: "$999",
    period: "month",
    description: "Ideal for established restaurants looking to maximize operational efficiency.",
    features: [
      "Everything in Starter, plus:",
      "AI: Advanced analyses and operational playbooks (up to 1,000 AI messages/month)",
      "Menu & floor: Menu mappings, HostPro floor designer and mapping tool",
      "Advanced features: Automations & webhooks, comprehensive audit trail, priority sync windows",
      "Analytics: Waste driver analysis, turnover series tracking, basic forecasting",
      "Support: Priority email/chat, 99.9% uptime SLA",
      "License: Per-location pricing, up to 10 admin seats"
    ],
    limitations: [],
    popular: true,
    savings: "Most Popular",
    cta: "Book a Call"
  },
  {
    name: "Scale",
    price: "Custom",
    period: "month",
    description: "Designed for multi-location restaurant groups requiring enterprise-grade solutions.",
    features: [
      "Everything in Pro, plus:",
      "Multi-location: Cross-location controls and roll-up analytics",
      "Robotics: Fleet visibility and workflow integration",
      "Enterprise security: SSO (SAML/OIDC), custom roles/permissions, retention controls",
      "Data access: Private GraphQL access, data warehouse/export pipelines",
      "Support: Dedicated Customer Success Manager, Slack channel, 99.95% uptime SLA",
      "License: First location included; unlimited admin seats"
    ],
    limitations: [],
    popular: false,
    savings: "Best Value",
    cta: "Book a Call"
  }
];

const tokenizationPackage = {
  name: "Tokenization",
  price: "Custom",
  period: "contact",
  description: "Automate and tokenize your business to maximize the value of your operations.",
  features: [
    "On-chain KPI reporting via smart contracts and data oracles",
    "Highest standard for reporting on blockchain-issued assets",
    "Modular smart contract framework (ERC-2535)",
    "Full support for issuing and managing tokenized assets"
  ],
  popular: false,
  cta: "Contact Sales"
};

const addons = [
  {
    name: "Toast Premium API module",
    price: "+$399/month/location",
    description: "Enhanced Toast data and endpoints"
  },
  {
    name: "White-label branding & advanced theming",
    price: "+$199/month",
    description: "Fully custom brand and theme controls"
  },
  {
    name: "Implementation/onboarding package",
    price: "From $2,500 one-time",
    description: "White-glove setup and training"
  }
];

const customIntegrationServices = [
  { name: "Subscription", price: "From $299/month per integration", description: "Ongoing integration maintenance and monitoring" },
  { name: "One-time setup", price: "From $3,000 per integration", description: "Initial build and deployment" },
  { name: "High-volume surcharge", price: ">1M API calls/month, +$0.50 per 1k calls", description: "Applies to extreme throughput" },
  { name: "SLA options", price: "48-hr bugfix SLA +$199/month (included in Scale)", description: "Stronger operational guarantees" },
];

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const industries = [
    { key: 'restaurants', label: 'Restaurants', active: true, soon: false },
    { key: 'hospitality', label: 'Hospitality', active: false, soon: true },
    { key: 'childcare', label: 'Child-Care', active: false, soon: true },
    { key: 'selfstorage', label: 'Self-Storage', active: false, soon: true },
    { key: 'retail', label: 'Retail', active: false, soon: true },
    { key: 'cannabis', label: 'Cannabis', active: false, soon: true },
  ];
  const [selectedIndustry, setSelectedIndustry] = useState('restaurants');

  return (
    <section id="pricing" className="relative py-24 bg-background">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm text-primary mb-4">
            💰 Simple, Transparent Pricing
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Choose Your
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"> Growth Path</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Start with your industry. All plans include core platform features. Only Restaurants pricing is currently available.
          </p>

          {/* Industry Selector */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6 relative z-0">
            {industries.map(ind => (
              <div key={ind.key} className="relative">
                {ind.soon && (
                  <span className="absolute -top-2 -right-2 micro-label bg-primary/10 px-2 py-0.5 rounded-full z-10 pointer-events-none">Soon</span>
                )}
                <button
                  disabled={!ind.active}
                  onClick={() => ind.active && setSelectedIndustry(ind.key)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                    ind.key === selectedIndustry
                      ? 'bg-primary text-primary-foreground border-primary'
                      : ind.active
                        ? 'bg-card border-border hover:bg-muted'
                        : 'bg-muted text-muted-foreground border-border opacity-60 cursor-not-allowed'
                  }`}
                  title={ind.active ? ind.label : `${ind.label} (coming soon)`}
                >
                  {ind.label}
                </button>
              </div>
            ))}
          </div>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-muted rounded-lg p-1 mb-8">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === "monthly" ? "bg-background shadow-sm" : "text-muted-foreground"
              }`}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === "annual" ? "bg-background shadow-sm" : "text-muted-foreground"
              }`}
              onClick={() => setBillingCycle("annual")}
            >
              Annual
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards (Restaurants visible; others disabled) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative glass-pane rounded-2xl p-8 ${
                plan.popular ? "ring-2 ring-primary shadow-lg shadow-primary/20" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    {plan.savings}
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                {billingCycle === "annual" && plan.price !== "Custom" && (
                  <div className="text-sm text-green-600 dark:text-green-400">
                    ${(parseInt(plan.price.replace("$", "")) * 12 * 0.8).toFixed(0)} annually
                  </div>
                )}
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <a href="https://calendly.com/founders-tuc/ledger1-info-session" target="_blank" rel="noopener noreferrer" className={`block text-center w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                plan.popular
                  ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-lg hover:scale-105"
                  : "bg-muted hover:bg-muted/80"
              }`}>
                {plan.cta}
                <ArrowRight className="inline h-4 w-4 ml-2" />
              </a>
            </div>
          ))}
        </div>

        {/* Sales CTA Banner */}
        <div className="glass-pane rounded-2xl p-8 mb-16 text-center bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/20 px-4 py-2 rounded-full text-primary text-sm font-medium mb-4">
              <Zap className="h-4 w-4" />
              Talk to our team
            </div>
            <h3 className="text-2xl font-bold mb-4">Experience Varuni with a Guided Demo</h3>
            <p className="text-muted-foreground mb-6">
              Explore features tailored to your operations and get pricing guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://calendly.com/founders-tuc/ledger1-demo-session" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                Book a Demo
              </a>
              <a href="https://calendly.com/founders-tuc/ledger1-info-session" target="_blank" rel="noopener noreferrer" className="border border-primary/20 bg-card px-8 py-3 rounded-lg font-semibold hover:bg-primary/5 transition-all duration-300">
                Book a Call
              </a>
            </div>
          </div>
        </div>

        {/* Tokenization Package */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm text-primary mb-4">
            <Bitcoin className="h-4 w-4 mr-2" />
            Advanced Solutions
          </div>
          <h3 className="text-3xl font-bold mb-4">Tokenization Package</h3>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
            {tokenizationPackage.description}
          </p>
          <div className="max-w-4xl mx-auto">
            <div className="glass-pane rounded-2xl p-8 border border-primary/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div>
                  <h4 className="text-xl font-bold mb-4">{tokenizationPackage.name}</h4>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-3xl font-bold">{tokenizationPackage.price}</span>
                    <span className="text-muted-foreground">/ {tokenizationPackage.period}</span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-6">
                    For businesses looking to leverage blockchain technology for ultimate transparency and efficiency.
                  </p>
                  <a href="https://calendly.com/founders-tuc/ledger1-info-session" target="_blank" rel="noopener noreferrer" className="inline-block text-center w-full sm:w-auto py-3 px-6 rounded-lg font-semibold transition-all duration-300 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-lg hover:scale-105">
                    {tokenizationPackage.cta}
                    <ArrowRight className="inline h-4 w-4 ml-2" />
                  </a>
                </div>
                <div>
                  <ul className="space-y-3">
                    {tokenizationPackage.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 flex items-center justify-center gap-2 sm:gap-4 text-sm text-muted-foreground flex-wrap">
            <div className="flex flex-col items-center text-center p-4 rounded-lg glass-pane w-40 sm:w-48">
              <Bot className="h-8 w-8 text-primary mb-2" />
              <h5 className="font-semibold text-foreground">Software Automation</h5>
              <p className="text-xs">Artificial Intelligence</p>
            </div>
            <ArrowRight className="h-6 w-6 text-muted-foreground shrink-0" />
            <div className="flex flex-col items-center text-center p-4 rounded-lg glass-pane w-40 sm:w-48">
              <Bitcoin className="h-8 w-8 text-primary mb-2" />
              <h5 className="font-semibold text-foreground">Tokenization</h5>
              <p className="text-xs">Blockchain</p>
            </div>
            <ArrowRight className="h-6 w-6 text-muted-foreground shrink-0" />
            <div className="flex flex-col items-center text-center p-4 rounded-lg glass-pane w-40 sm:w-48">
              <Cpu className="h-8 w-8 text-primary mb-2" />
              <h5 className="font-semibold text-foreground">Robotic Automation</h5>
              <p className="text-xs">Fund & Maintain</p>
            </div>
          </div>
        </div>

        {/* Add-ons */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold mb-8">Optional Add-Ons</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {addons.map((addon, index) => (
              <div key={index} className="glass-pane rounded-xl p-6">
                <h4 className="font-semibold mb-2">{addon.name}</h4>
                <div className="text-2xl font-bold text-primary mb-2">{addon.price}</div>
                <p className="text-sm text-muted-foreground">{addon.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Integration Services */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold mb-8">Custom Integration Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {customIntegrationServices.map((svc, index) => (
              <div key={index} className="glass-pane rounded-xl p-6">
                <h4 className="font-semibold mb-2">{svc.name}</h4>
                <div className="text-base font-bold text-primary mb-2">{svc.price}</div>
                <p className="text-sm text-muted-foreground">{svc.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Teaser */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Have questions about pricing? <a href="#contact" className="text-primary hover:underline">Contact our sales team</a>
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              Tailored proposals for multi-location groups
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              SLA options and uptime guarantees
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              White‑glove onboarding available
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
