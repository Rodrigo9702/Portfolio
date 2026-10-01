"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { translations, Language, Translations } from "@/data/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "rodrigo_portfolio_lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("es");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (saved && (saved === "es" || saved === "en")) {
        setLanguageState(saved);
        document.documentElement.lang = saved;
      } else {
        const browserPref = navigator.language?.toLowerCase().startsWith("en") ? "en" : "es";
        setLanguageState(browserPref);
        document.documentElement.lang = browserPref;
      }
    } catch {
      // Fallback in case of storage error
    }
    setMounted(true);
  }, []);

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
      document.documentElement.lang = newLang;
    } catch {
      // Ignore storage errors
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  const t = useMemo(() => translations[language], [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Graceful fallback to Spanish if used outside provider
    return {
      language: "es" as Language,
      setLanguage: () => {},
      toggleLanguage: () => {},
      t: translations.es,
    };
  }
  return context;
}
