"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { TRANSLATIONS } from "@/data/translations";
import { useLocale } from "next-intl";

export type SupportedLanguage = "en" | "hi" | "es" | "fr" | "de" | "ru" | "ja" | "ar" | "zh" | "mr" | string;

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const nextLocale = useLocale() as SupportedLanguage;
  
  // URL routing handles language via next-intl
  const language = nextLocale;
  const setLanguage = (_lang: SupportedLanguage) => {
    // handled by next-intl router in Navbar.tsx
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = TRANSLATIONS[language];
    
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        // Fallback to English if translation is missing
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let fallbackValue: any = TRANSLATIONS["en"];
        for (const fallbackK of keys) {
          if (fallbackValue && typeof fallbackValue === "object" && fallbackK in fallbackValue) {
            fallbackValue = fallbackValue[fallbackK];
          } else {
            return key; // Return the key path if not found in English either
          }
        }
        return fallbackValue as string;
      }
    }
    return value as string;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className="ltr">
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
