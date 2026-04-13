export const locales = ["mn", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "mn";

export const localeNames: Record<Locale, string> = {
  mn: "Монгол",
  en: "English",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function pickLocalized(
  locale: Locale,
  value: Record<Locale, string>,
): string {
  return value[locale];
}
