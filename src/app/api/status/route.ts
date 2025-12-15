import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "operational",
    components: [
      { name: "API", status: "operational" },
      { name: "Web App", status: "operational" },
      { name: "Integrations", status: "operational" },
      { name: "Databases", status: "operational" },
    ],
    updatedAt: new Date().toISOString(),
  });
}


