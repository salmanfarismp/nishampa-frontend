import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // Default to returning to the book page with checkout open
  const next = searchParams.get("next") ?? "/the-book?checkout=open";

  if (code) {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && user) {
      // Ensure profile exists in public."Profile"
      const { data: profile } = await supabase
        .from("Profile")
        .select("id")
        .eq("id", user.id)
        .maybeSingle();

      if (!profile) {
        await supabase.from("Profile").insert({
          id: user.id,
          email: user.email,
          name:
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            user.email?.split("@")[0] ||
            null,
          avatar_url: user.user_metadata?.avatar_url || null,
        });
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Return the user to an error state or back to book page
  return NextResponse.redirect(`${origin}/the-book?auth_error=true`);
}

