"use client";

import Link from "next/link";
import Image from "next/image";
import { Brain, Menu, X, ChevronDown } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { SolutionsNav } from "@/components/layout/solutions-nav";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const sections = useMemo(() => {
    const result: Array<{ id: string; label: string }> = [
      { id: "products", label: "Products" },
      { id: "vision", label: "Our Vision" },
      { id: "contact", label: "Contact" },
    ];
    return result;
  }, []);

  const pages = useMemo(() => [
    { path: "/about", label: "About" },
    { path: "/blog", label: "Blog" },
    { path: "/careers", label: "Careers" },
    { path: "/press", label: "Press" },
    { path: "/contact", label: "Contact" },
  ], []);

  const products = [
    { name: "Ledger1ERP", url: "https://erp.ledger1.ai" },
    { name: "Ledger1CRM", url: "https://crm.ledger1.ai" },
    { name: "VoiceHub", url: "https://voice.ledger1.ai" },
    { name: "PortalPay", url: "https://pay.ledger1.ai" },
  ];

  const [activeId, setActiveId] = useState<string>("");
  const [activePage, setActivePage] = useState<string>("");
  const indicatorRef = useRef<HTMLSpanElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  // Determine if we're on homepage or another page
  const isHomepage = pathname === "/";

  useEffect(() => {
    if (isHomepage) {
      // Homepage: observe sections
      const foundSections = sections.filter(s => document.getElementById(s.id) !== null);

      if (foundSections.length === 0) {
        setActiveId("");
        return;
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('id');
          if (!id) return;
          if (entry.isIntersecting) {
            setActiveId(id);
            setActivePage("");
          }
        });
      }, { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] });

      foundSections.forEach(s => {
        const el = document.getElementById(s.id);
        if (el) observer.observe(el);
      });
      return () => observer.disconnect();
    } else {
      // Other pages: set active based on pathname
      setActiveId("");
      setActivePage(pathname);
    }
  }, [sections, isHomepage, pathname]);

  useEffect(() => {
    const nav = navRef.current;
    const ind = indicatorRef.current;
    if (!nav || !ind) return;

    let activeLink: HTMLAnchorElement | null = null;

    if (isHomepage && activeId) {
      activeLink = nav.querySelector<HTMLAnchorElement>(`a[data-section="${activeId}"]`);
    } else if (!isHomepage && activePage) {
      activeLink = nav.querySelector<HTMLAnchorElement>(`a[href="${activePage}"]`);
    }

    if (!activeLink) {
      ind.style.opacity = '0';
      return;
    }

    const linkRect = activeLink.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    const left = linkRect.left - navRect.left;
    const width = linkRect.width;
    ind.style.transform = `translateX(${left}px)`;
    ind.style.width = `${width}px`;
    ind.style.opacity = '1';
  }, [activeId, activePage, isHomepage, isMenuOpen]);

  return (
    <header
      className="sticky top-0 z-40 w-full backdrop-blur-sm supports-[backdrop-filter]:bg-background/60 border-b border-border/50"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Image
            src="/l1logows.png"
            alt="Ledger1"
            width={120}
            height={40}
            className="h-8 w-auto dark:hidden"
            priority
          />
          <Image
            src="/l1logowsdm.png"
            alt="Ledger1"
            width={120}
            height={40}
            className="h-8 w-auto hidden dark:block"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav ref={navRef} className="relative hidden md:flex items-center gap-6 text-sm font-medium">

          {/* SEO Solutions Nav */}
          <SolutionsNav />

          {isHomepage ? (
            // Homepage: show section anchors
            <>
              {sections.map((s) => (
                <Link
                  key={s.id}
                  href={`#${s.id}`}
                  data-section={s.id}
                  className={`transition-colors ${activeId === s.id ? 'text-primary' : 'hover:text-primary'}`}
                >
                  {s.label}
                </Link>
              ))}
            </>
          ) : (
            // Other pages: show page links
            <>
              {pages.map((page) => (
                <Link
                  key={page.path}
                  href={page.path}
                  className={`transition-colors ${pathname === page.path ? 'text-primary' : 'hover:text-primary'}`}
                >
                  {page.label}
                </Link>
              ))}
            </>
          )}

          {/* Product Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 transition-colors hover:text-primary">
              Suite
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="glass-pane rounded-lg shadow-xl ring-1 ring-border/60 p-2">
                {products.map((product) => (
                  <a
                    key={product.name}
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 rounded-md hover:bg-primary/10 transition-colors"
                  >
                    {product.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <span
            ref={indicatorRef}
            className="absolute -bottom-[11px] h-[2px] bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-300 ease-out"
            style={{ width: 0, transform: 'translateX(0px)', opacity: 0 }}
          />
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://calendly.com/founders-tuc/ledger1-info-session" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-primary/80 px-6 py-2 text-sm font-semibold text-primary-foreground shadow hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Book a Call
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur">
          <nav className="px-4 py-6 space-y-4">
            {isHomepage ? (
              // Homepage: show section anchors
              <>
                {sections.map(s => (
                  <Link
                    key={s.id}
                    href={`#${s.id}`}
                    className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {s.label}
                  </Link>
                ))}
              </>
            ) : (
              // Other pages: show page links
              <>
                {pages.map(page => (
                  <Link
                    key={page.path}
                    href={page.path}
                    className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {page.label}
                  </Link>
                ))}
              </>
            )}

            {/* Mobile Product Links */}
            <div className="py-2">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Our Suite</div>
              {products.map((product) => (
                <a
                  key={product.name}
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-2 pl-4 text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {product.name}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-border/50 space-y-3">
              <a
                href="https://calendly.com/founders-tuc/ledger1-info-session" target="_blank" rel="noopener noreferrer"
                className="block w-full text-center rounded-lg bg-gradient-to-r from-primary to-primary/80 px-4 py-3 text-sm font-semibold text-primary-foreground shadow hover:shadow-lg transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Book a Call
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
