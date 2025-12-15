import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ title: "Case Studies", path: "/case-studies" });
}


