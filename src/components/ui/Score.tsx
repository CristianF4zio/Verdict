export function Score({
  value,
  className = "text-[36px]",
  invert = false,
  interactive = false,
}: {
  value: number;
  className?: string;
  invert?: boolean;
  interactive?: boolean;
}) {
  const color = invert ? "text-signal" : value < 8 ? "text-alert" : "text-ink";

  return (
    <span
      className={`${interactive ? "row-score " : ""}font-medium leading-[0.9] tracking-[-0.05em] tabular-nums ${color} ${className}`}
    >
      {value.toFixed(1)}
    </span>
  );
}
