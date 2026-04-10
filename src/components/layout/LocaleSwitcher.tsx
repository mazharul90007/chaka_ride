"use client";

import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

function localeShortLabel(locale: string) {
  if (locale === "en") return "EN";
  if (locale === "bn") return "বাংলা";
  return locale.toUpperCase();
}

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className="inline-flex rounded-lg border border-slate-200 bg-slate-100/90 p-0.5 shadow-sm"
      role="group"
      aria-label={t("label")}
    >
      {routing.locales.map((loc) => {
        const active = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => {
              if (!active) {
                router.replace(pathname, { locale: loc });
              }
            }}
            className={`min-w-11 cursor-pointer rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors ${
              active
                ? "bg-white text-(--brand-primary) shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
            aria-pressed={active}
          >
            {localeShortLabel(loc)}
          </button>
        );
      })}
    </div>
  );
}
