import { createServiceClient } from "@/lib/supabase/server";

function envFallback(slug: string): string | null {
  const key = `AFFILIATE_LINK_${slug.toUpperCase().replace(/-/g, "_")}`;
  return process.env[key] ?? null;
}

/**
 * Resolves a product slug to the real affiliate URL. Looks up the
 * `affiliate_links` table first, falling back to an env var
 * (AFFILIATE_LINK_<SLUG>) so links can be swapped without a DB write.
 */
export async function resolveAffiliateLink(
  slug: string,
): Promise<string | null> {
  try {
    const supabase = createServiceClient();
    const { data } = await supabase
      .from("affiliate_links")
      .select("destination_url")
      .eq("slug", slug)
      .maybeSingle();

    if (data?.destination_url) {
      return data.destination_url;
    }
  } catch {
    // Supabase not configured yet — fall through to env var lookup.
  }

  return envFallback(slug);
}
