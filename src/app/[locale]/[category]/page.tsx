import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { CATEGORIES, type Category } from "@/lib/categories";
import { getContentByCategory, getTopRatedSlug } from "@/lib/content";
import { CategoryFeedRow } from "@/components/ui/CategoryFeedRow";
import { splitHighlight } from "@/lib/text";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    CATEGORIES.map((category) => ({ locale, category })),
  );
}

const categoryKeys = {
  "email-marketing": "emailMarketing",
  "course-platforms": "coursePlatforms",
  "automation-tools": "automationTools",
  "business-security": "businessSecurity",
} as const;

type ContentType = "review" | "comparison" | "roundup";
const FILTERS = ["review", "comparison", "roundup"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale, category } = await params;
  if (!CATEGORIES.includes(category as Category)) return {};
  const nav = await getTranslations({ locale, namespace: "nav" });
  const categoryMeta = await getTranslations({
    locale,
    namespace: "categoryMeta",
  });
  return {
    title: nav(categoryKeys[category as Category]),
    description: categoryMeta(`${category}.long`),
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; category: string }>;
  searchParams: Promise<{ type?: string }>;
}) {
  const { locale: localeParam, category: categoryParam } = await params;
  const { type: typeParam } = await searchParams;

  if (!CATEGORIES.includes(categoryParam as Category)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const category = categoryParam as Category;
  const activeType = FILTERS.includes(typeParam as ContentType)
    ? (typeParam as ContentType)
    : null;

  setRequestLocale(locale);
  const allDocs = getContentByCategory(locale, category);
  const topRatedSlug = getTopRatedSlug(allDocs);
  const docs = activeType
    ? allDocs.filter((doc) => doc.type === activeType)
    : allDocs;
  const nav = await getTranslations("nav");
  const categoryMeta = await getTranslations("categoryMeta");
  const t = await getTranslations("category");
  const content = await getTranslations("content");

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
  });

  const counts = {
    all: allDocs.length,
    review: allDocs.filter((d) => d.type === "review").length,
    comparison: allDocs.filter((d) => d.type === "comparison").length,
    roundup: allDocs.filter((d) => d.type === "roundup").length,
  };

  const filters: { type: ContentType | null; label: string; count: number }[] = [
    { type: null, label: t("filterAll", { count: counts.all }), count: counts.all },
    { type: "review", label: t("filterReviews", { count: counts.review }), count: counts.review },
    { type: "comparison", label: t("filterVersus", { count: counts.comparison }), count: counts.comparison },
    { type: "roundup", label: t("filterRoundups", { count: counts.roundup }), count: counts.roundup },
  ];

  const { lead: categoryNameLead, highlight: categoryNameHighlight } = splitHighlight(
    nav(categoryKeys[category]),
  );

  return (
    <div>
      <section className="mx-auto max-w-[1280px] px-7 pb-10 pt-14">
        <div className="animate-fade-up mb-6 font-mono text-[11px] uppercase tracking-wider text-muted">
          {t("kicker", { count: allDocs.length })}
        </div>
        <h1 className="animate-fade-up mb-6 max-w-[16ch] text-[44px] font-medium leading-[0.94] tracking-[-0.05em] md:text-[76px]">
          {categoryNameLead}
          <span className="text-signal">{categoryNameHighlight}</span>
        </h1>
        <p
          className="animate-fade-up mb-0 max-w-[52ch] text-lg leading-relaxed text-body"
          style={{ animationDelay: "60ms" }}
        >
          {categoryMeta(`${category}.long`)}
        </p>
      </section>

      <section className="bg-panel text-panel-ink">
        <div className="mx-auto flex max-w-[1280px] flex-wrap gap-5 px-7 py-4 font-mono text-[11.5px] uppercase tracking-wider">
          {filters.map((filter) => (
            <Link
              key={filter.type ?? "all"}
              href={`/${category}${filter.type ? `?type=${filter.type}` : ""}`}
              className={
                activeType === filter.type
                  ? "border-b-2 border-signal pb-1 text-panel-ink"
                  : "text-panel-body transition-colors duration-150 hover:text-panel-ink"
              }
            >
              {filter.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-7 pb-16 pt-8">
        {docs.map((doc, i) => {
          const isReview = doc.type === "review";
          const price = isReview
            ? doc.products[0]?.price
            : doc.type === "comparison"
              ? doc.products.map((p) => p.rating.toFixed(1)).join(" · ")
              : undefined;

          return (
            <div
              key={doc.slug}
              className="animate-fade-up"
              style={{ animationDelay: `${Math.min(i, 6) * 50}ms` }}
            >
              <CategoryFeedRow
                href={`/${category}/${doc.slug}`}
                type={doc.type}
                title={doc.title}
                description={doc.description}
                score={isReview ? (doc.products[0]?.rating ?? null) : null}
                productCount={doc.products.length}
                price={price}
                authorName={doc.author?.name}
                date={dateFormatter.format(new Date(doc.updatedAt))}
                locale={locale}
                topRatedLabel={
                  doc.slug === topRatedSlug ? content("editorsChoice") : undefined
                }
              />
            </div>
          );
        })}
        {docs.length === 0 && <p className="py-8 text-muted">{t("empty")}</p>}
      </section>
    </div>
  );
}
