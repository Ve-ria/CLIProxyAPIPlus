export type Locale = "en" | "zh-CN" | "zh-TW";

export const locales: Locale[] = ["en", "zh-CN", "zh-TW"];

export const localeNames: Record<Locale, string> = {
  en: "English",
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
};

export const defaultLocale: Locale = "en";

const STORAGE_KEY = "cli-proxy-locale";

export function getStoredLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && locales.includes(stored as Locale)) return stored as Locale;
  } catch {}
  return defaultLocale;
}

export function setStoredLocale(locale: Locale): void {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {}
}

type TranslationDict = Record<string, string | (() => string)>;

const dictionaries: Record<Locale, TranslationDict> = {
  en: {},
  "zh-CN": {},
  "zh-TW": {},
};

export function registerTranslations(locale: Locale, dict: TranslationDict): void {
  Object.assign(dictionaries[locale], dict);
}

export function t(key: string, locale?: Locale): string {
  const loc = locale ?? (typeof window !== "undefined" ? getStoredLocale() : defaultLocale);
  const dict = dictionaries[loc] ?? dictionaries[defaultLocale];
  const val = dict[key];
  if (typeof val === "function") return val();
  if (typeof val === "string") return val;
  if (loc !== defaultLocale) {
    const defaultVal = dictionaries[defaultLocale][key];
    if (typeof defaultVal === "function") return defaultVal();
    if (typeof defaultVal === "string") return defaultVal;
  }
  return key;
}
