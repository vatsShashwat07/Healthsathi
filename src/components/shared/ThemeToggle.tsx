"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
    const { isDark, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 active:scale-90 hover:scale-105 min-w-[40px]"
            style={{
                background: isDark
                    ? "linear-gradient(135deg, #1e293b, #334155)"
                    : "linear-gradient(135deg, #f8fafc, #e2e8f0)",
                border: isDark ? "1px solid #475569" : "1px solid #e2e8f0",
            }}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            {isDark ? (
                <Sun size={16} className="text-amber-400" />
            ) : (
                <Moon size={16} className="text-slate-500" />
            )}
        </button>
    );
}
