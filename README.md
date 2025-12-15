Ledger1 Website
================

Second webapp for Ledger1, matching the main app's teal + glass morphism aesthetic with dark and light mode support. Built with Next.js App Router and Tailwind CSS v4.

Getting Started
---------------

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

Tech Stack
----------
- Next.js 15 (App Router)
- React 19
- Tailwind CSS v4 (@tailwindcss/postcss)
- next-themes for dark/light mode
- lucide-react icons

Structure
---------
- src/app/layout.tsx: Wraps app with ThemeProvider, navbar, and accent background
- src/app/page.tsx: Landing page with animated graph hero and feature cards
- src/components/hero/graph-hero.tsx: Canvas-based animated nodes + edges hero
- src/components/providers/theme-provider.tsx: next-themes configuration
- src/components/ui/theme-toggle.tsx: Theme toggle button
- src/components/layout/navbar.tsx: Top navigation with CTA

Styling
-------
Global theme tokens and glass morphism utilities are defined in src/app/globals.css. Primary teal is derived from --primary: hsl(171 65% 58%) to match the main app.

Build
-----
```bash
npm run build
npm start
```
