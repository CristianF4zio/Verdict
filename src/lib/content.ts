// Relative import on purpose: resolving this generated module through a
// tsconfig `paths` alias silently degrades several fields (arrays, optional
// object) to `never` in this project's TS setup. A direct relative import
// does not have that problem — see the rest of the codebase for the alias.
import { content } from "../../.velite/index.js";
import type { Locale } from "@/i18n/routing";

export { content };

export type ContentDoc = (typeof content)[number];
export type Product = ContentDoc["products"][number];
export type Faq = ContentDoc["faqs"][number];
export type Author = NonNullable<ContentDoc["author"]>;
export type ComparisonRow = ContentDoc["comparisonRows"][number];

export function getAllContent(locale: Locale) {
  return content.filter((doc) => doc.locale === locale);
}

export function getContentByCategory(locale: Locale, category: string) {
  return content.filter(
    (doc) => doc.locale === locale && doc.category === category,
  );
}

export function getContentBySlug(
  locale: Locale,
  category: string,
  slug: string,
) {
  return content.find(
    (doc) =>
      doc.locale === locale && doc.category === category && doc.slug === slug,
  );
}

export function getCounterpart(doc: ContentDoc) {
  const otherLocale: Locale = doc.locale === "en" ? "es" : "en";
  return content.find(
    (candidate) =>
      candidate.locale === otherLocale &&
      candidate.category === doc.category &&
      candidate.slug === doc.slug,
  );
}

export function getFeaturedContent(locale: Locale, limit: number) {
  return getAllContent(locale)
    .filter((doc) => doc.type === "review" && doc.products.length > 0)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, limit);
}

export function getUniqueProductCount(locale: Locale) {
  const names = new Set(
    getAllContent(locale).flatMap((doc) =>
      doc.products.map((p) => p.name.toLowerCase()),
    ),
  );
  return names.size;
}

export function getLatestUpdate(locale: Locale, category?: string) {
  const docs = category
    ? getContentByCategory(locale, category)
    : getAllContent(locale);
  return docs.reduce<string | null>(
    (latest, doc) =>
      !latest || doc.updatedAt > latest ? doc.updatedAt : latest,
    null,
  );
}

export type TopProduct = {
  name: string;
  rating: number;
  price: string;
  blurb?: string;
  category: string;
  href: string;
};

// Aggregates products across every doc, deduped by name (case-insensitive),
// preferring the dedicated review page as the link target when one exists.
export function getTopProducts(locale: Locale, limit: number): TopProduct[] {
  const byName = new Map<string, TopProduct>();

  for (const doc of getAllContent(locale)) {
    for (const product of doc.products) {
      const key = product.name.toLowerCase();
      const existing = byName.get(key);
      if (!existing) {
        byName.set(key, {
          name: product.name,
          rating: product.rating,
          price: product.price,
          blurb: product.blurb,
          category: doc.category,
          href: `/${doc.category}/${doc.slug}`,
        });
      } else {
        byName.set(key, {
          ...existing,
          blurb: existing.blurb ?? product.blurb,
          href:
            doc.type === "review"
              ? `/${doc.category}/${doc.slug}`
              : existing.href,
        });
      }
    }
  }

  return Array.from(byName.values())
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

// Returns the slug of the highest-scored review in `docs`, but only when
// there's more than one candidate to compare against — a "top rated" badge
// on the only review in a category doesn't mean anything.
export function getTopRatedSlug(docs: ContentDoc[]): string | null {
  const candidates = docs.filter(
    (doc) => doc.type === "review" && doc.products.length > 0,
  );
  if (candidates.length < 2) return null;

  return candidates.reduce((best, doc) =>
    doc.products[0].rating > best.products[0].rating ? doc : best,
  ).slug;
}
