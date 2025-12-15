import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    title: "Privacy Policy",
    path: "/privacy",
    lastUpdated: new Date().toISOString(),
  });
}


