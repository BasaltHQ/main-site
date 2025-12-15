import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    title: "Terms of Service",
    path: "/terms",
    lastUpdated: new Date().toISOString(),
  });
}


