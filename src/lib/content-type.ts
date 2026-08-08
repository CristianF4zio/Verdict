import type { Locale } from "@/i18n/routing";

type ContentType = "review" | "comparison" | "roundup";

const labels: Record<Locale, Record<ContentType, string>> = {
  en: { review: "Review", comparison: "Versus", roundup: "Ranking" },
  es: { review: "Review", comparison: "Versus", roundup: "Ranking" },
};

export function getTypeLabel(type: ContentType, locale: Locale): string {
  return labels[locale][type];
}
