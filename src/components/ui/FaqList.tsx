import type { Faq } from "@/lib/content";

export function FaqList({ faqs }: { faqs: Faq[] }) {
  if (faqs.length === 0) return null;

  return (
    <div className="grid gap-3">
      {faqs.map((faq) => (
        <details
          key={faq.question}
          className="rounded-md bg-hairline/25 px-5"
        >
          <summary className="flex cursor-pointer items-center gap-4 py-4 text-lg font-medium tracking-[-0.02em] transition-colors duration-200 hover:text-signal">
            <span className="flex-1">{faq.question}</span>
            <span className="faq-bar font-mono text-lg text-muted transition-transform duration-200">
              +
            </span>
          </summary>
          <p className="mb-5 max-w-[60ch] text-[16.5px] leading-relaxed text-body">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
