import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ title: "Pricing", path: "/pricing" });
}


