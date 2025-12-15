import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    title: "Security Statement",
    path: "/security",
    lastUpdated: new Date().toISOString(),
  });
}


