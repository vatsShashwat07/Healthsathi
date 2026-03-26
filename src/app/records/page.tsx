"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import BottomNav from "@/components/shared/BottomNav";
import LanguageToggle from "@/components/shared/LanguageToggle";
import {
    Search,
    Plus,
    X,
    Camera,
    FileText,
    Image as ImageIcon,
    Edit3,
    ChevronDown,
    Link as LinkIcon,
    Sparkles,
} from "lucide-react";
import Link from "next/link";
import type { RecordType } from "@/types";

const recordTabs: { key: RecordType | "all"; emoji: string }[] = [
    { key: "all", emoji: "📋" },
    { key: "lab", emoji: "🧪" },
    { key: "prescription", emoji: "💊" },
    { key: "xray", emoji: "🩻" },
    { key: "vaccination", emoji: "💉" },
    { key: "discharge", emoji: "🏥" },
    { key: "other", emoji: "📄" },
];

const demoRecords = [
    {
        id: "1", type: "lab" as RecordType, name: "CBC — Complete Blood Count",
        nameHi: "CBC — संपूर्ण रक्त गणना",
        date: "15 Mar 2026", dateHi: "15 मार्च 2026",
        lab: "Dr. Lal PathLabs", member: "Ramesh", memberHi: "रमेश", hasAbnormal: true,
        tests: [
            { name: "Hemoglobin", value: "11.2", unit: "g/dL", range: "13-17", abnormal: true },
            { name: "WBC", value: "7,200", unit: "/μL", range: "4000-11000", abnormal: false },
            { name: "Platelets", value: "2,50,000", unit: "/μL", range: "150000-400000", abnormal: false },
        ],
    },
    {
        id: "2", type: "prescription" as RecordType, name: "Dr. Rajesh Sharma — Prescription",
        nameHi: "Dr. Rajesh Sharma — पर्चा",
        date: "10 Mar 2026", dateHi: "10 मार्च 2026",
        lab: "City Hospital, Kanpur", member: "Ramesh", memberHi: "रमेश", hasAbnormal: false, tests: [],
    },
    {
        id: "3", type: "lab" as RecordType, name: "Thyroid Profile — T3, T4, TSH",
        nameHi: "थायरॉयड प्रोफ़ाइल — T3, T4, TSH",
        date: "28 Feb 2026", dateHi: "28 फ़रवरी 2026",
        lab: "Thyrocare", member: "Sunita", memberHi: "सुनीता", hasAbnormal: false,
        tests: [
            { name: "TSH", value: "3.2", unit: "μIU/mL", range: "0.4-4.0", abnormal: false },
            { name: "T3", value: "1.1", unit: "ng/mL", range: "0.8-2.0", abnormal: false },
            { name: "T4", value: "7.5", unit: "μg/dL", range: "4.5-12.0", abnormal: false },
        ],
    },
    {
        id: "4", type: "vaccination" as RecordType, name: "COVID-19 Booster — Covishield",
        nameHi: "कोविड-19 बूस्टर — कोविशील्ड",
        date: "15 Jan 2026", dateHi: "15 जनवरी 2026",
        lab: "PHC Kanpur", member: "Father", memberHi: "पिताजी", hasAbnormal: false, tests: [],
    },
];

export default function RecordsPage() {
    const { t, isHindi } = useLanguage();
    const [activeTab, setActiveTab] = useState<RecordType | "all">("all");
    const [showUpload, setShowUpload] = useState(false);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [showPaywall, setShowPaywall] = useState(false);

    // Upload counter — tracks uploads in localStorage (5 free, paywall on 6th)
    const getUploadCount = (): number => {
        if (typeof window === "undefined") return 0;
        const stored = localStorage.getItem("hs_upload_count");
        return stored ? parseInt(stored, 10) : 0;
    };

    const handleUploadClick = () => {
        const count = getUploadCount();
        if (count >= 5) {
            setShowPaywall(true);
            return;
        }
        localStorage.setItem("hs_upload_count", String(count + 1));
        setShowUpload(!showUpload);
    };

    const filteredRecords = demoRecords.filter(
        (r) =>
            (activeTab === "all" || r.type === activeTab) &&
            (searchQuery === "" ||
                r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                r.member.includes(searchQuery))
    );

    return (
        <div className="w-full min-h-screen pb-nav">
            {/* Header */}
            <header className="relative px-5 pt-12 pb-6 text-white overflow-hidden">
                <div className="absolute inset-0"
                    style={{ background: "linear-gradient(135deg, #CC6600, #E67A00, #FF9933)" }} />
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10"
                    style={{ background: "radial-gradient(circle, white, transparent)" }} />

                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-2xl font-extrabold">{t("records.title")}</h1>
                            <p className="text-white/60 text-xs mt-1">
                                {isHindi ? "4 रिपोर्ट • 2 परिवार सदस्य" : "4 records • 2 family members"}
                            </p>
                        </div>
                        <LanguageToggle />
                    </div>
                    {/* Search */}
                    <div className="relative">
                        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-teal-300" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t("records.search")}
                            className="w-full rounded-2xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/40
                         focus:outline-none transition-all"
                            style={{
                                background: "rgba(255,255,255,0.12)",
                                backdropFilter: "blur(10px)",
                                border: "1px solid rgba(255,255,255,0.15)",
                            }}
                        />
                    </div>
                </div>
            </header>

            <div className="px-4 -mt-3 relative z-10">
                {/* Family chips */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3">
                    {(isHindi ? ["सभी", "रमेश", "सुनीता", "पिताजी"] : ["All", "Ramesh", "Sunita", "Father"]).map((name, i) => (
                        <button key={name} className={i === 0 ? "chip-active" : "chip-inactive"}>
                            {name}
                        </button>
                    ))}
                </div>

                {/* Type tabs */}
                <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-3">
                    {recordTabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={activeTab === tab.key ? "chip-active" : "chip-inactive"}
                        >
                            <span className="mr-1">{tab.emoji}</span>
                            {t(`records.types.${tab.key}`)}
                        </button>
                    ))}
                </div>

                {/* Records */}
                <div className="space-y-3 stagger-children">
                    {filteredRecords.length === 0 ? (
                        <div className="text-center py-16 animate-fade-in">
                            <div className="text-5xl mb-3">📋</div>
                            <p className="text-text-muted text-sm font-medium">{t("records.noRecords")}</p>
                        </div>
                    ) : (
                        filteredRecords.map((record) => (
                            <div key={record.id} className="card overflow-hidden animate-slide-up">
                                <div
                                    className="flex items-start gap-3.5 cursor-pointer"
                                    onClick={() => setExpandedId(expandedId === record.id ? null : record.id)}
                                >
                                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg shrink-0"
                                        style={{
                                            background: record.type === "lab" ? "linear-gradient(135deg, #ccfbf1, #cffafe)" :
                                                record.type === "prescription" ? "linear-gradient(135deg, #fef3c7, #fde68a)" :
                                                    record.type === "vaccination" ? "linear-gradient(135deg, #d3f3e4, #aae8cd)" :
                                                        "linear-gradient(135deg, #f1f5f9, #e2e8f0)",
                                        }}>
                                        {recordTabs.find((t) => t.key === record.type)?.emoji || "📄"}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-bold text-text-primary truncate">{isHindi ? record.nameHi : record.name}</p>
                                            {record.hasAbnormal && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: "linear-gradient(135deg, #FF9933, #E67A00)" }}>{t("records.abnormal")}</span>}
                                        </div>
                                        <p className="text-xs text-text-muted mt-0.5">{isHindi ? record.dateHi : record.date} • {record.lab}</p>
                                        <p className="text-xs font-semibold mt-0.5" style={{ color: "#FF9933" }}>👤 {isHindi ? record.memberHi : record.member}</p>
                                    </div>
                                    <ChevronDown
                                        size={16}
                                        className={`text-text-muted transition-transform duration-300 mt-1 ${expandedId === record.id ? "rotate-180" : ""
                                            }`}
                                    />
                                </div>

                                {expandedId === record.id && record.tests.length > 0 && (
                                    <div className="mt-3 pt-3 border-t border-sage-100 animate-slide-up">
                                        <p className="text-xs text-text-muted mb-2 font-semibold flex items-center gap-1">
                                            ✨ {t("records.extracted")}:
                                        </p>
                                        <div className="space-y-2">
                                            {record.tests.map((test, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm"
                                                    style={{
                                                        background: test.abnormal
                                                            ? "linear-gradient(135deg, #fef2f2, #fee2e2)"
                                                            : "linear-gradient(135deg, #f0fdf4, #f5f7f2)",
                                                    }}
                                                >
                                                    <span className="font-semibold">{test.name}</span>
                                                    <div className="text-right">
                                                        <span className={`font-bold ${test.abnormal ? "text-red-600" : "text-emerald-700"}`}>
                                                            {test.value} <span className="text-xs font-normal text-text-muted">{test.unit}</span>
                                                        </span>
                                                        <span className="text-[10px] text-text-muted block">Range: {test.range}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <button className="btn-secondary w-full mt-3 text-sm gap-2">
                                            <LinkIcon size={14} />
                                            {t("records.shareLink")}
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* FAB */}
            <button
                onClick={handleUploadClick}
                className="fab"
                aria-label={t("records.addRecord")}
            >
                {showUpload ? <X size={24} /> : <Plus size={24} />}
            </button>

            {/* Upload Paywall */}
            {showPaywall && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-5" style={{ background: "rgba(0,0,0,0.5)" }}>
                    <div className="card max-w-sm w-full text-center py-10 px-6" style={{ border: "2px solid #FF9933", background: "#fff" }}>
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "linear-gradient(135deg, #FF9933, #E67A00)", boxShadow: "0 6px 20px rgba(255,153,51,0.3)" }}>
                            <Sparkles size={28} className="text-white" />
                        </div>
                        <h2 className="text-xl font-extrabold text-text-primary mb-2">
                            {isHindi ? "स्टोरेज लिमिट पूरी हो गई!" : "Storage limit reached!"}
                        </h2>
                        <p className="text-sm text-text-muted mb-1">
                            {isHindi ? "मुफ़्त प्लान: 5 डॉक्यूमेंट अपलोड" : "Free plan: 5 document uploads"}
                        </p>
                        <p className="text-sm text-text-muted mb-6">
                            {isHindi ? "5 GB स्टोरेज के लिए अपग्रेड करें" : "Upgrade for 5 GB storage"}
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
            )}

            {/* Upload Bottom Sheet */}
            {showUpload && (
                <div className="bottom-sheet">
                    <div className="bottom-sheet-overlay" onClick={() => setShowUpload(false)} />
                    <div className="bottom-sheet-content">
                        <div className="w-10 h-1 bg-sage-300 rounded-full mx-auto mb-4" />
                        <h3 className="text-lg font-bold mb-4">{t("records.addRecord")}</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { icon: Camera, label: t("records.camera"), gradient: "linear-gradient(135deg, #d3f3e4, #aae8cd)", color: "text-emerald-700" },
                                { icon: ImageIcon, label: t("records.gallery"), gradient: "linear-gradient(135deg, #ccfbf1, #cffafe)", color: "text-teal-700" },
                                { icon: FileText, label: t("records.pdf"), gradient: "linear-gradient(135deg, #fef3c7, #fde68a)", color: "text-amber-700" },
                                { icon: Edit3, label: t("records.manual"), gradient: "linear-gradient(135deg, #e0e7ff, #ede9fe)", color: "text-indigo-700" },
                            ].map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <button key={i} className="card flex flex-col items-center gap-2.5 py-5 border border-sage-100 hover:border-primary-300 transition-all">
                                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                                            style={{ background: item.gradient }}>
                                            <Icon size={24} className={item.color} />
                                        </div>
                                        <span className="text-sm font-semibold">{item.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            <BottomNav />
        </div>
    );
}
