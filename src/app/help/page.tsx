"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { ArrowLeft, HelpCircle, MessageCircle, Mail, Phone, FileText, Pill, Upload, Search, Shield, CreditCard, Heart } from "lucide-react";

export default function HelpPage() {
    const { isHindi } = useLanguage();

    const faqs = [
        {
            q: isHindi ? "HealthSathi क्या है?" : "What is HealthSathi?",
            a: isHindi
                ? "HealthSathi एक AI-संचालित स्वास्थ्य प्लेटफ़ॉर्म है जो लक्षण जाँच, दवाई ट्रैकिंग, रिपोर्ट अपलोड और इमरजेंसी सहायता प्रदान करता है। हिंदी और अंग्रेज़ी दोनों में उपलब्ध।"
                : "HealthSathi is an AI-powered health platform that provides symptom checking, medicine tracking, report uploading, and emergency assistance. Available in both Hindi and English."
        },
        {
            q: isHindi ? "AI लक्षण जाँच कैसे काम करता है?" : "How does the AI symptom checker work?",
            a: isHindi
                ? "बॉडी मैप पर टैप करें या बोलकर/टाइप करके अपने लक्षण बताएँ। Google Gemini AI आपके लक्षणों का विश्लेषण करेगा और संभावित कारण, गंभीरता स्तर, और सुझाव देगा।"
                : "Tap on the body map or speak/type your symptoms. Google Gemini AI will analyze your symptoms and provide possible causes, severity level, and recommendations."
        },
        {
            q: isHindi ? "क्या मेरा डेटा सुरक्षित है?" : "Is my data secure?",
            a: isHindi
                ? "हाँ! हम DPDPA 2023 का पालन करते हैं। AES-256 एन्क्रिप्शन, SOC 2 प्रमाणित सर्वर। आपका डेटा कभी तीसरे पक्ष को नहीं बेचा जाता।"
                : "Yes! We comply with DPDPA 2023. AES-256 encryption, SOC 2 certified servers. Your data is never sold to third parties."
        },
        {
            q: isHindi ? "क्या मैं अपना डेटा हटा सकता/सकती हूँ?" : "Can I delete my data?",
            a: isHindi
                ? "हाँ, प्रोफ़ाइल पेज से 'सारा डेटा हटाएँ' बटन दबाएँ। 30 दिनों में सब कुछ स्थायी रूप से हटा दिया जाएगा।"
                : "Yes, press 'Delete All Data' button from the Profile page. Everything will be permanently erased within 30 days."
        },
        {
            q: isHindi ? "दवाई कैसे ऑर्डर करें?" : "How to order medicines?",
            a: isHindi
                ? "दवाई पेज पर 'ऑर्डर' बटन दबाएँ → दवाई का नाम डालें → आपके नज़दीकी मेडिकल स्टोर दिखेंगे जहाँ से आप ऑर्डर कर सकते हैं।"
                : "Press 'Order' on the medicine page → Enter medicine name → Nearby medical stores will be shown where you can order from."
        },
        {
            q: isHindi ? "फ़्री प्लान में क्या मिलता है?" : "What's included in the Free plan?",
            a: isHindi
                ? "3 AI जाँच/दिन, दवाई ट्रैकिंग, इमरजेंसी कॉल, और फ़ैमिली प्रोफ़ाइल (1 सदस्य)।"
                : "3 AI checks/day, medicine tracking, emergency call, and family profile (1 member)."
        },
    ];

    const features = [
        { icon: <Search size={18} />, label: isHindi ? "AI लक्षण जाँच" : "AI Symptom Check", desc: isHindi ? "बोलें या टाइप करें" : "Speak or type" },
        { icon: <Pill size={18} />, label: isHindi ? "दवाई ट्रैकर" : "Medicine Tracker", desc: isHindi ? "रिमाइंडर + रीफ़िल" : "Reminders + refill" },
        { icon: <Upload size={18} />, label: isHindi ? "रिपोर्ट अपलोड" : "Report Upload", desc: isHindi ? "PDF/फ़ोटो AI विश्लेषण" : "PDF/Photo AI analysis" },
        { icon: <Phone size={18} />, label: isHindi ? "इमरजेंसी" : "Emergency", desc: isHindi ? "112/108 एक टैप" : "112/108 one tap" },
        { icon: <Shield size={18} />, label: isHindi ? "गोपनीयता" : "Privacy", desc: isHindi ? "DPDPA 2023" : "DPDPA 2023 compliant" },
        { icon: <CreditCard size={18} />, label: isHindi ? "सब्सक्रिप्शन" : "Plans", desc: isHindi ? "मुफ़्त से शुरू" : "Start free" },
    ];

    return (
        <div className="min-h-screen bg-[#f8faf9]">
            <header className="bg-white border-b border-slate-100 px-5 pt-14 pb-5">
                <div className="max-w-3xl mx-auto flex items-center gap-3">
                    <Link href="/profile" className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                        <ArrowLeft size={18} className="text-slate-600" />
                    </Link>
                    <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                        {isHindi ? "सहायता केंद्र" : "Help Centre"}
                    </h1>
                </div>
            </header>

            <div className="max-w-3xl mx-auto px-5 py-8 space-y-8">
                {/* Contact */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-6 border border-emerald-100/60">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-11 h-11 rounded-2xl bg-emerald-100 flex items-center justify-center">
                            <MessageCircle size={20} className="text-emerald-600" />
                        </div>
                        <div>
                            <h2 className="text-lg font-extrabold text-slate-900">{isHindi ? "हमसे संपर्क करें" : "Contact Us"}</h2>
                            <p className="text-sm text-slate-500 font-medium">{isHindi ? "हम मदद के लिए तैयार हैं" : "We're here to help"}</p>
                        </div>
                    </div>
                    <a href="mailto:vantiquityai@gmail.com" className="flex items-center gap-2 mt-3 bg-white rounded-2xl px-4 py-3 border border-emerald-100 hover:shadow-md transition-all">
                        <Mail size={18} className="text-emerald-600" />
                        <span className="text-sm font-bold text-slate-900">vantiquityai@gmail.com</span>
                    </a>
                </div>

                {/* Features */}
                <div>
                    <h2 className="text-lg font-extrabold text-slate-900 mb-4">{isHindi ? "फ़ीचर्स" : "Features"}</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {features.map((f, i) => (
                            <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100/60">
                                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">{f.icon}</div>
                                <p className="text-sm font-bold text-slate-900">{f.label}</p>
                                <p className="text-xs text-slate-400 font-medium">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ */}
                <div>
                    <h2 className="text-lg font-extrabold text-slate-900 mb-4">{isHindi ? "अक्सर पूछे जाने वाले प्रश्न" : "FAQ"}</h2>
                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <details key={i} className="bg-white rounded-2xl border border-slate-100/60 group">
                                <summary className="px-5 py-4 cursor-pointer text-sm font-bold text-slate-900 flex items-center justify-between list-none">
                                    {faq.q}
                                    <span className="text-slate-300 group-open:rotate-180 transition-transform text-lg">▾</span>
                                </summary>
                                <p className="px-5 pb-4 text-sm text-slate-600 leading-relaxed font-medium">{faq.a}</p>
                            </details>
                        ))}
                    </div>
                </div>

                {/* Legal */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100/60">
                    <h2 className="text-lg font-extrabold text-slate-900 mb-3">{isHindi ? "कानूनी" : "Legal"}</h2>
                    <div className="space-y-2">
                        <Link href="/privacy" className="flex items-center gap-2 py-2 text-sm font-semibold text-emerald-600 hover:underline">
                            <FileText size={14} /> {isHindi ? "गोपनीयता नीति" : "Privacy Policy"}
                        </Link>
                        <p className="text-xs text-slate-400 mt-3 font-medium">
                            {isHindi
                                ? "⚠️ HealthSathi चिकित्सा सलाह का विकल्प नहीं है। गंभीर स्थिति में हमेशा डॉक्टर से मिलें।"
                                : "⚠️ HealthSathi is NOT a substitute for professional medical advice. Always consult a doctor for serious conditions."}
                        </p>
                    </div>
                </div>

                <div className="text-center py-4">
                    <div className="flex items-center justify-center gap-1.5 text-emerald-500 mb-1"><Heart size={14} /> HealthSathi</div>
                    <p className="text-xs text-slate-400 font-medium">
                        {isHindi ? "आपका स्वास्थ्य साथी" : "Your Health Companion"} 💚
                    </p>
                </div>
            </div>
        </div>
    );
}
