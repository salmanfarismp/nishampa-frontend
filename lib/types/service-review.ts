import type { TestimonialItem } from "@/lib/data/home";

export interface ServiceReviewRow {
  id: number;
  created_at: string;
  comment: string | null;
  name: string | null;
  occupation: string | null;
  place: string | null;
  is_active?: boolean | null;
}

export function formatServiceReviewRole(
  occupation: string | null | undefined,
  place: string | null | undefined
): string {
  const parts = [occupation?.trim(), place?.trim()].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : "Client";
}

export function getInitials(name: string | null | undefined): string {
  if (!name || !name.trim()) {
    return "C";
  }

  const cleaned = name.trim();
  const words = cleaned.split(/\s+/).filter(Boolean);

  if (words.length >= 2) {
    const first = Array.from(words[0])[0] || "";
    const second = Array.from(words[words.length - 1])[0] || "";
    return `${first}${second}`.toUpperCase();
  }

  // Single word: take first 1-2 characters
  const chars = Array.from(cleaned);
  return chars.slice(0, 2).join("").toUpperCase();
}

export function mapServiceReviewRowToTestimonialItem(
  row: ServiceReviewRow,
  index: number
): TestimonialItem {
  const author = row.name?.trim() || "Client";
  return {
    id: String(row.id),
    quote: row.comment?.trim() || "",
    author,
    role: formatServiceReviewRole(row.occupation, row.place),
    initials: getInitials(author),
    accent: index % 2 === 0 ? "gold" : "navy",
  };
}

