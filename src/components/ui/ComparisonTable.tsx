import type { ComparisonRow, Product } from "@/lib/content";
import { Score } from "@/components/ui/Score";

export function ComparisonTable({
  products,
  rows,
}: {
  products: Product[];
  rows: ComparisonRow[];
}) {
  return (
    <div>
      {/* Desktop: zebra-striped table, lime rule marks the winning column */}
      <table className="hidden w-full border-collapse overflow-hidden rounded-md text-[14.5px] md:table">
        <thead>
          <tr>
            <th className="w-[28%] bg-hairline/40 py-3" />
            {products.map((product, i) => (
              <th
                key={product.name}
                className={`px-4 py-3 text-left font-mono text-[11px] font-medium uppercase tracking-wider ${
                  i === 0 ? "bg-signal/15 text-ink" : "bg-hairline/40 text-muted"
                }`}
              >
                {product.name} {product.rating.toFixed(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={row.label} className={ri % 2 === 1 ? "bg-hairline/20" : ""}>
              <td className="px-4 py-3.5 text-muted">{row.label}</td>
              {row.values.map((value, i) => (
                <td
                  key={i}
                  className={`px-4 py-3.5 tabular-nums ${
                    row.winnerIndex === i ? "font-medium" : ""
                  }`}
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile: transpose to stacked per-product blocks, no horizontal scroll */}
      <div className="grid gap-5 md:hidden">
        {products.map((product, i) => (
          <div
            key={product.name}
            className={`rounded-md p-5 ${i === 0 ? "bg-signal/15" : "bg-hairline/20"}`}
          >
            <div className="mb-2 flex items-baseline justify-between">
              <strong className="text-base font-medium">
                {product.name}
              </strong>
              <Score value={product.rating} className="text-[20px]" />
            </div>
            <div className="grid gap-1.5">
              {rows.map((row) => (
                <div
                  key={row.label}
                  className="flex justify-between text-[13.5px]"
                >
                  <span className="text-muted">{row.label}</span>
                  <span>{row.values[i]}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
