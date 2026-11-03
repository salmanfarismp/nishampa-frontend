import { NextRequest, NextResponse } from "next/server";
import { getBookReviews } from "@/lib/data/book-reviews";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const bookIdParam = searchParams.get("bookId");
    const limitParam = searchParams.get("limit");

    const bookId = bookIdParam ? parseInt(bookIdParam, 10) : undefined;
    const limit = limitParam ? parseInt(limitParam, 10) : undefined;

    const items = await getBookReviews({
      bookId: Number.isNaN(bookId) ? undefined : bookId,
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
            : "Failed to fetch book reviews",
      },
      { status: 500 }
    );
  }
}

