"use client";

import Image from "next/image";
import { ArrowRight, CheckCircle, ChevronRight } from "lucide-react";

export function ProductShowcase() {
  const features = [
    {
      id: "core",
      name: "Structural Core",
      product: "Ledger1ERP",
      logo: "/erplogowide.png",
      description: "The backbone of your ontology. Manage inventory, supply chain, and financials in one unified truth.",
      color: "text-teal-500",
      lightColor: "bg-teal-500",
      benefits: ["Predictive Inventory", "Automated Procurement", "Multi-Location Sync"],
      module_id: "MOD_CORE"
    },
    {
      id: "graph",
      name: "Relational Graph",
      product: "Ledger1CRM",
      logo: "/crmlogowide.png",
      description: "Map the complex web of relationships between your customers, leads, and sales agents.",
      color: "text-red-500",
      lightColor: "bg-red-500",
      benefits: ["Sentiment Analysis", "Lead Scoring", "Automated Outreach"],
      module_id: "MOD_GRAPH"
    },
    {
      id: "interface",
      name: "Semantic Interface",
      product: "VoiceHub",
      logo: "/vhlogowide.png",
      description: "Interact with your ontology using natural language. Voice agents that understand context.",
      color: "text-white",
      lightColor: "bg-white",
      benefits: ["Meeting Transcription", "Action Item Extraction", "Voice Commands"],
      module_id: "MOD_INTERFACE"
    },
    {
      id: "layer",
      name: "Transaction Layer",
      product: "PortalPay",
      logo: "/pplogowide.png",
      description: "Secure, instant value transfer across the ontology. Crypto and fiat, seamless settlement.",
      color: "text-cyan-400",
      lightColor: "bg-cyan-400",
      benefits: ["99.9% Uptime", "Zero-Knowledge Proofs", "Instant Settlement"],
      module_id: "MOD_TX"
    }
  ];

  const renderVisual = (id: string, color: string) => {
    switch (id) {
      case 'core': return (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          {/* Dense Perspective Grid */}
          <div className="absolute inset-[-100%] w-[300%] h-[300%] bg-[linear-gradient(rgba(20,184,166,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.15)_1px,transparent_1px)] bg-[size:40px_40px] animate-grid-scroll opacity-40 [transform:perspective(500px)_rotateX(70deg)]" />

          {/* Core Monolith - Layered Structure */}
          <div className="relative w-[30%] aspect-square animate-float flex items-center justify-center">
            {/* Outer Shell */}
            <div className="absolute inset-0 border-2 border-teal-500/40 bg-teal-900/10 backdrop-blur-sm rounded-lg" style={{ transform: 'rotate(45deg)' }} />
            <div className="absolute inset-2 border border-teal-400/30 rounded-lg" style={{ transform: 'rotate(45deg)' }} />

            {/* Inner Core */}
            <div className="absolute w-[60%] h-[60%] bg-teal-500/20 border border-teal-400/50 shadow-[0_0_30px_rgba(20,184,166,0.4)] animate-pulse-glow rounded" style={{ transform: 'rotate(45deg)' }} />

            {/* Data Particles */}
            <div className="absolute top-0 left-1/2 w-1 h-full bg-teal-400/20 blur-sm" />
            <div className="absolute left-0 top-1/2 h-1 w-full bg-teal-400/20 blur-sm" />
          </div>
        </div>
      );
      case 'graph': return (
        <div className="absolute inset-0 overflow-hidden">
          {/* Expanded Node Network */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-[1.5%] aspect-square bg-red-500 rounded-full animate-pulse-glow"
              style={{
                top: `${10 + Math.random() * 80}%`,
                left: `${5 + Math.random() * 90}%`,
                animationDelay: `${i * 0.2}s`,
                boxShadow: '0 0 12px rgba(220, 38, 38, 0.6)'
              }}
            />
          ))}
          {/* Denser Web of Connections */}
          <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
            <line x1="10%" y1="20%" x2="40%" y2="80%" stroke="#ef4444" strokeWidth="1" className="animate-pulse" />
            <line x1="40%" y1="80%" x2="80%" y2="30%" stroke="#ef4444" strokeWidth="1" className="animate-pulse" />
            <line x1="80%" y1="30%" x2="20%" y2="50%" stroke="#ef4444" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '1s' }} />
            <line x1="20%" y1="50%" x2="70%" y2="70%" stroke="#ef4444" strokeWidth="1" />
            <line x1="70%" y1="70%" x2="90%" y2="10%" stroke="#ef4444" strokeWidth="1" />
            <circle cx="50%" cy="50%" r="20%" fill="none" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="4 4" className="animate-radar-spin" style={{ transformOrigin: '50% 50%' }} />
          </svg>
        </div>
      );
      case 'interface': return (
        <div className="absolute inset-0 flex items-center justify-between px-[10%] gap-[2%]">
          {/* Full-width Spectral Analyzer */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="w-full bg-white/90 rounded-t-sm rounded-b-sm animate-equalizer shadow-[0_0_8px_rgba(255,255,255,0.4)]"
              style={{
                height: '10%',
                animationDelay: `${i * 0.05}s`,
                animationDuration: `${0.6 + Math.random() * 0.6}s`
              }}
            />
          ))}
          {/* Overlay Gradient for "Fading" effect similar to real analyzers */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black/10 pointer-events-none" />
        </div>
      );
      case 'layer': return (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          {/* Streaming Data Background */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(34,211,238,0.05)_50%,transparent_100%)] bg-[length:100%_200%] animate-scanline" />

          {/* Blockchain River - Increased Density */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-[18%] h-[12%] border border-cyan-400/40 bg-cyan-900/40 backdrop-blur-md rounded-sm animate-float flex items-center justify-center text-[8px] md:text-[10px] font-mono text-cyan-200"
              style={{
                top: `${10 + (i * 8)}%`, // Cascade down
                left: `${10 + (Math.sin(i) * 30 + 30)}%`, // Meander horizontally
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${3 + i * 0.2}s`,
                transform: `scale(${0.8 + Math.random() * 0.4})`
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-1 animate-pulse" />
              TX_{i}
            </div>
          ))}
        </div>
      );
      default: return null;
    }
  };

  return (
    <section className="py-24 bg-[#020609] border-t border-cyan-900/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Ontological Modules</h2>
          <p className="text-cyan-200/60 max-w-2xl">
            Select the components required for your specific operational architecture.
          </p>
        </div>

        <div className="space-y-24">
          {features.map((feature, idx) => (
            <div
              key={feature.id}
              className={`flex flex-col md:flex-row gap-12 items-center ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Text Content */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <span className={`px-2 py-1 rounded text-xs font-mono bg-cyan-900/30 border border-cyan-800 ${feature.color}`}>
                    {feature.module_id}
                  </span>
                  <h3 className="text-2xl font-bold text-white">{feature.name}</h3>
                </div>

                <div className="relative h-12 w-48 mb-6">
                  <Image
                    src={feature.logo}
                    alt={`${feature.product} Logo`}
                    fill
                    className="object-contain object-left"
                  />
                </div>

                <p className="text-lg text-cyan-200/50 mb-8 leading-relaxed">
                  {feature.description}
                </p>

                <ul className="space-y-4 mb-8">
                  {feature.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center ${feature.color.replace('text-', 'bg-')}/10`}>
                        <CheckCircle className={`w-3.5 h-3.5 ${feature.color}`} />
                      </div>
                      <span className="text-cyan-100/80">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <button className="group flex items-center gap-2 text-sm font-bold text-white hover:text-red-500 transition-colors">
                  EXPLORE MODULE SPECS <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Unique Visual Content */}
              <div className="flex-1 w-full">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-cyan-950/20 border border-cyan-900/30 group hover:border-red-600/30 transition-all duration-500">
                  {/* Background Tint */}
                  <div className="absolute inset-0 bg-teal-500/5 group-hover:bg-red-500/5 transition-colors duration-500" />

                  {/* Unique Animated Component */}
                  {renderVisual(feature.id, feature.color)}

                  {/* Faint Logo Background Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="relative w-[50%] h-[50%] opacity-[0.05] group-hover:opacity-[0.15] transition-opacity duration-500 blur-sm">
                      <Image
                        src={feature.logo}
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 z-20">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${feature.lightColor} animate-pulse`} />
                      <span className="text-xs font-mono text-cyan-200/50">MODULE_ACTIVE</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
