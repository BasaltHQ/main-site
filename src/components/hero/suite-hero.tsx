"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowRight, Target } from "lucide-react";
import { useBrandTheme } from "@/components/providers/brand-theme-provider";
import { PortalSection } from "@/components/sections/portal-section";

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

        {/* Embedded Portal Section */}
        <div className="mt-8 md:mt-16">
          <PortalSection />
        </div>
      </div>
    </section>
  );
}
