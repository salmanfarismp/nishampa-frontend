import { NextRequest, NextResponse } from "next/server";
import { getServiceReviews } from "@/lib/data/service-reviews";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam, 10) : undefined;

    const items = await getServiceReviews({
      limit: Number.isNaN(limit) ? undefined : limit,
    });

    return NextResponse.json({
      success: true,
      data: items,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch service reviews",
      },
      { status: 500 }
    );
  }
}

