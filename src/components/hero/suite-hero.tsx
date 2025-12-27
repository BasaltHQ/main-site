"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowRight, Zap, Target } from "lucide-react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

function createNodes(count: number, width: number, height: number): Node[] {
  const nodes: Node[] = [];
  for (let i = 0; i < count; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    });
  }
  return nodes;
}

export function SuiteHero() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [isReducedMotion, setIsReducedMotion] = React.useState(false);

  const products = [
    {
      name: "BasaltERP",
      logo: "/BasaltERPWide.png",
      url: "https://erp.basalthq.com",
      tagline: "AI-Assisted Universal ERP",
      description: "Industry-specific ERP with AI module builder"
    },
    {
      name: "BasaltCRM",
      logo: "/BasaltCRMWide.png",
      url: "https://crm.basalthq.com",
      tagline: "AI-First Customer Intelligence",
      description: "Lead generation, sales agents & social intelligence"
    },
    {
      name: "BasaltCMS",
      logo: "/BasaltCMSWide.png",
      url: "https://cms.basalthq.com",
      tagline: "AI-Voice Powered Content Command Center",
      description: "Manage media, docs, forms, website from one dashboard"
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
      name: "BasaltOnyx",
      logo: "/BasaltOnyxWide.png",
      url: "#",
      tagline: "Autonomous Social Intelligence",
      description: "AI Agents that post, engage, and grow your presence",
      locked: true
    }
  ];

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setIsReducedMotion(mq.matches);
    handleChange();
    mq.addEventListener?.("change", handleChange);
    return () => mq.removeEventListener?.("change", handleChange);
  }, []);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    let networkNodes = createNodes(Math.max(60, Math.floor((width * height) / 20000)), width, height);

    const drawGlow = () => {
      // Deep Teal Radial Gradient
      const gradient = ctx.createRadialGradient(
        width * 0.5, height * 0.3, 0,
        width * 0.5, height * 0.3, Math.max(width, height) * 0.8
      );
      gradient.addColorStop(0, `rgba(4, 47, 46, 0.4)`); // Teal-900ish
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient as CanvasGradient;
      ctx.fillRect(0, 0, width, height);
    };

    const drawNetwork = () => {
      const maxDist = Math.min(width, height) * 0.18;
      const maxDistSq = maxDist * maxDist;
      ctx.lineWidth = 1;
      for (let i = 0; i < networkNodes.length; i++) {
        for (let j = i + 1; j < networkNodes.length; j++) {
          const dx = networkNodes[i].x - networkNodes[j].x;
          const dy = networkNodes[i].y - networkNodes[j].y;
          const distSq = dx * dx + dy * dy;
          if (distSq < maxDistSq) {
            const t = 1 - distSq / maxDistSq;
            // Red connections for "Punch"
            ctx.strokeStyle = `rgba(220, 38, 38, ${0.2 * t})`; // Red-600
            ctx.beginPath();
            ctx.moveTo(networkNodes[i].x, networkNodes[i].y);
            ctx.lineTo(networkNodes[j].x, networkNodes[j].y);
            ctx.stroke();
          }
        }
      }
      for (const n of networkNodes) {
        // Cyan/Teal Nodes
        ctx.fillStyle = `rgba(34, 211, 238, 0.8)`; // Cyan-400
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!isReducedMotion) {
        for (const n of networkNodes) {
          n.x += n.vx; n.y += n.vy;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
        }
      }
    };

    let raf = 0;
    const step = () => {
      ctx.clearRect(0, 0, width, height);
      drawGlow();
      drawNetwork();
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const onResize = () => {
      resize();
      networkNodes = createNodes(Math.max(60, Math.floor((width * height) / 20000)), width, height);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(canvas);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [isReducedMotion]);

  return (
    <section className="relative isolate overflow-hidden min-h-[100svh] pt-24 md:pt-32 bg-[#020609]">
      <div className="absolute inset-0 -z-10">
        <canvas ref={canvasRef} className="h-full w-full block" />
        {/* Subtle Grid Overlay */}
        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.1] pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Main headline */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center rounded-full bg-cyan-950/30 border border-cyan-800/50 px-4 py-2 shadow-sm mb-6 animate-pulse">
            <Target className="h-4 w-4 mr-2 text-red-500" />
            <span className="text-sm font-bold text-cyan-200">The Main Street Ontology</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-8">
            <span className="text-white">The Future is</span>
            <br />
            <span className="relative inline-block bg-gradient-to-r from-teal-400 via-cyan-200 to-teal-400 bg-clip-text text-transparent pb-2">
              Neuromimetic Business Architecture
            </span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-cyan-200/60 max-w-4xl mx-auto mb-10 leading-relaxed">
            Evolve beyond static software. Initialize your <span className="text-red-500 font-bold">Cognitive Enterprise</span> with a living, breathing ontology that thinks, adapts, and executes at the speed of thought.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#products"
              className="group inline-flex items-center justify-center rounded-lg bg-red-600 px-8 py-4 text-base md:text-lg font-bold text-white shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:bg-red-700 hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] transition-all duration-300 hover:scale-105"
            >
              Initialize System
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#vision"
              className="inline-flex items-center justify-center rounded-lg border border-cyan-800 bg-cyan-950/30 px-8 py-4 text-base md:text-lg font-semibold text-cyan-100 hover:bg-cyan-900/50 hover:border-red-500/50 transition-all duration-300"
            >
              Our Mission
            </a>
          </div>
        </div>

        {/* Product Grid */}
        <div id="products" className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-16 md:mt-24">
          {products.map((product, index) => (
            <a
              key={product.name}
              href={product.url}
              target={product.locked ? undefined : "_blank"}
              rel="noopener noreferrer"
              className={`group relative rounded-2xl border bg-cyan-950/20 backdrop-blur-sm p-6 md:p-8 transition-all duration-300 overflow-hidden
                ${product.locked
                  ? "border-cyan-900/30 opacity-70 cursor-not-allowed grayscale-[0.8] hover:grayscale-0 hover:opacity-100 hover:border-cyan-500/30"
                  : "border-cyan-900/50 hover:border-red-600/50 hover:-translate-y-1"
                }
              `}
              onClick={(e) => product.locked && e.preventDefault()}
            >
              {/* Red accent line on hover (only for unlocked) */}
              {!product.locked && (
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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
                <h3 className={`text-xl md:text-2xl font-bold transition-colors
                  ${product.locked ? "text-cyan-400 group-hover:text-cyan-300" : "text-white group-hover:text-red-400"}`
                }>
                  {product.tagline}
                </h3>
                {!product.locked && (
                  <ArrowRight className="h-5 w-5 text-red-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                )}
              </div>
              <p className="text-cyan-200/60 text-sm md:text-base leading-relaxed">
                {product.description}
              </p>

              <div className={`mt-6 inline-flex items-center text-sm font-bold tracking-wider
                ${product.locked ? "text-cyan-600" : "text-red-500"}`
              }>
                {product.locked ? (
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-600 animate-pulse"></span>
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
      </div>
    </section>
  );
}
