import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { CATEGORIES } from "@/lib/categories";
import { content, getCounterpart } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

function alternates(path: string) {
  return Object.fromEntries(
    routing.locales.map((l) => [l, `${SITE_URL}/${l}${path}`]),
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    ...CATEGORIES.map((category) => `/${category}`),
    "/affiliate-disclosure",
    "/privacy-policy",
    "/terms",
    "/about",
  ];

  const staticEntries: MetadataRoute.Sitemap = routing.locales.flatMap(
    (locale) =>
      staticPaths.map((path) => ({
        url: `${SITE_URL}/${locale}${path}`,
        alternates: { languages: alternates(path) },
      })),
  );

  const contentEntries: MetadataRoute.Sitemap = content.map((doc) => {
    const counterpart = getCounterpart(doc);
    const languages: Record<string, string> = {
      [doc.locale]: `${SITE_URL}/${doc.locale}/${doc.category}/${doc.slug}`,
    };
    if (counterpart) {
      languages[counterpart.locale] =
        `${SITE_URL}/${counterpart.locale}/${counterpart.category}/${counterpart.slug}`;
    }

    return {
      url: `${SITE_URL}/${doc.locale}/${doc.category}/${doc.slug}`,
      lastModified: doc.updatedAt,
      alternates: { languages },
    };
  });

  return [...staticEntries, ...contentEntries];
}
