"use client";

import * as React from "react";

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

export function GraphHero() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [isReducedMotion, setIsReducedMotion] = React.useState(false);
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const timerRef = React.useRef<number | null>(null);
  const [shiftT, setShiftT] = React.useState(0);
  const [isDark, setIsDark] = React.useState(false);

  const slides = React.useMemo(() => ([
    {
      titleLines: ["The Universal, AI-Assisted", "ERP"],
      subtitle: "Start with an industry pack. Let AI build and modify modules, panels, and workflows on demand.",
      ctaPrimary: { href: "#pricing", label: "Get Started" },
      ctaSecondary: { href: "#features", label: "Watch Demo" },
      chips: [
        { t: 'Starter $499/mo', href: '#pricing' },
        { t: 'Pro $999/mo', href: '#pricing' },
        { t: 'Scale $1,999/mo', href: '#pricing' },
      ],
      bg: { kind: "network" as const, hue: 171 },
    },
    {
      titleLines: ["Modular Industry Packs"],
      subtitle: "Restaurants • Hospitality • Child-Care • Self-Storage • Retail • Cannabis",
      ctaPrimary: { href: "#pricing", label: "Choose Your Industry" },
      ctaSecondary: { href: "#case-studies", label: "View Success Stories" },
      chips: [
        { t: '6 industry packs', href: '#features' },
        { t: 'AI-extendable', href: '#features' },
        { t: 'GraphQL API', href: '#features' },
      ],
      bg: { kind: "life" as const, hue: 200 },
    },
    {
      titleLines: ["Build Your Own Modules with Varuni"],
      subtitle: "Create or modify modules, panels, and modals with natural language.",
      ctaPrimary: { href: "#features", label: "See It In Action" },
      ctaSecondary: { href: "#pricing", label: "Start Building" },
      chips: [
        { t: 'Build modules', href: '#features' },
        { t: 'Natural language', href: '#features' },
        { t: 'Versioned changes', href: '#features' },
      ],
      badge: 'Coming Soon',
      bg: { kind: "matrix" as const, hue: 171 },
    },
    {
      titleLines: ["Enterprise-Grade Security & Reliability"],
      subtitle: "RBAC • SSO • Audit Trails • Retention • 99.95% Uptime • Exports",
      ctaPrimary: { href: "#contact", label: "Contact Sales" },
      ctaSecondary: { href: "#pricing", label: "Compare Plans" },
      chips: [
        { t: '99.95% SLA', href: '#pricing' },
        { t: 'SSO (SAML/OIDC)', href: '#features' },
        { t: 'Data exports', href: '#features' },
      ],
      bg: { kind: "fortress" as const, hue: 210 },
    },
  ]), []);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setIsReducedMotion(mq.matches);
    handleChange();
    mq.addEventListener?.("change", handleChange);
    return () => mq.removeEventListener?.("change", handleChange);
  }, []);

  // Track color mode for canvas contrast tuning
  React.useEffect(() => {
    const html = document.documentElement;
    const update = () => setIsDark(html.classList.contains('dark'));
    update();
    const mo = new MutationObserver(update);
    mo.observe(html, { attributes: true, attributeFilter: ['class'] });
    return () => mo.disconnect();
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

    const drawGlow = (hue: number) => {
      // In light mode, remove the subtle gray/white glow entirely
      if (!isDark) return;
      const gradient = ctx.createRadialGradient(
        width * 0.7, height * 0.2, 0,
        width * 0.7, height * 0.2, Math.max(width, height)
      );
      gradient.addColorStop(0, `hsla(${hue},65%,58%,0.12)`);
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient as CanvasGradient;
      ctx.fillRect(0, 0, width, height);
    };

    // network state
    let networkNodes = createNodes(Math.max(60, Math.floor((width * height) / 20000)), width, height);

    // Conway's Game of Life (glassmorphic overlay cells)
    let lifeCols = 0, lifeRows = 0;
    let lifeGrid: Uint8Array;
    const initLife = () => {
      const cell = Math.max(14, Math.floor(Math.min(width, height) / 42));
      lifeCols = Math.ceil(width / cell);
      lifeRows = Math.ceil(height / cell);
      lifeGrid = new Uint8Array(lifeCols * lifeRows);
      for (let r = 0; r < lifeRows; r++) {
        for (let c = 0; c < lifeCols; c++) {
          lifeGrid[r * lifeCols + c] = Math.random() > 0.78 ? 1 : 0;
        }
      }
    };
    initLife();

    // matrix state
    const matrixDrops: Array<{ x: number; y: number; speed: number; char: string }> = [];
    const sparkles: Array<{ x: number; y: number; r: number; phase: number; speed: number }> = [];
    const initMatrix = () => {
      matrixDrops.length = 0;
      for (let i = 0; i < Math.floor(width / 14); i++) {
        matrixDrops.push({ x: i * 14 + Math.random() * 10, y: Math.random() * height, speed: 1 + Math.random() * 2, char: String.fromCharCode(65 + Math.floor(Math.random() * 26)) });
      }
    };
    initMatrix();
    const initSparkles = () => {
      sparkles.length = 0;
      const count = Math.floor(Math.max(width, height) / 10);
      for (let i = 0; i < count; i++) {
        sparkles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: 0.8 + Math.random() * 1.8,
          phase: Math.random() * Math.PI * 2,
          speed: 0.3 + Math.random() * 0.8,
        });
      }
    };
    initSparkles();

    const drawNetwork = (hue: number) => {
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
            ctx.strokeStyle = `hsla(${hue},65%,58%,${(isDark ? 0.25 : 0.38) * t})`;
            ctx.beginPath();
            ctx.moveTo(networkNodes[i].x, networkNodes[i].y);
            ctx.lineTo(networkNodes[j].x, networkNodes[j].y);
            ctx.stroke();
          }
        }
      }
      for (const n of networkNodes) {
        ctx.fillStyle = `hsla(${hue},65%,${isDark ? 58 : 50}%,${isDark ? 0.85 : 0.95})`;
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

    const drawLife = (hue: number, now: number) => {
      // step life every few frames
      if (!isReducedMotion && (now % 6 < 1)) {
        const next = new Uint8Array(lifeCols * lifeRows);
        for (let r = 0; r < lifeRows; r++) {
          for (let c = 0; c < lifeCols; c++) {
            let n = 0;
            for (let dr = -1; dr <= 1; dr++) {
              for (let dc = -1; dc <= 1; dc++) {
                if (dr === 0 && dc === 0) continue;
                const rr = (r + dr + lifeRows) % lifeRows;
                const cc = (c + dc + lifeCols) % lifeCols;
                n += lifeGrid[rr * lifeCols + cc];
              }
            }
            const idx = r * lifeCols + c;
            const alive = lifeGrid[idx] === 1;
            next[idx] = (alive && (n === 2 || n === 3)) || (!alive && n === 3) ? 1 : 0;
          }
        }
        lifeGrid = next;
      }
      // render cells with glassmorphic dots
      const cell = Math.max(14, Math.floor(Math.min(width, height) / 42));
      const radius = Math.max(1.2, cell * 0.18);
      for (let r = 0; r < lifeRows; r++) {
        for (let c = 0; c < lifeCols; c++) {
          const idx = r * lifeCols + c;
          if (lifeGrid[idx] === 1) {
            const x = c * cell + cell * 0.5;
            const y = r * cell + cell * 0.5;
            // subtle frosted dot with rim
            ctx.fillStyle = `hsla(${hue}, 60%, 70%, 0.28)`;
            ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = `hsla(${hue}, 70%, 80%, 0.18)`;
            ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x, y, radius + 1.5, 0, Math.PI * 2); ctx.stroke();
          }
        }
      }
    };

    const drawMatrix = (hue: number, now: number) => {
      // soft teal veil only in dark mode; in light mode keep canvas clear
      if (isDark) {
        ctx.fillStyle = `hsla(${hue},60%,12%,0.22)`;
        ctx.fillRect(0, 0, width, height);
      } else {
        ctx.clearRect(0, 0, width, height);
      }

      // aurora ribbons
      const waves = 3;
      for (let w = 0; w < waves; w++) {
        ctx.beginPath();
        const amp = Math.max(14, height * (0.04 + w * 0.015));
        const yBase = height * (0.25 + w * 0.22);
        for (let x = -50; x <= width + 50; x += 8) {
          const y = yBase + Math.sin((x * 0.012) + (now * 0.0012) + w) * amp;
          if (x === -50) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `hsla(${hue + w * 8}, 80%, 60%, ${isDark ? (0.08 + w * 0.04) : (0.14 + w * 0.05)})`;
        ctx.lineWidth = 2 + w;
        ctx.stroke();

        // glow pass
        ctx.strokeStyle = `hsla(${hue + w * 8}, 90%, 70%, ${isDark ? 0.05 : 0.09})`;
        ctx.lineWidth = 10 + w * 2;
        ctx.stroke();
      }

      // twinkle sparkles
      for (const s of sparkles) {
        const tw = 0.55 + 0.45 * Math.sin(now * 0.003 + s.phase);
        ctx.fillStyle = `hsla(${hue + 10}, 90%, 70%, ${(isDark ? 0.25 : 0.35) * tw})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * (0.8 + tw * 0.6), 0, Math.PI * 2);
        ctx.fill();
        s.y += s.speed * 0.3;
        s.phase += 0.02;
        if (s.y > height) { s.y = -10; s.x = Math.random() * width; }
      }

      // falling droplets
      for (const d of matrixDrops) {
        ctx.fillStyle = `hsla(${hue + (d.x % 60)},85%,${isDark ? 70 : 55}%,${isDark ? 0.5 : 0.65})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
        d.y += d.speed;
        if (d.y > height) { d.y = -10; }
      }
    };

    const drawFortress = (hue: number, now: number) => {
      // hexagonal lattice across the viewport with wave pulse
      const base = Math.min(width, height);
      const s = Math.max(8, base * 0.02); // hex radius
      const hexH = Math.sqrt(3) * s;
      const cols = Math.ceil(width / (s * 1.5)) + 2;
      const rows = Math.ceil(height / hexH) + 2;
      ctx.lineWidth = 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * (s * 1.5) + ((r % 2) * s * 0.75) - s;
          const y = r * (hexH) - s;
          const dx = x - width * 0.5;
          const dy = y - height * 0.5;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const pulse = (Math.sin(now * 0.001 + dist * 0.02) + 1) * 0.5;
          const alpha = 0.08 + pulse * 0.12;
          ctx.strokeStyle = `hsla(${hue},70%,60%,${alpha})`;
          // draw hex outline
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const a = (Math.PI / 3) * i;
            const px = x + s * Math.cos(a);
            const py = y + s * Math.sin(a);
            if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.stroke();
        }
      }
    };

    let raf = 0;
    const step = (now: number) => {
      const { kind, hue } = slides[activeSlide].bg;
      ctx.clearRect(0, 0, width, height);
      drawGlow(hue);
      if (kind === 'network') drawNetwork(hue);
      else if (kind === 'life') drawLife(hue, now);
      else if (kind === 'matrix') drawMatrix(hue, now);
      else if (kind === 'fortress') drawFortress(hue, now);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const onResize = () => {
      resize();
      networkNodes = createNodes(Math.max(60, Math.floor((width * height) / 20000)), width, height);
      initMatrix();
      initSparkles();
      initLife();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(canvas);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [isReducedMotion, activeSlide, slides, isDark]);

  React.useEffect(() => {
    if (isPaused) return;
    timerRef.current && clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setActiveSlide((s) => (s + 1) % slides.length);
    }, 6500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [slides.length, isPaused]);

  // Subtle shifting motion for right-hand micro-panels
  React.useEffect(() => {
    const id = window.setInterval(() => setShiftT((t) => t + 1), 240);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative isolate overflow-hidden min-h-[100svh] pt-30 md:pt-30">
      <div className="absolute inset-0 -z-10">
        <canvas ref={canvasRef} className="h-full w-full block" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex items-start pb-10 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 w-full">
          {/* Left: Primary narrative */}
          <div className="lg:col-span-7 flex flex-col gap-4 lg:gap-6">
            {/* Eyebrow microchip */}
            <div className="inline-flex self-start items-center rounded-full backdrop-blur-sm bg-primary/15 border border-primary/25 px-3 py-1 shadow-sm">
              <span className="micro-kicker text-[hsl(171_65%_40%)] dark:text-primary">✦ Powered by Advanced AI Technology</span>
            </div>
            {false && activeSlide === 2 && slides[activeSlide].badge && (
              <div className="inline-flex self-start items-center rounded-full bg-primary/15 border border-primary/25 px-2.5 py-1 text-[10px] md:text-xs text-[hsl(171_65%_40%)]">
                {slides[activeSlide].badge}
              </div>
            )}
            {/* Hero headline cards split for visual rhythm */}
            {activeSlide === 0 ? (
              <>
                <div className="glass-pane rounded-xl ring-1 ring-border/60 backdrop-blur-sm p-5 md:p-7 max-w-3xl">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight text-foreground">
                    The Universal,{' '}
                    <span className="relative inline-block bg-gradient-to-r from-primary via-cyan-600 to-primary/85 dark:via-cyan-400 dark:to-primary/70 bg-clip-text text-transparent drop-shadow-[0_1px_0_rgba(0,0,0,0.08)]">
                      AI-Assisted
                      <span className="pointer-events-none absolute inset-x-0 -bottom-1 h-2 rounded-full bg-primary/35 dark:bg-primary/25 blur-md"></span>
                    </span>{' '}
                    ERP
                  </h1>
                </div>
              </>
            ) : (
              <>
                <div className="glass-pane rounded-xl ring-1 ring-border/60 backdrop-blur-sm p-4 md:p-6 max-w-2xl">
                  <div className="flex items-center justify-between gap-3">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight bg-gradient-to-r from-[hsl(171_65%_40%)] via-cyan-700 to-[hsl(171_65%_30%)] dark:from-primary dark:via-cyan-400 dark:to-primary/70 bg-clip-text text-transparent drop-shadow-[0_1px_0_rgba(0,0,0,0.08)]">
                      {slides[activeSlide].titleLines[0]}
                    </h1>
                    {activeSlide === 2 && slides[activeSlide].badge && (
                      <span className="micro-label bg-primary/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                        {slides[activeSlide].badge}
                      </span>
                    )}
                  </div>
                </div>
                {slides[activeSlide].titleLines[1] && (
                  <div className="glass-pane rounded-xl ring-1 ring-border/60 backdrop-blur-sm p-4 md:p-6 max-w-xl">
                    <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-foreground/90">
                      {slides[activeSlide].titleLines[1]}
                    </h2>
                  </div>
                )}
              </>
            )}
            {/* Microtext subtitle card */}
            <div className="glass-pane rounded-xl ring-1 ring-border/60 backdrop-blur-sm p-4 md:p-6 max-w-2xl">
              <p className="micro-hint text-foreground/70">
                {slides[activeSlide].subtitle}
              </p>
            </div>
            {/* Context chips per slide */}
            <div className="flex flex-wrap gap-3">
              {slides[activeSlide].chips?.map((m, i) => (
                <a
                  key={i}
                  href={m.href}
                  className="glass-pane rounded-full ring-1 ring-border/60 backdrop-blur-sm px-3 py-1 text-[10px] md:text-[11px] uppercase tracking-wider text-muted-foreground inline-flex items-center hover:text-foreground transition-colors"
                >
                  {m.t}
                </a>
              ))}
            </div>
            {/* CTA bar */}
            <div className="glass-pane rounded-xl ring-1 ring-border/60 backdrop-blur-sm p-3 md:p-4 inline-flex gap-3 w-fit shadow-lg">
              <a href={slides[activeSlide].ctaPrimary.href} className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-primary to-primary/80 px-5 md:px-6 py-2.5 text-sm md:text-base font-semibold text-primary-foreground shadow hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                {slides[activeSlide].ctaPrimary.label}
              </a>
              <a
                href={slides[activeSlide].ctaSecondary.href}
                onClick={(e) => {
                  if (slides[activeSlide].ctaSecondary.label.toLowerCase().includes("watch demo")) {
                    e.preventDefault();
                    window.dispatchEvent(new CustomEvent("open-demo-video"));
                  }
                }}
                className="inline-flex items-center justify-center rounded-lg border-2 border-primary/20 bg-card/50 backdrop-blur px-5 md:px-6 py-2.5 text-sm md:text-base font-semibold hover:bg-primary/5 transition-all duration-300"
              >
                {slides[activeSlide].ctaSecondary.label}
              </a>
            </div>
          </div>

          {/* Right: Contextual micro-panels per slide */}
          <div className="lg:col-span-5 mt-15 md:mt-15 lg:mt-15 grid grid-cols-2 gap-3 md:gap-4 content-start">
            {activeSlide === 0 && (
              <div className="contents">
                {[
                  { label: "Modules", sub: "Schema-first CRUD + rules", eyebrow: "Composable" },
                  { label: "Panels", sub: "Composable views & panes", eyebrow: "UI Surfaces" },
                  { label: "Workflows", sub: "Event-driven steps & approvals", eyebrow: "Automation" },
                  { label: "Reports", sub: "KPIs, exports, benchmarks", eyebrow: "Analytics" },
                ].map((item, idx) => (
                  <div
                    key={item.label}
                    className="glass-pane rounded-xl ring-1 ring-border/60 backdrop-blur-sm p-3 md:p-4 text-left transition-transform duration-500 ease-out"
                    style={{ transform: `translate3d(${Math.sin((shiftT + idx * 7) * 0.12) * 2}px, ${Math.cos((shiftT + idx * 5) * 0.12) * 2}px, 0)` }}
                  >
                    <div className="micro-label mb-1">{item.eyebrow}</div>
                    <div className="text-sm md:text-base font-semibold text-foreground">{item.label}</div>
                    <div className="mt-1 micro-hint">{item.sub}</div>
                  </div>
                ))}
              </div>
            )}

            {activeSlide === 1 && (
              <div className="contents">
                {[
                  { label: "Restaurants", sub: "Prime costs, menu mix, Toast", eyebrow: "Prime costs", soon: false },
                  { label: "Hospitality", sub: "Housekeeping, OTA pacing, RevPAR", eyebrow: "RevPAR", soon: true },
                  { label: "Child-Care", sub: "Ratios, billing, incident logs", eyebrow: "Ratios", soon: true },
                  { label: "Self-Storage", sub: "Move-ins, locks, AR aging", eyebrow: "Occupancy", soon: true },
                  { label: "Retail", sub: "SKU turns, shrink, promos", eyebrow: "Merchandising", soon: true },
                  { label: "Cannabis", sub: "Metrc, lab results, compliance", eyebrow: "Compliance", soon: true },
                ].map((item, idx) => (
                  <div
                    key={item.label}
                    className="glass-pane rounded-xl ring-1 ring-border/60 backdrop-blur-sm p-3 md:p-4 text-left transition-transform duration-500 ease-out"
                    style={{ transform: `translate3d(${Math.sin((shiftT + idx * 6) * 0.12) * 2}px, ${Math.cos((shiftT + idx * 4) * 0.12) * 2}px, 0)` }}
                  >
                    {item.soon && (
                      <div className="mb-1 text-right">
                        <span className="micro-label bg-primary/10 px-2 py-0.5 rounded-full inline-block">Coming Soon</span>
                      </div>
                    )}
                    <div className="micro-label mb-1">{item.eyebrow}</div>
                    <div className="text-sm md:text-base font-semibold text-foreground">{item.label}</div>
                    <div className="mt-1 micro-hint">{item.sub}</div>
                  </div>
                ))}
              </div>
            )}

            {activeSlide === 2 && (
              <div className="contents">
                {[
                  { label: "Forms", sub: "Schema, validation, conditional fields", eyebrow: "Data entry" },
                  { label: "Dashboards", sub: "Time series, cohorts, drilldowns", eyebrow: "Analytics" },
                  { label: "Integrations", sub: "GraphQL/REST, webhooks, OAuth", eyebrow: "Connectivity" },
                  { label: "Automations", sub: "Triggers, cron, human-in-the-loop", eyebrow: "Automation" },
                  { label: "Workflows", sub: "Steps, guards, SLAs", eyebrow: "Orchestration" },
                  { label: "Modals", sub: "Inline create/edit overlays", eyebrow: "Overlays" },
                ].map((item, idx) => (
                  <div
                    key={item.label}
                    className="glass-pane rounded-xl ring-1 ring-border/60 backdrop-blur-sm p-3 md:p-4 text-left transition-transform duration-500 ease-out"
                    style={{ transform: `translate3d(${Math.sin((shiftT + idx * 5) * 0.12) * 2}px, ${Math.cos((shiftT + idx * 7) * 0.12) * 2}px, 0)` }}
                  >
                    <div className="micro-label mb-1">{item.eyebrow}</div>
                    <div className="text-sm md:text-base font-semibold text-foreground">{item.label}</div>
                    <div className="mt-1 micro-hint">{item.sub}</div>
                  </div>
                ))}
              </div>
            )}

            {activeSlide === 3 && (
              <div className="contents">
                {[
                  { label: "RBAC", sub: "Roles, permissions, scopes", eyebrow: "Security" },
                  { label: "SSO", sub: "SAML, OIDC, SCIM provisioning", eyebrow: "Security" },
                  { label: "Audit Trails", sub: "Immutable diffs, who/when", eyebrow: "Compliance" },
                  { label: "Retention", sub: "Policies, legal holds, purge", eyebrow: "Compliance" },
                  { label: "Exports", sub: "CSV, XLSX, S3, BigQuery", eyebrow: "Data" },
                  { label: "Uptime 99.95%", sub: "Multi-AZ, health checks, SLA", eyebrow: "Reliability" },
                ].map((item, idx) => (
                  <div
                    key={item.label}
                    className="glass-pane rounded-xl ring-1 ring-border/60 backdrop-blur-sm p-3 md:p-4 text-left transition-transform duration-500 ease-out"
                    style={{ transform: `translate3d(${Math.sin((shiftT + idx * 4) * 0.12) * 2}px, ${Math.cos((shiftT + idx * 6) * 0.12) * 2}px, 0)` }}
                  >
                    <div className="micro-label mb-1">{item.eyebrow}</div>
                    <div className="text-sm md:text-base font-semibold text-foreground">{item.label}</div>
                    <div className="mt-1 micro-hint">{item.sub}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom slide controls */}
      <div className="absolute bottom-5 md:bottom-8 left-0 right-0 z-20 flex items-center justify-center">
        <div className="glass-pane rounded-full ring-1 ring-border/60 backdrop-blur-sm px-3 py-2 flex items-center gap-3 shadow-lg">
          <button
            aria-label={isPaused ? 'Play slideshow' : 'Pause slideshow'}
            onClick={() => setIsPaused((p) => !p)}
            className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition inline-flex items-center gap-1"
          >
            <span className={`inline-block w-2 h-2 ${isPaused ? 'border-l-4 border-y-4 border-transparent border-l-current' : 'bg-current'}`} style={{mask: isPaused ? 'none' : 'none'}}></span>
            <span className="sr-only">{isPaused ? 'Play' : 'Pause'}</span>
            {isPaused ? 'Play' : 'Pause'}
          </button>
          <div className="flex items-center gap-2 md:gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => { setActiveSlide(i); setIsPaused(true); }}
                className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all ${i === activeSlide ? 'bg-primary scale-110' : 'bg-muted hover:bg-muted/80'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
