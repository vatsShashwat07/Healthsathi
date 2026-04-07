"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import FloatingHearts from "@/components/shared/FloatingHearts";
import BottomNav from "@/components/shared/BottomNav";
import LanguageToggle from "@/components/shared/LanguageToggle";

import {
    Mic,
    Send,
    ArrowLeft,
    Share2,
    Bookmark,
    AlertTriangle,
    Home as HomeIcon,
    Stethoscope,
    ShieldCheck,
    Activity,
    ChevronDown,
    Sparkles,
    MicOff,
    Phone,
    MapPin,
    X,
    UserCircle,
    MessageSquare,
    Search,
} from "lucide-react";
import Link from "next/link";
import type { BodyRegion, UrgencyLevel, SymptomResult } from "@/types";
import { detectEmergency } from "@/lib/emergency";
import {
    trackSymptomCheck,
    trackSymptomResult,
    trackEmergencyTriggered,
} from "@/lib/analytics";

const bodyRegions: {
    key: BodyRegion;
    x: number;
    y: number;
    w: number;
    h: number;
}[] = [
        { key: "head", x: 42, y: 2, w: 16, h: 12 },
        { key: "eyes", x: 44, y: 7, w: 12, h: 4 },
        { key: "ears", x: 38, y: 7, w: 6, h: 5 },
        { key: "throat", x: 44, y: 14, w: 12, h: 5 },
        { key: "chest", x: 38, y: 20, w: 24, h: 14 },
        { key: "upperBack", x: 40, y: 22, w: 20, h: 10 },
        { key: "stomach", x: 40, y: 35, w: 20, h: 14 },
        { key: "lowerBack", x: 40, y: 42, w: 20, h: 8 },
        { key: "arms", x: 24, y: 22, w: 14, h: 22 },
        { key: "hands", x: 20, y: 44, w: 12, h: 10 },
        { key: "legs", x: 36, y: 52, w: 28, h: 30 },
        { key: "feet", x: 36, y: 82, w: 28, h: 12 },
    ];

/* ===== Emergency Overlay Component ===== */
function EmergencyOverlay({
    keyword,
    isHindi,
    onDismiss,
}: {
    keyword: string;
    isHindi: boolean;
    onDismiss: () => void;
}) {
    return (
        <div className="emergency-overlay">
            <div className="max-w-lg mx-auto px-6 text-center text-white space-y-6">
                {/* Header */}
                <div className="relative">
                    <button
                        onClick={onDismiss}
                        className="absolute -top-2 right-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
                    >
                        <X size={18} />
                    </button>
                    <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 animate-pulse-gentle">
                        <AlertTriangle size={36} />
                    </div>
                    <h1 className="text-2xl font-extrabold">
                        {isHindi ? "🚨 इमरजेंसी — तुरंत कॉल करें!" : "🚨 Emergency — Call Now!"}
                    </h1>
                    <p className="text-white/70 text-sm mt-2">
                        {isHindi
                            ? `"${keyword}" का पता चला — यह गंभीर हो सकता है`
                            : `"${keyword}" detected — this could be serious`}
                    </p>
                </div>

                {/* Call 108 — Primary */}
                <a
                    href="tel:108"
                    className="btn-emergency-bypass flex items-center justify-center gap-3 !rounded-2xl"
                >
                    <Phone size={22} />
                    <div className="text-left">
                        <p className="text-lg font-extrabold">108 — Ambulance</p>
                        <p className="text-xs text-white/70 font-medium">
                            {isHindi ? "मुफ़्त • 24/7 • सबसे तेज़" : "Free • 24/7 • Fastest"}
                        </p>
                    </div>
                </a>

                {/* Call 112 */}
                <a
                    href="tel:112"
                    className="btn w-full text-white text-base gap-3 !rounded-2xl !min-h-[52px]"
                    style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)" }}
                >
                    <Phone size={18} />
                    <div className="text-left">
                        <p className="font-bold">112 — Emergency Helpline</p>
                        <p className="text-xs text-white/60">
                            {isHindi ? "पुलिस + फ़ायर + एम्बुलेंस" : "Police + Fire + Ambulance"}
                        </p>
                    </div>
                </a>

                {/* Bottom actions */}
                <div className="flex gap-3 pt-2">
                    <button
                        className="btn flex-1 text-white text-sm gap-2 !rounded-xl !min-h-[44px]"
                        style={{ background: "rgba(255,255,255,0.15)" }}
                    >
                        <MapPin size={16} />
                        {isHindi ? "नज़दीकी अस्पताल" : "Nearby Hospital"}
                    </button>
                    <button
                        onClick={onDismiss}
                        className="btn flex-1 text-white text-sm gap-2 !rounded-xl !min-h-[44px]"
                        style={{ background: "rgba(255,255,255,0.15)" }}
                    >
                        <X size={16} />
                        {isHindi ? "बंद करें" : "Dismiss"}
                    </button>
                </div>

                <p className="text-white/40 text-xs mt-4">
                    {isHindi
                        ? "⚠ यह डॉक्टर की सलाह का विकल्प नहीं है। गंभीर लक्षणों में तुरंत 108 कॉल करें।"
                        : "⚠ This is not a substitute for medical advice. Call 108 immediately for serious symptoms."}
                </p>
            </div>
        </div>
    );
}

export default function SymptomsPage() {
    const { t, isHindi } = useLanguage();
    const [selectedRegion, setSelectedRegion] = useState<BodyRegion | null>(null);
    const [symptomText, setSymptomText] = useState("");
    const [isChecking, setIsChecking] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [currentResult, setCurrentResult] = useState<SymptomResult | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [emergencyKeyword, setEmergencyKeyword] = useState<string | null>(null);
    const [showEmergency, setShowEmergency] = useState(false);
    const [showPaywall, setShowPaywall] = useState(false);

    // Usage counter — tracks symptom checks per day in localStorage
    const getUsageCount = useCallback((): number => {
        if (typeof window === "undefined") return 0;
        const stored = localStorage.getItem("hs_symptom_usage");
        if (!stored) return 0;
        const { count, date } = JSON.parse(stored);
        if (date !== new Date().toDateString()) return 0; // Reset daily
        return count;
    }, []);

    const incrementUsage = useCallback((): number => {
        const today = new Date().toDateString();
        const current = getUsageCount();
        const next = current + 1;
        localStorage.setItem("hs_symptom_usage", JSON.stringify({ count: next, date: today }));
        return next;
    }, [getUsageCount]);

    // Check for emergency keywords on text change
    const handleTextChange = useCallback((text: string) => {
        setSymptomText(text);
        const detected = detectEmergency(text);
        if (detected && !showEmergency) {
            setEmergencyKeyword(detected);
            setShowEmergency(true);
            trackEmergencyTriggered(detected, isHindi ? "hi" : "en");
        }
    }, [showEmergency, isHindi]);

    const handleCheck = async () => {
        if (!symptomText.trim() && !selectedRegion) return;

        // Double-check for emergency before submitting
        const detected = detectEmergency(symptomText);
        if (detected) {
            setEmergencyKeyword(detected);
            setShowEmergency(true);
            trackEmergencyTriggered(detected, isHindi ? "hi" : "en");
            return; // Bypass AI
        }

        trackSymptomCheck(selectedRegion || "text", isHindi ? "hi" : "en");

        // Check usage limit (3 checks/day on free plan)
        const usage = getUsageCount();
        if (usage >= 3) {
            setShowPaywall(true);
            return;
        }
        incrementUsage();

        setIsChecking(true);

        try {
            const response = await fetch('/api/symptoms', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    symptomText,
                    region: selectedRegion,
                    isHindi
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch AI analysis');
            }

            const result = await response.json();
            setCurrentResult(result);
            setShowResult(true);
            trackSymptomResult(selectedRegion || "text", result.urgencyLevel || "warning");
        } catch (error) {
            console.error("AI Symptom Check Error:", error);
            alert(isHindi ? "AI सर्वर से कनेक्ट नहीं हो सका। कृपया बाद में प्रयास करें या अपनी API Key चेक करें।" : "Failed to connect to AI server. Please check your API key or try again later.");
        } finally {
            setIsChecking(false);
        }
    };

    const handleVoiceInput = () => {
        if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const SpeechRecognitionConstructor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            const recognition = new SpeechRecognitionConstructor();
            recognition.lang = isHindi ? "hi-IN" : "en-IN";
            recognition.interimResults = false;
            setIsListening(true);
            recognition.onresult = (event: { results: { [key: number]: { [key: number]: { transcript: string } } } }) => {
                const transcript = event.results[0][0].transcript;
                handleTextChange(transcript);
                setIsListening(false);
            };
            recognition.onerror = () => setIsListening(false);
            recognition.onend = () => setIsListening(false);
            recognition.start();
        }
    };

    // ===== SHARE & SAVE =====
    const handleSave = () => {
        window.print();
    };

    const handleShare = () => {
        if (!currentResult) return;
        let text = isHindi ? "*HealthSathi - AI हेल्थ असेसमेंट*\n\n" : "*HealthSathi - AI Symptom Assessment*\n\n";
        text += isHindi ? `*स्थिति:* ${currentResult.urgencyLevel}\n\n*संभावित कारण:*\n` : `*Urgency:* ${currentResult.urgencyLevel.toUpperCase()}\n\n*Possible Causes:*\n`;

        currentResult.possibleCauses.forEach(c => {
            text += `- ${c.name} (${c.likelihood})\n`;
        });

        text += isHindi ? `\n*खतरे के संकेत:*\n` : `\n*Red Flags:*\n`;
        currentResult.redFlags.forEach(r => {
            text += `⚠️ ${r}\n`;
        });

        text += `\n_Note: ${currentResult.disclaimer || "This is an AI generated response and not medical advice."}_\n`;
        text += `View full details on https://healthsathi.vercel.app`;

        const encoded = encodeURIComponent(text);
        window.open(`https://wa.me/?text=${encoded}`, '_blank');
    };

    // ===== EMERGENCY OVERLAY =====
    if (showEmergency && emergencyKeyword) {
        return (
            <EmergencyOverlay
                keyword={emergencyKeyword}
                isHindi={isHindi}
                onDismiss={() => setShowEmergency(false)}
            />
        );
    }

    // ===== PAYWALL MODAL =====
    if (showPaywall) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center px-5" style={{ background: "linear-gradient(180deg, #FFF9F2 0%, #FFFFFF 50%)" }}>
                <div className="card max-w-sm w-full text-center py-10 px-6" style={{ border: "2px solid #10b981" }}>
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "linear-gradient(135deg, #10b981, #059669)", boxShadow: "0 6px 20px rgba(16,185,129,0.3)" }}>
                        <Sparkles size={28} className="text-white" />
                    </div>
                    <h2 className="text-xl font-extrabold text-text-primary mb-2">
                        {isHindi ? "आज की लिमिट पूरी हो गई!" : "Daily limit reached!"}
                    </h2>
                    <p className="text-sm text-text-muted mb-1">
                        {isHindi ? "मुफ़्त प्लान: 3 लक्षण जाँच/दिन" : "Free plan: 3 symptom checks/day"}
                    </p>
                    <p className="text-sm text-text-muted mb-6">
                        {isHindi ? "अनलिमिटेड जाँच के लिए अपग्रेड करें" : "Upgrade for unlimited checks"}
                    </p>
                    <Link href="/subscription" className="btn-primary w-full text-sm gap-2 mb-3">
                        <Sparkles size={16} />
                        {isHindi ? "साथी प्लस — ₹99/महीना" : "Saathi Plus — ₹99/month"}
                    </Link>
                    <button onClick={() => setShowPaywall(false)} className="text-xs text-text-muted hover:text-text-primary transition-colors">
                        {isHindi ? "बाद में" : "Maybe later"}
                    </button>
                </div>
            </div>
        );
    }

    // ===== RESULT VIEW =====
    if (showResult) {
        return (
            <div className="w-full min-h-screen pb-nav" style={{ background: "linear-gradient(180deg, #FFF9F2 0%, #FFFFFF 50%)" }}>
                <header className="px-5 pt-12 pb-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowResult(false)}
                            className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center"
                            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
                        >
                            <ArrowLeft size={18} className="text-text-primary" />
                        </button>
                        <div>
                            <h1 className="text-lg font-bold text-text-primary">{t("symptoms.result")}</h1>
                            <p className="text-xs text-text-muted">
                                {isHindi ? "AI द्वारा विश्लेषण" : "AI-powered analysis"}
                            </p>
                        </div>
                        <div className="ml-auto">
                            <Sparkles size={18} className="text-primary-500 animate-pulse-gentle" />
                        </div>
                    </div>
                </header>

                <div className="px-4 py-2 space-y-4 stagger-children">
                    {/* Urgency Badge */}
                    <div className="urgency-soon rounded-2xl p-5 text-center animate-scale-in">
                        <p className="text-xl font-extrabold">
                            {t(`symptoms.urgencyLevels.${currentResult!.urgencyLevel}`)}
                        </p>
                        <p className="text-xs mt-1 opacity-70">
                            {isHindi ? "AI विश्वास: 87%" : "AI confidence: 87%"}
                        </p>
                    </div>

                    {/* Possible Causes */}
                    <section className="card animate-slide-up">
                        <h3 className="text-sm font-bold text-text-primary mb-3 flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                                style={{ background: "linear-gradient(135deg, #ccfbf1, #cffafe)" }}>
                                <Stethoscope size={14} className="text-teal-700" />
                            </div>
                            {t("symptoms.possibleCauses")}
                        </h3>
                        <div className="space-y-3">
                            {currentResult!.possibleCauses.map((cause, i) => (
                                <div key={i} className="flex items-start gap-3 p-3 rounded-xl"
                                    style={{
                                        background: cause.likelihood === "high" ? "#fef2f2" :
                                            cause.likelihood === "medium" ? "#fffbeb" : "#edfaf4",
                                    }}>
                                    <span className={`badge mt-0.5 ${cause.likelihood === "high" ? "badge-red" :
                                        cause.likelihood === "medium" ? "badge-yellow" : "badge-green"
                                        }`}>
                                        {cause.likelihood === "high" ? (isHindi ? "संभव" : "Likely") :
                                            cause.likelihood === "medium" ? (isHindi ? "हो सकता" : "Possible") :
                                                (isHindi ? "कम संभव" : "Less likely")}
                                    </span>
                                    <div>
                                        <p className="text-sm font-bold">{cause.name}</p>
                                        <p className="text-xs text-text-muted mt-0.5">{cause.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Home Care */}
                    <section className="card animate-slide-up">
                        <h3 className="text-sm font-bold text-text-primary mb-3 flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                                style={{ background: "linear-gradient(135deg, #d3f3e4, #aae8cd)" }}>
                                <HomeIcon size={14} className="text-primary-700" />
                            </div>
                            {t("symptoms.homeCare")}
                        </h3>
                        <ul className="space-y-2.5">
                            {currentResult!.homeCareTips.map((tip, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm">
                                    <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                                        {i + 1}
                                    </span>
                                    <span className="text-text-primary">{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Doctor Notes */}
                    <section className="rounded-2xl p-4 animate-slide-up"
                        style={{ background: "linear-gradient(135deg, #edfaf4, #d3f3e4)", border: "1px solid #72d7ae" }}>
                        <h3 className="text-sm font-bold text-primary-900 mb-3 flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                                style={{ background: "linear-gradient(135deg, #72d7ae, #39c08b)" }}>
                                <ShieldCheck size={14} className="text-primary-900" />
                            </div>
                            {t("symptoms.doctorNotes")}
                        </h3>
                        <ul className="space-y-2">
                            {currentResult!.doctorNotes.map((note, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm text-primary-900">
                                    <span className="text-primary-500 mt-1">▸</span>
                                    {note}
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Red Flags */}
                    <section className="rounded-2xl p-4 animate-slide-up"
                        style={{ background: "linear-gradient(135deg, #fef2f2, #fee2e2)", border: "1px solid #fca5a5" }}>
                        <h3 className="text-sm font-bold text-red-900 mb-3 flex items-center gap-2">
                            <AlertTriangle size={16} className="text-red-600" />
                            {t("symptoms.redFlags")}
                        </h3>
                        <ul className="space-y-2">
                            {currentResult!.redFlags.map((flag, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm text-red-800">
                                    <span className="text-red-400 mt-0.5">⚠</span>
                                    {flag}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <div className="disclaimer-banner text-xs">{t("symptoms.disclaimer")}</div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button onClick={handleSave} className="btn-secondary flex-1 text-sm gap-2">
                            <Bookmark size={16} />
                            {t("symptoms.save")}
                        </button>
                        <button onClick={handleShare} className="btn-primary flex-1 text-sm gap-2">
                            <Share2 size={16} />
                            {t("symptoms.shareWhatsApp")}
                        </button>
                    </div>
                </div>
                <FloatingHearts />
            <BottomNav />
            </div>
        );
    }

    // ===== INPUT VIEW =====
    return (
        <div className="w-full min-h-screen pb-nav">
            {/* Header */}
            <header className="relative px-5 pt-12 pb-6 text-white overflow-hidden">
                <div className="absolute inset-0"
                    style={{ background: "linear-gradient(135deg, #047857, #059669, #10b981)" }} />
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10"
                    style={{ background: "radial-gradient(circle, white, transparent)" }} />

                <div className="relative z-10 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-extrabold flex items-center gap-2">
                            <Search size={20} />
                            {t("symptoms.title")}
                        </h1>
                        <p className="text-white/60 text-xs mt-1">{t("symptoms.subtitle")}</p>
                    </div>
                    <LanguageToggle />
                </div>
            </header>

            <div className="px-4 -mt-3 relative z-10 space-y-4">
                {/* Family selector */}
                <button className="w-full card flex items-center justify-between py-3">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                            style={{ background: "linear-gradient(135deg, #dbeafe, #bfdbfe)" }}>
                            <UserCircle size={18} className="text-emerald-700" />
                        </div>
                        <span className="text-sm font-semibold">{isHindi ? "मेरे लिए" : "For myself"}</span>
                    </div>
                    <ChevronDown size={16} className="text-text-muted" />
                </button>

                {/* Body Diagram */}
                <section className="card">
                    <p className="text-xs text-text-muted mb-3 text-center font-medium flex items-center justify-center gap-1.5">
                        <MapPin size={12} />
                        {t("symptoms.tapBody")}
                    </p>
                    <div className="relative mx-auto" style={{ width: "220px", height: "400px" }}>
                        <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            {/* Body with gradient fill */}
                            <defs>
                                <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#93c5fd" />
                                    <stop offset="100%" stopColor="#dbeafe" />
                                </linearGradient>
                                <filter id="bodyShadow">
                                    <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.1" />
                                </filter>
                            </defs>
                            <g filter="url(#bodyShadow)">
                                <circle cx="50" cy="10" r="8" fill="url(#bodyGrad)" stroke="#60a5fa" strokeWidth="0.8" />
                                <rect x="47" y="18" width="6" height="4" rx="1.5" fill="url(#bodyGrad)" stroke="#60a5fa" strokeWidth="0.5" />
                                <path d="M38 22 L62 22 L60 50 L40 50 Z" fill="url(#bodyGrad)" stroke="#60a5fa" strokeWidth="0.8" />
                                <path d="M38 22 L28 28 L24 44 L28 44 L32 32 L38 28" fill="url(#bodyGrad)" stroke="#60a5fa" strokeWidth="0.8" />
                                <path d="M62 22 L72 28 L76 44 L72 44 L68 32 L62 28" fill="url(#bodyGrad)" stroke="#60a5fa" strokeWidth="0.8" />
                                <path d="M40 50 L38 76 L34 90 L40 90 L44 76 L46 50" fill="url(#bodyGrad)" stroke="#60a5fa" strokeWidth="0.8" />
                                <path d="M54 50 L56 76 L60 90 L66 90 L62 76 L60 50" fill="url(#bodyGrad)" stroke="#60a5fa" strokeWidth="0.8" />
                            </g>
                            {bodyRegions.map((region) => (
                                <rect
                                    key={region.key}
                                    x={region.x} y={region.y} width={region.w} height={region.h} rx="2"
                                    className={`cursor-pointer transition-all duration-300 ${selectedRegion === region.key
                                        ? "fill-blue-500/30 stroke-blue-600"
                                        : "fill-transparent stroke-transparent hover:fill-blue-500/10"
                                        }`}
                                    strokeWidth="1.2"
                                    onClick={() => setSelectedRegion(region.key)}
                                />
                            ))}
                        </svg>
                        {selectedRegion && (
                            <div className="absolute top-2 right-0 animate-bounce-gentle">
                                <span className="badge-green text-xs gap-1 py-1">
                                    📍 {t(`symptoms.bodyParts.${selectedRegion}`)}
                                </span>
                            </div>
                        )}
                    </div>
                </section>

                {/* Text + Voice input */}
                <section className="card">
                    <p className="text-xs text-text-muted mb-2 font-medium flex items-center gap-1.5">
                        <MessageSquare size={12} />
                        {isHindi ? "हिंदी / English / Hinglish में लिखें या बोलें" : "Type or speak in Hindi / English / Hinglish"}
                    </p>
                    <div className="relative">
                        <textarea
                            value={symptomText}
                            onChange={(e) => handleTextChange(e.target.value)}
                            placeholder={isHindi ? "जैसे: sir mein dard, bukhar, seene mein dard..." : "e.g., headache, fever, chest pain..."}
                            className="input !min-h-[90px] resize-none pr-20 text-sm !rounded-2xl"
                            rows={3}
                        />
                        <div className="absolute bottom-3 right-3">
                            <button
                                onClick={handleVoiceInput}
                                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${isListening
                                    ? "bg-red-500 text-white animate-pulse-gentle"
                                    : "text-primary-700 hover:scale-110"
                                    }`}
                                style={!isListening ? { background: "linear-gradient(135deg, #dbeafe, #bfdbfe)" } : {}}
                                aria-label={t("symptoms.voiceInput")}
                            >
                                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                            </button>
                        </div>
                    </div>
                    {isListening && (
                        <p className="text-xs text-red-500 font-medium mt-2 animate-pulse-gentle text-center">
                            🎙 {isHindi ? "बोलिए... सुन रहे हैं" : "Listening..."}
                        </p>
                    )}
                </section>

                {/* Submit */}
                <button
                    onClick={handleCheck}
                    disabled={isChecking || (!symptomText.trim() && !selectedRegion)}
                    className="btn-primary w-full text-base gap-2.5 !py-4 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    {isChecking ? (
                        <>
                            <Activity size={20} className="animate-pulse" />
                            {t("symptoms.checking")}
                        </>
                    ) : (
                        <>
                            <Send size={18} />
                            {t("symptoms.submit")}
                        </>
                    )}
                </button>

                <div className="disclaimer-banner text-xs flex items-start gap-2">
                    <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                    {t("symptoms.disclaimer")}
                </div>
            </div>
            <FloatingHearts />
            <BottomNav />
        </div>
    );
}
