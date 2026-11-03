import { createClient } from "@supabase/supabase-js";
import { cacheLife, cacheTag } from "next/cache";
import {
  mapClientRowToClientItem,
  type ClientItem,
  type ClientRow,
} from "@/lib/types/client";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function getClients(): Promise<ClientItem[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("clients");

  if (!supabaseUrl || !supabaseKey) {
    console.warn("Supabase credentials missing. Returning empty clients list.");
    return [];
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .from("Client")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Error fetching Client from Supabase:", error.message);
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    // Filter out rows without a name and without a logo
    const validRows = (data as ClientRow[]).filter(
      (row) => (row.name && row.name.trim().length > 0) || row.logo_url
    );

    return validRows.map(mapClientRowToClientItem);
  } catch (err) {
    console.error("Unexpected error in getClients:", err);
    return [];
  }
}
