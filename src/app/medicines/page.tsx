"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import BottomNav from "@/components/shared/BottomNav";
import LanguageToggle from "@/components/shared/LanguageToggle";
import {
    Plus,
    Camera,
    Edit3,
    Check,
    Clock,
    AlertTriangle,
    Flame,
    ShoppingCart,
    X,
    TrendingUp,
    Pill,
    ToggleLeft,
    ToggleRight,
    BadgeIndianRupee,
    ShieldCheck,
} from "lucide-react";
import { trackMedicineTaken, trackRefillOrder, trackGenericToggle } from "@/lib/analytics";
import { useAuth } from "@/context/AuthContext";
import { createClient } from "@/utils/supabase/client";

// ===== Refill Date Calculation =====
function calculateRefillDate(tabletsRemaining: number, dosesPerDay: number): string {
    const daysLeft = Math.floor(tabletsRemaining / dosesPerDay);
    const refillDate = new Date();
    refillDate.setDate(refillDate.getDate() + daysLeft);
    return refillDate.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function formatRefillInfo(tabletsRemaining: number, dosesPerDay: number, isHindi: boolean): string {
    const daysLeft = Math.floor(tabletsRemaining / dosesPerDay);
    const dateStr = calculateRefillDate(tabletsRemaining, dosesPerDay);
    return isHindi
        ? `${tabletsRemaining} गोलियाँ बची • ${daysLeft} दिन और • रीफ़िल: ${dateStr}`
        : `${tabletsRemaining} tablets left • ${daysLeft} days remaining • Refill by: ${dateStr}`;
}

const timeSlots = [
    { key: "morning", emoji: "🌅" },
    { key: "afternoon", emoji: "☀️" },
    { key: "evening", emoji: "🌆" },
    { key: "night", emoji: "🌙" },
];

export default function MedicinesPage() {
    const { t, isHindi } = useLanguage();
    const { user } = useAuth();
    const supabase = createClient();

    const [takenIds, setTakenIds] = useState<Set<string>>(new Set());
    const [showRefill, setShowRefill] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showGeneric, setShowGeneric] = useState(true);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [schedule, setSchedule] = useState<any>({ morning: [], afternoon: [], evening: [], night: [] });
    const [isLoading, setIsLoading] = useState(true);

    React.useEffect(() => {
        if (!user) return;
        const fetchMeds = async () => {
            const { data } = await supabase.from('medicines').select('*').eq('user_id', user.id);
            if (data) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const newSchedule: any = { morning: [], afternoon: [], evening: [], night: [] };
                data.forEach(m => {
                    const time = m.time_en.toLowerCase();
                    const formatted = {
                        id: m.id,
                        name: m.name_en,
                        name_hi: m.name_hi,
                        dose: "1 गोली",
                        doseEn: "1 tablet",
                        meal: m.time_hi,
                        mealEn: m.time_en,
                        status: m.status,
                        remaining: m.stock_remaining || 30,
                        dosesPerDay: 1,
                        generic: null,
                        genericEn: null,
                        emoji: m.emoji || "💊"
                    };
                    if (time.includes('afternoon')) newSchedule.afternoon.push(formatted);
                    else if (time.includes('evening')) newSchedule.evening.push(formatted);
                    else if (time.includes('night')) newSchedule.night.push(formatted);
                    else newSchedule.morning.push(formatted);
                });
                setSchedule(newSchedule);
            }
            setIsLoading(false);
        };
        fetchMeds();
    }, [user, supabase]);

    const toggleTaken = (id: string) => {
        const next = new Set(takenIds);
        if (next.has(id)) {
            next.delete(id);
        } else {
            next.add(id);
            trackMedicineTaken(id);
        }
        setTakenIds(next);
    };

    const handleGenericToggle = () => {
        const newState = !showGeneric;
        setShowGeneric(newState);
        trackGenericToggle(newState);
    };

    const totalMeds = Object.values(schedule).flat().length;
    const takenCount = takenIds.size;
    const progress = totalMeds === 0 ? 0 : Math.round((takenCount / totalMeds) * 100);

    return (
        <div className="w-full min-h-screen pb-nav">
            {/* Header */}
            <header className="relative px-5 pt-12 pb-8 text-white overflow-hidden">
                <div className="absolute inset-0"
                    style={{ background: "linear-gradient(135deg, #993F00, #CC6600, #FF9933, #E67A00)" }} />
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10 animate-float"
                    style={{ background: "radial-gradient(circle, white, transparent)" }} />

                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-2xl font-extrabold">{t("medicines.title")}</h1>
                            <p className="text-white/60 text-xs mt-1">
                                {isHindi ? `${takenCount}/${totalMeds} दवाइयाँ ली` : `${takenCount}/${totalMeds} taken`}
                            </p>
                        </div>
                        <LanguageToggle />
                    </div>

                    {/* Streak + Progress */}
                    <div className="flex gap-3">
                        <div className="flex-1 rounded-2xl p-3.5"
                            style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.15)" }}>
                            <div className="flex items-center gap-2.5">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center relative streak-glow"
                                    style={{ background: "rgba(249,115,22,0.3)" }}>
                                    <Flame size={20} className="text-orange-300" />
                                </div>
                                <div>
                                    <p className="text-lg font-extrabold">7 🔥</p>
                                    <p className="text-[10px] text-white/50 font-medium">
                                        {isHindi ? "दिन स्ट्रीक" : "Day Streak"}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 rounded-2xl p-3.5"
                            style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.15)" }}>
                            <div className="flex items-center gap-2.5">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{ background: "rgba(255,255,255,0.2)" }}>
                                    <TrendingUp size={20} />
                                </div>
                                <div>
                                    <p className="text-lg font-extrabold">{progress}%</p>
                                    <p className="text-[10px] text-white/50 font-medium">
                                        {isHindi ? "आज की प्रगति" : "Today"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="px-4 -mt-4 relative z-10 space-y-4">
                {/* Family chips */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                    {(isHindi ? ["सभी", "रमेश", "पिताजी", "माताजी"] : ["All", "Ramesh", "Father", "Mother"]).map((name, i) => (
                        <button key={name} className={i === 0 ? "chip-active" : "chip-inactive"}>
                            👤 {name}
                        </button>
                    ))}
                </div>

                {/* Low stock alert */}
                <div
                    className="card flex items-center gap-3.5 cursor-pointer"
                    style={{ background: "linear-gradient(135deg, #fef2f2, #fee2e2)", border: "1px solid #fca5a5" }}
                    onClick={() => setShowRefill(true)}
                >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: "linear-gradient(135deg, #fca5a5, #f87171)" }}>
                        <AlertTriangle size={18} className="text-white" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-bold text-red-800">{t("medicines.lowStock")}</p>
                        <p className="text-xs text-red-600 mt-0.5">
                            {formatRefillInfo(5, 2, isHindi)}
                        </p>
                    </div>
                    <button className="btn-primary !py-2 !px-3 !min-h-[34px] text-xs !rounded-xl gap-1">
                        <ShoppingCart size={12} />
                        {isHindi ? "मँगाओ" : "Order"}
                    </button>
                </div>

                {/* Schedule */}
                <div className="space-y-4 stagger-children">
                    {timeSlots.map((slot) => {
                        const meds = schedule[slot.key as keyof typeof schedule];
                        if (meds.length === 0) return null;
                        return (
                            <section key={slot.key} className="animate-slide-up">
                                <div className="flex items-center gap-2 mb-2.5 px-1">
                                    <span className="text-base">{slot.emoji}</span>
                                    <h3 className="text-sm font-bold text-text-primary">{t(`medicines.times.${slot.key}`)}</h3>
                                </div>
                                <div className="space-y-2.5">
                                    {meds.map((med: any) => {
                                        const isTaken = takenIds.has(med.id);
                                        return (
                                            <div
                                                key={med.id}
                                                className={`card border-l-[3px] transition-all duration-500 ${isTaken ? "border-l-emerald-400 opacity-60" : "border-l-amber-400"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3.5">
                                                    <button
                                                        onClick={() => toggleTaken(med.id)}
                                                        className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0"
                                                        style={{
                                                            background: isTaken
                                                                ? "linear-gradient(135deg, #FF9933, #E67A00)"
                                                                : "linear-gradient(135deg, #f1f5f9, #e2e8f0)",
                                                            boxShadow: isTaken ? "0 2px 8px rgba(5,150,105,0.3)" : "none",
                                                        }}
                                                    >
                                                        {isTaken ? (
                                                            <Check size={18} className="text-white" />
                                                        ) : (
                                                            <Clock size={18} className="text-text-muted" />
                                                        )}
                                                    </button>
                                                    <div className="flex-1 min-w-0">
                                                        <p className={`text-sm font-bold ${isTaken ? "line-through text-text-muted" : "text-text-primary"}`}>
                                                            {isHindi ? med.name_hi : med.name}
                                                        </p>
                                                        <p className="text-xs text-text-muted mt-0.5">{isHindi ? med.dose : med.doseEn} • {isHindi ? med.meal : med.mealEn}</p>
                                                        {((isHindi ? med.generic : med.genericEn)) && !isTaken && (
                                                            <p className="text-xs text-emerald-600 mt-1 font-semibold">💡 {isHindi ? med.generic : med.genericEn}</p>
                                                        )}
                                                    </div>
                                                    {!isTaken && (
                                                        <button
                                                            onClick={() => toggleTaken(med.id)}
                                                            className="btn-primary !py-2 !px-4 !min-h-[34px] text-xs !rounded-xl"
                                                        >
                                                            {isHindi ? "ले ली" : "Taken"}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        );
                    })}
                </div>

                {/* Progress bar */}
                <div className="card">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-text-secondary">
                            {isHindi ? "आज की प्रगति" : "Today's Progress"}
                        </span>
                        <span className="text-xs font-bold" style={{ color: "#FF9933" }}>{progress}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-sage-200 rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                                width: `${progress}%`,
                                background: "linear-gradient(90deg, #FF9933, #E67A00, #FFB366)",
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* FAB */}
            <button onClick={() => setShowAddModal(!showAddModal)} className="fab" aria-label={t("medicines.addMedicine")}>
                {showAddModal ? <X size={24} /> : <Plus size={24} />}
            </button>

            {/* Add Medicine Bottom Sheet */}
            {showAddModal && (
                <div className="bottom-sheet">
                    <div className="bottom-sheet-overlay" onClick={() => setShowAddModal(false)} />
                    <div className="bottom-sheet-content">
                        <div className="w-10 h-1 bg-sage-300 rounded-full mx-auto mb-4" />
                        <h3 className="text-lg font-bold mb-4">{t("medicines.addMedicine")}</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <button className="card flex flex-col items-center gap-2.5 py-6 border border-sage-100 hover:border-primary-300">
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                                    style={{ background: "linear-gradient(135deg, #d3f3e4, #aae8cd)" }}>
                                    <Camera size={24} className="text-emerald-700" />
                                </div>
                                <span className="text-sm font-bold">{t("medicines.scanPrescription")}</span>
                                <span className="text-[10px] text-text-muted font-medium">AI {isHindi ? "पढ़ेगा" : "reads"}</span>
                            </button>
                            <button className="card flex flex-col items-center gap-2.5 py-6 border border-sage-100 hover:border-primary-300">
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                                    style={{ background: "linear-gradient(135deg, #ccfbf1, #cffafe)" }}>
                                    <Edit3 size={24} className="text-teal-700" />
                                </div>
                                <span className="text-sm font-bold">{t("medicines.manualAdd")}</span>
                                <span className="text-[10px] text-text-muted font-medium">{isHindi ? "ख़ुद लिखें" : "Type"}</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Refill Bottom Sheet */}
            {showRefill && (
                <div className="bottom-sheet">
                    <div className="bottom-sheet-overlay" onClick={() => setShowRefill(false)} />
                    <div className="bottom-sheet-content">
                        <div className="w-10 h-1 bg-sage-300 rounded-full mx-auto mb-4" />
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold flex items-center gap-2">
                                <Pill size={18} className="text-primary-500" />
                                {t("medicines.orderRefill")}
                            </h3>
                            <button onClick={() => setShowRefill(false)} className="w-8 h-8 rounded-xl bg-sage-100 flex items-center justify-center">
                                <X size={16} className="text-text-muted" />
                            </button>
                        </div>

                        <div className="card border border-sage-200 mb-4">
                            <p className="text-sm font-bold flex items-center gap-2">
                                <Pill size={14} className="text-text-muted" />
                                Metformin 500mg
                            </p>
                            <p className="text-xs text-text-muted mt-1">
                                {formatRefillInfo(5, 2, isHindi)}
                            </p>
                        </div>

                        {/* Generic Alternative Toggle */}
                        <div className="card border border-primary-200 mb-4" style={{ background: "linear-gradient(135deg, #edfaf4, #f5f7f2)" }}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <BadgeIndianRupee size={16} className="text-primary-600" />
                                    <div>
                                        <p className="text-sm font-bold text-primary-800">
                                            {isHindi ? "जेनेरिक विकल्प" : "Generic Alternative"}
                                        </p>
                                        <p className="text-[10px] text-primary-600">
                                            {isHindi ? "वही नमक • FDA प्रमाणित" : "Same salt formula • FDA approved"}
                                        </p>
                                    </div>
                                </div>
                                <button onClick={handleGenericToggle} className="flex items-center">
                                    {showGeneric ? (
                                        <ToggleRight size={32} className="text-primary-500" />
                                    ) : (
                                        <ToggleLeft size={32} className="text-sage-400" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3 mb-4">
                            {/* Generic option */}
                            <div className={`card transition-all duration-300 ${showGeneric ? 'order-first' : 'order-last opacity-60'}`}
                                style={showGeneric ? { background: "linear-gradient(135deg, #edfaf4, #d3f3e4)", border: "2px solid #72d7ae" } : { border: "1px solid #e8eae3" }}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        {showGeneric && <span className="badge-green text-[10px] mb-1">{isHindi ? "💰 सबसे सस्ता" : "💰 Best Price"}</span>}
                                        <p className={`text-sm font-bold ${showGeneric ? 'text-primary-800' : 'text-text-primary'}`}>Generic — Metformin</p>
                                        <p className={`text-xs ${showGeneric ? 'text-primary-600' : 'text-text-muted'}`}>1mg Pharmacy</p>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-2xl font-extrabold ${showGeneric ? 'text-primary-700' : 'text-text-primary'}`}>₹45</p>
                                        <p className={`text-[10px] ${showGeneric ? 'text-primary-600' : 'text-text-muted'}`}>{isHindi ? "30 गोलियाँ" : "30 tablets"}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Brand option */}
                            <div className={`card transition-all duration-300 ${!showGeneric ? '' : 'opacity-60'}`}
                                style={!showGeneric ? { border: "2px solid #FF9933" } : { border: "1px solid #e5e7eb" }}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-bold">Glycomet 500mg</p>
                                        <p className="text-xs text-text-muted">PharmEasy</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xl font-bold text-text-primary">₹125</p>
                                        <p className="text-[10px] text-text-muted">{isHindi ? "30 गोलियाँ" : "30 tablets"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {showGeneric && (
                            <div className="flex items-center gap-2 mb-3 p-2.5 rounded-xl" style={{ background: "#edfaf4" }}>
                                <ShieldCheck size={14} className="text-primary-600 shrink-0" />
                                <p className="text-xs font-bold text-primary-700">
                                    💰 {isHindi ? "जेनेरिक से ₹80 बचाएँ (64%) — वही दवाई, कम दाम" : "Save ₹80 with generic (64%) — Same medicine, lower cost"}
                                </p>
                            </div>
                        )}

                        <button
                            onClick={() => trackRefillOrder(showGeneric, showGeneric ? 80 : 0)}
                            className="btn-primary w-full text-base gap-2.5"
                        >
                            <ShoppingCart size={18} />
                            {showGeneric
                                ? (isHindi ? "जेनेरिक ऑर्डर करें — ₹45" : "Order Generic — ₹45")
                                : (isHindi ? "ब्रांड ऑर्डर करें — ₹125" : "Order Brand — ₹125")
                            }
                        </button>
                    </div>
                </div>
            )}

            <BottomNav />
        </div>
    );
}
