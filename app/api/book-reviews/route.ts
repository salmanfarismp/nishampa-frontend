import { NextRequest, NextResponse } from "next/server";
import { getBookReviews, createBookReview } from "@/lib/data/book-reviews";

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { stars, comment, name, occupation, place, book_id } = body || {};

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Name is required" },
        { status: 400 }
      );
    }

    if (!comment || typeof comment !== "string" || !comment.trim()) {
      return NextResponse.json(
        { success: false, error: "Review comment is required" },
        { status: 400 }
      );
    }

    const starCount = Number(stars);
    if (!starCount || starCount < 1 || starCount > 5) {
      return NextResponse.json(
        { success: false, error: "Rating must be between 1 and 5 stars" },
        { status: 400 }
      );
    }

    const parsedBookId = Number(book_id);
    if (!parsedBookId || Number.isNaN(parsedBookId)) {
      return NextResponse.json(
        { success: false, error: "Valid book ID is required" },
        { status: 400 }
      );
    }

    const result = await createBookReview({
      stars: starCount,
      comment: comment.trim(),
      name: name.trim(),
      book_id: parsedBookId,
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
      message: "Thank you for sharing your review!",
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


