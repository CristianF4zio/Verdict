import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import {
  getAllContent,
  getUniqueProductCount,
  getTopProducts,
} from "@/lib/content";
import { TopProductRow } from "@/components/ui/TopProductRow";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return {
    title: `${t("titleLead")} ${t("titleHighlight")}`,
    description: t("subtitle"),
  };
}

const categoryKeys = {
  "email-marketing": "emailMarketing",
  "course-platforms": "coursePlatforms",
  "automation-tools": "automationTools",
  "business-security": "businessSecurity",
} as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const nav = await getTranslations("nav");

  const allDocs = getAllContent(locale);
  const topProducts = getTopProducts(locale, getUniqueProductCount(locale));

  const comparisonDoc = allDocs.find((doc) => doc.type === "comparison");
  const roundupDoc = allDocs.find((doc) => doc.type === "roundup");
  const reviewDoc = allDocs.find((doc) => doc.type === "review");

  return (
    <div>
      <section className="mx-auto max-w-[1280px] px-7 pb-14 pt-20">
        <h1
          className="animate-fade-up max-w-[16ch] text-[40px] font-medium leading-[0.96] tracking-[-0.05em] md:text-[80px] md:leading-[0.94]"
        >
          {t("titleLead")} <span className="text-signal">{t("titleHighlight")}</span>
        </h1>
        <div
          className="animate-fade-up mt-9 flex flex-wrap items-end justify-between gap-12"
          style={{ animationDelay: "80ms" }}
        >
          <p className="max-w-[44ch] text-lg leading-relaxed text-body">
            {t("subtitle")}
          </p>
          <a
            href="#scores"
            aria-label={t("cta")}
            className="bounce-arrow shrink-0 text-signal transition-colors duration-200 hover:text-panel-ink"
          >
            <svg
              width="64"
              height="88"
              viewBox="0 0 24 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="1" x2="12" y2="25" />
              <polyline points="2,16 12,29 22,16" />
            </svg>
          </a>
        </div>
      </section>

      <section id="scores" className="scroll-mt-6 bg-panel text-panel-ink">
        <div className="mx-auto max-w-[1280px] px-7 py-10">
          <div className="mb-2 font-mono text-[11px] uppercase tracking-wider text-panel-body">
            {t("rankingLabel")}
          </div>
          {topProducts.map((product, i) => (
            <div
              key={product.name}
              className="animate-fade-up"
              style={{ animationDelay: `${Math.min(i, 6) * 60}ms` }}
            >
              <TopProductRow
                href={product.href}
                score={product.rating}
                name={product.name}
                categoryLabel={nav(
                  categoryKeys[
                    product.category as keyof typeof categoryKeys
                  ],
                )}
                price={product.price}
                angle={product.blurb}
                showDivider={i < topProducts.length - 1}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-7 py-16">
        <div className="grid grid-cols-1 gap-5 [perspective:900px] md:grid-cols-3">
          {comparisonDoc && (
            <div className="animate-fade-up h-full">
              <Link
                href={`/${comparisonDoc.category}/${comparisonDoc.slug}`}
                className="tilt-3d group flex h-full flex-col rounded-md border border-hairline bg-paper p-8 transition-colors duration-300 hover:border-signal"
              >
                <div className="mb-5 flex items-center justify-between font-mono text-[10.5px] uppercase tracking-wider text-muted transition-colors duration-300 group-hover:text-signal">
                  {t("teaserVersus")}
                  <span className="reveal-arrow text-signal">→</span>
                </div>
                <div className="tilt-3d-pop mb-4 text-[26px] font-medium leading-[1.1] tracking-[-0.035em]">
                  {comparisonDoc.title}
                </div>
                <p className="mb-5 flex-1 text-[15px] leading-relaxed text-body">
                  {comparisonDoc.description}
                </p>
                <div className="flex gap-2.5 text-[15px] tabular-nums text-muted">
                  {comparisonDoc.products.map((p) => p.rating.toFixed(1)).join(" · ")}
                </div>
              </Link>
            </div>
          )}
          {roundupDoc && (
            <div className="animate-fade-up h-full" style={{ animationDelay: "60ms" }}>
              <Link
                href={`/${roundupDoc.category}/${roundupDoc.slug}`}
                className="tilt-3d group flex h-full flex-col rounded-md border border-hairline bg-paper p-8 transition-colors duration-300 hover:border-signal"
              >
                <div className="mb-5 flex items-center justify-between font-mono text-[10.5px] uppercase tracking-wider text-muted transition-colors duration-300 group-hover:text-signal">
                  {t("teaserRoundup")}
                  <span className="reveal-arrow text-signal">→</span>
                </div>
                <div className="tilt-3d-pop mb-4 text-[26px] font-medium leading-[1.1] tracking-[-0.035em]">
                  {roundupDoc.title}
                </div>
                <div className="flex-1 text-[15px] leading-relaxed text-body">
                  {roundupDoc.description}
                </div>
              </Link>
            </div>
          )}
          {reviewDoc && (
            <div className="animate-fade-up h-full" style={{ animationDelay: "120ms" }}>
              <Link
                href={`/${reviewDoc.category}/${reviewDoc.slug}`}
                className="tilt-3d group flex h-full flex-col rounded-md border border-panel-line bg-panel p-8 text-panel-ink transition-colors duration-300 hover:border-signal"
              >
                <div className="mb-5 flex items-center justify-between font-mono text-[10.5px] uppercase tracking-wider text-panel-body transition-colors duration-300 group-hover:text-signal">
                  {t("teaserReview")}
                  <span className="reveal-arrow text-signal">→</span>
                </div>
                <div className="tilt-3d-pop mb-4 text-[26px] font-medium leading-[1.1] tracking-[-0.035em] text-panel-ink">
                  {reviewDoc.title}
                </div>
                <div className="flex-1 text-[15px] leading-relaxed text-panel-body">
                  {reviewDoc.description}
                </div>
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="bg-panel text-panel-ink">
        <div className="mx-auto max-w-[1280px] px-7 py-16">
          <p className="m-0 max-w-[36ch] font-serif text-[30px] italic leading-[1.2] tracking-[-0.01em] md:text-[36px]">
            {t("quote")}
          </p>
          <Link
            href="/about"
            className="mt-6 inline-block border-b border-signal pb-0.5 font-mono text-[11.5px] uppercase tracking-wider text-signal"
          >
            {t("quoteLink")}
          </Link>
        </div>
      </section>
    </div>
  );
}
