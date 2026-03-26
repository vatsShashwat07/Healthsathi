"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import hi from "@/locales/hi.json";
import en from "@/locales/en.json";

type Language = "hi" | "en";

const translations = { hi, en } as const;

type TranslationObj = typeof hi;

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    isHindi: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getNestedValue(obj: Record<string, unknown>, path: string): string {
    const keys = path.split(".");
    let current: unknown = obj;
    for (const key of keys) {
        if (current && typeof current === "object" && key in (current as Record<string, unknown>)) {
            current = (current as Record<string, unknown>)[key];
        } else {
            return path; // fallback to key if not found
        }
    }
    return typeof current === "string" ? current : path;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>("hi");

    useEffect(() => {
        const saved = localStorage.getItem("healthsathi-lang") as Language | null;
        if (saved && (saved === "hi" || saved === "en")) {
            setLanguageState(saved);
        }
    }, []);

    const setLanguage = useCallback((lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem("healthsathi-lang", lang);
        document.documentElement.lang = lang;
    }, []);

    const t = useCallback(
        (key: string): string => {
            return getNestedValue(
                translations[language] as unknown as Record<string, unknown>,
                key
            );
        },
        [language]
    );

    return (
        <LanguageContext.Provider
            value={{ language, setLanguage, t, isHindi: language === "hi" }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
