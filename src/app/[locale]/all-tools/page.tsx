import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getTopProducts, getUniqueProductCount, type TopProduct } from "@/lib/content";
import { CATEGORIES } from "@/lib/categories";
import { SITE_URL } from "@/lib/site";
import { Score } from "@/components/ui/Score";
import { CtaButton } from "@/components/ui/CtaButton";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const categoryKeys = {
  "email-marketing": "emailMarketing",
  "course-platforms": "coursePlatforms",
  "automation-tools": "automationTools",
  "business-security": "businessSecurity",
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "allTools" });
  return {
    title: `${t("titleLead")} ${t("titleHighlight")}`,
    description: t("subtitle"),
  };
}

export default async function AllToolsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  setRequestLocale(locale);

  const t = await getTranslations("allTools");
  const nav = await getTranslations("nav");
  const content = await getTranslations("content");

  const products = getTopProducts(locale, getUniqueProductCount(locale));
  const url = `${SITE_URL}/${locale}/all-tools`;

  const byCategory = CATEGORIES.map((category) => ({
    category,
    label: nav(categoryKeys[category]),
    products: products.filter((p) => p.category === category),
  })).filter((group) => group.products.length > 0);

  return (
    <div>
      <section className="mx-auto max-w-[1280px] px-7 pb-10 pt-14">
        <div className="animate-fade-up mb-6 font-mono text-[11px] uppercase tracking-wider text-muted">
          {t("kicker", { count: products.length })}
        </div>
        <h1 className="animate-fade-up mb-6 max-w-[18ch] font-serif text-[40px] font-medium leading-[0.95] tracking-[-0.05em] md:text-[68px]">
          {t("titleLead")} <span className="text-signal">{t("titleHighlight")}</span>
        </h1>
        <p
          className="animate-fade-up max-w-[52ch] text-lg leading-relaxed text-body"
          style={{ animationDelay: "60ms" }}
        >
          {t("subtitle")}
        </p>
      </section>

      <section className="bg-panel text-panel-ink">
        <div className="mx-auto max-w-[1280px] px-7 py-8">
          <p className="m-0 max-w-[68ch] text-[16.5px] leading-relaxed text-panel-body">
            {t("disclaimer")}
          </p>
          <Link
            href="/"
            className="underline-grow mt-3 inline-block font-mono text-[11.5px] uppercase tracking-wider text-signal"
          >
            {t("disclaimerLink")}
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-7 py-16">
        {byCategory.length === 0 && (
          <p className="max-w-[52ch] text-body">{t("empty")}</p>
        )}

        <div className="grid gap-16">
          {byCategory.map((group) => (
            <div key={group.category}>
              <h2 className="mb-7 font-serif text-[26px] font-medium tracking-[-0.04em] md:text-[32px]">
                {group.label}
              </h2>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {group.products.map((product) => (
                  <ToolCard
                    key={product.name}
                    product={product}
                    url={url}
                    locale={locale}
                    ctaLabel={content("ctaSeePlans")}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ToolCard({
  product,
  url,
  locale,
  ctaLabel,
}: {
  product: TopProduct;
  url: string;
  locale: Locale;
  ctaLabel: string;
}) {
  return (
    <div className="flex flex-col rounded-md border border-hairline bg-paper p-6">
      <div className="mb-3 flex items-start justify-between gap-4">
        <span className="text-[19px] font-medium tracking-[-0.03em]">
          {product.name}
        </span>
        <Score value={product.rating} className="text-[28px]" />
      </div>
      {product.blurb && (
        <p className="mb-5 min-h-[3em] flex-1 text-[14.5px] leading-relaxed text-body">
          {product.blurb}
        </p>
      )}
      <div className="mb-4 mt-auto text-sm text-muted">{product.price}</div>
      <CtaButton
        href={product.affiliateLink}
        fromPath={url}
        locale={locale}
        label={ctaLabel}
        variant="secondary"
      />
    </div>
  );
}
