import { defineConfig, defineCollection, s } from "velite";

const product = s.object({
  name: s.string(),
  affiliateLink: s.string(), // internal /go/[slug] path, never the raw affiliate URL
  rating: s.number().min(0).max(10),
  price: s.string(),
  blurb: s.string().optional(), // one-line "why this pick" — used in roundups
});

const faq = s.object({
  question: s.string(),
  answer: s.string(),
});

const author = s.object({
  name: s.string(),
  credentials: s.string(), // short line, e.g. "8 años evaluando software para creadores"
});

const comparisonRow = s.object({
  label: s.string(),
  values: s.array(s.string()), // one entry per product, same order as `products`
  winnerIndex: s.number().optional(), // index into `products`/`values` to highlight, if any
});

const criterion = s.object({
  label: s.string(),
  value: s.number().min(0).max(10),
});

const content = defineCollection({
  name: "Content",
  pattern: "**/*.mdx",
  schema: s
    .object({
      title: s.string(),
      description: s.string(),
      locale: s.enum(["en", "es"]),
      category: s.enum([
        "email-marketing",
        "course-platforms",
        "automation-tools",
        "business-security",
      ]),
      type: s.enum(["review", "comparison", "roundup"]),
      publishedAt: s.isodate(),
      updatedAt: s.isodate(),
      author: author.optional(),
      verdict: s.string().optional(), // review only: one-line pull quote
      criteria: s.array(criterion).default([]), // review only: per-criterion subscores
      pros: s.array(s.string()).default([]),
      cons: s.array(s.string()).default([]),
      comparisonRows: s.array(comparisonRow).default([]),
      products: s.array(product).default([]),
      faqs: s.array(faq).default([]),
      body: s.mdx(),
      path: s.path(),
    })
    .transform((data) => ({
      ...data,
      slug: data.path.split("/").pop()!,
    })),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { content },
  mdx: {
    rehypePlugins: [],
    remarkPlugins: [],
  },
});
