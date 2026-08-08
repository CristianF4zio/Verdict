export const CATEGORIES = [
  "email-marketing",
  "course-platforms",
  "automation-tools",
  "business-security",
] as const;

export type Category = (typeof CATEGORIES)[number];
