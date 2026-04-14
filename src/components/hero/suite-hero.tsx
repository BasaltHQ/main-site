"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowRight, Target } from "lucide-react";
import { useBrandTheme } from "@/components/providers/brand-theme-provider";

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
  const { currentTheme } = useBrandTheme();
  // Ref to hold current theme for animation loop access without triggering re-renders of the effect
  const themeRef = React.useRef(currentTheme);

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [isReducedMotion, setIsReducedMotion] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  // Helper to get RGB from hex for canvas alpha manipulation
  const getRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 17, g: 157, b: 255 }; // fallback
  };

  React.useEffect(() => {
    themeRef.current = currentTheme;
  }, [currentTheme]);

  // Set mounted after hydration
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const products = [
    {
      name: "BasaltERP",
      logo: "/BasaltERPWide.png",
      url: "https://erp.basalthq.com",
      tagline: "AI-Assisted Universal ERP",
      description: "Industry-specific ERP with AI module builder",
      locked: true
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
      description: "Manage media, docs, forms, website from one dashboard",
      locked: true
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
    if (!mounted) return; // Skip on server/first render to avoid hydration mismatch
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
      // Use current theme from ref to update without resetting loop
      const themeRgb = getRgb(themeRef.current.color);

      // Dynamic Radial Gradient based on theme
      const gradient = ctx.createRadialGradient(
        width * 0.5, height * 0.3, 0,
        width * 0.5, height * 0.3, Math.max(width, height) * 0.8
      );
      // Use theme color with low opacity for background glow
      gradient.addColorStop(0, `rgba(${themeRgb.r}, ${themeRgb.g}, ${themeRgb.b}, 0.15)`);
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient as CanvasGradient;
      ctx.fillRect(0, 0, width, height);
    };

    const drawNetwork = () => {
      // Use current theme from ref
      const current = themeRef.current;
      const themeRgb = getRgb(current.color);
      // Use dotColor if available, otherwise fallback to theme color
      const dotHex = current.dotColor || current.color;
      const dotRgb = getRgb(dotHex);

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
            // FIXED EDGE COLOR: Basalt Blue #119dff -> RGB(17, 157, 255)
            // Use blue for edges always
            ctx.strokeStyle = `rgba(17, 157, 255, ${0.3 * t})`;
            ctx.beginPath();
            ctx.moveTo(networkNodes[i].x, networkNodes[i].y);
            ctx.lineTo(networkNodes[j].x, networkNodes[j].y);
            ctx.stroke();
          }
        }
      }
      for (const n of networkNodes) {
        // NODES CHANGE COLOR based on theme (or specific dotColor override)
        ctx.fillStyle = `rgba(${dotRgb.r}, ${dotRgb.g}, ${dotRgb.b}, 0.8)`;
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
  }, [mounted, isReducedMotion]); // Removed currentTheme dependency

  return (
    <section className="relative isolate overflow-hidden min-h-[100svh] pt-20 md:pt-24 bg-[#020609]">
      <div className="absolute inset-0 -z-10">
        <canvas ref={canvasRef} className="h-full w-full block" />
        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.1] pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Main headline */}
        <div className="text-center mb-8">
          {/* Rotating Shield */}
          <div className="relative w-40 h-40 md:w-56 md:h-56 mx-auto mb-6 transition-transform duration-500 hover:scale-105">
            <Image
              src={currentTheme.icon}
              alt={currentTheme.name}
              fill
              className="object-contain"
              priority
            />
            <div
              className="shield-gleam-container"
              style={{
                maskImage: `url('${currentTheme.icon}')`,
                WebkitMaskImage: `url('${currentTheme.icon}')`
              }}
            />
          </div>

          <div className="inline-flex items-center rounded-full bg-primary/10 border border-primary/20 px-4 py-2 shadow-sm mb-6 animate-pulse">
            <Target className="h-4 w-4 mr-2 text-primary" />
            <span className="text-sm font-bold text-primary">The Main Street Ontology</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
            <span className="text-white">The Future is</span>
            <br />
            <span className="relative inline-block bg-gradient-to-r from-primary via-white to-primary bg-clip-text text-transparent pb-2 transition-all duration-500">
              Neuromimetic Business Architecture
            </span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground/80 max-w-4xl mx-auto mb-8 leading-relaxed">
            Evolve beyond static software. Initialize your <span className="text-primary font-bold transition-colors duration-500">Cognitive Enterprise</span> with a living, breathing ontology that thinks, adapts, and executes at the speed of thought.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#products"
              className="group inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-base md:text-lg font-bold text-black shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:opacity-90 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300 hover:scale-105"
              style={{ boxShadow: `0 0 20px ${currentTheme.color}40`, backgroundColor: currentTheme.color }}
            >
              Initialize System
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#vision"
              className="inline-flex items-center justify-center rounded-lg border border-primary/30 bg-primary/5 px-8 py-4 text-base md:text-lg font-semibold text-primary hover:bg-primary/10 transition-all duration-300"
            >
              Our Mission
            </a>
          </div>
        </div>

        {/* Product Grid */}
        <div id="products" className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-16 md:mt-32">
          {products.map((product, index) => (
            <a
              key={product.name}
              href={product.url}
              target={product.locked ? undefined : "_blank"}
              rel="noopener noreferrer"
              className={`group relative rounded-2xl border bg-black/40 backdrop-blur-sm p-6 md:p-8 transition-all duration-300 overflow-hidden
                ${product.locked
                  ? "border-white/10 opacity-70 cursor-not-allowed grayscale-[0.8] hover:grayscale-0 hover:opacity-100 hover:border-primary/30"
                  : "border-white/10 hover:border-primary/50 hover:-translate-y-1"
                }
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
      </div>
    </section>
  );
}
