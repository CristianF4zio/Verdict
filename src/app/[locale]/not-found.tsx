import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="mx-auto max-w-[1280px] px-7 py-24">
      <div className="mb-6 font-mono text-[11px] uppercase tracking-wider text-muted">
        {t("kicker")}
      </div>
      <h1 className="mb-6 max-w-[16ch] text-[40px] font-medium leading-[0.95] tracking-[-0.05em] md:text-[64px]">
        {t("title")}
      </h1>
      <p className="mb-8 max-w-[46ch] text-lg leading-relaxed text-body">
        {t("subtitle")}
      </p>
      <Link
        href="/"
        className="inline-block rounded-full border border-panel-line bg-panel px-5 py-3.5 text-sm font-medium text-panel-ink transition-all duration-200 hover:-translate-y-1 hover:border-signal hover:bg-signal hover:text-on-signal"
      >
        {t("cta")}
      </Link>
    </div>
  );
}
