import { toAbsoluteUrl } from "@/lib/site";

type Product = {
  name: string;
  affiliateLink: string;
  rating: number;
  price: string;
};

export function ProductSchema({ product }: { product: Product }) {
  const json = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      url: toAbsoluteUrl(product.affiliateLink),
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      bestRating: 10,
      ratingCount: 1,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
