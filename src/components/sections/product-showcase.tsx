"use client";
import { useState, useRef, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, ChevronRight, Zap, Check } from "lucide-react";
import * as BrandIcons from "../ui/brand-icons";
import { useBrandTheme } from "@/components/providers/brand-theme-provider";

export function ProductShowcase() {
  const { currentTheme } = useBrandTheme();
  const [inViewMap, setInViewMap] = useState<Record<string, boolean>>({});
  const [paymentStep, setPaymentStep] = useState<'idle' | 'scanning' | 'processing' | 'success'>('idle');

  // Lazy load trigger
  const handleInView = (id: string, inView: boolean) => {
    if (inView) {
      setInViewMap(prev => ({ ...prev, [id]: true }));
      if (id === 'layer' && paymentStep === 'idle') {
        // Start sequence
        setPaymentStep('scanning');
        // Auto advance
        setTimeout(() => setPaymentStep('processing'), 2250); // Scan duration
        setTimeout(() => setPaymentStep('success'), 5000); // Processing duration
        // Reset after success to allow re-watching
        setTimeout(() => setPaymentStep('idle'), 8000);
      }
    }
  };

  const features = [
    {
      id: "core",
      name: "Structural Core",
      product: "BasaltERP",
      logo: "/BasaltERPWide.png",
      description: "The backbone of your ontology. Manage inventory, supply chain, and financials in one unified truth.",
      benefits: ["Predictive Inventory", "Automated Procurement", "Multi-Location Sync"],
      module_id: "MOD_CORE",
      href: "https://erp.basalthq.com"
    },
    {
      id: "graph",
      name: "Relational Graph",
      product: "BasaltCRM",
      logo: "/BasaltCRMWide.png",
      description: "Map the complex web of relationships between your customers, leads, and sales agents.",
      benefits: ["Sentiment Analysis", "Lead Scoring", "Automated Outreach"],
      module_id: "MOD_GRAPH",
      href: "https://crm.basalthq.com/en/features"
    },
    {
      id: "cms",
      name: "Universal Integrations",
      product: "BasaltCMS",
      logo: "/BasaltCMSWide.png",
      description: "Orchestrate your entire digital ecosystem. Connect e-commerce, AI assistants, and social platforms.",
      benefits: ["Unified Data Sync", "Real-time Actions", "Cross-Platform Control"],
      module_id: "MOD_INTEGRATION",
      // href: "https://cms.basalthq.com/features"
      href: "#"
    },
    {
      id: "interface",
      name: "Semantic Interface",
      product: "BasaltEcho",
      logo: "/BasaltEchoWide.png",
      description: "Interact with your ontology using natural language. Voice agents that understand context.",
      benefits: ["Meeting Transcription", "Action Item Extraction", "Voice Commands"],
      module_id: "MOD_INTERFACE",
      href: "https://echo.basalthq.com/"
    },
    {
      id: "layer",
      name: "Transaction Layer",
      product: "BasaltSurge",
      logo: "/BasaltSurgeWide.png",
      description: "Secure, instant value transfer across the ontology. Crypto and fiat, seamless settlement.",
      benefits: ["99.9% Uptime", "Zero-Knowledge Proofs", "Instant Settlement"],
      module_id: "MOD_TX",
      href: "https://surge.basalthq.com/vs"
    }
  ];

  const renderVisual = (id: string) => {
    switch (id) {
      case 'core': return (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          {/* Dense Perspective Grid */}
          <div
            className="absolute inset-[-100%] w-[300%] h-[300%] bg-[size:40px_40px] animate-grid-scroll opacity-40 [transform:perspective(500px)_rotateX(70deg)]"
            style={{
              backgroundImage: `linear-gradient(${currentTheme.color}26 1px, transparent 1px), linear-gradient(90deg, ${currentTheme.color}26 1px, transparent 1px)`
            }}
          />

          {/* Core Monolith - Layered Structure */}
          <div className="relative w-[30%] aspect-square animate-float flex items-center justify-center">
            {/* Outer Shell */}
            <div
              className="absolute inset-0 border-2 backdrop-blur-sm rounded-lg"
              style={{
                transform: 'rotate(45deg)',
                borderColor: `${currentTheme.color}66`,
                backgroundColor: `${currentTheme.color}1A`
              }}
            />
            <div
              className="absolute inset-2 border rounded-lg"
              style={{
                transform: 'rotate(45deg)',
                borderColor: `${currentTheme.color}4D`
              }}
            />

            {/* Inner Core */}
            <div
              className="absolute w-[60%] h-[60%] border shadow-[0_0_30px_rgba(20,184,166,0.4)] animate-pulse-glow rounded"
              style={{
                transform: 'rotate(45deg)',
                backgroundColor: `${currentTheme.color}33`,
                borderColor: `${currentTheme.color}80`,
                boxShadow: `0 0 30px ${currentTheme.color}66`
              }}
            />

            {/* Data Particles */}
            <div className="absolute top-0 left-1/2 w-1 h-full blur-sm" style={{ backgroundColor: `${currentTheme.color}33` }} />
            <div className="absolute left-0 top-1/2 h-1 w-full blur-sm" style={{ backgroundColor: `${currentTheme.color}33` }} />
          </div>
        </div>
      );
      case 'cms': return (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          {/* Orbit Animation */}
          <div className="relative w-full h-full flex items-center justify-center scale-75 md:scale-90">
            {/* Center Node */}
            <div
              className="absolute z-20 flex flex-col items-center justify-center w-28 h-28 rounded-2xl bg-black border shadow-[0_0_30px_rgba(56,189,248,0.2)]"
              style={{
                borderColor: `${currentTheme.color}4D`,
                boxShadow: `0 0 30px ${currentTheme.color}33`
              }}
            >
              <div className="relative w-20 h-20">
                <Image
                  src="/BasaltCMS.png"
                  alt="BasaltCMS"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Inner Ring - 6 Items (AI & Tech) */}
            <div
              className="absolute animate-spin-slow-reverse w-[180px] h-[180px] rounded-full border"
              style={{ borderColor: `${currentTheme.color}4D` }}
            >
              {/* OpenAI - Top */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 bg-black rounded-xl border shadow-lg" style={{ animation: 'spin-forward 40s linear infinite', borderColor: `${currentTheme.color}66` }}>
                <BrandIcons.OpenAI className="h-4 w-4 text-white" />
              </div>
              {/* Anthropic - Top Right */}
              <div className="absolute top-[25%] right-[6.7%] -translate-y-1/2 translate-x-1/2 p-2 bg-black rounded-xl border shadow-lg" style={{ animation: 'spin-forward 40s linear infinite', borderColor: `${currentTheme.color}66` }}>
                <BrandIcons.Anthropic className="h-4 w-4 text-[#D97757]" />
              </div>
              {/* Gemini - Bottom Right */}
              <div className="absolute bottom-[25%] right-[6.7%] translate-y-1/2 translate-x-1/2 p-2 bg-black rounded-xl border shadow-lg" style={{ animation: 'spin-forward 40s linear infinite', borderColor: `${currentTheme.color}66` }}>
                <BrandIcons.GoogleGemini className="h-4 w-4 text-[#4E88D4]" />
              </div>
              {/* Meta - Bottom */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 p-2 bg-black rounded-xl border shadow-lg" style={{ animation: 'spin-forward 40s linear infinite', borderColor: `${currentTheme.color}66` }}>
                <BrandIcons.Meta className="h-4 w-4 text-[#0668E1]" />
              </div>
              {/* Mistral - Bottom Left */}
              <div className="absolute bottom-[25%] left-[6.7%] translate-y-1/2 -translate-x-1/2 p-2 bg-black rounded-xl border shadow-lg" style={{ animation: 'spin-forward 40s linear infinite', borderColor: `${currentTheme.color}66` }}>
                <BrandIcons.Mistral className="h-4 w-4 text-[#FACC15]" />
              </div>
              {/* HuggingFace - Top Left */}
              <div className="absolute top-[25%] left-[6.7%] -translate-y-1/2 -translate-x-1/2 p-2 bg-black rounded-xl border shadow-lg" style={{ animation: 'spin-forward 40s linear infinite', borderColor: `${currentTheme.color}66` }}>
                <BrandIcons.HuggingFace className="h-4 w-4 text-[#FFD21E]" />
              </div>
            </div>

            {/* Outer Ring - 8 Items (Social & eCommerce) */}
            <div
              className="absolute animate-spin-medium w-[280px] h-[280px] rounded-full border"
              style={{ borderColor: `${currentTheme.color}33` }}
            >
              {[
                { Icon: BrandIcons.Shopify, color: '#96BF48', pos: { top: 0, left: '50%' } },
                { Icon: BrandIcons.WooCommerce, color: '#96588A', pos: { top: '14.6%', right: '14.6%' } },
                { Icon: BrandIcons.LinkedIn, color: '#0A66C2', pos: { top: '50%', right: 0 } },
                { Icon: BrandIcons.X, color: 'white', pos: { bottom: '14.6%', right: '14.6%' } },
                { Icon: BrandIcons.Facebook, color: '#1877F2', pos: { bottom: 0, left: '50%' } },
                { Icon: BrandIcons.Slack, color: '#E01E5A', pos: { bottom: '14.6%', left: '14.6%' } },
                { Icon: BrandIcons.Zapier, color: '#FF4F00', pos: { top: '50%', left: 0 } },
                { Icon: BrandIcons.Mailchimp, color: '#FFE01B', pos: { top: '14.6%', left: '14.6%' } }
              ].map((item, i) => (
                <div
                  key={i}
                  className="absolute p-2 bg-black rounded-xl border shadow-lg transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    ...item.pos,
                    animation: 'spin-reverse 50s linear infinite',
                    borderColor: `${currentTheme.color}66`,
                    color: item.color
                  }}
                >
                  <item.Icon className="h-4 w-4" />
                </div>
              ))}
            </div>

            <style jsx>{`
               .animate-spin-slow-reverse { animation: spin-reverse 40s linear infinite; }
               .animate-spin-medium { animation: spin 50s linear infinite; }
               @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
               @keyframes spin-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
               @keyframes spin-forward { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
             `}</style>
          </div>
        </div>
      );
      case 'graph': return (
        <div className="absolute inset-0 overflow-hidden">
          {/* Expanded Node Network */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-[1.5%] aspect-square rounded-full animate-pulse-glow"
              style={{
                backgroundColor: currentTheme.color,
                top: `${10 + ((i * 17) % 80)}%`,
                left: `${5 + ((i * 23) % 90)}%`,
                animationDelay: `${i * 0.2}s`,
                boxShadow: `0 0 12px ${currentTheme.color}99`
              }}
            />
          ))}
          {/* Denser Web of Connections */}
          <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
            <line x1="10%" y1="20%" x2="40%" y2="80%" stroke={currentTheme.color} strokeWidth="1" className="animate-pulse" />
            <line x1="40%" y1="80%" x2="80%" y2="30%" stroke={currentTheme.color} strokeWidth="1" className="animate-pulse" />
            <line x1="80%" y1="30%" x2="20%" y2="50%" stroke={currentTheme.color} strokeWidth="1" className="animate-pulse" style={{ animationDelay: '1s' }} />
            <line x1="20%" y1="50%" x2="70%" y2="70%" stroke={currentTheme.color} strokeWidth="1" />
            <line x1="70%" y1="70%" x2="90%" y2="10%" stroke={currentTheme.color} strokeWidth="1" />
            <circle cx="50%" cy="50%" r="20%" fill="none" stroke={currentTheme.color} strokeWidth="0.5" strokeDasharray="4 4" className="animate-radar-spin" style={{ transformOrigin: '50% 50%' }} />
          </svg>
        </div>
      );
      case 'interface': return (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <VoiceWave themeColor={currentTheme.color} />
        </div>
      );
      case 'layer': return (
        <PaymentVisualTrigger onInView={(inView) => handleInView('layer', inView)} step={paymentStep} themeColor={currentTheme.color} />
      );
      default: return null;
    }
  };

  return (
    <section className="py-24 bg-[#020609] border-t" style={{ borderColor: `${currentTheme.color}33` }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Ontological Modules</h2>
          <p className="max-w-2xl transition-colors duration-500" style={{ color: `${currentTheme.color}99` }}>
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
                  <span
                    className="px-2 py-1 rounded text-xs font-mono border transition-colors duration-500"
                    style={{
                      backgroundColor: `${currentTheme.color}4D`,
                      borderColor: `${currentTheme.color}CC`,
                      color: currentTheme.color
                    }}
                  >
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

                <p
                  className="text-lg mb-8 leading-relaxed transition-colors duration-500"
                  style={{ color: `${currentTheme.color}80` }}
                >
                  {feature.description}
                </p>

                <ul className="space-y-4 mb-8">
                  {feature.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <div
                        className="mt-1 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${currentTheme.color}1A` }}
                      >
                        <CheckCircle className="w-3.5 h-3.5 transition-colors duration-500" style={{ color: currentTheme.color }} />
                      </div>
                      <span className="transition-colors duration-500" style={{ color: `${currentTheme.color}CC` }}>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={feature.href}
                  className="group flex items-center gap-2 text-sm font-bold text-white transition-colors duration-300"
                  style={{
                    // We can't easy apply hover styles inline, but the text-white is base.
                    // We can use style for the hover effect by creating a wrapper or using css vars.
                    // To keep it simple, we'll just use text-white and basic hover opacity or scale.
                  }}
                >
                  <span className="group-hover:opacity-80">EXPLORE MODULE SPECS</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Unique Visual Content */}
              <div className="flex-1 w-full">
                <div
                  className="relative aspect-square md:aspect-video rounded-2xl overflow-hidden border group transition-all duration-500"
                  style={{
                    backgroundColor: `${currentTheme.color}1A`, // very low opacity
                    borderColor: `${currentTheme.color}4D`
                  }}
                >
                  {/* Background Tint */}
                  <div
                    className="absolute inset-0 transition-colors duration-500"
                    style={{ backgroundColor: `${currentTheme.color}0D` }}
                  />

                  {/* Unique Animated Component */}
                  {renderVisual(feature.id)}

                  {/* Faint Logo Background Overlay */}
                  {feature.id !== 'layer' && (
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
                  )}

                  <div className="absolute bottom-4 left-4 z-20">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: currentTheme.color }}
                      />
                      <span className="text-xs font-mono" style={{ color: `${currentTheme.color}80` }}>MODULE_ACTIVE</span>
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

function PaymentVisualTrigger({ onInView, step, themeColor }: { onInView: (v: boolean) => void, step: 'idle' | 'scanning' | 'processing' | 'success', themeColor: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onInView(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [onInView]);

  return (
    <div ref={ref} className="absolute inset-0 flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#020609] to-[#0A1A2F]">
      {/* Background Texture - Digital Noise */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, ${themeColor}66 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Central Payment Stage */}
      <div className="relative w-full h-full max-w-[90%] max-h-[90%] flex items-center justify-center">

        {/* Phone / Device Frame */}
        <div
          className="relative w-36 h-64 md:w-48 md:h-80 bg-black/80 rounded-[2rem] md:rounded-[2.5rem] border-4 shadow-2xl overflow-hidden transform transition-all duration-700 hover:scale-105"
          style={{ borderColor: `${themeColor}80` }}
        >

          {/* Dynamic Screen Content */}
          <div className="absolute inset-1 bg-gradient-to-br from-gray-900 to-black rounded-[2rem] overflow-hidden flex flex-col items-center justify-center">

            {/* Top Bar */}
            <div className="absolute top-4 w-12 h-1 bg-gray-800 rounded-full" />

            {/* IDLE / SCANNING STATE: QR Code */}
            <div className={`transition-all duration-500 absolute inset-0 flex flex-col items-center justify-center p-4 ${(step === 'scanning' || step === 'idle') ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
              <div className="text-xs font-mono mb-3 animate-pulse tracking-widest" style={{ color: themeColor }}>SCAN TO PAY</div>
              <div className="relative p-3 bg-white rounded-xl" style={{ boxShadow: `0 0 20px ${themeColor}33` }}>
                {/* Realistic QR Code - SVG Pattern */}
                <svg viewBox="0 0 33 33" className="w-20 h-20 md:w-28 md:h-28">
                  <desc>QR Code</desc>
                  <rect x="0" y="0" width="9" height="9" fill="black" />
                  <rect x="1" y="1" width="7" height="7" fill="white" />
                  <rect x="2" y="2" width="5" height="5" fill="black" />
                  <rect x="24" y="0" width="9" height="9" fill="black" />
                  <rect x="25" y="1" width="7" height="7" fill="white" />
                  <rect x="26" y="2" width="5" height="5" fill="black" />
                  <rect x="0" y="24" width="9" height="9" fill="black" />
                  <rect x="1" y="25" width="7" height="7" fill="white" />
                  <rect x="2" y="26" width="5" height="5" fill="black" />
                  {[
                    [10, 0], [11, 1], [12, 0], [13, 1], [14, 0], [15, 1], [16, 0], [17, 1], [18, 0], [19, 1], [20, 0], [21, 0], [22, 1],
                    [0, 10], [1, 11], [2, 10], [3, 11], [4, 10], [5, 11], [0, 12], [1, 13], [2, 12], [3, 13], [4, 12], [5, 13],
                    [10, 10], [11, 11], [12, 12], [13, 10], [14, 11], [15, 12], [16, 10], [17, 11], [18, 12], [19, 10], [20, 11], [21, 12], [22, 10],
                  ].map(([x, y], i) => (
                    <rect key={`d${i}`} x={x} y={y} width="1" height="1" fill="black" />
                  ))}
                </svg>

                {/* Intense Laser Scanning Effect */}
                <div className={`absolute inset-0 overflow-hidden rounded-xl transition-opacity duration-300 ${step === 'scanning' ? 'opacity-100' : 'opacity-0'}`}>
                  <div
                    className="absolute inset-x-0 h-1.5 animate-scan-fast blur-[1px]"
                    style={{ backgroundColor: themeColor, boxShadow: `0 0 25px ${themeColor}` }}
                  />
                </div>

                {/* Corner Aimers */}
                <div className="absolute -top-1.5 -left-1.5 w-5 h-5 border-t-[3px] border-l-[3px] rounded-tl" style={{ borderColor: themeColor, boxShadow: `0 0 10px ${themeColor}80` }} />
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 border-t-[3px] border-r-[3px] rounded-tr" style={{ borderColor: themeColor, boxShadow: `0 0 10px ${themeColor}80` }} />
                <div className="absolute -bottom-1.5 -left-1.5 w-5 h-5 border-b-[3px] border-l-[3px] rounded-bl" style={{ borderColor: themeColor, boxShadow: `0 0 10px ${themeColor}80` }} />
                <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 border-b-[3px] border-r-[3px] rounded-br" style={{ borderColor: themeColor, boxShadow: `0 0 10px ${themeColor}80` }} />
              </div>
              <div className="mt-4 md:mt-5 text-xl md:text-2xl font-bold text-white tracking-widest shadow-black drop-shadow-md">$24.00</div>
              <div className="text-[10px] font-mono mt-1 text-center leading-tight" style={{ color: `${themeColor}80` }}>
                PortalPay • Instant<br />Reconciliation
              </div>
            </div>

            {/* PROCESSING STATE: Loading */}
            <div className={`absolute inset-0 flex flex-col items-center justify-center bg-black/95 transition-all duration-300 ${step === 'processing' ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-90'}`}>
              <div
                className="w-12 h-12 border-4 rounded-full animate-spin"
                style={{ borderColor: `${themeColor}33`, borderTopColor: themeColor, boxShadow: `0 0 30px ${themeColor}66` }}
              />
              <div className="mt-3 text-xs font-mono animate-pulse" style={{ color: `${themeColor}B3` }}>VERIFYING...</div>
            </div>

            {/* SUCCESS STATE: Checkmark */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center backdrop-blur-md transition-all duration-500 rounded-[2rem] ${step === 'success' ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
              style={{ backgroundColor: `${themeColor}1A` }}
            >
              <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full animate-scale-in" style={{ backgroundColor: themeColor, boxShadow: `0 0 40px ${themeColor}CC` }}>
                <Check className="w-8 h-8 text-white stroke-[4]" />
              </div>
              <div className="mt-4 text-white font-bold text-lg tracking-wide drop-shadow-lg">PAYMENT SENT</div>
              <div className="text-xs font-mono mt-1" style={{ color: `${themeColor}99` }}>TX: 0x82...F9A</div>
            </div>

          </div>
        </div>

        {/* Ambient Particles */}
        {mounted && (
          <>
            {/* Desktop Layout - 6 badges */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`absolute hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 border backdrop-blur-md transition-all duration-700 ${step === 'success' ? 'scale-110 opacity-0 translate-y-[-100px]' : 'scale-100 opacity-100'}`}
                style={{
                  top: `${20 + (i * 12)}%`,
                  left: i % 2 === 0 ? '5%' : 'auto',
                  right: i % 2 !== 0 ? '5%' : 'auto',
                  transform: `translateY(${Math.sin(i) * 10}px)`,
                  transitionDelay: `${i * 100}ms`,
                  borderColor: `${themeColor}99`
                }}
              >
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: themeColor }} />
                <span className="text-xs font-bold font-mono tracking-wider" style={{ color: `${themeColor}E6` }}>
                  {['BTC', 'SOL', 'ETH', 'XRP', 'USDC', 'USDT'][i]}
                </span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

function VoiceWave({ themeColor }: { themeColor: string }) {
  return (
    <div className="w-full h-full relative bg-[#020617] overflow-hidden rounded-xl border flex flex-col items-center justify-center" style={{ borderColor: `${themeColor}4D` }}>

      {/* 1. Perspective Grid Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div
          className="absolute inset-[-50%] w-[200%] h-[200%] bg-[size:40px_40px] [transform:perspective(500px)_rotateX(60deg)_translateY(-100px)] animate-grid-scroll-slow"
          style={{
            backgroundImage: `linear-gradient(${themeColor}4D 1px, transparent 1px), linear-gradient(90deg, ${themeColor}4D 1px, transparent 1px)`
          }}
        />
        {/* Horizon Glow */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#020617] via-[#020617]/80 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent" />
      </div>

      {/* 2. Top Status Pill */}
      <div className="absolute top-6 z-10">
        <div className="px-4 py-1.5 rounded-full border bg-[#020617]/80 backdrop-blur-sm flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.15)]" style={{ borderColor: `${themeColor}4D` }}>
          <span className="text-[10px] font-mono tracking-[0.2em] font-bold uppercase" style={{ color: themeColor }}>
            Real-Time Voice Tool Calls
          </span>
        </div>
      </div>

      {/* 3. Central Glowing Orb */}
      <div className="relative z-10 flex items-center justify-center">
        {/* Outer Rings */}
        <div className="absolute w-40 h-40 rounded-full border animate-spin-slow-reverse" style={{ borderColor: `${themeColor}1A` }} />
        <div className="absolute w-32 h-32 rounded-full border border-dashed animate-spin-slow" style={{ borderColor: `${themeColor}33` }} />

        {/* Core Container */}
        <div
          className="relative w-24 h-24 bg-[#020617] rounded-full border-2 shadow flex items-center justify-center overflow-hidden group"
          style={{ borderColor: themeColor, boxShadow: `0 0 50px ${themeColor}66` }}
        >

          {/* Inner Glow Pulse */}
          <div className="absolute inset-0 animate-pulse-slow rounded-full" style={{ backgroundColor: `${themeColor}33` }} />

          {/* Voice Bars Animation */}
          <div className="flex items-center gap-1 h-8">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 rounded-full shadow"
                style={{
                  height: '40%',
                  backgroundColor: themeColor,
                  boxShadow: `0 0 10px ${themeColor}CC`,
                  animation: `equalizer 1s ease-in-out infinite`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
            <style jsx>{`
              @keyframes equalizer {
                0%, 100% { height: 30%; opacity: 0.5; }
                50% { height: 100%; opacity: 1; }
              }
              .animate-grid-scroll-slow {
                animation: grid-scroll 20s linear infinite;
              }
              @keyframes grid-scroll {
                0% { transform: perspective(500px) rotateX(60deg) translateY(0); }
                100% { transform: perspective(500px) rotateX(60deg) translateY(40px); }
              }
              .animate-spin-slow { animation: spin 10s linear infinite; }
              .animate-spin-slow-reverse { animation: spin-reverse 15s linear infinite; }
            `}</style>
          </div>
        </div>

        {/* Orbiting Particles */}
        <div className="absolute w-48 h-48 animate-spin-slow pointer-events-none">
          <div className="absolute top-0 left-1/2 w-1 h-1 rounded-full" style={{ backgroundColor: themeColor, boxShadow: `0 0 10px ${themeColor}` }} />
          <div className="absolute bottom-0 left-1/2 w-1 h-1 rounded-full" style={{ backgroundColor: themeColor, boxShadow: `0 0 10px ${themeColor}` }} />
        </div>
      </div>

      {/* 4. Bottom Status Pill */}
      <div className="absolute bottom-6 z-10 w-full flex justify-center">
        <div className="px-5 py-2 rounded-full border bg-[#020617]/90 backdrop-blur-md flex items-center gap-3 shadow" style={{ borderColor: `${themeColor}4D`, boxShadow: `0 0 20px ${themeColor}1A` }}>
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest text-white font-bold uppercase">
            Processing Voice Input...
          </span>
          {/* Small Waveform Icon Icon */}
          <div className="w-4 flex items-center gap-[2px]">
            <div className="w-[2px] h-2 rounded-full animate-pulse" style={{ backgroundColor: themeColor }} />
            <div className="w-[2px] h-3 rounded-full animate-pulse delay-75" style={{ backgroundColor: themeColor }} />
            <div className="w-[2px] h-2 rounded-full animate-pulse delay-150" style={{ backgroundColor: themeColor }} />
          </div>
        </div>
      </div>

    </div>
  );
}
