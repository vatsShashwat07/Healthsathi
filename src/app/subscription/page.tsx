"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import BottomNav from "@/components/shared/BottomNav";
import { ArrowLeft, Check, Sparkles, Crown, Zap } from "lucide-react";
import Link from "next/link";

const plans = [
    {
        key: "free", price: 0, annualPrice: 0, icon: "🆓",
        gradient: "linear-gradient(135deg, #f8faf7, #f0f5ed)",
        border: "1px solid #e8eae3",
        features: [
            { hi: "3 लक्षण जाँच/दिन", en: "3 symptom checks/day" },
            { hi: "50 MB स्टोरेज", en: "50 MB storage" },
            { hi: "1 प्रोफ़ाइल (सिर्फ़ आप)", en: "1 profile (self only)" },
            { hi: "5 AI रिपोर्ट/महीना", en: "5 AI extractions/month" },
            { hi: "3 दवाई रिमाइंडर", en: "3 medicine reminders" },
        ],
    },
    {
        key: "plus", price: 99, annualPrice: 899, icon: "⭐",
        gradient: "linear-gradient(135deg, #f0fdf4, #ecfdf5, #ccfbf1)",
        border: "2px solid #86efac",
        popular: true,
        features: [
            { hi: "अनलिमिटेड लक्षण जाँच", en: "Unlimited symptom checks" },
            { hi: "5 GB स्टोरेज", en: "5 GB storage" },
            { hi: "4 परिवार प्रोफ़ाइल", en: "4 family profiles" },
            { hi: "अनलिमिटेड AI रिपोर्ट", en: "Unlimited AI extraction" },
            { hi: "अनलिमिटेड दवाई रिमाइंडर", en: "Unlimited reminders" },
            { hi: "पर्चा स्कैन", en: "Prescription scan" },
            { hi: "दवाई इंटरैक्शन चेक", en: "Drug interaction check" },
            { hi: "2% फ़ार्मेसी कैशबैक", en: "2% pharmacy cashback" },
            { hi: "कोई विज्ञापन नहीं", en: "No advertisements" },
        ],
    },
    {
        key: "family", price: 199, annualPrice: 1799, icon: "👨‍👩‍👧‍👦",
        gradient: "linear-gradient(135deg, #ede9fe, #e0e7ff, #dbeafe)",
        border: "2px solid #a5b4fc",
        features: [
            { hi: "सब कुछ Plus वाला +", en: "Everything in Plus +" },
            { hi: "10 GB स्टोरेज", en: "10 GB storage" },
            { hi: "10 परिवार प्रोफ़ाइल", en: "10 family profiles" },
            { hi: "बल्क डाउनलोड (ZIP)", en: "Bulk download (ZIP)" },
            { hi: "5% फ़ार्मेसी कैशबैक", en: "5% pharmacy cashback" },
            { hi: "साप्ताहिक हेल्थ रिपोर्ट", en: "Weekly health report" },
            { hi: "प्राइअरिटी सपोर्ट (4 घंटे)", en: "Priority support (4hr)" },
        ],
    },
];

export default function SubscriptionPage() {
    const { t, isHindi } = useLanguage();
    const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
    const [showPayment, setShowPayment] = useState(false);
    const [paymentPlan, setPaymentPlan] = useState<string>("");
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const handleUpgrade = (planKey: string, _price: number) => {
        setPaymentPlan(planKey);
        setShowPayment(true);
        setPaymentSuccess(false);
        // Simulate Razorpay payment processing
        setTimeout(() => {
            setPaymentSuccess(true);
        }, 2500);
    };

    return (
        <div className="w-full min-h-screen pb-nav">
            {/* Header */}
            <header className="relative px-5 pt-12 pb-5 overflow-hidden">
                <div className="absolute inset-0"
                    style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)" }} />
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20 animate-float"
                    style={{ background: "radial-gradient(circle, white, transparent)" }} />

                <div className="relative z-10 flex items-center gap-3">
                    <Link href="/profile" className="w-10 h-10 rounded-2xl flex items-center justify-center"
                        style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(10px)" }}>
                        <ArrowLeft size={18} className="text-white" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-extrabold text-white">{t("subscription.title")}</h1>
                        <p className="text-white/60 text-xs mt-0.5">
                            {isHindi ? "एक कप चाय से कम में" : "Less than a cup of chai"}
                        </p>
                    </div>
                </div>
            </header>

            <div className="px-4 -mt-3 relative z-10 space-y-4">
                {/* Billing Toggle */}
                <div className="card !p-1.5 flex items-center" style={{ border: "1px solid #e8eae3" }}>
                    <button
                        onClick={() => setBillingCycle("monthly")}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${billingCycle === "monthly" ? "text-white" : "text-text-muted"
                            }`}
                        style={billingCycle === "monthly" ? {
                            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                            boxShadow: "0 2px 8px rgba(99,102,241,0.3)",
                        } : {}}
                    >
                        {t("subscription.monthly")}
                    </button>
                    <button
                        onClick={() => setBillingCycle("annual")}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 relative ${billingCycle === "annual" ? "text-white" : "text-text-muted"
                            }`}
                        style={billingCycle === "annual" ? {
                            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                            boxShadow: "0 2px 8px rgba(99,102,241,0.3)",
                        } : {}}
                    >
                        {t("subscription.annual")}
                        <span className="absolute -top-3 -right-1 badge-green text-[9px] !py-0.5">
                            {isHindi ? "बचत!" : "Save!"}
                        </span>
                    </button>
                </div>

                {/* Plans */}
                <div className="space-y-4 stagger-children">
                    {plans.map((plan) => {
                        const monthlyPrice = billingCycle === "monthly" ? plan.price : Math.round(plan.annualPrice / 12);
                        const displayPrice = billingCycle === "monthly" ? plan.price : plan.annualPrice;
                        return (
                            <div key={plan.key} className="rounded-2xl p-5 relative overflow-hidden animate-slide-up"
                                style={{ background: plan.gradient, border: plan.border }}>
                                {plan.popular && (
                                    <div className="absolute top-0 right-0 text-white text-[10px] font-bold px-3 py-1 rounded-bl-2xl"
                                        style={{ background: "linear-gradient(135deg, #FF9933, #E67A00)" }}>
                                        {t("subscription.popular")} ⭐
                                    </div>
                                )}

                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-3xl">{plan.icon}</span>
                                    <div>
                                        <h3 className="text-lg font-extrabold">{t(`subscription.${plan.key}`)}</h3>
                                        {plan.price === 0 ? (
                                            <p className="text-sm text-text-muted">{isHindi ? "हमेशा मुफ़्त" : "Free forever"}</p>
                                        ) : (
                                            <div className="flex items-baseline gap-1.5">
                                                <span className="text-3xl font-extrabold" style={{ color: plan.key === "family" ? "#6366f1" : "#FF9933" }}>
                                                    ₹{billingCycle === "annual" ? monthlyPrice : displayPrice}
                                                </span>
                                                <span className="text-sm text-text-muted">{t("subscription.perMonth")}</span>
                                                {billingCycle === "annual" && (
                                                    <span className="badge-green text-[10px] ml-1">
                                                        ₹{plan.price * 12 - plan.annualPrice} {isHindi ? "बचत" : "saved"}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2.5 mb-5">
                                    {plan.features.map((f, i) => (
                                        <div key={i} className="flex items-center gap-2.5 text-sm">
                                            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                                                style={{ background: plan.key === "family" ? "#c7d2fe" : plan.key === "plus" ? "#bbf7d0" : "#e8eae3" }}>
                                                <Check size={10} className={plan.key === "family" ? "text-indigo-700" : plan.key === "plus" ? "text-emerald-700" : "text-text-muted"} />
                                            </div>
                                            <span className="text-text-primary font-medium">{isHindi ? f.hi : f.en}</span>
                                        </div>
                                    ))}
                                </div>

                                {plan.price === 0 ? (
                                    <div className="btn-ghost w-full text-sm pointer-events-none opacity-50 !bg-transparent">
                                        {t("subscription.currentPlan")}
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => handleUpgrade(plan.key, displayPrice)}
                                        className={`w-full text-sm gap-2 ${plan.key === "family" ? "btn-premium" : "btn-primary"}`}
                                    >
                                        {plan.key === "family" ? <Crown size={16} /> : <Zap size={16} />}
                                        {t("subscription.upgrade")} — ₹{displayPrice}
                                        {billingCycle === "annual" ? t("subscription.perYear") : t("subscription.perMonth")}
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>

                {billingCycle === "monthly" && (
                    <div className="rounded-2xl p-4 text-center cursor-pointer animate-fade-in"
                        style={{ background: "linear-gradient(135deg, #fef3c7, #fde68a30)", border: "1px solid #fde68a50" }}
                        onClick={() => setBillingCycle("annual")}>
                        <p className="text-sm font-bold text-amber-800">
                            💡 {isHindi ? "वार्षिक प्लान — सिर्फ़ ₹75/महीना" : "Annual Plan — just ₹75/month"}
                        </p>
                        <p className="text-xs text-amber-600 mt-1">
                            {isHindi ? "₹289 बचाएँ • एक बार पेमेंट" : "Save ₹289 • One-time payment"}
                        </p>
                    </div>
                )}

                {/* Razorpay Payment Simulation Modal */}
                {showPayment && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-5" style={{ background: "rgba(0,0,0,0.6)" }}>
                        <div className="card max-w-sm w-full text-center py-10 px-6" style={{ border: "2px solid #FF9933", background: "#fff" }}>
                            {!paymentSuccess ? (
                                <>
                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse" style={{ background: "linear-gradient(135deg, #2563eb, #3b82f6)", boxShadow: "0 6px 20px rgba(37,99,235,0.3)" }}>
                                        <Zap size={28} className="text-white" />
                                    </div>
                                    <h2 className="text-lg font-extrabold text-text-primary mb-2">
                                        {isHindi ? "Razorpay से पेमेंट प्रोसेस हो रहा है..." : "Processing payment via Razorpay..."}
                                    </h2>
                                    <p className="text-sm text-text-muted">
                                        {isHindi ? `साथी ${paymentPlan === "family" ? "फैमिली" : "प्लस"} • सुरक्षित भुगतान` : `Saathi ${paymentPlan === "family" ? "Family" : "Plus"} • Secure payment`}
                                    </p>
                                    <div className="mt-4 flex items-center justify-center gap-2 text-xs text-text-muted">
                                        🔒 {isHindi ? "256-bit SSL एन्क्रिप्टेड" : "256-bit SSL Encrypted"}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)", boxShadow: "0 6px 20px rgba(34,197,94,0.3)" }}>
                                        <Check size={28} className="text-white" />
                                    </div>
                                    <h2 className="text-xl font-extrabold text-text-primary mb-2">
                                        {isHindi ? "🎉 पेमेंट सफल!" : "🎉 Payment successful!"}
                                    </h2>
                                    <p className="text-sm text-text-muted mb-6">
                                        {isHindi ? `साथी ${paymentPlan === "family" ? "फैमिली" : "प्लस"} अब एक्टिव है!` : `Saathi ${paymentPlan === "family" ? "Family" : "Plus"} is now active!`}
                                    </p>
                                    <button onClick={() => setShowPayment(false)} className="btn-primary w-full text-sm">
                                        {isHindi ? "चलिए शुरू करते हैं!" : "Let's get started!"}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <BottomNav />
        </div>
    );
}
