import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import {
  content,
  getContentBySlug,
  getContentByCategory,
  getCounterpart,
  type ContentDoc,
} from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import { getTypeLabel } from "@/lib/content-type";
import { splitHighlight } from "@/lib/text";
import { MdxContent } from "@/components/MdxContent";
import { ArticleSchema } from "@/components/schema/ArticleSchema";
import { ReviewSchema } from "@/components/schema/ReviewSchema";
import { ProductSchema } from "@/components/schema/ProductSchema";
import { FaqSchema } from "@/components/schema/FaqSchema";
import { Score } from "@/components/ui/Score";
import { CtaButton } from "@/components/ui/CtaButton";
import { AuthorBio } from "@/components/ui/AuthorBio";
import { FaqList } from "@/components/ui/FaqList";
import { ComparisonTable } from "@/components/ui/ComparisonTable";
import { RoundupList } from "@/components/ui/RoundupList";

const categoryKeys = {
  "email-marketing": "emailMarketing",
  "course-platforms": "coursePlatforms",
  "automation-tools": "automationTools",
  "business-security": "businessSecurity",
} as const;

export function generateStaticParams() {
  return content.map((doc) => ({
    locale: doc.locale,
    category: doc.category,
    slug: doc.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, category, slug } = await params;
  const doc = getContentBySlug(locale as Locale, category, slug);
  if (!doc) return {};

  const counterpart = getCounterpart(doc);
  const languages: Record<string, string> = {
    [doc.locale]: `${SITE_URL}/${doc.locale}/${category}/${slug}`,
  };
  if (counterpart) {
    languages[counterpart.locale] =
      `${SITE_URL}/${counterpart.locale}/${category}/${counterpart.slug}`;
  }

  return {
    title: doc.title,
    description: doc.description,
    alternates: {
      canonical: `${SITE_URL}/${doc.locale}/${category}/${slug}`,
      languages,
    },
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
      publishedTime: doc.publishedAt,
      modifiedTime: doc.updatedAt,
      locale: doc.locale,
    },
  };
}

export default async function ContentPage({
  params,
}: {
  params: Promise<{ locale: string; category: string; slug: string }>;
}) {
  const { locale: localeParam, category, slug } = await params;
  const locale = localeParam as Locale;
  const doc = getContentBySlug(locale, category, slug);

  if (!doc) notFound();

  setRequestLocale(locale);
  const url = `${SITE_URL}/${locale}/${category}/${slug}`;

  return (
    <article>
      <ArticleSchema doc={doc} url={url} />
      {doc.type === "review" ? (
        <ReviewSchema doc={doc} />
      ) : (
        doc.products.map((product) => (
          <ProductSchema key={product.name} product={product} />
        ))
      )}
      <FaqSchema faqs={doc.faqs} />

      {doc.type === "review" && <ReviewTemplate doc={doc} url={url} />}
      {doc.type === "comparison" && <ComparisonTemplate doc={doc} url={url} />}
      {doc.type === "roundup" && <RoundupTemplate doc={doc} url={url} />}
    </article>
  );
}

async function ReviewTemplate({ doc, url }: { doc: ContentDoc; url: string }) {
  const t = await getTranslations("content");
  const nav = await getTranslations("nav");
  const locale = doc.locale as Locale;
  const product = doc.products[0];
  const dateFormatter = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
  });

  const alternatives = product
    ? getContentByCategory(locale, doc.category)
        .filter(
          (d) =>
            d.type === "review" &&
            d.slug !== doc.slug &&
            d.products.length > 0,
        )
        .map((d) => ({ name: d.products[0].name, score: d.products[0].rating, href: `/${d.category}/${d.slug}` }))
    : [];

  return (
    <>
      <section>
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-end gap-10 px-7 pb-11 pt-14 md:grid-cols-[1fr_300px]">
          <div className="animate-fade-up">
            <div className="mb-6 font-mono text-[11px] uppercase tracking-wider text-muted">
              {getTypeLabel("review", locale)} · {nav(categoryKeys[doc.category])} · {dateFormatter.format(new Date(doc.updatedAt))}
            </div>
            <h1 className="mb-6 max-w-[18ch] font-serif text-[44px] font-medium leading-[0.95] tracking-[-0.05em] md:text-[68px]">
              {product?.name && (() => {
                const { lead, highlight } = splitHighlight(product.name);
                return (
                  <>
                    {lead}
                    <span className="text-signal">{highlight}</span>
                  </>
                );
              })()}
            </h1>
            {doc.verdict && (
              <p className="max-w-[32ch] font-serif text-[26px] italic leading-[1.2] md:text-[30px]">
                {doc.verdict}
              </p>
            )}
          </div>
          {product && (
            <div
              className="animate-fade-up text-left md:text-right"
              style={{ animationDelay: "100ms" }}
            >
              <Score value={product.rating} className="text-[80px] md:text-[128px]" />
              <div className="mt-4 inline-block bg-signal px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wider text-on-signal">
                {t("editorsChoice")}
              </div>
            </div>
          )}
        </div>
      </section>

      {doc.criteria.length > 0 && (
        <section className="bg-panel text-panel-ink">
          <div className="mx-auto grid max-w-[1280px] grid-cols-2 px-7 md:grid-cols-4">
            {doc.criteria.map((criterion, i) => (
              <div
                key={criterion.label}
                className="animate-fade-up py-7 pr-3"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <Score value={criterion.value} invert className="text-[28px]" />
                <div className="mt-1 text-[13px] text-panel-body">
                  {criterion.label}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto grid max-w-[1280px] grid-cols-1 items-start gap-14 px-7 pb-16 pt-12 md:grid-cols-[1fr_300px]">
        <div className="min-w-0">
          {doc.author && (
            <div className="mb-10 flex items-center gap-3">
              <AuthorBio author={doc.author} variant="inline" />
              <span className="ml-auto shrink-0 font-mono text-[11px] text-muted">
                {dateFormatter.format(new Date(doc.updatedAt))}
              </span>
            </div>
          )}

          {(doc.pros.length > 0 || doc.cons.length > 0) && (
            <div className="mb-11 grid grid-cols-1 gap-10 sm:grid-cols-2">
              {doc.pros.length > 0 && (
                <div>
                  <div className="mb-3.5 font-mono text-[10.5px] uppercase tracking-wider text-muted">
                    {t("pros")}
                  </div>
                  <div className="grid gap-3 text-base leading-relaxed">
                    {doc.pros.map((item) => (
                      <div key={item} className="flex gap-2.5">
                        <span className="mt-0.5 shrink-0 text-signal">+</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {doc.cons.length > 0 && (
                <div>
                  <div className="mb-3.5 font-mono text-[10.5px] uppercase tracking-wider text-alert">
                    {t("cons")}
                  </div>
                  <div className="grid gap-3 text-base leading-relaxed">
                    {doc.cons.map((item) => (
                      <div key={item} className="flex gap-2.5">
                        <span className="mt-0.5 shrink-0 text-alert">–</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="prose mb-12 max-w-[62ch] text-[18px] leading-[1.65] text-ink prose-headings:font-medium prose-headings:tracking-[-0.04em] prose-headings:text-ink prose-h2:font-serif prose-p:text-body prose-a:text-ink prose-a:underline prose-strong:text-ink prose-li:text-body">
            <MdxContent code={doc.body} />
          </div>

          {doc.faqs.length > 0 && (
            <>
              <h2 className="mb-6 font-serif text-[28px] font-medium tracking-[-0.04em] md:text-[34px]">
                {t("faqTitle")}
              </h2>
              <FaqList faqs={doc.faqs} />
            </>
          )}

          {doc.author && (
            <div className="mt-10">
              <div className="mb-2.5 font-mono text-[10.5px] uppercase tracking-wider text-muted">
                {t("whoTested")}
              </div>
              <AuthorBio author={doc.author} variant="full" />
            </div>
          )}
        </div>

        {product && (
          <aside className="grid gap-7 md:sticky md:top-[90px]">
            <div className="rounded-md border border-panel-line bg-panel p-6 text-panel-ink">
              <div className="mb-3.5 font-mono text-[10.5px] uppercase tracking-wider text-signal">
                {t("verdict")}
              </div>
              {product && (
                <p className="mb-6 text-[15.5px] leading-relaxed text-panel-ink">
                  {t("editorsChoice")} · {product.rating.toFixed(1)}/10
                </p>
              )}
              <CtaButton
                href={product.affiliateLink}
                fromPath={url}
                locale={doc.locale}
                label={t("ctaTryFreeDays")}
                variant="onDark"
                disclosure={t("disclosure", { price: product.price })}
              />
            </div>
            {alternatives.length > 0 && (
              <div>
                <div className="mb-3.5 font-mono text-[10.5px] uppercase tracking-wider text-muted">
                  {t("alternatives")}
                </div>
                <div className="grid gap-1">
                  {alternatives.map((alt) => (
                    <Link
                      key={alt.name}
                      href={alt.href}
                      className="row flex justify-between rounded px-2.5 py-2.5 text-[15px]"
                    >
                      <span>{alt.name}</span>
                      <span className="row-soft tabular-nums text-muted">
                        {alt.score.toFixed(1)}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        )}
      </section>
    </>
  );
}

async function ComparisonTemplate({
  doc,
  url,
}: {
  doc: ContentDoc;
  url: string;
}) {
  const t = await getTranslations("content");
  const c = await getTranslations("comparison");
  const locale = doc.locale as Locale;
  const idealForRow = doc.comparisonRows[doc.comparisonRows.length - 1];

  return (
    <>
      <section className="animate-fade-up mx-auto max-w-[1280px] px-7 pb-10 pt-14">
        <div className="mb-6 font-mono text-[11px] uppercase tracking-wider text-muted">
          {getTypeLabel("comparison", locale)} · {doc.products.length} {locale === "es" ? "productos" : "products"}
        </div>
        <h1 className="mb-6 max-w-[20ch] font-serif text-[36px] font-medium leading-[0.94] tracking-[-0.05em] md:text-[72px]">
          {(() => {
            const { lead, highlight } = splitHighlight(
              doc.products.map((p) => p.name).join(" vs "),
            );
            return (
              <>
                {lead}
                <span className="text-signal">{highlight}</span>
              </>
            );
          })()}
        </h1>
        <p className="max-w-[52ch] text-lg leading-relaxed text-body">
          {doc.description}
        </p>
      </section>

      <section>
        <div
          className="mx-auto grid max-w-[1280px] grid-cols-1 gap-5 px-7 md:[grid-template-columns:repeat(var(--cols),1fr)]"
          style={{ "--cols": doc.products.length } as React.CSSProperties}
        >
          {doc.products.map((product, i) => (
            <div
              key={product.name}
              className={
                i === 0
                  ? "animate-fade-up rounded-md border border-panel-line bg-panel p-8 text-panel-ink"
                  : "animate-fade-up rounded-md border border-hairline bg-paper p-8"
              }
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div
                className={`mb-5 font-mono text-[10px] uppercase tracking-wider ${i === 0 ? "text-signal" : "text-muted"}`}
              >
                {i === 0 ? c("winner") : c("alternative", { n: i })}
              </div>
              <div className="mb-4 flex items-baseline justify-between">
                <span className="text-[24px] font-medium tracking-[-0.03em]">
                  {product.name}
                </span>
                <Score
                  value={product.rating}
                  invert={i === 0}
                  className="text-[42px]"
                />
              </div>
              <p
                className={`mb-6 min-h-[3.5em] text-[14.5px] leading-relaxed ${i === 0 ? "text-panel-body" : "text-body"}`}
              >
                {product.blurb}
              </p>
              <CtaButton
                href={product.affiliateLink}
                fromPath={url}
                locale={locale}
                label={i === 0 ? t("ctaTryFree") : t("ctaSeePricing")}
                variant={i === 0 ? "onDark" : "secondary"}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-7 py-14">
        <ComparisonTable products={doc.products} rows={doc.comparisonRows} />
      </section>

      {idealForRow && (
        <section className="bg-panel text-panel-ink">
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-7 py-12 md:grid-cols-3">
            {doc.products.map((product, i) => (
              <div
                key={product.name}
                className="animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="mb-3 font-mono text-[10.5px] uppercase tracking-wider text-signal">
                  {c("chooseIf", { name: product.name })}
                </div>
                <p className="m-0 text-[17px] leading-relaxed text-panel-ink">
                  {idealForRow.values[i]}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {doc.faqs.length > 0 && (
        <section className="mx-auto max-w-[1280px] px-7 pb-16">
          <h2 className="mb-4 font-serif text-[28px] font-medium tracking-[-0.04em] md:text-[34px]">
            {t("faqTitle")}
          </h2>
          <FaqList faqs={doc.faqs} />
        </section>
      )}
    </>
  );
}

async function RoundupTemplate({
  doc,
  url,
}: {
  doc: ContentDoc;
  url: string;
}) {
  const t = await getTranslations("content");
  const locale = doc.locale as Locale;
  const ctaLabels = doc.products.map((_, i) =>
    i === 0 ? t("ctaTrial14") : t("ctaSeePlans"),
  );

  return (
    <>
      <section className="animate-fade-up mx-auto max-w-[1280px] px-7 pb-10 pt-14">
        <div className="mb-6 font-mono text-[11px] uppercase tracking-wider text-muted">
          {getTypeLabel("roundup", locale)} ·{" "}
          {doc.products.every((p) => p.rating > 0)
            ? `${doc.products.length} ${locale === "es" ? "herramientas probadas" : "tools tested"}`
            : `${doc.products.length} ${locale === "es" ? "herramientas comparadas" : "tools compared"}`}
        </div>
        <h1 className="mb-6 max-w-[16ch] font-serif text-[36px] font-medium leading-[0.94] tracking-[-0.05em] md:text-[76px]">
          {(() => {
            const { lead, highlight } = splitHighlight(
              doc.title,
              locale === "es" ? 5 : 6,
            );
            return (
              <>
                {lead}
                <span className="text-signal">{highlight}</span>
              </>
            );
          })()}
        </h1>
        <p className="max-w-[50ch] text-lg leading-relaxed text-body">
          {doc.description}
        </p>
      </section>

      <section className="mx-auto max-w-[1280px] px-7 pb-16">
        <RoundupList
          products={doc.products}
          ctaLabels={ctaLabels}
          editorsPickLabel={t("editorsChoice")}
          fromPath={url}
          locale={locale}
        />
      </section>

      {doc.faqs.length > 0 && (
        <section className="mx-auto max-w-[1280px] px-7 pb-16">
          <h2 className="mb-4 font-serif text-[28px] font-medium tracking-[-0.04em] md:text-[34px]">
            {t("faqTitle")}
          </h2>
          <FaqList faqs={doc.faqs} />
        </section>
      )}
    </>
  );
}
