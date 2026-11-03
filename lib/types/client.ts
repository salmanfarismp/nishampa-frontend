export interface ClientRow {
  id: number;
  created_at: string;
  name: string | null;
  logo_url: string | null;
  show_logo: boolean | null;
}

export interface ClientItem {
  id: string;
  name: string;
  logoUrl: string | null;
  showLogo: boolean;
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/+$/, "");

/**
 * Resolves a raw logo URL/path from Supabase or local assets into a valid Next.js image URL.
 */
export function resolveClientLogoUrl(rawUrl: string | null | undefined): string | null {
  if (!rawUrl || !rawUrl.trim()) {
    return null;
  }

  const trimmed = rawUrl.trim();

  // Already a full absolute HTTP / HTTPS URL
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  // Local static asset (e.g. /assets/brands/chiking.jpg)
  if (trimmed.startsWith("/") && !trimmed.startsWith("/storage/")) {
    return trimmed;
  }

  // Supabase Storage relative path
  if (SUPABASE_URL) {
    const bucket = (
      process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "prod"
    ).replace(/^\/+|\/+$/g, "");
    const cleanPath = trimmed.replace(/^\/+/, "");

    const pathWithBucket = cleanPath.startsWith(`${bucket}/`)
      ? cleanPath
      : `${bucket}/${cleanPath}`;

    return `${SUPABASE_URL}/storage/v1/object/public/${pathWithBucket}`;
  }

  return trimmed;
}

export function mapClientRowToClientItem(row: ClientRow): ClientItem {
  const name = row.name?.trim() || "";
  const logoUrl = resolveClientLogoUrl(row.logo_url);
  const showLogo = Boolean(row.show_logo && logoUrl);

  return {
    id: String(row.id),
    name,
    logoUrl,
    showLogo,
  };
}
