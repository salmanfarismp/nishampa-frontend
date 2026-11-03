import type { FieldworkItem } from "@/lib/data/home";

export interface GalleryRow {
  id: number;
  created_at: string;
  img_url: string | null;
  tag: string | null;
  title: string | null;
  description: string | null;
}

export const DEFAULT_GALLERY_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDhRMKvyLyGkhhBTbXHAyaFtGbinFh3ypgRromLlnsLDj4GOGXerKmQwp7tKghW8_fbPt1_BISG4TYEb7yc7A2VKRaMZ1gWbIDXPfMoTXgI0F6GrprRIBVo8Xcdvq2MGcJJTQMk-qZH9tViNUDJoNKBQEPAYXkN-uAN2EGLWAi8AK_1DtU_s0y9e2RL55Dp83rhhEgtO9z04Qvo5WOROBXXy9IE2ESU3iClKMcgqOhsnz7sceE1L3spP6dys8gP1XubUg";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/+$/, "");

/**
 * Resolves raw image path/URL from database into a valid Next.js image URL.
 * Handles:
 * - Supabase storage paths (e.g. "gallery/1793628805927_nisham-sir-4-1024x1024.jpg")
 *   incorporating NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET (e.g. "prod")
 * - Full absolute URLs (e.g. "https://...")
 * - Local static paths (e.g. "/assets/...")
 */
export function resolveGalleryImageUrl(rawUrl: string | null | undefined): string {
  if (!rawUrl || !rawUrl.trim()) {
    return DEFAULT_GALLERY_IMAGE;
  }

  const trimmed = rawUrl.trim();

  // Already a full absolute HTTP / HTTPS URL
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  // Local static asset (e.g., /assets/...)
  if (trimmed.startsWith("/") && !trimmed.startsWith("/storage/")) {
    return trimmed;
  }

  // Relative Supabase Storage path
  if (SUPABASE_URL) {
    const bucket = (
      process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "prod"
    ).replace(/^\/+|\/+$/g, "");
    const cleanPath = trimmed.replace(/^\/+/, "");

    // Avoid duplicate bucket prefix if already present
    const pathWithBucket = cleanPath.startsWith(`${bucket}/`)
      ? cleanPath
      : `${bucket}/${cleanPath}`;

    return `${SUPABASE_URL}/storage/v1/object/public/${pathWithBucket}`;
  }

  return DEFAULT_GALLERY_IMAGE;
}

export function mapGalleryRowToFieldworkItem(row: GalleryRow): FieldworkItem {
  return {
    id: String(row.id),
    tag: row.tag?.trim() || "Workshop",
    title: row.title?.trim() || "Fieldwork Session",
    description: row.description?.trim() || "",
    image: {
      src: resolveGalleryImageUrl(row.img_url),
      alt: row.title?.trim() || "Gallery photo by Nisham PA",
    },
  };
}
