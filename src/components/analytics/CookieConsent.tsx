"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { MicrosoftClarity } from "@/components/analytics/MicrosoftClarity";

const STORAGE_KEY = "cookie-consent";
type Consent = "granted" | "denied";

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot(): Consent | null {
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === "granted" || value === "denied" ? value : null;
}

function getServerSnapshot(): Consent | null {
  return null;
}

function setConsent(value: Consent) {
  window.localStorage.setItem(STORAGE_KEY, value);
  listeners.forEach((listener) => listener());
}

const hasAnalytics = Boolean(
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ||
    process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID,
);

export function CookieConsent() {
  const t = useTranslations("cookieConsent");
  const consent = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  if (!hasAnalytics) return null;

  return (
    <>
      {consent === "granted" && (
        <>
          <GoogleAnalytics />
          <MicrosoftClarity />
        </>
      )}

      {consent === null && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-ink bg-paper/95 px-4 py-4 backdrop-blur">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-body">
              {t("message")}{" "}
              <Link href="/privacy-policy" className="underline">
                {t("privacyLink")}
              </Link>
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => setConsent("denied")}
                className="rounded-md border border-ink px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                {t("reject")}
              </button>
              <button
                type="button"
                onClick={() => setConsent("granted")}
                className="rounded-md border border-panel-line bg-panel px-4 py-2.5 text-sm font-medium text-panel-ink transition-colors hover:border-signal hover:bg-signal hover:text-on-signal"
              >
                {t("accept")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
