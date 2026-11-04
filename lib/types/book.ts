export interface BookRow {
  id: number;
  created_at: string;
  name: string | null;
  name_ml: string | null;
  sm_description: string | null;
  pages_approx: number | null;
  language: string | null;
  cover_url: string | null;
  slug: string | null;
}

