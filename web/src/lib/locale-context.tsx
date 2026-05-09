"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { type Locale, getStoredLocale, setStoredLocale, defaultLocale } from "@/lib/i18n";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: defaultLocale,
  setLocale: () => {},
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getStoredLocale);

  const setLocale = useCallback((loc: Locale) => {
    setStoredLocale(loc);
    setLocaleState(loc);
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextType {
  return useContext(LocaleContext);
}
