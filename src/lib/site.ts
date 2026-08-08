export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const SITE_NAME = "Verdict";

// Operated by a natural person, not yet a registered legal entity.
export const OPERATOR_NAME = "Cristian Fazio";
export const OPERATOR_JURISDICTION_ES = "Venezuela";
export const OPERATOR_JURISDICTION_EN = "Venezuela";
export const CONTACT_EMAIL = "cristianfazio36@gmail.com";

export function toAbsoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

export function getCurrentYear(): number {
  return new Date().getFullYear();
}
