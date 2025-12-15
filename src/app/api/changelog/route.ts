import { NextResponse } from "next/server";

const entries = [
  { date: "2025-01-10", title: "Standalone pages & SEO", items: [
    "Features, Pricing, About, Contact, Case Studies pages",
    "Privacy, Terms, Security statements",
    "Docs & Help placeholders",
    "Status & Changelog"
  ]}
];

export async function GET() {
  return NextResponse.json({ entries });
}


