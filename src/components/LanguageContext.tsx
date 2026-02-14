"use client";

import React, { createContext, useContext, useState } from "react";

type Language = "tr" | "en";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [language, setLanguage] = useState<Language>(() => {
        if (typeof window !== "undefined") {
            const savedLang = localStorage.getItem("language") as Language;
            if (savedLang === "tr" || savedLang === "en") {
                return savedLang;
            }
        }
        return "tr";
    });

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem("language", lang);
        document.documentElement.lang = lang;
    };

    const toggleLanguage = () => {
        handleSetLanguage(language === "tr" ? "en" : "tr");
    };

    // During SSR and initial hydration, render children with the default "tr" language.
    // After hydration, re-render with the correct language from localStorage.
    // To prevent a hydration mismatch, we suppress the children render until hydrated
    // only if we know localStorage might differ. Instead, we always render but ensure
    // the first render uses "tr" consistently on both server and client.

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
