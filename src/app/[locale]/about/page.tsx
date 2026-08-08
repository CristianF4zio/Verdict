import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { getUniqueProductCount, getAllContent } from "@/lib/content";
import { AuthorBio } from "@/components/ui/AuthorBio";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const team = {
  en: [
    {
      name: "Cristian Fazio",
      credentials: "Founder of Verdict — writing honest reviews of tools for creators and small teams.",
    },
  ],
  es: [
    {
      name: "Cristian Fazio",
      credentials: "Fundador de Verdict — escribe reseñas honestas de herramientas para creadores y equipos pequeños.",
    },
  ],
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("kicker") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  const toolsCount = getUniqueProductCount(locale);
  const articlesCount = getAllContent(locale).length;

  const stats = [
    { value: String(toolsCount), label: t("statTools") },
    { value: String(articlesCount), label: t("statArticles") },
    { value: t("statDays"), label: t("statDaysLabel") },
    { value: "0", label: t("statSponsored") },
  ];

  const steps = [
    { title: t("step1Title"), desc: t("step1Desc") },
    { title: t("step2Title"), desc: t("step2Desc") },
    { title: t("step3Title"), desc: t("step3Desc") },
  ];

  return (
    <div>
      <section className="mx-auto max-w-[1280px] px-7 pb-14 pt-16">
        <div className="animate-fade-up mb-6 font-mono text-[11px] uppercase tracking-wider text-muted">
          {t("kicker")}
        </div>
        <h1 className="animate-fade-up mb-8 max-w-[16ch] text-[40px] font-medium leading-[0.93] tracking-[-0.05em] md:text-[84px]">
          {t("titleLead")} <span className="text-signal">{t("titleHighlight")}</span>
        </h1>
        <p
          className="animate-fade-up max-w-[50ch] text-lg leading-relaxed text-body"
          style={{ animationDelay: "80ms" }}
        >
          {t("subtitle")}
        </p>
      </section>

      <section className="bg-panel text-panel-ink">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-8 px-7 py-10 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="text-[38px] font-medium leading-none tabular-nums tracking-[-0.05em] text-signal md:text-[52px]">
                {stat.value}
              </div>
              <div className="mt-2 text-[13.5px] text-panel-body">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-7 py-14 md:grid-cols-3">
        {steps.map((step, i) => (
          <div
            key={step.title}
            className="animate-fade-up border-t-2 border-signal pt-4"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <p className="m-0 text-[16.5px] leading-relaxed">
              <strong className="font-medium">{step.title}:</strong> {step.desc}
            </p>
          </div>
        ))}
      </section>

      <section className="bg-panel text-panel-ink">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-14 px-7 py-14 md:grid-cols-2">
          <p className="m-0 font-serif text-[30px] italic leading-[1.2] md:text-[36px]">
            {t("quote")}
          </p>
          <div>
            <p className="mb-5 max-w-[46ch] text-[16.5px] leading-relaxed text-panel-body">
              {t("quoteBody")}
            </p>
            <Link
              href="/affiliate-disclosure"
              className="border-b border-signal pb-0.5 font-mono text-[11.5px] uppercase tracking-wider text-signal"
            >
              {t("policyLink")}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-7 py-16">
        <h2 className="mb-8 text-[32px] font-medium tracking-[-0.045em] md:text-[40px]">
          {t("team")}
        </h2>
        <div className="grid gap-8">
          {team[locale].map((member, i) => (
            <div
              key={member.name}
              className="animate-fade-up"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <AuthorBio author={member} variant="full" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
