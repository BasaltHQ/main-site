import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ title: "About Us", path: "/about" });
}


