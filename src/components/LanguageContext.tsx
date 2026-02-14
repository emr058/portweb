"use client";

import React, { createContext, useContext, useState, useCallback, useSyncExternalStore } from "react";

type Language = "tr" | "en";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Use useSyncExternalStore for hydration-safe localStorage reading
function getStoredLanguage(): Language {
    if (typeof window === "undefined") return "tr";
    const saved = localStorage.getItem("language");
    if (saved === "tr" || saved === "en") return saved;
    return "tr";
}

function subscribeToStorage(callback: () => void): () => void {
    window.addEventListener("storage", callback);
    return () => window.removeEventListener("storage", callback);
}

function getServerSnapshot(): Language {
    return "tr";
}

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const language = useSyncExternalStore(subscribeToStorage, getStoredLanguage, getServerSnapshot);
    const [, forceUpdate] = useState(0);

    const handleSetLanguage = useCallback((lang: Language) => {
        localStorage.setItem("language", lang);
        document.documentElement.lang = lang;
        // Trigger re-render since useSyncExternalStore won't detect programmatic localStorage changes
        window.dispatchEvent(new StorageEvent("storage", { key: "language", newValue: lang }));
        forceUpdate(c => c + 1);
    }, []);

    const toggleLanguage = useCallback(() => {
        const current = getStoredLanguage();
        handleSetLanguage(current === "tr" ? "en" : "tr");
    }, [handleSetLanguage]);

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
