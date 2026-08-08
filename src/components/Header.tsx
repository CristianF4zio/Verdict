import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { SITE_NAME } from "@/lib/site";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

const categories = [
  { slug: "email-marketing", en: "Email", es: "Email" },
  { slug: "course-platforms", en: "Courses", es: "Cursos" },
  { slug: "automation-tools", en: "Automation", es: "Automatización" },
  { slug: "business-security", en: "Security", es: "Seguridad" },
] as const;

export function Header({ locale }: { locale: Locale }) {
  return (
    <header className="border-b border-panel-line">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-x-10 gap-y-4 px-7 py-6">
        <Link
          href="/"
          className="text-[30px] font-semibold tracking-[-0.06em] text-ink"
        >
          {SITE_NAME.toUpperCase()}
          <span className="text-signal">.</span>
        </Link>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[15px] font-medium text-body">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/${category.slug}`}
              className="underline-grow text-body transition-colors duration-200 hover:text-ink"
            >
              {category[locale]}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center font-mono uppercase tracking-wider text-muted">
          <LocaleSwitcher locale={locale} />
        </div>
      </div>
    </header>
  );
}
