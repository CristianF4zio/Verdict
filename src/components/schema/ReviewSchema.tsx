import type { ContentDoc } from "@/lib/content";
import { toAbsoluteUrl, SITE_NAME } from "@/lib/site";

export function ReviewSchema({ doc }: { doc: ContentDoc }) {
  const product = doc.products[0];
  if (!product) return null;

  const json = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Product",
      name: product.name,
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: "USD",
        url: toAbsoluteUrl(product.affiliateLink),
      },
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: product.rating,
      bestRating: 10,
    },
    author: doc.author
      ? { "@type": "Person", name: doc.author.name }
      : { "@type": "Organization", name: SITE_NAME },
    datePublished: doc.publishedAt,
    dateModified: doc.updatedAt,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
