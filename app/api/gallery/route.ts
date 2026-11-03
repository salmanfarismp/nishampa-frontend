import { NextResponse } from "next/server";
import { getGalleryItems } from "@/lib/data/gallery";

export async function GET() {
  try {
    const items = await getGalleryItems();
    return NextResponse.json({
      success: true,
      data: items,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch gallery items",
      },
      { status: 500 },
    );
  }
}

