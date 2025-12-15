"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Include only public assets that start with "image" per request
const imageFiles = [
	"/image0.png",
	"/image1.jpeg",
	"/image2.jpeg",
	"/image3.jpeg",
	"/image4.jpeg",
	"/image5.png",
	"/image6.jpeg",
	"/image7.png",
  "/image8.png",
	"/image9.png",
];

export function GallerySection() {
	const images = useMemo(() => imageFiles.map((src) => ({ src, alt: src.split("/").pop() || "image" })), []);
	const displayImages = useMemo(() => {
		const len = images.length;
		if (len === 0) return [] as typeof images;
		return [images[len - 1], ...images, images[0]];
	}, [images]);
	const scrollerRef = useRef<HTMLDivElement | null>(null);
	const itemsRef = useRef<Array<HTMLButtonElement | null>>([]);
	const autoScrollingRef = useRef<boolean>(false);
	const [lightboxOpen, setLightboxOpen] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);
	const [isPaused, setIsPaused] = useState(false);

	// New: viewport and track for non-duplicated infinite loop
	const viewportRef = useRef<HTMLDivElement | null>(null);
	const trackRef = useRef<HTMLDivElement | null>(null);
	const [slidePx, setSlidePx] = useState<number>(0);
	const [order, setOrder] = useState<number[]>(() => images.map((_, i) => i));
	const [offset, setOffset] = useState<number>(0);
	const [isAnimating, setIsAnimating] = useState<boolean>(false);
	const actionRef = useRef<'next' | 'prev' | null>(null);

	// Measure viewport width and react to resizes
	useEffect(() => {
		const el = viewportRef.current;
		if (!el) return;
		const apply = () => setSlidePx(el.clientWidth || 0);
		apply();
		let ro: ResizeObserver | null = null;
		try {
			ro = new ResizeObserver(() => apply());
			ro.observe(el);
		} catch {}
		const onResize = () => apply();
		window.addEventListener('resize', onResize);
		return () => { window.removeEventListener('resize', onResize); try { ro && ro.disconnect(); } catch {} };
	}, []);

	const onTrackTransitionEnd = useCallback((e: React.TransitionEvent<HTMLDivElement>) => {
		if (e.propertyName !== 'transform') return;
		if (!isAnimating) return;
		if (actionRef.current === 'next') {
			// rotate left by 1
			setOrder(prev => {
				if (prev.length <= 1) return prev.slice();
				const [first, ...rest] = prev;
				const newOrder = [...rest, first];
				setActiveIndex(newOrder[0] ?? 0);
				return newOrder;
			});
		}
		// reset position without animation
		setIsAnimating(false);
		setOffset(0);
		actionRef.current = null;
	}, [isAnimating]);

	const goNext = useCallback(() => {
		if (isAnimating || slidePx === 0) return;
		actionRef.current = 'next';
		setIsAnimating(true);
		setOffset(-slidePx);
	}, [isAnimating, slidePx]);

	const goPrev = useCallback(() => {
		if (isAnimating || slidePx === 0) return;
		actionRef.current = 'prev';
		// pre-rotate right by 1 before animating back to 0
		setOrder(prev => {
			if (prev.length <= 1) return prev.slice();
			const last = prev[prev.length - 1];
			const newOrder = [last, ...prev.slice(0, prev.length - 1)];
			setActiveIndex(newOrder[0] ?? 0);
			return newOrder;
		});
		// jump to -vw without transition then animate to 0
		setIsAnimating(false);
		setOffset(-slidePx);
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				setIsAnimating(true);
				setOffset(0);
			});
		});
	}, [isAnimating, slidePx]);

	const openLightbox = useCallback((index: number) => {
		setActiveIndex(index);
		setLightboxOpen(true);
	}, []);

	const closeLightbox = useCallback(() => setLightboxOpen(false), []);

	useEffect(() => {
		if (!lightboxOpen) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") closeLightbox();
			if (e.key === "ArrowLeft") goPrev();
			if (e.key === "ArrowRight") goNext();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [lightboxOpen, closeLightbox, goPrev, goNext]);

	// Keep pager in sync with centered slide (based on realIndex)
	useEffect(() => {
		const root = scrollerRef.current;
		if (!root) return;
		const observer = new IntersectionObserver((entries) => {
			if (autoScrollingRef.current) return;
			let best: IntersectionObserverEntry | null = null;
			for (const e of entries) {
				if (e.isIntersecting && (!best || e.intersectionRatio > (best as any).intersectionRatio)) best = e;
			}
			if (best && best.target instanceof HTMLElement) {
				const idx = Number((best.target as HTMLElement).dataset.realIndex || 0);
				setActiveIndex((prev) => (prev !== idx ? idx : prev));
			}
		}, { root, threshold: [0.5, 0.75, 0.9] });
		itemsRef.current.forEach((el) => { if (el) observer.observe(el); });
		return () => { try { itemsRef.current.forEach((el) => { if (el) observer.unobserve(el); }); observer.disconnect(); } catch {} };
	}, [images.length]);

	// Initialize scroller at first real slide
	useEffect(() => {
		const root = scrollerRef.current;
		const el = itemsRef.current[1];
		if (!root || !el) return;
		try {
			root.scrollTo({ left: el.offsetLeft || 0, behavior: 'auto' as ScrollBehavior });
		} catch { (root as any).scrollLeft = (el as any).offsetLeft || 0; }
	}, [displayImages.length]);

	const scrollToIndex = useCallback((idx: number, fromIdx?: number) => {
		const root = scrollerRef.current;
		const len = images.length;
		if (!root || len === 0) return;
		const from = typeof fromIdx === 'number' ? fromIdx : activeIndex;
		let targetDisplayIdx = idx + 1; // account for head clone
		let resetDisplayIdx: number | null = null;
		if (len > 1) {
			if (from === len - 1 && idx === 0) { // wrap end -> start via tail clone
				targetDisplayIdx = len + 1; // tail clone
				resetDisplayIdx = 1; // first real
			} else if (from === 0 && idx === len - 1) { // wrap start -> end via head clone
				targetDisplayIdx = 0; // head clone
				resetDisplayIdx = len; // last real
			}
		}
		const el = itemsRef.current[targetDisplayIdx];
		if (!el) return;
		autoScrollingRef.current = true;
		// Compute target left within scroller, centered
		const targetLeft = Math.max(0, (el as any).offsetLeft - Math.max(0, (root.clientWidth - el.clientWidth) / 2));
		root.scrollTo({ left: targetLeft, behavior: 'smooth' });
		setActiveIndex(idx);
		// Wait until we reach the target, then (if needed) reset to the real slide without animation and with snap disabled
		const finish = () => {
			if (resetDisplayIdx != null) {
				const resetEl = itemsRef.current[resetDisplayIdx];
				if (resetEl && scrollerRef.current) {
					// Temporarily disable snap to make the reset invisible
					const prevSnap = (scrollerRef.current.style as any).scrollSnapType || '';
					scrollerRef.current.style.scrollSnapType = 'none';
					scrollerRef.current.scrollTo({ left: (resetEl as any).offsetLeft || 0, behavior: 'auto' as ScrollBehavior });
					requestAnimationFrame(() => {
						scrollerRef.current && (scrollerRef.current.style.scrollSnapType = prevSnap || 'x mandatory');
						autoScrollingRef.current = false;
					});
					return;
				}
			}
			autoScrollingRef.current = false;
		};
		const watch = () => {
			if (!scrollerRef.current) { finish(); return; }
			const diff = Math.abs(scrollerRef.current.scrollLeft - targetLeft);
			if (diff <= 2) finish(); else requestAnimationFrame(watch);
		};
		requestAnimationFrame(watch);
	}, [images.length, activeIndex]);

	// Auto-advance loop using goNext
	useEffect(() => {
		if (isPaused || images.length <= 1) return;
		const id = setInterval(() => {
			goNext();
		}, 3500);
		return () => clearInterval(id);
	}, [goNext, images.length, isPaused]);

	return (
		<section id="gallery" className="relative py-12 bg-gradient-to-b from-muted/20 to-background">
			<div className="absolute inset-0 bg-grid-pattern opacity-5" />
			<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-8">
					<h2 className="text-2xl md:text-3xl font-semibold tracking-tight">A Glimpse of the Platform</h2>
					<p className="text-muted-foreground mt-2">Swipe through and tap to expand.</p>
				</div>

				{/* Outer glass cutout wrapper */}
				<div className="relative glass-pane rounded-3xl p-2 md:p-3 ring-1 ring-border/50 overflow-hidden" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
					<div ref={viewportRef} className="relative w-full overflow-hidden mx-auto" style={{ height: 'auto', width: 'min(1100px, 92vw)' }}>
						<div
							ref={trackRef}
							onTransitionEnd={onTrackTransitionEnd as any}
							className="flex"
							style={{
								transform: `translate3d(${offset}px, 0, 0)`,
								transition: isAnimating ? 'transform 450ms ease' : 'none',
							}}
						>
							{order.map((idx) => (
								<button
									key={`slide-${idx}`}
									onClick={() => openLightbox(idx)}
									className="relative shrink-0 rounded-xl glass-pane overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary"
									style={{ width: '100%', aspectRatio: '16/9' as any }}
									title="Open image"
								>
									<Image src={images[idx].src} alt={images[idx].alt} fill sizes="(min-width: 1280px) 1100px, (min-width: 768px) 85vw, 92vw" quality={90} className="object-cover" />
								</button>
							))}
						</div>
					</div>

					{/* Edge fade cutouts */}
					<div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background/80 to-transparent" />
					<div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background/80 to-transparent" />

					{/* Inline controls */}
					<div className="absolute inset-y-0 left-0 flex items-center pl-2">
						<button aria-label="Previous" className="p-2 rounded-full bg-background/60 hover:bg-background border border-border" onClick={goPrev}>
							<ChevronLeft className="h-5 w-5" />
						</button>
					</div>
					<div className="absolute inset-y-0 right-0 flex items-center pr-2">
						<button aria-label="Next" className="p-2 rounded-full bg-background/60 hover:bg-background border border-border" onClick={goNext}>
							<ChevronRight className="h-5 w-5" />
						</button>
					</div>
				</div>

				{/* Simple pager */}
				<div className="mt-4 flex justify-center gap-2">
					{images.map((_, i) => (
						<button
							key={i}
							onClick={() => {
								if (i === activeIndex) return;
								// rotate order so that requested index becomes the next visible slide, then animate
								setOrder(prev => {
									const pos = prev.indexOf(i);
									if (pos <= 0) return prev.slice();
									return [...prev.slice(pos), ...prev.slice(0, pos)];
								});
								setIsAnimating(false);
								setOffset(-slidePx);
								requestAnimationFrame(() => {
									requestAnimationFrame(() => { setIsAnimating(true); setOffset(0); });
								});
								setActiveIndex(i);
							}}
							className={`h-1.5 w-4 rounded-full ${i === activeIndex ? 'bg-primary' : 'bg-muted-foreground/30'} focus:outline-none`}
							title={`Go to slide ${i + 1}`}
						/>
					))}
				</div>
			</div>

			{/* Lightbox */}
			{lightboxOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-md supports-[backdrop-filter]:bg-background/50" onClick={closeLightbox}>
					<div className="relative glass-pane rounded-2xl shadow-xl border border-border max-w-[90vw] max-h-[90vh] w-[min(1000px,90vw)] aspect-[4/3] overflow-hidden" onClick={(e) => e.stopPropagation()}>
						<Image key={images[activeIndex].src} src={images[activeIndex].src} alt={images[activeIndex].alt} fill sizes="90vw" className="object-contain" />
						<button aria-label="Close" className="absolute top-3 right-3 p-2 rounded-lg bg-background/70 hover:bg-background border border-border" onClick={closeLightbox}>
							<X className="h-5 w-5" />
						</button>
						<button aria-label="Previous" className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/70 hover:bg-background border border-border" onClick={goPrev}>
							<ChevronLeft className="h-5 w-5" />
						</button>
						<button aria-label="Next" className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/70 hover:bg-background border border-border" onClick={goNext}>
							<ChevronRight className="h-5 w-5" />
						</button>
					</div>
				</div>
			)}
		</section>
	);
}

