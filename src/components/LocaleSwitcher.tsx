"use client";

import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  return (
    <span className="flex items-center gap-1.5 text-sm">
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-hairline">/</span>}
          {l === locale ? (
            <span className="text-ink">{l.toUpperCase()}</span>
          ) : (
            <Link
              href={pathname}
              locale={l}
              className="transition-colors duration-200 hover:text-ink"
            >
              {l.toUpperCase()}
            </Link>
          )}
        </span>
      ))}
    </span>
  );
}
