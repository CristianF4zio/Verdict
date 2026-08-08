import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const isDev = process.argv.includes("dev");
const isBuild = process.argv.includes("build");

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

async function resolveConfig(): Promise<NextConfig> {
  if ((isDev || isBuild) && !process.env.VELITE_STARTED) {
    process.env.VELITE_STARTED = "true";
    const { build } = await import("velite");
    await build({ watch: isDev, clean: !isDev });
  }
  return withNextIntl(nextConfig);
}

export default resolveConfig;
