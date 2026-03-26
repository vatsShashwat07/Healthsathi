"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import {
    Home,
    Search,
    FolderHeart,
    Pill,
    User,
} from "lucide-react";

const navItems = [
    { key: "home", href: "/dashboard", icon: Home },
    { key: "symptoms", href: "/symptoms", icon: Search },
    { key: "records", href: "/records", icon: FolderHeart },
    { key: "medicines", href: "/medicines", icon: Pill },
    { key: "profile", href: "/profile", icon: User },
];

export default function BottomNav() {
    const pathname = usePathname();
    const { t } = useLanguage();

    return (
        <nav
            className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/40"
            style={{
                boxShadow: "0 -4px 30px rgba(0,0,0,0.05)",
            }}
            role="navigation"
            aria-label="Main navigation"
        >
            <div className="mx-auto max-w-7xl flex items-center justify-around md:justify-center md:gap-16 px-1 py-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
                {navItems.map((item) => {
                    const isActive =
                        item.href === "/"
                            ? pathname === "/"
                            : pathname.startsWith(item.href);
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.key}
                            href={item.href}
                            className={`flex flex-col items-center justify-center gap-0.5 py-2 px-3 rounded-2xl
                transition-all duration-300 min-w-[56px] relative
                ${isActive
                                    ? "text-white"
                                    : "text-text-muted hover:text-primary-600"
                                }`}
                            aria-current={isActive ? "page" : undefined}
                        >
                            {/* Active background pill */}
                            {isActive && (
                                <div
                                    className="absolute inset-0 rounded-2xl animate-scale-in"
                                    style={{
                                        background: "linear-gradient(135deg, #FF9933, #E67A00)",
                                        boxShadow: "0 2px 12px rgba(255, 153, 51, 0.35)",
                                    }}
                                />
                            )}
                            <Icon
                                size={20}
                                strokeWidth={isActive ? 2.5 : 1.8}
                                className="transition-all duration-300 relative z-10"
                            />
                            <span
                                className={`text-[10px] leading-tight font-semibold relative z-10 ${isActive ? "text-white" : ""
                                    }`}
                            >
                                {t(`nav.${item.key}`)}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
