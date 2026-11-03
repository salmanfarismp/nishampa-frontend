import { createClient } from "@supabase/supabase-js";
import { cacheLife, cacheTag } from "next/cache";
import { homeData, type FieldworkItem } from "@/lib/data/home";
import {
  mapGalleryRowToFieldworkItem,
  type GalleryRow,
} from "@/lib/types/gallery";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function getGalleryItems(): Promise<FieldworkItem[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("gallery");

  if (!supabaseUrl || !supabaseKey) {
    console.warn(
      "Supabase credentials missing. Falling back to static gallery data.",
    );
    return homeData.fieldwork.items;
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .from("Gallery")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching gallery items from Supabase:", error.message);
      return homeData.fieldwork.items;
    }

    if (!data || data.length === 0) {
      return homeData.fieldwork.items;
    }

    return (data as GalleryRow[]).map(mapGalleryRowToFieldworkItem);
  } catch (err) {
    console.error("Unexpected error in getGalleryItems:", err);
    return homeData.fieldwork.items;
  }
}

