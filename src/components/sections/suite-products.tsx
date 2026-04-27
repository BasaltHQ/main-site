"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function SuiteProducts() {
  const products = [
    {
      name: "BasaltERP",
      logo: "/BasaltERPWide.png",
      url: "https://erp.basalthq.com",
      tagline: "AI-Assisted Universal ERP",
      description: "Industry-specific ERP with AI module builder",
      locked: false
    },
    {
      name: "BasaltCRM",
      logo: "/BasaltCRMWide.png",
      url: "https://crm.basalthq.com",
      tagline: "AI-First Customer Intelligence",
      description: "Lead generation, sales agents & social intelligence"
    },
    {
      name: "BasaltEcho",
      logo: "/BasaltEchoWide.png",
      url: "https://echo.basalthq.com",
      tagline: "Enterprise Voice AI Platform",
      description: "Custom voice agents for meetings & streams"
    },
    {
      name: "BasaltSurge",
      logo: "/BasaltSurgeWide.png",
      url: "https://surge.basalthq.com",
      tagline: "Web3-Native Commerce",
      description: "Crypto payments, instant settlement, 90+ chains",
      locked: false
    },
    {
      name: "BasaltCMS",
      logo: "/BasaltCMSWide.png",
      url: "https://cms.basalthq.com",
      tagline: "AI-Voice Powered Content Command Center",
      description: "Manage media, docs, forms, website from one dashboard",
      locked: true
    },
    {
      name: "BasaltOnyx",
      logo: "/BasaltOnyxWide.png",
      url: "#",
      tagline: "Autonomous Social Intelligence",
      description: "AI Agents that post, engage, and grow your presence",
      locked: true
    },
    {
      name: "BasaltVigil",
      logo: "/BasaltVigil.png",
      url: "https://vigil.basalthq.com",
      tagline: "AI Legal Operations",
      description: "Multi-agent legal intelligence platform for contract drafting, corporate governance, and compliance.",
      locked: false
    }
  ];

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div id="products" className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        {products.map((product) => (
          <a
            key={product.name}
            href={product.url}
            target={product.locked ? undefined : "_blank"}
            rel="noopener noreferrer"
            className={`group relative rounded-2xl border backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] p-6 md:p-8 transition-all duration-500 overflow-hidden
              ${product.locked
                ? "border-white/[0.03] bg-white/[0.01] cursor-not-allowed opacity-60 grayscale-[0.8] hover:grayscale-0 hover:opacity-100"
                : "border-white/[0.08] bg-black/40 hover:border-white/[0.2] hover:bg-white/[0.04] hover:shadow-[0_16px_48px_rgba(0,0,0,0.8)] hover:-translate-y-1"
              }
              ${product.name === 'BasaltVigil' ? "md:col-span-2" : ""}
            `}
            onClick={(e) => product.locked && e.preventDefault()}
          >
            {/* Theme accent line on hover (only for unlocked) */}
            {!product.locked && (
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            )}

            <div className="relative h-16 md:h-20 mb-6 flex items-center">
              <Image
                src={product.logo}
                alt={product.name}
                height={80} // Fixed height constraint
                width={240} // Max width constraint
                className={`object-contain object-left h-16 w-auto ${product.locked ? 'opacity-80' : ''}`}
              />
            </div>
            <div className="flex items-center gap-2 mb-3">
              <h3 className={`text-xl md:text-2xl font-bold transition-colors duration-300
                ${product.locked ? "text-muted-foreground group-hover:text-primary" : "text-white group-hover:text-primary"}`
              }>
                {product.tagline}
              </h3>
              {!product.locked && (
                <ArrowRight className="h-5 w-5 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              )}
            </div>
            <p className="text-muted-foreground/80 text-sm md:text-base leading-relaxed">
              {product.description}
            </p>

            <div className={`mt-6 inline-flex items-center text-sm font-bold tracking-wider transition-colors duration-300
              ${product.locked ? "text-muted-foreground" : "text-primary"}`
            }>
              {product.locked ? (
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  SYSTEM_LOCKED
                </span>
              ) : (
                <>
                  ACCESS_MODULE
                  <ArrowRight className="ml-1 h-4 w-4" />
                </>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
