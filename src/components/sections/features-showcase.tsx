"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Brain,
  BarChart3,
  Users,
  Package,
  Calendar,
  Bot,
  Zap,
  Shield,
  Smartphone,
  TrendingUp,
  Clock,
  Star,
  Utensils,
  MessageSquare,
  BookOpen,
  Square as SquareIcon,
} from "lucide-react";

const features = [
  {
    id: "varuni-agent",
    title: "Varuni — AI Operations Agent",
    description: "A conversational agent that plans, analyzes, and executes across your ERP. She uses live data and first‑class tool access to get real work done.",
    icon: Bot,
    gradient: "from-fuchsia-500 to-violet-500",
    benefits: [
      "Ask in natural language; get data‑backed answers",
      "Executes actions via GraphQL/REST tools",
      "Understands inventory, vendors, orders, menus, staffing",
      "Streams results in real time"
    ],
    stats: "From insight to action in one message"
  },
  {
    id: "ai-builder",
    title: "Module Builder (Powered by Varuni)",
    description: "Use natural language to create or modify modules, panels, modals, and workflows—fully versioned and auditable.",
    icon: Brain,
    gradient: "from-purple-500 to-pink-500",
    benefits: [
      "Build modules with prompts",
      "Modify panels and forms on demand",
      "Generate compliant workflows",
      "Versioned, auditable changes"
    ],
    stats: "Ship operations 10x faster"
  },
  {
    id: "industry-packs",
    title: "Modular Industry Packs",
    description: "Start with pre-built packs for Restaurants, Hospitality, Child-Care, Self-Storage, Retail, and Cannabis.",
    icon: BarChart3,
    gradient: "from-blue-500 to-cyan-500",
    benefits: [
      "Comprehensive pre-built modules",
      "Best-practice dashboards",
      "Ready-to-use reporting",
      "Easily extended via AI"
    ],
    stats: "6 industries at launch"
  },
  {
    id: "access-control",
    title: "Enterprise Access & Security",
    description: "Granular roles, SSO (SAML/OIDC), retention controls, and audit trails across all modules.",
    icon: Users,
    gradient: "from-green-500 to-emerald-500",
    benefits: [
      "Role-based permissions",
      "Org-wide audit trails",
      "Data retention controls",
      "SSO & 2FA"
    ],
    stats: "Enterprise-ready"
  },
  {
    id: "inventory-ops",
    title: "Operations & Analytics",
    description: "Operational workflows, rich analytics, and automation hooks for any industry pack.",
    icon: Package,
    gradient: "from-orange-500 to-red-500",
    benefits: [
      "Operational KPIs",
      "Automations & webhooks",
      "Forecasting & insights",
      "Export & warehousing"
    ],
    stats: "Unified data model"
  },
  {
    id: "scheduling",
    title: "Scheduling & Workforce",
    description: "AI-optimized staffing, shift planning, and team performance across industries.",
    icon: Calendar,
    gradient: "from-indigo-500 to-purple-500",
    benefits: [
      "AI shift planning",
      "Availability & PTO",
      "Time tracking",
      "Performance analytics"
    ],
    stats: "Reduce labor waste"
  },
  {
    id: "integrations",
    title: "Integrations & Robotics",
    description: "Connect to POS/ERP/HRIS and optionally monitor robotics fleets and workflows.",
    icon: Bot,
    gradient: "from-teal-500 to-blue-500",
    benefits: [
      "POS/ERP/HRIS integrations",
      "GraphQL API access",
      "Automation gateways",
      "Optional robotics visibility"
    ],
    stats: "Extensible by design"
  }
];

const useBrandLogos = process.env.NEXT_PUBLIC_USE_BRAND_LOGOS === "true";

const integrations = [
  { name: "Toast POS", brand: "toast", icon: Utensils },
  { name: "7shifts", brand: "7shifts", icon: Users },
  { name: "QuickBooks", brand: "quickbooks", icon: BookOpen },
  { name: "Square", brand: "square", icon: SquareIcon },
  { name: "Slack", brand: "slack", icon: MessageSquare },
  { name: "Microsoft Teams", brand: "teams", icon: Users }
];

export function FeaturesShowcase() {
  const [activeFeature, setActiveFeature] = useState(features[0]);

  return (
    <section id="features" className="relative py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm text-primary mb-4">
            ✨ Modular Platform • AI-Built Workflows
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Build Your ERP
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"> Your Way</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Start with industry packs, then let Varuni—our AI operations agent—analyze, recommend, and execute. From insights to actions, including building modules, panels, and workflows on demand.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`glass-pane rounded-xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                activeFeature.id === feature.id
                  ? 'ring-2 ring-primary shadow-lg shadow-primary/20'
                  : 'hover:shadow-md'
              }`}
              onClick={() => setActiveFeature(feature)}
            >
              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.gradient} mb-4`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground mb-4">{feature.description}</p>
              <div className="text-sm font-medium text-primary">{feature.stats}</div>
            </div>
          ))}
        </div>

        {/* Active Feature Detail */}
        <div className="glass-pane rounded-2xl p-8 md:p-12 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${activeFeature.gradient} mb-6`}>
                <activeFeature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-4">{activeFeature.title}</h3>
              <p className="text-lg text-muted-foreground mb-6">{activeFeature.description}</p>
              <ul className="space-y-3">
                {activeFeature.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <TrendingUp className="h-5 w-5" />
                  {activeFeature.stats}
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center">
                <div className={`p-8 rounded-xl bg-gradient-to-r ${activeFeature.gradient}`}>
                  <activeFeature.icon className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Integrations */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-8">Seamless Integrations</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {integrations.map((integration, index) => (
              <div key={index} className="glass-pane rounded-lg p-4 hover:scale-105 transition-transform w-40 flex flex-col items-center">
                {useBrandLogos ? (
                  <div className="relative w-28 h-8 mb-2">
                    <Image
                      src={`/logos/${integration.brand}.svg`}
                      alt={integration.name}
                      fill
                      sizes="112px"
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <integration.icon className="h-6 w-6 text-foreground/80 mb-2" />
                )}
                <div className="text-sm font-medium text-foreground/90 text-center">{integration.name}</div>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground mt-6">And many more...</p>
        </div>
      </div>
    </section>
  );
}
