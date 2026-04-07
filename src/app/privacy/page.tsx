"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye, Trash2, Server, Mail } from "lucide-react";

export default function PrivacyPage() {
    const { isHindi } = useLanguage();
    return (
        <div className="min-h-screen bg-[#f8faf9]">
            <header className="bg-white border-b border-slate-100 px-5 pt-14 pb-5">
                <div className="max-w-3xl mx-auto flex items-center gap-3">
                    <Link href="/profile" className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                        <ArrowLeft size={18} className="text-slate-600" />
                    </Link>
                    <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                        {isHindi ? "गोपनीयता नीति" : "Privacy Policy"}
                    </h1>
                </div>
            </header>

            <div className="max-w-3xl mx-auto px-5 py-8 space-y-8">
                <p className="text-sm text-slate-500 font-medium">
                    {isHindi ? "अंतिम अपडेट: 7 अप्रैल 2025" : "Last updated: April 7, 2025"}
                </p>

                {[
                    {
                        icon: <Shield size={20} />,
                        title: isHindi ? "डेटा सुरक्षा" : "Data Protection",
                        content: isHindi
                            ? "HealthSathi भारत के डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम (DPDPA) 2023 के अनुसार संचालित होता है। आपका स्वास्थ्य डेटा एन्क्रिप्टेड और सुरक्षित है। हम AES-256 एन्क्रिप्शन का उपयोग करते हैं।"
                            : "HealthSathi operates in compliance with India's Digital Personal Data Protection Act (DPDPA) 2023. Your health data is encrypted and secure. We use AES-256 encryption for data at rest and TLS 1.3 for data in transit."
                    },
                    {
                        icon: <Eye size={20} />,
                        title: isHindi ? "हम क्या एकत्र करते हैं" : "What We Collect",
                        content: isHindi
                            ? "• ईमेल पता (लॉगिन के लिए)\n• लक्षण डेटा (AI विश्लेषण के लिए)\n• दवाई की जानकारी (ट्रैकिंग के लिए)\n• स्वास्थ्य रिपोर्ट (अपलोड की गई)\n• परिवार सदस्य जानकारी\n\nहम आपका डेटा कभी तीसरे पक्ष को नहीं बेचते।"
                            : "• Email address (for authentication)\n• Symptom data (for AI analysis — processed, not stored long-term)\n• Medicine information (for tracking & reminders)\n• Health records (uploaded by you)\n• Family member details\n\nWe NEVER sell your data to third parties."
                    },
                    {
                        icon: <Lock size={20} />,
                        title: isHindi ? "डेटा का उपयोग" : "How We Use Your Data",
                        content: isHindi
                            ? "आपका डेटा केवल इन उद्देश्यों के लिए उपयोग किया जाता है:\n• AI-आधारित लक्षण विश्लेषण\n• दवाई रिमाइंडर\n• स्वास्थ्य रिपोर्ट का AI विश्लेषण\n• सेवा सुधार (गुमनाम, एकत्रित डेटा)"
                            : "Your data is used solely for:\n• AI-powered symptom analysis (via Google Gemini — data is not retained by Google)\n• Medicine reminders & tracking\n• AI analysis of uploaded health reports\n• Service improvement (anonymized, aggregated analytics only)"
                    },
                    {
                        icon: <Server size={20} />,
                        title: isHindi ? "डेटा भंडारण" : "Data Storage",
                        content: isHindi
                            ? "आपका डेटा Supabase (PostgreSQL) पर संग्रहित है जो SOC 2 Type II प्रमाणित है। सर्वर भारत/सिंगापुर क्षेत्र में हैं। बैकअप एन्क्रिप्टेड हैं।"
                            : "Your data is stored on Supabase (PostgreSQL), which is SOC 2 Type II certified. Servers are located in India/Singapore region. All backups are encrypted. Data retention follows DPDPA 2023 guidelines."
                    },
                    {
                        icon: <Trash2 size={20} />,
                        title: isHindi ? "डेटा हटाना" : "Data Deletion",
                        content: isHindi
                            ? "आप कभी भी अपना सारा डेटा हटा सकते हैं:\n• प्रोफ़ाइल → 'सारा डेटा हटाएँ' बटन\n• 30 दिनों के भीतर सभी डेटा स्थायी रूप से हटा दिया जाएगा\n• आप vantiquityai@gmail.com पर भी अनुरोध कर सकते हैं"
                            : "You can delete all your data at any time:\n• Profile → 'Delete All Data' button\n• All data will be permanently erased within 30 days\n• You can also email us at vantiquityai@gmail.com for data deletion requests"
                    },
                    {
                        icon: <Mail size={20} />,
                        title: isHindi ? "संपर्क" : "Contact Us",
                        content: isHindi
                            ? "गोपनीयता संबंधित प्रश्नों के लिए:\n📧 vantiquityai@gmail.com\n\nडेटा सुरक्षा अधिकारी (DPO): HealthSathi Team"
                            : "For privacy-related queries:\n📧 vantiquityai@gmail.com\n\nData Protection Officer (DPO): HealthSathi Team"
                    },
                ].map((section, i) => (
                    <div key={i} className="bg-white rounded-3xl p-6 border border-slate-100/60">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                {section.icon}
                            </div>
                            <h2 className="text-lg font-extrabold text-slate-900">{section.title}</h2>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line font-medium">
                            {section.content}
                        </p>
                    </div>
                ))}

                <div className="text-center py-4">
                    <p className="text-xs text-slate-400 font-medium">
                        © 2024-2025 HealthSathi — {isHindi ? "DPDPA 2023 अनुपालन" : "DPDPA 2023 Compliant"} 🛡️
                    </p>
                </div>
            </div>
        </div>
    );
}
