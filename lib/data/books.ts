import { createClient } from "@supabase/supabase-js";
import type { BookRow } from "@/lib/types/book";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const DEFAULT_BOOK: BookRow = {
  id: 1,
  created_at: "2025-01-01T00:00:00.000Z",
  name: "Panam, Adhikaram, Arogyam",
  name_ml: "പണം, അധികാരം, ആരോഗ്യം",
  sm_description: "ഒരു മനഃശാസ്ത്ര പഠനം — Nisham PA",
  pages_approx: 240,
  language: "മലയാളം",
  cover_url: "/assets/panam-adhikaram=-arogyam.webp",
  slug: "panam-adhikaram-arogyam",
};

export async function getBookBySlug(slug: string): Promise<BookRow | null> {
  const normalizedSlug = slug.trim().toLowerCase();

  if (!supabaseUrl || !supabaseKey) {
    if (
      normalizedSlug === "panam-adhikaram-arogyam" ||
      normalizedSlug === "panam" ||
      normalizedSlug === "the-book"
    ) {
      return DEFAULT_BOOK;
    }
    return null;
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .from("Book")
      .select("*")
      .eq("slug", normalizedSlug)
      .maybeSingle();

    if (error) {
      console.error(`Error fetching Book with slug "${slug}":`, error.message);
      if (
        normalizedSlug === "panam-adhikaram-arogyam" ||
        normalizedSlug === "panam" ||
        normalizedSlug === "the-book"
      ) {
        return DEFAULT_BOOK;
      }
      return null;
    }

    if (data) {
      return data as BookRow;
    }

    // Fallback if not found in DB
    if (
      normalizedSlug === "panam-adhikaram-arogyam" ||
      normalizedSlug === "panam" ||
      normalizedSlug === "the-book"
    ) {
      return DEFAULT_BOOK;
    }

    return null;
  } catch (err) {
    console.error("Unexpected error in getBookBySlug:", err);
    if (
      normalizedSlug === "panam-adhikaram-arogyam" ||
      normalizedSlug === "panam" ||
      normalizedSlug === "the-book"
    ) {
      return DEFAULT_BOOK;
    }
    return null;
  }
}

export async function getAllBooks(): Promise<BookRow[]> {
  if (!supabaseUrl || !supabaseKey) {
    return [DEFAULT_BOOK];
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .from("Book")
      .select("*")
      .order("id", { ascending: true });

    if (error || !data || data.length === 0) {
      return [DEFAULT_BOOK];
    }

    return data as BookRow[];
  } catch {
    return [DEFAULT_BOOK];
  }
}

