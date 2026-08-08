import { toAbsoluteUrl } from "@/lib/site";

type Variant = "primary" | "secondary" | "onDark";

const styles: Record<Variant, string> = {
  primary:
    "border border-panel-line bg-panel text-panel-ink hover:border-signal hover:bg-signal hover:text-on-signal hover:shadow-[0_4px_16px_rgba(0,0,0,0.18)]",
  secondary: "border border-ink text-ink hover:bg-ink hover:text-paper",
  onDark: "bg-signal text-on-signal hover:bg-panel-ink hover:text-panel",
};

export function CtaButton({
  href,
  fromPath,
  locale,
  label,
  variant = "primary",
  disclosure,
  fullWidth = true,
}: {
  href: string;
  fromPath: string;
  locale: string;
  label: string;
  variant?: Variant;
  disclosure?: string;
  fullWidth?: boolean;
}) {
  const trackedHref = `${href}?from=${encodeURIComponent(toAbsoluteUrl(fromPath))}&locale=${locale}`;

  return (
    <div className={fullWidth ? "" : "inline-block"}>
      <a
        href={trackedHref}
        rel="sponsored nofollow noopener"
        target="_blank"
        className={`block rounded-md px-5 py-3.5 text-center text-sm font-medium transition-all duration-150 hover:-translate-y-0.5 ${styles[variant]} ${fullWidth ? "w-full" : ""}`}
      >
        {label}
      </a>
      {disclosure && (
        <div className="mt-2.5 text-center font-mono text-[10px] uppercase tracking-wider text-muted">
          {disclosure}
        </div>
      )}
    </div>
  );
}
