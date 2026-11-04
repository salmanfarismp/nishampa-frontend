import type { ReviewItem } from "@/lib/data/book";

export interface BookReviewRow {
  id: number;
  created_at: string;
  stars: number | null;
  comment: string | null;
  name: string | null;
  occupation: string | null;
  place: string | null;
  book_id: number | null;
  is_active?: boolean | null;
}

export interface CreateBookReviewInput {
  stars: number;
  comment: string;
  name: string;
  occupation?: string | null;
  place?: string | null;
  book_id: number;
}

export function formatReviewRole(
  occupation: string | null | undefined,
  place: string | null | undefined
): string {
  const parts = [occupation?.trim(), place?.trim()].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : "വായനക്കാരൻ";
}

export function mapBookReviewRowToReviewItem(row: BookReviewRow): ReviewItem {
  const clampedStars = Math.max(1, Math.min(5, Math.floor(Number(row.stars) || 5)));

  return {
    id: String(row.id),
    stars: clampedStars,
    quote: row.comment?.trim() || "",
    author: row.name?.trim() || "വായനക്കാരൻ",
    role: formatReviewRole(row.occupation, row.place),
    verified: true,
  };
}

