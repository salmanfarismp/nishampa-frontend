import { createClient } from "@supabase/supabase-js";
import { cacheLife, cacheTag } from "next/cache";
import { bookData, type ReviewItem } from "@/lib/data/book";
import {
  mapBookReviewRowToReviewItem,
  type BookReviewRow,
} from "@/lib/types/book-review";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export interface GetBookReviewsOptions {
  bookId?: number;
  limit?: number;
}

export async function getBookReviews(
  options?: GetBookReviewsOptions
): Promise<ReviewItem[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("book-reviews");

  if (!supabaseUrl || !supabaseKey) {
    console.warn(
      "Supabase credentials missing. Falling back to static book reviews."
    );
    return bookData.reviews.items;
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    let query = supabase
      .from("BookReview")
      .select("*")
      .order("created_at", { ascending: false });

    if (options?.bookId !== undefined) {
      query = query.eq("book_id", options.bookId);
    }

    if (options?.limit !== undefined && options.limit > 0) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching BookReview from Supabase:", error.message);
      return bookData.reviews.items;
    }

    if (!data || data.length === 0) {
      return bookData.reviews.items;
    }

    return (data as BookReviewRow[]).map(mapBookReviewRowToReviewItem);
  } catch (err) {
    console.error("Unexpected error in getBookReviews:", err);
    return bookData.reviews.items;
  }
}

