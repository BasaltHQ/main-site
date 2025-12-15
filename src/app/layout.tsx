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
  title: "Ledger1 – The Main Street Ontology",
  description: "The Operating System for Main Street. Connect every Object, Action, and Decision in your business with our pre-packaged AI Ontology.",
  applicationName: "Ledger1 Suite",
  keywords: [
    "Main Street Ontology",
    "Business Objects",
    "AI Actions",
    "Decision Intelligence",
    "AI ERP",
    "Business Suite",
    "Ledger1CRM",
    "VoiceHub",
    "PortalPay",
    "AI module builder",
    "Voice AI",
    "Crypto payments",
    "enterprise resource planning software"
  ],
  authors: [{ name: "Ledger1 Team" }],
  creator: "Ledger1",
  publisher: "Ledger1",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/l1logows.png", type: "image/png", sizes: "512x512" }
    ],
    apple: [
      { url: "/l1logows.png", sizes: "180x180", type: "image/png" }
    ],
    shortcut: ["/l1logows.png"]
  },
  manifest: "/manifest.webmanifest",
  metadataBase: new URL("https://ledger1.ai"),
  alternates: {
    canonical: "https://ledger1.ai",
  },
  openGraph: {
    title: "Ledger1 – The Main Street Ontology",
    description: "The Operating System for Main Street. Connect every Object, Action, and Decision in your business with our pre-packaged AI Ontology.",
    url: "https://ledger1.ai",
    siteName: "Ledger1 Suite",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://engram1.blob.core.windows.net/varuni/socialbanner.png",
        width: 1536,
        height: 1024,
        alt: "Ledger1 Main Street Ontology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ledger1 – The Main Street Ontology",
    description: "The Operating System for Main Street. Connect every Object, Action, and Decision in your business with our pre-packaged AI Ontology.",
    images: ["https://engram1.blob.core.windows.net/varuni/socialbanner.png"],
    creator: "@ledger1_ai",
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
    "name": "Ledger1 Suite",
    "description": "AI-powered Main Street Ontology including ERP, CRM, VoiceHub, and PortalPay.",
    "url": "https://ledger1.ai",
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
      "name": "Ledger1",
      "url": "https://ledger1.ai"
    },
    "featureList": [
      "AI-assisted module builder (create/modify modules, panels, modals)",
      "Main Street Ontology: Objects, Actions, Decisions",
      "Pre-built industry packs (Restaurants, Hospitality, Child-Care, Self-Storage, Retail, Cannabis)",
      "Ledger1CRM: Review generation, sales agents, social intelligence",
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
