import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    "/((?!api|go|icon|apple-icon|opengraph-image|twitter-image|_next|_vercel|.*\\..*).*)",
  ],
};
