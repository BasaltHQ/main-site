"use client";

import Link from "next/link";
import Image from "next/image";
import { Twitter, Linkedin, Github, Facebook, Youtube } from "lucide-react";

// Custom Discord icon component (Lucide doesn't include brand logos)
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const productLinks = [
  { label: 'BasaltERP', href: 'https://erp.basalthq.com' },
  { label: 'BasaltCRM', href: 'https://crm.basalthq.com' },
  { label: 'BasaltCMS', href: 'https://cms.basalthq.com' },
  { label: 'BasaltEcho', href: 'https://echo.basalthq.com' },
  { label: 'BasaltSurge', href: 'https://surge.basalthq.com' },
];

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Careers', href: '/careers' },
  { label: 'Press', href: '/press' },
  { label: 'Contact', href: '/contact' },
];

const supportLinks = [
  { label: 'Help Center', href: '/help' },
  { label: 'Documentation', href: '/docs' },
  { label: 'System Status', href: '/status' },
  { label: 'Changelog', href: '/changelog' },
];

const socialLinks = [
  { label: 'Discord', href: 'https://discord.gg/gcgNugyWkg', icon: DiscordIcon },
  { label: 'Github', href: 'https://github.com/BasaltHQ', icon: Github },
  { label: 'Twitter', href: 'https://x.com/BasaltHQ', icon: Twitter },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/basalthq/', icon: Linkedin },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100083624105531', icon: Facebook },
  { label: 'YouTube', href: 'https://www.youtube.com/@theutilitycompany835', icon: Youtube },
];

import { useBrandTheme } from "@/components/providers/brand-theme-provider";

// ... imports ...

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { currentTheme } = useBrandTheme();

  return (
    <footer className="relative pt-6 pb-4 border-t border-border/10 mt-24 bg-background/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12">
                <Image
                  src={currentTheme.icon}
                  alt={currentTheme.name}
                  fill
                  className="object-contain"
                />
                <div
                  className="shield-gleam-container"
                  style={{
                    maskImage: `url(${currentTheme.icon})`,
                    WebkitMaskImage: `url(${currentTheme.icon})`
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-foreground text-xl tracking-widest font-vox">
                  <span className="font-light">BASALT</span><span className="font-bold">HQ</span>
                </span>
                <p className="text-[10px] font-mono mt-1 whitespace-nowrap transition-colors duration-500" style={{ color: currentTheme.color }}>NEUROMIMETIC BUSINESS ARCHITECTURE</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              <span className="text-primary font-semibold">Your Business. Supercharged.</span> Empowering Main Street businesses with Fortune 500 technology.
            </p>
            <a
              href="mailto:info@basalthq.com"
              className="text-primary text-sm hover:underline block mb-8"
            >
              info@basalthq.com
            </a>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs font-mono tracking-wider text-muted-foreground mb-4">PRODUCT SUITE</h4>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground text-sm hover:text-foreground transition-colors flex items-center gap-1"
                  >
                    {link.label}
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 0 00-2 2v10a2 0 002 2h10a2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-mono tracking-wider text-muted-foreground mb-4">COMPANY</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Support */}
          <div>
            <h4 className="text-xs font-mono tracking-wider text-muted-foreground mb-4">CONNECT & SUPPORT</h4>
            <ul className="space-y-2 mb-6">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={link.label}
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            <div className="mt-8">
              <h4 className="text-xs font-mono tracking-wider text-muted-foreground mb-2">STATUS</h4>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs text-emerald-500 font-mono">ALL SYSTEMS OPERATIONAL</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs">
            © {currentYear} BasaltHQ. All rights reserved.
          </p>

          {/* ElevenLabs Grant Badge */}
          <div className="flex justify-center">
              <a
                  href="https://elevenlabs.io/startup-grants"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative transition-all duration-500 hover:scale-105"
              >
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur opacity-0 group-hover:opacity-100 transition duration-500" />
                  <Image
                      src="/elevenlabs-grants.webp"
                      alt="ElevenLabs Startup Grant"
                      width={160}
                      height={40}
                      className="relative object-contain w-[140px] opacity-70 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
                  />
              </a>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-muted-foreground text-xs hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted-foreground text-xs hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
