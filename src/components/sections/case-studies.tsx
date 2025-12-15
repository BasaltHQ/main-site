"use client";

import { useState } from "react";
import {
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  Star,
  ArrowRight,
  Building2,
  ChefHat,
  Award
} from "lucide-react";

// Social proof content moved under Case Studies
const socialStats = [
  { value: "500+", label: "Restaurants Trust Varuni", icon: Building2, description: "Across 15+ countries" },
  { value: "98%", label: "Customer Satisfaction", icon: Star, description: "Based on user surveys" },
  { value: "$2.1M", label: "Average Annual Savings", icon: DollarSign, description: "Per restaurant client" },
  { value: "24/7", label: "AI-Powered Support", icon: Clock, description: "Always available assistance" },
];

const socialTestimonials = [
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

const socialAwards = [
  { name: "Restaurant Tech Innovation Award 2024", issuer: "Restaurant Technology Magazine" },
  { name: "Best AI Implementation", issuer: "Food Service Technology Association" },
  { name: "Customer Choice Award", issuer: "Restaurant Management Today" },
  { name: "Innovation Excellence", issuer: "Hospitality Technology Summit" }
];

const caseStudies = [
  {
    id: "bella-vista",
    company: "Bella Vista Restaurant Group",
    industry: "Fine Dining Chain",
    location: "New York, NY",
    logo: "🏛️",
    challenge: "Struggling with inconsistent service quality and high operational costs across 5 locations",
    solution: "Implemented Varuni's AI-powered scheduling and inventory management across all locations",
    results: {
      revenue: "+45% increase",
      costs: "-32% reduction",
      satisfaction: "98% customer satisfaction",
      efficiency: "60% faster operations"
    },
    metrics: [
      { icon: DollarSign, value: "$2.8M", label: "Annual Savings" },
      { icon: Users, value: "250+", label: "Team Members" },
      { icon: TrendingUp, value: "45%", label: "Revenue Growth" },
      { icon: Clock, value: "60%", label: "Faster Service" }
    ],
    testimonial: {
      name: "Maria Rodriguez",
      role: "CEO",
      content: "Varuni didn't just solve our problems—it transformed our entire business model. Our customers love the consistent experience, and our margins have never been better."
    },
    image: "/api/placeholder/600/400"
  },
  {
    id: "urban-grill",
    company: "Urban Grill & Bar",
    industry: "Casual Dining",
    location: "Austin, TX",
    logo: "🍖",
    challenge: "Inefficient inventory management leading to 25% food waste and stock shortages",
    solution: "Deployed Varuni's AI inventory optimization and robotic fleet management",
    results: {
      waste: "-40% reduction",
      costs: "-28% savings",
      accuracy: "99.5% inventory accuracy",
      efficiency: "50% less manual work"
    },
    metrics: [
      { icon: TrendingUp, value: "40%", label: "Waste Reduction" },
      { icon: DollarSign, value: "$180K", label: "Annual Savings" },
      { icon: Users, value: "85", label: "Team Members" },
      { icon: Clock, value: "50%", label: "Time Saved" }
    ],
    testimonial: {
      name: "David Chen",
      role: "Operations Director",
      content: "The AI predictions are uncanny. Varuni knows exactly when we'll run out of ingredients and suggests optimal reorder quantities. It's like having a crystal ball."
    },
    image: "/api/placeholder/600/400"
  },
  {
    id: "golden-spoon",
    company: "The Golden Spoon",
    industry: "Family Restaurant",
    location: "Denver, CO",
    logo: "🍽️",
    challenge: "Small team overwhelmed with manual scheduling and basic operations management",
    solution: "Complete Varuni implementation with AI assistant and automated workflows",
    results: {
      productivity: "+80% team productivity",
      costs: "-35% operational costs",
      satisfaction: "95% staff satisfaction",
      growth: "200% revenue growth"
    },
    metrics: [
      { icon: DollarSign, value: "$450K", label: "Revenue Increase" },
      { icon: Users, value: "32", label: "Team Members" },
      { icon: TrendingUp, value: "80%", label: "Productivity Boost" },
      { icon: Star, value: "95%", label: "Staff Satisfaction" }
    ],
    testimonial: {
      name: "Lisa Thompson",
      role: "Owner",
      content: "As a small business owner, I was drowning in paperwork and scheduling conflicts. Varuni automated everything and gave me back my evenings with my family."
    },
    image: "/api/placeholder/600/400"
  }
];

export function CaseStudies() {
  const [activeCase, setActiveCase] = useState(caseStudies[0]);

  return (
    <section id="case-studies" className="relative py-24 bg-muted/20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5"></div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm text-primary mb-4">
            📈 Real Results, Real Restaurants
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Success Stories That
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"> Inspire</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            See how restaurants just like yours are achieving extraordinary results with Varuni's AI-powered platform.
          </p>
        </div>

        

        {/* Case Study Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {caseStudies.map((study) => (
            <button
              key={study.id}
              className={`glass-pane rounded-xl p-6 text-left transition-all duration-300 hover:scale-105 ${
                activeCase.id === study.id
                  ? 'ring-2 ring-primary shadow-lg shadow-primary/20 bg-primary/5'
                  : 'hover:shadow-md'
              }`}
              onClick={() => setActiveCase(study)}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="text-2xl">{study.logo}</div>
                <div>
                  <h3 className="font-semibold">{study.company}</h3>
                  <p className="text-sm text-muted-foreground">{study.industry}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{study.location}</p>
              <div className="grid grid-cols-2 gap-2">
                {study.metrics.slice(0, 2).map((metric, i) => (
                  <div key={i} className="text-center">
                    <div className="text-lg font-bold text-primary">{metric.value}</div>
                    <div className="text-xs text-muted-foreground">{metric.label}</div>
                  </div>
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* Active Case Study Detail */}
        <div className="glass-pane rounded-2xl p-8 md:p-12 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">{activeCase.logo}</div>
                <div>
                  <h3 className="text-2xl font-bold">{activeCase.company}</h3>
                  <p className="text-muted-foreground">{activeCase.industry} • {activeCase.location}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">Challenge</h4>
                  <p className="text-foreground">{activeCase.challenge}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Solution</h4>
                  <p className="text-foreground">{activeCase.solution}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">Results</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(activeCase.results).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Key Metrics */}
              <div>
                <h4 className="font-semibold mb-4">Key Metrics</h4>
                <div className="grid grid-cols-2 gap-4">
                  {activeCase.metrics.map((metric, i) => (
                    <div key={i} className="glass-pane rounded-lg p-4 text-center">
                      <metric.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-primary">{metric.value}</div>
                      <div className="text-xs text-muted-foreground">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              <div className="glass-pane rounded-lg p-6 bg-gradient-to-r from-primary/5 to-transparent">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-foreground mb-4 italic">
                  "{activeCase.testimonial.content}"
                </blockquote>
                <div>
                  <div className="font-semibold">{activeCase.testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{activeCase.testimonial.role}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Moved Social Proof Block to end */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm text-primary mb-4">
            🏆 Trusted by Industry Leaders
          </div>
          <h3 className="text-2xl md:text-4xl font-bold tracking-tight mb-4">
            Join <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">500+</span> Successful Restaurants
          </h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            See how restaurants like yours are transforming operations and boosting profitability with Varuni.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {socialStats.map((stat, index) => (
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {socialTestimonials.map((t, index) => (
            <div key={index} className="glass-pane rounded-xl p-6 relative text-left">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-foreground mb-6 leading-relaxed">
                "{t.content}"
              </blockquote>
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl">{t.avatar}</div>
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                  <div className="text-xs text-primary">{t.company}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {t.metrics.map((metric, i) => (
                  <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {metric}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Awards & Trust */}
        <div className="text-center">
          <h4 className="text-xl font-bold mb-6">Awards & Recognition</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {socialAwards.map((award, index) => (
              <div key={index} className="glass-pane rounded-lg p-6 text-center">
                <div className="inline-flex p-3 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 mb-4">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h5 className="font-semibold mb-2">{award.name}</h5>
                <p className="text-sm text-muted-foreground">{award.issuer}</p>
              </div>
            ))}
          </div>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-50 dark:bg-green-950/20 rounded-full text-green-700 dark:text-green-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Trusted by Fortune 500 companies and local favorites alike</span>
          </div>
        </div>
      </div>
    </section>
  );
}
