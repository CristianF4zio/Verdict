import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { resolveAffiliateLink } from "@/lib/affiliate-links";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const destination = await resolveAffiliateLink(slug);

  if (!destination) {
    return NextResponse.json(
      { error: `No affiliate link configured for "${slug}"` },
      { status: 404 },
    );
  }

  const { searchParams } = request.nextUrl;
  const pagePath = searchParams.get("from") ?? request.headers.get("referer") ?? null;
  const locale = searchParams.get("locale");

  try {
    const supabase = createServiceClient();
    await supabase.from("affiliate_clicks").insert({
      slug,
      page_path: pagePath,
      locale,
      referrer: request.headers.get("referer"),
    });
  } catch {
    // Tracking is best-effort — a Supabase outage should never block the redirect.
  }

  return NextResponse.redirect(destination, { status: 302 });
}
