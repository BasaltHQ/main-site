"use client";

import {
  Star,
  TrendingUp,
  Users,
  Award,
  Clock,
  DollarSign,
  ChefHat,
  Building2
} from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Operations Manager",
    company: "Bella Vista Restaurant Group",
    avatar: "👩‍💼",
    content: "Varuni transformed our operations overnight. The AI insights helped us reduce food waste by 35% and increase table turnover by 25%. Our customers notice the difference in service quality.",
    rating: 5,
    metrics: ["35% waste reduction", "25% faster service", "$50K monthly savings"]
  },
  {
    name: "Marcus Rodriguez",
    role: "Executive Chef",
    company: "Urban Grill & Bar",
    avatar: "👨‍🍳",
    content: "The inventory management is incredible. We never run out of ingredients anymore, and the AI predicts exactly what we need. Our food costs are down 28% since implementing Varuni.",
    rating: 5,
    metrics: ["28% cost reduction", "Zero stockouts", "Perfect inventory accuracy"]
  },
  {
    name: "Jennifer Walsh",
    role: "Restaurant Owner",
    company: "The Golden Spoon",
    avatar: "👩‍💼",
    content: "As a small business owner, Varuni gives me the tools of a Fortune 500 company. The scheduling optimization alone saved me 15 hours per week, and our profits are up 40%.",
    rating: 5,
    metrics: ["40% profit increase", "15hrs/week saved", "Complete automation"]
  }
];

const stats = [
  {
    value: "500+",
    label: "Restaurants Trust Varuni",
    icon: Building2,
    description: "Across 15+ countries"
  },
  {
    value: "98%",
    label: "Customer Satisfaction",
    icon: Star,
    description: "Based on user surveys"
  },
  {
    value: "$2.1M",
    label: "Average Annual Savings",
    icon: DollarSign,
    description: "Per restaurant client"
  },
  {
    value: "24/7",
    label: "AI-Powered Support",
    icon: Clock,
    description: "Always available assistance"
  }
];

const awards = [
  { name: "Restaurant Tech Innovation Award 2024", issuer: "Restaurant Technology Magazine" },
  { name: "Best AI Implementation", issuer: "Food Service Technology Association" },
  { name: "Customer Choice Award", issuer: "Restaurant Management Today" },
  { name: "Innovation Excellence", issuer: "Hospitality Technology Summit" }
];

export function SocialProof() {
  return (
    <section className="relative py-24 bg-muted/30">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm text-primary mb-4">
            🏆 Trusted by Industry Leaders
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Join <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">500+</span> Successful Restaurants
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            See how restaurants like yours are transforming operations and boosting profitability with Varuni.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center glass-pane rounded-xl p-6">
              <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm font-semibold mb-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="glass-pane rounded-xl p-6 relative">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl">{testimonial.avatar}</div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  <div className="text-xs text-primary">{testimonial.company}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {testimonial.metrics.map((metric, i) => (
                  <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {metric}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Awards & Recognition */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-8">Awards & Recognition</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((award, index) => (
              <div key={index} className="glass-pane rounded-lg p-6 text-center">
                <div className="inline-flex p-3 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 mb-4">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">{award.name}</h4>
                <p className="text-sm text-muted-foreground">{award.issuer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-50 dark:bg-green-950/20 rounded-full text-green-700 dark:text-green-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Trusted by Fortune 500 companies and local favorites alike</span>
          </div>
        </div>
      </div>
    </section>
  );
}
