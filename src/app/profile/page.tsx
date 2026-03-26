"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import BottomNav from "@/components/shared/BottomNav";
import LanguageToggle from "@/components/shared/LanguageToggle";
import {
    Users,
    CreditCard,
    Bell,
    Globe,
    Shield,
    Trash2,
    LogOut,
    ChevronRight,
    Plus,
    Heart,
    Sparkles,
} from "lucide-react";
import Link from "next/link";

const familyMembers = [
    { name: "रमेश", nameEn: "Ramesh", relation: "मैं", relationEn: "Self", age: 38, emoji: "👤", gradient: "linear-gradient(135deg, #d3f3e4, #aae8cd)" },
    { name: "सुनीता", nameEn: "Sunita", relation: "पत्नी", relationEn: "Wife", age: 35, emoji: "👩", gradient: "linear-gradient(135deg, #ccfbf1, #cffafe)" },
    { name: "श्री नारायण", nameEn: "Shri Narayan", relation: "पिताजी", relationEn: "Father", age: 65, emoji: "👴", gradient: "linear-gradient(135deg, #fef3c7, #fde68a)" },
    { name: "कमला देवी", nameEn: "Kamla Devi", relation: "माताजी", relationEn: "Mother", age: 60, emoji: "👵", gradient: "linear-gradient(135deg, #fce7f3, #fbcfe8)" },
];

const menuItems = [
    { key: "subscription", icon: CreditCard, href: "/subscription", gradient: "linear-gradient(135deg, #ede9fe, #e0e7ff)", color: "text-indigo-700" },
    { key: "notifications", icon: Bell, href: "#", gradient: "linear-gradient(135deg, #fef3c7, #fde68a)", color: "text-amber-700" },
    { key: "language", icon: Globe, href: "#", gradient: "linear-gradient(135deg, #ccfbf1, #cffafe)", color: "text-teal-700" },
    { key: "privacy", icon: Shield, href: "#", gradient: "linear-gradient(135deg, #f1f5f9, #e2e8f0)", color: "text-slate-700" },
];

export default function ProfilePage() {
    const { t, isHindi } = useLanguage();
    const { user, signOut, isLoading } = useAuth();
    const router = useRouter();
    const supabase = createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [profile, setProfile] = React.useState<any>(null);

    React.useEffect(() => {
        if (!isLoading && !user) {
            router.push("/login");
        } else if (user) {
            supabase.from('profiles').select('*').eq('id', user.id).single()
                .then(({ data }) => {
                    if (data) setProfile(data);
                });
        }
    }, [user, isLoading, router]);

    const userName = profile?.name || (user?.email ? user.email.split('@')[0] : (isHindi ? "रमेश कुमार" : "Ramesh Kumar"));
    const userContact = profile?.phone || user?.email || "+91 98765 43210";
    const isPremium = profile?.is_premium || false;

    return (
        <div className="w-full min-h-screen pb-nav">
            {/* Header */}
            <header className="relative overflow-hidden px-5 pt-14 pb-10 text-white">
                <div className="absolute inset-0 animate-gradient"
                    style={{
                        background: "linear-gradient(135deg, #993F00 0%, #CC6600 25%, #FF9933 50%, #E67A00 75%, #FFB366 100%)",
                        backgroundSize: "300% 300%",
                    }} />
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10 animate-float"
                    style={{ background: "radial-gradient(circle, white, transparent)" }} />

                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-5">
                        <h1 className="text-xl font-extrabold">{t("profile.title")}</h1>
                        <LanguageToggle />
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-18 h-18 rounded-2xl flex items-center justify-center text-3xl"
                            style={{
                                width: "72px", height: "72px",
                                background: "rgba(255,255,255,0.15)",
                                backdropFilter: "blur(10px)",
                                border: "2px solid rgba(255,255,255,0.2)",
                            }}>
                            👤
                        </div>
                        <div>
                            <h2 suppressHydrationWarning className="text-2xl font-extrabold capitalize">{userName}</h2>
                            <p suppressHydrationWarning className="text-white/50 text-sm mt-0.5">{userContact}</p>
                            <span suppressHydrationWarning className="inline-flex items-center gap-1 mt-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                                style={{ background: isPremium ? "rgba(255,200,0,0.25)" : "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)" }}>
                                <Heart size={10} className={isPremium ? "text-yellow-300" : "text-white"} />
                                {isPremium ? (isHindi ? "प्लस मेंबर" : "Plus Member") : (isHindi ? "मुफ़्त प्रोफ़ाइल" : "Free Profile")}
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="px-4 -mt-5 relative z-10 space-y-4">
                {/* Upgrade card */}
                <Link href="/subscription"
                    className="card flex items-center gap-3.5"
                    style={{ background: "linear-gradient(135deg, #ede9fe, #e0e7ff)", border: "1px solid #a5b4fc" }}>
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                        style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 4px 16px rgba(99,102,241,0.35)" }}>
                        <Sparkles size={18} className="text-white" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-bold text-indigo-900">
                            {isHindi ? "साथी प्लस में अपग्रेड करें" : "Upgrade to Saathi Plus"}
                        </p>
                        <p className="text-xs text-indigo-600 mt-0.5">
                            {isHindi ? "₹99/महीना — अनलिमिटेड" : "₹99/month — Unlimited"}
                        </p>
                    </div>
                    <ChevronRight size={18} className="text-indigo-400" />
                </Link>

                {/* Family Members */}
                <section className="card">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                                style={{ background: "linear-gradient(135deg, #d3f3e4, #aae8cd)" }}>
                                <Users size={14} className="text-emerald-700" />
                            </div>
                            {t("profile.familyMembers")}
                        </h3>
                        <button className="text-xs text-primary-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                            <Plus size={12} />
                            {t("profile.addMember")}
                        </button>
                    </div>
                    <div className="space-y-2">
                        {familyMembers.map((member, i) => (
                            <div key={i} className="flex items-center gap-3 py-2.5 border-b border-sage-100/50 last:border-0 group cursor-pointer">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm"
                                    style={{ background: member.gradient }}>
                                    {member.emoji}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold">{isHindi ? member.name : member.nameEn}</p>
                                    <p className="text-xs text-text-muted">{isHindi ? member.relation : member.relationEn} • {member.age} {isHindi ? "वर्ष" : "yrs"}</p>
                                </div>
                                <ChevronRight size={14} className="text-text-muted group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Settings Menu */}
                <section className="card divide-y divide-sage-100/50">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link key={item.key} href={item.href} className="flex items-center gap-3 py-3.5 first:pt-0 last:pb-0 group">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: item.gradient }}>
                                    <Icon size={16} className={item.color} />
                                </div>
                                <span className="flex-1 text-sm font-semibold text-text-primary">{t(`profile.${item.key}`)}</span>
                                <ChevronRight size={14} className="text-text-muted group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                            </Link>
                        );
                    })}
                </section>

                {/* Danger zone */}
                <section className="card divide-y divide-sage-100/50">
                    <button className="flex items-center gap-3 py-3.5 w-full text-left">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ background: "linear-gradient(135deg, #fee2e2, #fecaca)" }}>
                            <Trash2 size={16} className="text-red-600" />
                        </div>
                        <span className="flex-1 text-sm font-semibold text-red-600">{t("profile.deleteData")}</span>
                    </button>
                    <button onClick={async () => { await signOut(); window.location.href = "/login"; }} className="flex items-center gap-3 py-3.5 w-full text-left">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ background: "linear-gradient(135deg, #f1f5f9, #e2e8f0)" }}>
                            <LogOut size={16} className="text-text-muted" />
                        </div>
                        <span className="flex-1 text-sm font-semibold text-text-secondary">{t("profile.logout")}</span>
                    </button>
                </section>

                <p className="text-center text-[11px] text-text-muted py-3 font-medium">
                    HealthSathi v1.0.0 — {isHindi ? "आपका भरोसेमंद स्वास्थ्य साथी 🧡" : "Your trusted health companion 🧡"}
                </p>
            </div>
            <BottomNav />
        </div>
    );
}
