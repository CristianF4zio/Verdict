import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { SITE_NAME, getCurrentYear } from "@/lib/site";

const categories = [
  { slug: "email-marketing", en: "Email", es: "Email" },
  { slug: "course-platforms", en: "Courses", es: "Cursos" },
  { slug: "automation-tools", en: "Automation", es: "Automatización" },
  { slug: "business-security", en: "Security", es: "Seguridad" },
] as const;

const localeNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
};

export async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations("footer");

  return (
    <footer className="border-t border-panel-line bg-panel px-7 pb-9 pt-10 text-panel-body">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-wrap items-end justify-between gap-10 pb-10">
          <div className="text-[44px] font-medium leading-none tracking-[-0.05em] text-panel-ink">
            {SITE_NAME.toUpperCase()}
            <span className="text-signal">.</span>
          </div>
          <a
            href="#"
            className="group flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-wider transition-colors duration-200 hover:text-signal"
          >
            {t("backToTop")}
            <span className="transition-transform duration-200 group-hover:-translate-y-1">
              ↑
            </span>
          </a>
        </div>

        <div className="grid grid-cols-2 gap-8 text-[13.5px] sm:grid-cols-4">
          <div className="grid content-start gap-2.5">
            <span className="font-mono text-[10.5px] uppercase tracking-wider text-panel-body/70">
              {t("categories")}
            </span>
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                className="underline-grow w-fit transition-colors duration-200 hover:text-panel-ink"
              >
                {category[locale]}
              </Link>
            ))}
          </div>
          <div className="grid content-start gap-2.5">
            <span className="font-mono text-[10.5px] uppercase tracking-wider text-panel-body/70">
              {t("editorial")}
            </span>
            <Link
              href="/about"
              className="underline-grow w-fit transition-colors duration-200 hover:text-panel-ink"
            >
              {t("methodology")}
            </Link>
            <Link
              href="/affiliate-disclosure"
              className="underline-grow w-fit transition-colors duration-200 hover:text-panel-ink"
            >
              {t("howWeFund")}
            </Link>
            <Link
              href="/about"
              className="underline-grow w-fit transition-colors duration-200 hover:text-panel-ink"
            >
              {t("team")}
            </Link>
          </div>
          <div className="grid content-start gap-2.5">
            <span className="font-mono text-[10.5px] uppercase tracking-wider text-panel-body/70">
              {t("legal")}
            </span>
            <Link
              href="/privacy-policy"
              className="underline-grow w-fit transition-colors duration-200 hover:text-panel-ink"
            >
              {t("privacy")}
            </Link>
            <Link
              href="/terms"
              className="underline-grow w-fit transition-colors duration-200 hover:text-panel-ink"
            >
              {t("terms")}
            </Link>
            <Link
              href="/affiliate-disclosure"
              className="underline-grow w-fit transition-colors duration-200 hover:text-panel-ink"
            >
              {t("affiliate")}
            </Link>
          </div>
          <div className="grid content-start gap-2.5">
            <span className="font-mono text-[10.5px] uppercase tracking-wider text-panel-body/70">
              {t("language")}
            </span>
            {routing.locales.map((l) =>
              l === locale ? (
                <span key={l} className="w-fit text-panel-ink">
                  {localeNames[l]}
                </span>
              ) : (
                <Link
                  key={l}
                  href="/"
                  locale={l}
                  className="underline-grow w-fit transition-colors duration-200 hover:text-panel-ink"
                >
                  {localeNames[l]}
                </Link>
              ),
            )}
          </div>
        </div>

        <div className="mt-12 font-mono text-[11.5px] text-panel-body/70">
          {t("copyright", { year: getCurrentYear(), siteName: SITE_NAME.toUpperCase() })}
        </div>
      </div>
    </footer>
  );
}
