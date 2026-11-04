import { createClient } from "@supabase/supabase-js";
import { cacheLife, cacheTag } from "next/cache";
import type { TestimonialItem } from "@/lib/data/home";
import {
  mapServiceReviewRowToTestimonialItem,
  type ServiceReviewRow,
  type CreateServiceReviewInput,
} from "@/lib/types/service-review";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export interface GetServiceReviewsOptions {
  limit?: number;
}

export async function getServiceReviews(
  options?: GetServiceReviewsOptions
): Promise<TestimonialItem[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("service-reviews");

  if (!supabaseUrl || !supabaseKey) {
    console.warn(
      "Supabase credentials missing. Returning empty service reviews."
    );
    return [];
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    let query = supabase
      .from("ServiceReview")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (options?.limit !== undefined && options.limit > 0) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error(
        "Error fetching ServiceReview from Supabase:",
        error.message
      );
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    // Filter out rows without a valid comment
    const validRows = (data as ServiceReviewRow[]).filter(
      (row) => row.comment && row.comment.trim().length > 0
    );

    if (validRows.length === 0) {
      return [];
    }

    return validRows.map((row, index) =>
      mapServiceReviewRowToTestimonialItem(row, index)
    );
  } catch (err) {
    console.error("Unexpected error in getServiceReviews:", err);
    return [];
  }
}

export async function createServiceReview(
  input: CreateServiceReviewInput
): Promise<{ success: boolean; id?: number; error?: string }> {
  if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase credentials missing. Cannot insert service review.");
    return { success: false, error: "Database configuration error" };
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .from("ServiceReview")
      .insert({
        name: input.name.trim(),
        comment: input.comment.trim(),
        occupation: input.occupation?.trim() || null,
        place: input.place?.trim() || null,
        is_active: false, // Always saved as draft in DB
      })
      .select("id")
      .single();

    if (error) {
      console.error(
        "Error inserting ServiceReview into Supabase:",
        error.message
      );
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (err) {
    console.error("Unexpected error in createServiceReview:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Internal server error",
    };
  }
}

