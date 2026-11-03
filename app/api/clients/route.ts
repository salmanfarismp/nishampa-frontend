import { NextResponse } from "next/server";
import { getClients } from "@/lib/data/clients";

export async function GET() {
  try {
    const items = await getClients();
    return NextResponse.json({
      success: true,
      data: items,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch clients",
      },
      { status: 500 }
    );
  }
}

