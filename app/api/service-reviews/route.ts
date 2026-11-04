import { NextRequest, NextResponse } from "next/server";
import {
  getServiceReviews,
  createServiceReview,
} from "@/lib/data/service-reviews";

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, comment, occupation, place } = body || {};

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Name is required" },
        { status: 400 }
      );
    }

    if (!comment || typeof comment !== "string" || !comment.trim()) {
      return NextResponse.json(
        { success: false, error: "Feedback comment is required" },
        { status: 400 }
      );
    }

    const result = await createServiceReview({
      name: name.trim(),
      comment: comment.trim(),
      occupation: typeof occupation === "string" ? occupation.trim() : null,
      place: typeof place === "string" ? place.trim() : null,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "Failed to submit review" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for sharing your feedback!",
      id: result.id,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Invalid request payload",
      },
      { status: 400 }
    );
  }
}


