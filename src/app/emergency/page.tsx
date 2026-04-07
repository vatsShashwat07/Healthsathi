"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import BottomNav from "@/components/shared/BottomNav";
import { ArrowLeft, Phone, MapPin, AlertTriangle, Heart } from "lucide-react";
import Link from "next/link";

export default function EmergencyPage() {
    const { t, isHindi } = useLanguage();

    return (
        <div className="w-full min-h-screen pb-nav" style={{ background: "linear-gradient(180deg, #fef2f2 0%, #f5f7f2 100%)" }}>
            {/* Header */}
            <header className="relative overflow-hidden px-5 pt-12 pb-8 text-white">
                <div className="absolute inset-0"
                    style={{ background: "linear-gradient(135deg, #991b1b, #dc2626, #ef4444)" }} />
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-15 animate-pulse-gentle"
                    style={{ background: "radial-gradient(circle, white, transparent)" }} />

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <Link href="/" className="w-10 h-10 rounded-2xl flex items-center justify-center"
                            style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(10px)" }}>
                            <ArrowLeft size={18} />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-extrabold">{t("emergency.title")}</h1>
                            <p className="text-white/60 text-xs mt-0.5">{t("emergency.warning")}</p>
                        </div>
                    </div>
                </div>
            </header>

            <div className="px-4 -mt-4 relative z-10 space-y-4">
                {/* 108 Ambulance */}
                <a href="tel:108" className="card flex items-center gap-4 py-5"
                    style={{ border: "2px solid #fca5a5", background: "linear-gradient(135deg, #fff, #fef2f2)" }}>
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                        style={{ background: "linear-gradient(135deg, #dc2626, #ef4444)", boxShadow: "0 6px 20px rgba(220,38,38,0.35)" }}>
                        <Phone size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                        <p className="text-xl font-extrabold text-red-700">{t("emergency.call108")}</p>
                        <p className="text-xs text-text-muted mt-1">
                            {isHindi ? "मुफ़्त एम्बुलेंस — 24/7 उपलब्ध" : "Free Ambulance — Available 24/7"}
                        </p>
                    </div>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center animate-pulse-gentle"
                        style={{ background: "linear-gradient(135deg, #fca5a5, #f87171)" }}>
                        <Phone size={18} className="text-white" />
                    </div>
                </a>

                {/* 112 */}
                <a href="tel:112" className="card flex items-center gap-4 py-5"
                    style={{ border: "2px solid #fdba74", background: "linear-gradient(135deg, #fff, #fff7ed)" }}>
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                        style={{ background: "linear-gradient(135deg, #ea580c, #f97316)", boxShadow: "0 6px 20px rgba(234,88,12,0.35)" }}>
                        <AlertTriangle size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                        <p className="text-xl font-extrabold text-orange-700">{t("emergency.call112")}</p>
                        <p className="text-xs text-text-muted mt-1">
                            {isHindi ? "पुलिस, फ़ायर, मेडिकल — सब" : "Police, Fire, Medical — All"}
                        </p>
                    </div>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center animate-pulse-gentle"
                        style={{ background: "linear-gradient(135deg, #fdba74, #fb923c)" }}>
                        <Phone size={18} className="text-white" />
                    </div>
                </a>

                {/* Nearest Hospital */}
                <a href="https://www.google.com/maps/search/hospital+near+me" target="_blank" rel="noopener noreferrer"
                    className="card flex items-center gap-4 py-5"
                    style={{ border: "1px solid #a7f3d0", background: "linear-gradient(135deg, #fff, #f0fdf4)" }}>
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                        style={{ background: "linear-gradient(135deg, #10b981, #059669)", boxShadow: "0 6px 20px rgba(16,185,129,0.3)" }}>
                        <MapPin size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                        <p className="text-lg font-extrabold text-emerald-700">{t("emergency.nearestHospital")}</p>
                        <p className="text-xs text-text-muted mt-1">
                            {isHindi ? "Google Maps पर खोजें" : "Find on Google Maps"}
                        </p>
                    </div>
                    <MapPin size={20} className="text-emerald-400" />
                </a>

                {/* First Aid */}
                <section className="card">
                    <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                            style={{ background: "linear-gradient(135deg, #fee2e2, #fecaca)" }}>
                            <Heart size={14} className="text-red-700" />
                        </div>
                        {isHindi ? "प्राथमिक उपचार" : "First Aid Basics"}
                    </h3>
                    <div className="space-y-3 stagger-children">
                        {[
                            {
                                emoji: "🫀", titleHi: "दिल का दौरा", titleEn: "Heart Attack",
                                descHi: "मरीज़ को बैठाएँ, 108 कॉल करें, Aspirin 325mg दें (अगर एलर्जी नहीं)",
                                descEn: "Seat patient, call 108, give Aspirin 325mg (if no allergy)",
                                bg: "linear-gradient(135deg, #fef2f2, #fee2e2)",
                            },
                            {
                                emoji: "🤕", titleHi: "बहुत तेज़ बुखार", titleEn: "Very High Fever",
                                descHi: "गीला कपड़ा माथे पर, Paracetamol दें, 104°F+ पर तुरंत अस्पताल",
                                descEn: "Cold compress, give Paracetamol, hospital if 104°F+",
                                bg: "linear-gradient(135deg, #fff7ed, #ffedd5)",
                            },
                            {
                                emoji: "🐍", titleHi: "साँप का काटना", titleEn: "Snake Bite",
                                descHi: "काटी जगह हिलाने न दें, बांधें नहीं, तुरंत अस्पताल",
                                descEn: "Keep still, do NOT tourniquet, rush to hospital",
                                bg: "linear-gradient(135deg, #fefce8, #fef9c3)",
                            },
                        ].map((item, i) => (
                            <div key={i} className="p-3.5 rounded-2xl animate-slide-up" style={{ background: item.bg }}>
                                <p className="font-bold text-sm">
                                    {item.emoji} {isHindi ? item.titleHi : item.titleEn}
                                </p>
                                <p className="text-xs mt-1.5 opacity-70 leading-relaxed">
                                    {isHindi ? item.descHi : item.descEn}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <BottomNav />
        </div>
    );
}
