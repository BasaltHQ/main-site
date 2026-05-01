'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface ShapeConfig {
    type: 'pill' | 'circle' | 'roundrect';
    w: number;
    h: number;
    startX: number;      // % from left (-30 = peeking from left edge)
    startY: number;       // px from top of page
    rot: number;
    color: string;
    parallaxSpeed: number; // how much scroll moves it (negative = opposite direction)
    mouseWeight: number;   // how strongly it reacts to mouse
}

const SHAPES: ShapeConfig[] = [
    // Hero — massive shapes peeking from edges
    { type: 'pill',      w: 500, h: 140, startX: -12, startY: 80,   rot: -15, color: 'hsl(171,65%,58%)',  parallaxSpeed: -0.15, mouseWeight: 0.03 },
    { type: 'circle',    w: 400, h: 400, startX: 88,  startY: 200,  rot: 0,   color: 'hsl(220,70%,55%)',  parallaxSpeed: -0.1,  mouseWeight: 0.025 },
    { type: 'roundrect', w: 450, h: 250, startX: 92,  startY: 600,  rot: 12,  color: 'hsl(280,70%,55%)',  parallaxSpeed: -0.2,  mouseWeight: 0.02 },

    // App grid area
    { type: 'circle',    w: 350, h: 350, startX: -10, startY: 1000, rot: 0,   color: 'hsl(24,100%,50%)',  parallaxSpeed: -0.12, mouseWeight: 0.035 },
    { type: 'pill',      w: 550, h: 150, startX: 85,  startY: 1400, rot: -8,  color: 'hsl(160,80%,45%)',  parallaxSpeed: -0.18, mouseWeight: 0.02 },

    // Stats / How it works
    { type: 'roundrect', w: 500, h: 280, startX: -15, startY: 1900, rot: 10,  color: 'hsl(171,65%,58%)',  parallaxSpeed: -0.22, mouseWeight: 0.03 },
    { type: 'circle',    w: 450, h: 450, startX: 90,  startY: 2400, rot: 0,   color: 'hsl(220,70%,55%)',  parallaxSpeed: -0.1,  mouseWeight: 0.025 },

    // Why switch / CTA
    { type: 'pill',      w: 480, h: 130, startX: -8,  startY: 2900, rot: -20, color: 'hsl(280,70%,55%)',  parallaxSpeed: -0.16, mouseWeight: 0.03 },
    { type: 'circle',    w: 380, h: 380, startX: 92,  startY: 3400, rot: 0,   color: 'hsl(24,100%,50%)',  parallaxSpeed: -0.14, mouseWeight: 0.02 },
    { type: 'roundrect', w: 420, h: 230, startX: -12, startY: 3800, rot: 8,   color: 'hsl(160,80%,45%)',  parallaxSpeed: -0.2,  mouseWeight: 0.035 },
];

export default function PortalBackground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const scrollRef = useRef(0);
    const shapesRef = useRef<HTMLDivElement[]>([]);
    const animRef = useRef<number>(0);

    const setShapeRef = useCallback((el: HTMLDivElement | null, i: number) => {
        if (el) shapesRef.current[i] = el;
    }, []);

    useEffect(() => {
        const handleMouse = (e: MouseEvent) => {
            // Normalize to center of viewport (-1 to 1)
            mouseRef.current = {
                x: (e.clientX / window.innerWidth - 0.5) * 2,
                y: (e.clientY / window.innerHeight - 0.5) * 2,
            };
        };

        const handleScroll = () => {
            scrollRef.current = window.scrollY;
        };

        window.addEventListener('mousemove', handleMouse);
        window.addEventListener('scroll', handleScroll, { passive: true });

        const animate = () => {
            const scroll = scrollRef.current;
            const mouse = mouseRef.current;

            SHAPES.forEach((shape, i) => {
                const el = shapesRef.current[i];
                if (!el) return;

                const scrollOffset = scroll * shape.parallaxSpeed;
                const mouseX = mouse.x * shape.mouseWeight * window.innerWidth;
                const mouseY = mouse.y * shape.mouseWeight * window.innerHeight;

                // Scale pulse based on scroll proximity to shape
                const distFromView = Math.abs((shape.startY + scrollOffset) - scroll - window.innerHeight / 2);
                const proximity = Math.max(0, 1 - distFromView / (window.innerHeight * 1.5));
                const scale = 1 + proximity * 0.12;

                el.style.transform = `translate(${mouseX}px, ${scrollOffset + mouseY}px) rotate(${shape.rot + mouse.x * 3}deg) scale(${scale})`;
            });

            animRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener('mousemove', handleMouse);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden" style={{ height: '100%', minHeight: '100%' }}>
            {SHAPES.map((shape, i) => {
                const borderRadius =
                    shape.type === 'circle' ? '50%' :
                    shape.type === 'pill' ? '999px' : '32px';

                return (
                    <div
                        key={i}
                        ref={(el) => setShapeRef(el, i)}
                        className="absolute will-change-transform"
                        style={{
                            width: shape.w,
                            height: shape.h,
                            left: `${shape.startX}%`,
                            top: shape.startY,
                            borderRadius,
                            border: `2px solid color-mix(in srgb, ${shape.color}, transparent 80%)`,
                            background: `color-mix(in srgb, ${shape.color}, transparent 94%)`,
                            boxShadow: `0 0 80px color-mix(in srgb, ${shape.color}, transparent 92%)`,
                            transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        }}
                    />
                );
            })}
        </div>
    );
}
