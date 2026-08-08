import type { ContentDoc } from "@/lib/content";

export function ArticleSchema({
  doc,
  url,
}: {
  doc: ContentDoc;
  url: string;
}) {
  const json = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: doc.title,
    description: doc.description,
    inLanguage: doc.locale,
    datePublished: doc.publishedAt,
    dateModified: doc.updatedAt,
    mainEntityOfPage: url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
