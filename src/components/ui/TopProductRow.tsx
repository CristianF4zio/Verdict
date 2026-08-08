import { Link } from "@/i18n/navigation";
import { Score } from "@/components/ui/Score";

export function TopProductRow({
  href,
  score,
  name,
  categoryLabel,
  price,
  angle,
  showDivider,
}: {
  href: string;
  score: number;
  name: string;
  categoryLabel: string;
  price: string;
  angle?: string;
  showDivider?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`row-invert flex cursor-pointer flex-col gap-1.5 rounded-md px-3 py-6 text-panel-ink sm:grid sm:grid-cols-[56px_1fr_200px_130px_150px] sm:items-center sm:gap-6 sm:py-8 ${
        showDivider ? "border-b border-panel-line" : ""
      }`}
    >
      <div className="flex items-baseline gap-4 sm:contents">
        <Score
          value={score}
          invert
          interactive
          className="text-[30px] leading-[1] sm:text-[40px]"
        />
        <div className="row-title text-xl font-medium tracking-[-0.03em] sm:text-[26px]">
          {name}
        </div>
      </div>
      <div className="row-soft flex flex-wrap gap-x-3 text-[13px] text-panel-body sm:contents">
        <span className="sm:font-mono sm:text-[11px] sm:uppercase sm:tracking-wider">
          {categoryLabel}
        </span>
        <span className="sm:text-sm">{price}</span>
        {angle && <span className="hidden sm:block sm:text-[13.5px]">{angle}</span>}
      </div>
    </Link>
  );
}
