import type { Author } from "@/lib/content";

const placeholderAvatar =
  "repeating-linear-gradient(135deg, #e4e1d8 0 5px, #d8d4c8 5px 10px)";

export function AuthorBio({
  author,
  variant = "inline",
}: {
  author: Author;
  variant?: "inline" | "full";
}) {
  if (variant === "full") {
    return (
      <div className="grid grid-cols-[64px_1fr] items-start gap-6 py-2 sm:grid-cols-[80px_1fr] sm:gap-7">
        <div
          className="h-16 w-16 rounded-full sm:h-20 sm:w-20"
          style={{ backgroundImage: placeholderAvatar }}
        />
        <div>
          <div className="mb-1.5 text-2xl font-medium tracking-[-0.03em]">
            {author.name}
          </div>
          <p className="mb-3 max-w-[58ch] text-[16.5px] leading-relaxed text-body">
            {author.credentials}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 text-[13.5px] text-body">
      <div
        className="h-8 w-8 shrink-0 rounded-full"
        style={{ backgroundImage: placeholderAvatar }}
      />
      <span>
        <strong className="font-medium text-ink">{author.name}</strong>{" "}
        · {author.credentials}
      </span>
    </div>
  );
}
