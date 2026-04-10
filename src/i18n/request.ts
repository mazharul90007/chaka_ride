import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import type { AbstractIntlMessages } from "use-intl/core";
import { routing } from "./routing";

function isMessageTree(value: unknown): value is AbstractIntlMessages {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Locale file wins per key; missing namespaces/keys fall back to default locale. */
function mergeLocaleMessages(
  base: AbstractIntlMessages,
  override: AbstractIntlMessages,
): AbstractIntlMessages {
  const result: AbstractIntlMessages = { ...base };
  for (const key of Object.keys(override)) {
    const next = override[key];
    const prev = result[key];
    if (isMessageTree(next) && isMessageTree(prev)) {
      result[key] = mergeLocaleMessages(prev, next);
    } else {
      result[key] = next;
    }
  }
  return result;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const localeMessages = (await import(`../../messages/${locale}.json`))
    .default as AbstractIntlMessages;

  if (locale === routing.defaultLocale) {
    return {
      locale,
      messages: localeMessages,
    };
  }

  const defaultMessages = (await import(`../../messages/${routing.defaultLocale}.json`))
    .default as AbstractIntlMessages;

  return {
    locale,
    messages: mergeLocaleMessages(defaultMessages, localeMessages),
  };
});
