"use client";

import React, { createContext, useContext, useEffect, useSyncExternalStore } from "react";

export type Language = "en" | "tr";
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
const languageEvent = "portfolio-language-change";
function subscribe(callback: () => void) {
  window.addEventListener(languageEvent, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(languageEvent, callback);
    window.removeEventListener("storage", callback);
  };
}
function getLanguage(): Language {
  const saved = localStorage.getItem("portfolio_lang");
  if (saved === "en" || saved === "tr") return saved;
  return navigator.language.toLowerCase().startsWith("tr") ? "tr" : "en";
}
const serverLanguage = (): Language => "en";
function setLanguage(lang: Language) {
  localStorage.setItem("portfolio_lang", lang);
  window.dispatchEvent(new Event(languageEvent));
}
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(subscribe, getLanguage, serverLanguage);
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  return <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage: () => setLanguage(language === "en" ? "tr" : "en") }}>{children}</LanguageContext.Provider>;
}
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}
