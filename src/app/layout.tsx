import React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { DemoVideoProvider } from "@/components/providers/demo-video-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BasaltHQ – Neuromimetic Business Architecture",
  description: "The Operating System for Main Street. Initialize your Cognitive Enterprise with a living, breathing ontology that thinks, adapts, and executes at the speed of thought.",
  applicationName: "BasaltHQ Suite",
  keywords: [
    "Main Street Ontology",
    "Business Objects",
    "AI Actions",
    "Decision Intelligence",
    "AI ERP",
    "Business Suite",
    "BasaltCRM",
    "VoiceHub",
    "PortalPay",
    "AI module builder",
    "Voice AI",
    "Crypto payments",
    "enterprise resource planning software"
  ],
  authors: [{ name: "BasaltHQ Team" }],
  creator: "BasaltHQ",
  publisher: "BasaltHQ",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/bssymbol.png", type: "image/png", sizes: "32x32" },
      { url: "/bssymbol.png", type: "image/png", sizes: "192x192" },
      { url: "/bssymbol.png", type: "image/png", sizes: "512x512" }
    ],
    apple: [
      { url: "/bssymbol.png", sizes: "180x180", type: "image/png" }
    ],
    shortcut: ["/bssymbol.png"]
  },
  manifest: "/manifest.webmanifest",
  metadataBase: new URL("https://basalthq.com"),
  alternates: {
    canonical: "https://basalthq.com",
  },
  openGraph: {
    title: "BasaltHQ – Neuromimetic Business Architecture",
    description: "The Operating System for Main Street. Initialize your Cognitive Enterprise with a living, breathing ontology that thinks, adapts, and executes at the speed of thought.",
    url: "https://basalthq.com",
    siteName: "BasaltHQ Suite",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/BasaltHQWideD.png",
        width: 1200,
        height: 630,
        alt: "BasaltHQ Neuromimetic Business Architecture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BasaltHQ – Neuromimetic Business Architecture",
    description: "The Operating System for Main Street. Initialize your Cognitive Enterprise with a living, breathing ontology that thinks, adapts, and executes at the speed of thought.",
    images: ["/BasaltHQWideD.png"],
    creator: "@basalthq",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification-code",
    yandex: "your-yandex-verification-code",
  },
  category: "business software suite",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "BasaltHQ Suite",
    "description": "AI-powered Main Street Ontology including ERP, CRM, VoiceHub, and PortalPay.",
    "url": "https://basalthq.com",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "499",
      "priceCurrency": "USD",
      "priceValidUntil": "2025-12-31",
      "description": "Guided demos and pilots available"
    },
    "creator": {
      "@type": "Organization",
      "name": "BasaltHQ",
      "url": "https://basalthq.com"
    },
    "featureList": [
      "AI-assisted module builder (create/modify modules, panels, modals)",
      "Main Street Ontology: Objects, Actions, Decisions",
      "Pre-built industry packs (Restaurants, Hospitality, Child-Care, Self-Storage, Retail, Cannabis)",
      "BasaltCRM: Review generation, sales agents, social intelligence",
      "VoiceHub: Custom voice agents for meetings & streams",
      "PortalPay: Web3-native commerce & crypto payments",
      "Advanced analytics and reporting",
      "Role-based access and security",
      "Integrations and automation",
      "Enterprise-grade reliability"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "500",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <ThemeProvider>
          <DemoVideoProvider>
            <div className="app-accent-bg animate-gradient-drift" />
            <Navbar />
            <main className="relative z-10">{children}</main>
          </DemoVideoProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
