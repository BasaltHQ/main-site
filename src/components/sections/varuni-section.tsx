"use client";

import { Bot, Activity, BarChart3, Package, Users, Link, Zap } from "lucide-react";

export function VaruniSection() {
  return (
    <section id="varuni" className="relative py-24 bg-background">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm text-primary mb-4">
            🤖 Varuni • AI Operations Agent
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Meet Varuni
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            She analyzes, recommends, and executes across your ERP using live data and secure tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Activity, title: "Data-backed Answers", desc: "Ask in natural language; Varuni pulls KPIs and context in real time." },
            { icon: BarChart3, title: "Analytics & Forecasts", desc: "Revenue trends, inventory turnover, waste drivers, and more." },
            { icon: Package, title: "Inventory & Orders", desc: "Find low stock, receive POs, compute recipe cost and capacity." },
            { icon: Users, title: "Team & Scheduling", desc: "Summarize on-duty staff and staffing coverage with 7shifts/Toast." },
            { icon: Link, title: "GraphQL & REST Tools", desc: "Executes actions via first-class tools—no copy/paste or context switching." },
            { icon: Zap, title: "From Insight to Action", desc: "She can not only advise but also perform updates when you approve." },
          ].map((f, i) => (
            <div key={i} className="glass-pane rounded-xl p-6">
              <div className="inline-flex p-3 rounded-lg bg-gradient-to-r from-primary to-primary/70 mb-4">
                <f.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
