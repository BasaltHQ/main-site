import { Metadata } from "next";
import Link from "next/link";
import {
  Heart,
  Factory,
  ShoppingBag,
  Utensils,
  HardHat,
  Briefcase,
  Building2,
  Code,
  Hotel,
  GraduationCap,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Industry Solutions | Ledger1 ERP for Every Business",
  description: "Discover how Ledger1's ERP software serves businesses across healthcare, manufacturing, retail, construction, and more. Industry-specific financial management solutions.",
  keywords: "ERP by industry, industry-specific software, vertical ERP solutions, business management software",
  openGraph: {
    title: "Industry Solutions | Ledger1 ERP",
    description: "ERP solutions tailored for your industry",
    type: "website",
  },
};

export default function IndustriesPage() {
  const industries = [
    {
      slug: "healthcare",
      name: "Healthcare",
      icon: Heart,
      description: "HIPAA-compliant financial management for hospitals, clinics, and medical practices.",
      features: ["Patient billing", "Insurance claims", "Compliance tracking"],
    },
    {
      slug: "manufacturing",
      name: "Manufacturing",
      icon: Factory,
      description: "Production management, inventory control, and job costing for manufacturers.",
      features: ["BOM management", "Job costing", "Inventory tracking"],
    },
    {
      slug: "retail",
      name: "Retail",
      icon: ShoppingBag,
      description: "Multi-channel inventory and POS integration for retail businesses.",
      features: ["POS integration", "Multi-location", "Inventory sync"],
    },
    {
      slug: "restaurants",
      name: "Restaurants",
      icon: Utensils,
      description: "AI-powered menu engineering, food cost control, and demand forecasting for restaurants.",
      features: ["Menu optimization", "Food cost tracking", "Labor scheduling"],
    },
    {
      slug: "construction",
      name: "Construction",
      icon: HardHat,
      description: "Project-based accounting and job costing for contractors and builders.",
      features: ["Job costing", "Change orders", "Progress billing"],
    },
    {
      slug: "professional-services",
      name: "Professional Services",
      icon: Briefcase,
      description: "Time tracking and project billing for consulting and service firms.",
      features: ["Time tracking", "Project billing", "Resource planning"],
    },
    {
      slug: "real-estate",
      name: "Real Estate",
      icon: Building2,
      description: "Property management and lease tracking for real estate professionals.",
      features: ["Lease management", "Tenant portal", "Portfolio tracking"],
    },
    {
      slug: "technology",
      name: "Technology",
      icon: Code,
      description: "Scalable financial management for tech companies and startups.",
      features: ["Subscription billing", "Revenue recognition", "Investor reporting"],
    },
    {
      slug: "hospitality",
      name: "Hospitality",
      icon: Hotel,
      description: "Cost control and revenue management for hotels and restaurants.",
      features: ["Food cost tracking", "Revenue management", "Multi-property"],
    },
    {
      slug: "education",
      name: "Education",
      icon: GraduationCap,
      description: "Fund accounting and grant management for educational institutions.",
      features: ["Fund accounting", "Grant tracking", "Tuition billing"],
    },
    {
      slug: "nonprofit",
      name: "Non-Profit",
      icon: HeartHandshake,
      description: "Fund accounting and donor management for charitable organizations.",
      features: ["Donor tracking", "Grant management", "990 compliance"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Industry-Specific
              <span className="block text-primary mt-2">ERP Solutions</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Ledger1 provides tailored financial management solutions for businesses across diverse industries. Discover how our ERP software can transform your industry's unique challenges into opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="group p-6 rounded-lg border border-border bg-card hover:shadow-xl hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <industry.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {industry.name}
                    </h3>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-muted-foreground mb-4">{industry.description}</p>
                <div className="flex flex-wrap gap-2">
                  {industry.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Don't See Your Industry Listed?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Ledger1 is flexible enough to serve businesses across all industries. Contact us to discuss your specific needs and learn how we can help.
          </p>
          <a
            href="https://calendly.com/founders-tuc/ledger1-info-session"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-primary/80 px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Schedule a Consultation
          </a>
        </div>
      </section>
    </div>
  );
}
