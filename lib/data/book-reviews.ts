import { createClient } from "@supabase/supabase-js";
import { cacheLife, cacheTag } from "next/cache";
import { bookData, type ReviewItem } from "@/lib/data/book";
import {
  mapBookReviewRowToReviewItem,
  type BookReviewRow,
  type CreateBookReviewInput,
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
      .or("is_active.eq.true,is_active.is.null")
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

export async function createBookReview(
  input: CreateBookReviewInput
): Promise<{ success: boolean; id?: number; error?: string }> {
  if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase credentials missing. Cannot insert book review.");
    return { success: false, error: "Database configuration error" };
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .from("BookReview")
      .insert({
        stars: Math.max(1, Math.min(5, Math.floor(input.stars))),
        comment: input.comment.trim(),
        name: input.name.trim(),
        occupation: input.occupation?.trim() || null,
        place: input.place?.trim() || null,
        book_id: input.book_id,
        is_active: false, // Always saved as draft in DB
      })
      .select("id")
      .single();

    if (error) {
      console.error(
        "Error inserting BookReview into Supabase:",
        error.message
      );
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (err) {
    console.error("Unexpected error in createBookReview:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Internal server error",
    };
  }
}


