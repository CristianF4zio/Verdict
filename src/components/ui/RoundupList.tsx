import type { Product } from "@/lib/content";
import { Score } from "@/components/ui/Score";
import { CtaButton } from "@/components/ui/CtaButton";

export function RoundupList({
  products,
  ctaLabels,
  editorsPickLabel,
  fromPath,
  locale,
}: {
  products: Product[];
  ctaLabels: string[];
  editorsPickLabel: string;
  fromPath: string;
  locale: string;
}) {
  return (
    <div>
      {products.map((product, i) => {
        return (
          <div
            key={product.name}
            className="animate-fade-up flex flex-col gap-5 py-10 sm:grid sm:grid-cols-[120px_1fr_260px] sm:gap-10"
            style={{ animationDelay: `${Math.min(i, 6) * 60}ms` }}
          >
            <div className="text-[64px] font-medium leading-[0.85] tracking-[-0.06em] text-signal">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div>
              <div className="mb-3.5 flex flex-wrap items-baseline gap-4">
                <h3 className="text-[32px] font-medium tracking-[-0.045em] sm:text-[40px]">
                  {product.name}
                </h3>
                {i === 0 && (
                  <span className="bg-signal px-1.5 py-1 font-mono text-[10px] uppercase tracking-wider text-on-signal">
                    {editorsPickLabel}
                  </span>
                )}
              </div>
              {product.blurb && (
                <p className="max-w-[58ch] text-[17.5px] leading-relaxed">
                  {product.blurb}
                </p>
              )}
            </div>
            <div className="sm:text-right">
              <Score value={product.rating} className="text-[48px] sm:text-[64px]" />
              <div className="my-3 text-sm text-muted">{product.price}</div>
              <CtaButton
                href={product.affiliateLink}
                fromPath={fromPath}
                locale={locale}
                label={ctaLabels[i]}
                variant={i === 0 ? "primary" : "secondary"}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
