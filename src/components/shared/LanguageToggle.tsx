"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";

export default function LanguageToggle() {
    const { setLanguage, isHindi } = useLanguage();

    return (
        <button
            onClick={() => setLanguage(isHindi ? "en" : "hi")}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm
                 font-semibold transition-all duration-300 active:scale-95 relative overflow-hidden"
            style={{
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "inherit",
            }}
            aria-label={isHindi ? "Switch to English" : "हिंदी में बदलें"}
        >
            <Globe size={14} />
            <span>{isHindi ? "EN" : "हि"}</span>
        </button>
    );
}
