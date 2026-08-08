import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Score } from "@/components/ui/Score";
import { getTypeLabel } from "@/lib/content-type";

type ContentType = "review" | "comparison" | "roundup";

export function CategoryFeedRow({
  href,
  type,
  title,
  description,
  score,
  productCount,
  price,
  authorName,
  date,
  locale,
  topRatedLabel,
}: {
  href: string;
  type: ContentType;
  title: string;
  description: string;
  score: number | null;
  productCount: number;
  price?: string;
  authorName?: string;
  date?: string;
  locale: Locale;
  topRatedLabel?: string;
}) {
  return (
    <Link
      href={href}
      className="row grid cursor-pointer grid-cols-[56px_1fr] items-start gap-5 rounded-md px-3 py-7 sm:grid-cols-[80px_1fr_190px] sm:gap-7 sm:py-9"
    >
      {score !== null ? (
        <Score
          value={score}
          interactive
          className="text-[36px] leading-[0.9] sm:text-[50px]"
        />
      ) : (
        <span className="row-soft font-mono text-sm leading-[1.6] text-muted">
          {productCount} prod.
        </span>
      )}
      <div>
        <div className="mb-2 flex flex-wrap items-center gap-3">
          <span className="row-soft font-mono text-[10.5px] uppercase tracking-wider text-muted">
            {getTypeLabel(type, locale)}
          </span>
          {topRatedLabel && (
            <span className="bg-signal px-1.5 py-1 font-mono text-[10px] uppercase tracking-wider text-on-signal">
              {topRatedLabel}
            </span>
          )}
        </div>
        <div className="row-title mb-2 text-2xl font-medium tracking-[-0.035em] sm:text-[30px]">
          {title}
        </div>
        <p className="row-soft max-w-[58ch] text-[15.5px] leading-relaxed text-body">
          {description}
        </p>
      </div>
      <div className="row-soft col-span-2 mt-1 flex gap-3 text-[13px] text-body sm:col-span-1 sm:mt-0 sm:block sm:text-right sm:text-sm sm:leading-relaxed">
        {price && <span>{price}</span>}
        {authorName && (
          <span className="text-muted sm:mt-1.5 sm:block sm:text-[13px]">
            {authorName} · {date}
          </span>
        )}
      </div>
    </Link>
  );
}
