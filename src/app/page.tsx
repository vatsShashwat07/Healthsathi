"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import LanguageToggle from "@/components/shared/LanguageToggle";
import ThemeToggle from "@/components/shared/ThemeToggle";
import FloatingOrgans from "@/components/shared/FloatingOrgans";
import {
  Heart,
  ArrowRight,
  Search,
  Upload,
  Pill,
  ShieldCheck,
  Stethoscope,
  Activity,
  Sparkles,
  Brain,
  Zap,
  TrendingUp,
  Globe,
  Eye,
  Dna,
} from "lucide-react";

/* ===== SVG Components ===== */

function HumanBodySVG() {
  return (
    <svg viewBox="0 0 200 500" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bodyFill" x1="100" y1="0" x2="100" y2="500" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.08" />
          <stop offset="50%" stopColor="#10b981" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.01" />
        </linearGradient>
        <linearGradient id="bodyStroke" x1="100" y1="0" x2="100" y2="500" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      {/* Head */}
      <circle cx="100" cy="40" r="28" fill="url(#bodyFill)" stroke="url(#bodyStroke)" strokeWidth="1.5" />
      {/* Neck */}
      <rect x="90" y="68" width="20" height="18" rx="6" fill="url(#bodyFill)" stroke="url(#bodyStroke)" strokeWidth="1" />
      {/* Torso */}
      <path d="M60 86 Q50 86 50 96 L55 200 Q55 210 65 210 L135 210 Q145 210 145 200 L150 96 Q150 86 140 86 Z"
        fill="url(#bodyFill)" stroke="url(#bodyStroke)" strokeWidth="1.5" />
      {/* Left Arm */}
      <path d="M55 92 Q35 95 25 120 L18 180 Q16 190 22 192 Q28 194 30 184 L40 140 Q42 132 50 128"
        fill="url(#bodyFill)" stroke="url(#bodyStroke)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Right Arm */}
      <path d="M145 92 Q165 95 175 120 L182 180 Q184 190 178 192 Q172 194 170 184 L160 140 Q158 132 150 128"
        fill="url(#bodyFill)" stroke="url(#bodyStroke)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Left Leg */}
      <path d="M75 210 L68 320 Q66 340 62 360 L55 430 Q53 445 60 448 Q67 451 68 436 L78 360 Q80 340 82 320 L88 210"
        fill="url(#bodyFill)" stroke="url(#bodyStroke)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Right Leg */}
      <path d="M125 210 L132 320 Q134 340 138 360 L145 430 Q147 445 140 448 Q133 451 132 436 L122 360 Q120 340 118 320 L112 210"
        fill="url(#bodyFill)" stroke="url(#bodyStroke)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Heart organ */}
      <circle cx="110" cy="130" r="8" fill="none" stroke="#ef4444" strokeWidth="1" strokeOpacity="0.3">
        <animate attributeName="r" values="7;9;7" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" values="0.2;0.5;0.2" dur="1.5s" repeatCount="indefinite" />
      </circle>
      {/* Lung left */}
      <ellipse cx="82" cy="130" rx="12" ry="20" fill="none" stroke="#10b981" strokeWidth="0.8" strokeOpacity="0.2">
        <animate attributeName="ry" values="18;22;18" dur="3s" repeatCount="indefinite" />
      </ellipse>
      {/* Lung right */}
      <ellipse cx="118" cy="130" rx="12" ry="20" fill="none" stroke="#10b981" strokeWidth="0.8" strokeOpacity="0.2">
        <animate attributeName="ry" values="18;22;18" dur="3s" repeatCount="indefinite" />
      </ellipse>
      {/* Brain indicator */}
      <circle cx="100" cy="35" r="4" fill="none" stroke="#8b5cf6" strokeWidth="0.8" strokeOpacity="0.3">
        <animate attributeName="stroke-opacity" values="0.15;0.4;0.15" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function HeartbeatLine() {
  return (
    <svg viewBox="0 0 800 100" className="w-full h-24 opacity-[0.06]" preserveAspectRatio="none">
      <path
        d="M0,50 L120,50 L140,50 L155,20 L170,80 L185,10 L200,90 L215,30 L230,50 L350,50 L370,50 L385,20 L400,80 L415,10 L430,90 L445,30 L460,50 L580,50 L600,50 L615,20 L630,80 L645,10 L660,90 L675,30 L690,50 L800,50"
        fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      >
        <animate attributeName="stroke-dashoffset" from="1600" to="0" dur="4s" repeatCount="indefinite" />
      </path>
      <style>{`path { stroke-dasharray: 1600; }`}</style>
    </svg>
  );
}

function DNAHelix() {
  return (
    <svg viewBox="0 0 60 400" className="w-16 h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: 20 }).map((_, i) => {
        const y = i * 20;
        const offset = Math.sin(i * 0.8) * 15;
        return (
          <g key={i}>
            <circle cx={30 + offset} cy={y} r="2.5" fill="#10b981" opacity={0.4 + Math.sin(i) * 0.3} />
            <circle cx={30 - offset} cy={y} r="2.5" fill="#059669" opacity={0.4 + Math.cos(i) * 0.3} />
            {i % 2 === 0 && (
              <line x1={30 + offset} y1={y} x2={30 - offset} y2={y}
                stroke="#10b981" strokeWidth="0.8" opacity="0.2" />
            )}
          </g>
        );
      })}
    </svg>
  );
}

function FloatingHealthIcons() {
  const icons = [
    { icon: "💊", x: "5%", y: "15%", delay: "0s", size: "text-2xl" },
    { icon: "🫀", x: "88%", y: "20%", delay: "1s", size: "text-3xl" },
    { icon: "🧬", x: "10%", y: "70%", delay: "2s", size: "text-xl" },
    { icon: "🩺", x: "85%", y: "65%", delay: "0.5s", size: "text-2xl" },
    { icon: "🧠", x: "15%", y: "45%", delay: "1.5s", size: "text-lg" },
    { icon: "🫁", x: "90%", y: "42%", delay: "2.5s", size: "text-xl" },
    { icon: "💉", x: "50%", y: "85%", delay: "3s", size: "text-lg" },
    { icon: "🦴", x: "70%", y: "12%", delay: "1.8s", size: "text-lg" },
  ];

  return (
    <>
      {icons.map((item, i) => (
        <div
          key={i}
          className={`absolute ${item.size} opacity-[0.07] pointer-events-none select-none`}
          style={{
            left: item.x,
            top: item.y,
            animation: `float 6s ease-in-out ${item.delay} infinite`,
          }}
        >
          {item.icon}
        </div>
      ))}
    </>
  );
}

function OrganCircuits() {
  return (
    <svg viewBox="0 0 600 600" className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none">
      {/* Circular network - looks like cell structure */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const cx = 300 + Math.cos(angle) * 180;
        const cy = 300 + Math.sin(angle) * 180;
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r={30 + i * 3} fill="none" stroke="#10b981" strokeWidth="1">
              <animate attributeName="r" values={`${28 + i * 3};${34 + i * 3};${28 + i * 3}`} dur={`${3 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
            <line x1="300" y1="300" x2={cx} y2={cy} stroke="#10b981" strokeWidth="0.5" strokeDasharray="4 4" />
          </g>
        );
      })}
      <circle cx="300" cy="300" r="40" fill="none" stroke="#10b981" strokeWidth="1.5">
        <animate attributeName="r" values="38;45;38" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="300" cy="300" r="8" fill="#10b981" opacity="0.15">
        <animate attributeName="opacity" values="0.1;0.25;0.1" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

/* ===== Main Page ===== */

export default function LandingPage() {
  const { t, isHindi } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#fafafa] dark:bg-[#0c0f14] text-gray-900 dark:text-white font-sans antialiased overflow-x-hidden selection:bg-emerald-100 selection:text-emerald-900">

      {/* Floating organs background */}
      <FloatingOrgans />

      {/* ===== Navigation ===== */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-white/70 dark:bg-[#0c0f14]/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-slate-800/50 shadow-sm" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white shadow-sm">
              <Heart size={16} />
            </div>
            <span className="font-extrabold tracking-tighter text-lg text-gray-900 dark:text-white">HealthSathi</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
            <a href="#features" className="hover:text-gray-900 transition-colors">{isHindi ? "फ़ीचर्स" : "Features"}</a>
            <a href="#how-it-works" className="hover:text-gray-900 transition-colors">{isHindi ? "कैसे काम करता है" : "How It Works"}</a>
            <a href="#pricing" className="hover:text-gray-900 transition-colors">{isHindi ? "प्लान" : "Pricing"}</a>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageToggle />
            <Link href="/login" className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-gray-800 transition-all shadow-sm active:scale-95 flex items-center min-h-[40px]">
              {isHindi ? "शुरू करें" : "Get Started"}
            </Link>
          </div>
        </div>
      </nav>

      {/* ===== Hero Section ===== */}
      <main className="pt-32 pb-20 px-6 relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Background: Abstract emerald glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-emerald-100/50 via-teal-50/30 to-transparent blur-3xl -z-10 rounded-full animate-pulse" style={{ animationDuration: "8s" }} />

        {/* Background: Heartbeat line across */}
        <div className="absolute bottom-0 left-0 w-full -z-10">
          <HeartbeatLine />
        </div>

        {/* Background: Floating health icons */}
        <FloatingHealthIcons />

        {/* Background: DNA helix left */}
        <div className="absolute left-0 top-20 h-[500px] -z-10 hidden lg:block">
          <DNAHelix />
        </div>
        {/* DNA helix right */}
        <div className="absolute right-0 top-40 h-[500px] -z-10 hidden lg:block" style={{ transform: "scaleX(-1)" }}>
          <DNAHelix />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          {/* Hero Text */}
          <div className="flex flex-col gap-6 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 w-fit min-h-[32px] min-w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-medium text-emerald-700">
                {isHindi ? "AI-powered स्वास्थ्य प्लेटफ़ॉर्म" : "AI-Powered Health Platform"}
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.1]">
              {isHindi ? "आपका स्वास्थ्य।" : "Your health."}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 animate-gradient bg-[length:200%_200%]">
                {isHindi ? "AI से संचालित।" : "Powered by AI."}
              </span>
            </h1>

            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-md font-medium leading-relaxed">
              {isHindi
                ? "लक्षण जाँचें, रिपोर्ट अपलोड करें, दवाइयाँ ट्रैक करें — सब एक जगह। हिंदी और अंग्रेज़ी दोनों में।"
                : "Check symptoms, upload reports, track medicines — all in one place. In both Hindi and English."}
            </p>

            <div className="flex items-center gap-4 pt-4">
              <Link href="/login" className="bg-gray-900 text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-gray-800 transition-all shadow-md shadow-gray-900/10 active:scale-95 flex items-center gap-2 group min-h-[48px]">
                {isHindi ? "मुफ़्त शुरू करें" : "Start Free"}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#features" className="bg-white text-gray-700 border border-gray-200 text-sm font-medium px-6 py-3 rounded-full hover:bg-gray-50 transition-all active:scale-95 min-h-[48px] flex items-center">
                {isHindi ? "और जानें" : "Learn More"}
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-4 pt-4 text-xs text-gray-400">
              <div className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-emerald-500" /> DPDPA 2023</div>
              <div className="flex items-center gap-1.5"><Globe size={14} className="text-emerald-500" /> हिंदी + English</div>
              <div className="flex items-center gap-1.5"><Zap size={14} className="text-emerald-500" /> {isHindi ? "तुरंत" : "Instant AI"}</div>
            </div>
          </div>

          {/* Hero Interactive — Human Body Card */}
          <div className="relative h-[550px] w-full hidden lg:block">
            {/* Human body silhouette in background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-60">
              <div className="w-48 h-[480px]">
                <HumanBodySVG />
              </div>
            </div>

            {/* Main floating card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white/80 backdrop-blur-xl border border-white/80 rounded-3xl p-6 shadow-2xl shadow-emerald-900/5 animate-float z-20">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                    {isHindi ? "स्वास्थ्य स्कोर" : "Health Score"}
                  </p>
                  <h3 className="text-2xl font-semibold tracking-tight text-gray-900">
                    {isHindi ? "बेहतरीन" : "Optimal"} <span className="text-emerald-500">✓</span>
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                  <Activity size={20} />
                </div>
              </div>
              {/* Mini heartbeat */}
              <svg viewBox="0 0 300 60" className="w-full h-12 mb-4">
                <path d="M0,30 L60,30 L75,30 L85,10 L95,50 L105,5 L115,55 L125,20 L135,30 L180,30 L195,30 L205,10 L215,50 L225,5 L235,55 L245,20 L255,30 L300,30"
                  fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" opacity="0.6">
                  <animate attributeName="stroke-dashoffset" from="600" to="0" dur="3s" repeatCount="indefinite" />
                </path>
                <style>{`path { stroke-dasharray: 600; }`}</style>
              </svg>
              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-emerald-50 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-gray-900">72</p>
                  <p className="text-[10px] text-gray-400 font-medium">{isHindi ? "हृदय" : "Heart"} ❤️</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-gray-900">98%</p>
                  <p className="text-[10px] text-gray-400 font-medium">SpO2 🫁</p>
                </div>
                <div className="bg-violet-50 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-gray-900">120</p>
                  <p className="text-[10px] text-gray-400 font-medium">{isHindi ? "शुगर" : "Sugar"} 🩸</p>
                </div>
              </div>
            </div>

            {/* Floating: AI Accuracy */}
            <div className="absolute top-8 right-0 bg-white p-4 rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50 flex items-center gap-3 animate-float-delayed z-30">
              <div className="w-12 h-12 rounded-full relative flex items-center justify-center" style={{ background: "conic-gradient(#10b981 92%, #f3f4f6 0)" }}>
                <div className="w-10 h-10 bg-white rounded-full absolute flex items-center justify-center">
                  <Brain size={16} className="text-emerald-500" />
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">{isHindi ? "AI सटीकता" : "AI Accuracy"}</p>
                <p className="text-lg font-semibold tracking-tight text-gray-900">95%</p>
              </div>
            </div>

            {/* Floating: Bilingual */}
            <div className="absolute bottom-12 left-0 bg-gray-900 p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-float z-30 -rotate-2">
              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                <Dna size={14} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">{isHindi ? "भाषा" : "Bilingual"}</p>
                <p className="text-sm font-medium text-white">हिंदी + English</p>
              </div>
            </div>

            {/* Floating: Emergency */}
            <div className="absolute bottom-8 right-8 bg-red-50 p-3 rounded-2xl border border-red-100 shadow-lg animate-float z-30 rotate-1" style={{ animationDelay: "1s" }}>
              <div className="flex items-center gap-2">
                <span className="text-lg">🚨</span>
                <div>
                  <p className="text-[10px] font-bold text-red-700 uppercase tracking-wider">{isHindi ? "इमरजेंसी" : "Emergency"}</p>
                  <p className="text-xs text-red-500">112 / 108</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ===== Bento Grid Features ===== */}
      <section id="features" className="max-w-7xl mx-auto px-6 pb-32 relative">
        {/* Background organ circuits */}
        <OrganCircuits />

        <div className="mb-12 text-center max-w-2xl mx-auto relative z-10">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 mb-4">
            {isHindi ? "एक ही जगह, सारी सुविधाएँ" : "Everything your health needs"}
          </h2>
          <p className="text-sm text-gray-500 font-light">
            {isHindi
              ? "लक्षण जाँचें, रिपोर्ट अपलोड करें, दवाइयाँ ट्रैक करें — बिना किसी अनुमान के"
              : "Stop guessing. Get AI-powered insights and track your complete health journey."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px] relative z-10">
          {/* AI Symptom Checker — spans 2 */}
          <div className="md:col-span-2 bg-white rounded-3xl p-8 border border-gray-200/60 shadow-sm hover:shadow-md transition-all duration-500 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-50 rounded-full blur-3xl -mr-24 -mt-24 group-hover:scale-125 transition-transform duration-700" />
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mb-4">
                  <Brain size={20} />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight text-gray-900 mb-2">
                  {isHindi ? "AI लक्षण जाँच" : "AI Symptom Checker"}
                </h3>
                <p className="text-sm text-gray-500 max-w-sm">
                  {isHindi
                    ? "बॉडी मैप पर टैप करें या बोलकर बताएँ — AI समझेगा और सलाह देगा"
                    : "Tap on the body map or speak — AI understands and provides personalized guidance"}
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 max-w-md w-full">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex-shrink-0 flex items-center justify-center mt-1">
                    <Heart size={10} className="text-emerald-600" />
                  </div>
                  <div className="bg-white px-4 py-2.5 rounded-2xl rounded-tl-none border border-gray-100 text-xs text-gray-600 shadow-sm">
                    {isHindi
                      ? "आपके लक्षणों के आधार पर, यह सामान्य सर्दी-ज़ुकाम हो सकता है। आराम करें और गर्म पानी पिएँ। 🩺"
                      : "Based on your symptoms, this could be common cold. Rest and stay hydrated with warm water. 🩺"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Report Upload */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200/60 shadow-sm hover:shadow-md transition-all duration-500 flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-full bg-gray-50 text-gray-900 flex items-center justify-center mb-4 border border-gray-100 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors duration-500">
                <Upload size={20} />
              </div>
              <h3 className="text-xl font-semibold tracking-tight text-gray-900 mb-2">
                {isHindi ? "रिपोर्ट अपलोड" : "Smart Reports"}
              </h3>
              <p className="text-sm text-gray-500">
                {isHindi ? "ब्लड टेस्ट, X-Ray — कुछ भी अपलोड करें, AI समझेगा" : "Upload blood tests, X-Rays — AI reads and explains them"}
              </p>
            </div>
            <div className="space-y-3 mt-6">
              {[
                { label: isHindi ? "PDF / फ़ोटो" : "PDF / Photo", icon: <Eye size={14} className="text-gray-400" />, on: true },
                { label: isHindi ? "AI विश्लेषण" : "AI Analysis", icon: <Sparkles size={14} className="text-gray-400" />, on: true },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    {item.icon} {item.label}
                  </div>
                  <div className={`w-10 h-5 ${item.on ? "bg-emerald-500" : "bg-gray-200"} rounded-full relative`}>
                    <div className={`w-4 h-4 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm ${item.on ? "translate-x-5" : ""} transition-transform`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Medicine Tracker — dark card */}
          <div className="bg-gray-900 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-500 flex flex-col justify-between text-white relative overflow-hidden group">
            <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-emerald-500/20 rounded-full blur-3xl group-hover:bg-emerald-400/30 transition-colors duration-700" />
            {/* Mini body SVG in bg */}
            <div className="absolute top-4 right-4 w-20 h-32 opacity-[0.06]">
              <HumanBodySVG />
            </div>
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-full bg-gray-800 text-emerald-400 flex items-center justify-center mb-4">
                <Pill size={20} />
              </div>
              <h3 className="text-xl font-semibold tracking-tight mb-2">
                {isHindi ? "दवाई ट्रैकर" : "Medicine Tracker"}
              </h3>
              <p className="text-sm text-gray-400">
                {isHindi ? "समय पर दवाई लें, रीफ़िल अलर्ट पाएँ, जेनेरिक विकल्प देखें" : "Take medicines on time, get refill alerts, explore generic options"}
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 relative z-10">
              <span className="px-3 py-1.5 rounded-lg bg-gray-800 border border-gray-700 text-xs font-medium text-gray-300">
                ⏰ {isHindi ? "रिमाइंडर" : "Reminders"}</span>
              <span className="px-3 py-1.5 rounded-lg bg-gray-800 border border-emerald-500/30 text-xs font-medium text-emerald-400">
                💰 {isHindi ? "जेनेरिक" : "Generics"}</span>
              <span className="px-3 py-1.5 rounded-lg bg-gray-800 border border-gray-700 text-xs font-medium text-gray-300">
                📦 {isHindi ? "रीफ़िल" : "Refill"}</span>
            </div>
          </div>

          {/* Emergency + Safety — spans 2 */}
          <div className="md:col-span-2 bg-white rounded-3xl p-8 border border-gray-200/60 shadow-sm flex flex-col md:flex-row items-center gap-8 justify-between hover:shadow-md transition-all duration-500 relative overflow-hidden">
            {/* Heartbeat line bg */}
            <div className="absolute bottom-0 left-0 w-full opacity-30">
              <HeartbeatLine />
            </div>
            <div className="max-w-sm relative z-10">
              <h3 className="text-2xl font-semibold tracking-tight text-gray-900 mb-2">
                {isHindi ? "इमरजेंसी + गोपनीयता" : "Emergency + Privacy"}
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                {isHindi
                  ? "एक टैप से 112/108 कॉल, निकटतम अस्पताल। DPDPA 2023 अनुपालन।"
                  : "One-tap 112/108 emergency call. Find nearest hospital. DPDPA 2023 compliant."}
              </p>
              <Link href="/login" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group w-fit min-h-[44px] min-w-fit">
                {isHindi ? "और जानें" : "Learn more"}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            {/* Safety ring with pulse */}
            <div className="relative w-40 h-40 flex-shrink-0">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-gray-200 animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-2 rounded-full flex items-center justify-center shadow-inner" style={{ background: "conic-gradient(#10b981 92%, #f3f4f6 0)" }}>
                <div className="w-[88%] h-[88%] bg-white rounded-full absolute flex flex-col items-center justify-center shadow-sm">
                  <span className="text-2xl">🛡️</span>
                  <span className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold mt-1">DPDPA ✓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== How It Works ===== */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-6 pb-28 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 mb-4">
            {isHindi ? "3 आसान स्टेप" : "3 simple steps"}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { num: "01", icon: <Search size={24} />, emoji: "🗣️", title: isHindi ? "लक्षण बताएँ" : "Describe symptoms", desc: isHindi ? "बोलें या टाइप करें — हिंदी/अंग्रेज़ी" : "Speak or type — in Hindi or English" },
            { num: "02", icon: <Sparkles size={24} />, emoji: "🧠", title: isHindi ? "AI विश्लेषण" : "AI analyzes", desc: isHindi ? "Gemini AI आपके लक्षणों का विश्लेषण करता है" : "Gemini AI analyzes your symptoms in seconds" },
            { num: "03", icon: <Stethoscope size={24} />, emoji: "💊", title: isHindi ? "सलाह पाएँ" : "Get guidance", desc: isHindi ? "दवाई, डॉक्टर, या घरेलू उपचार — तुरंत" : "Medicine, doctor, or home remedy — instantly" },
          ].map((step, i) => (
            <div key={i} className="bg-white rounded-3xl p-8 border border-gray-200/60 shadow-sm text-center hover:shadow-md transition-all duration-500 group">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-3xl flex items-center justify-center mx-auto mb-5 relative group-hover:scale-110 transition-transform duration-500">
                {step.emoji}
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center text-[10px] font-bold text-white">{step.num}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Stats ===== */}
      <section className="max-w-7xl mx-auto px-6 pb-28">
        <div className="bg-gray-900 rounded-3xl p-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]">
            <HeartbeatLine />
          </div>
          {[
            { value: "18+", label: isHindi ? "बीमारियाँ KB" : "Diseases in KB", emoji: "🏥" },
            { value: "2", label: isHindi ? "भाषाएँ" : "Languages", emoji: "🌐" },
            { value: "24/7", label: isHindi ? "उपलब्ध" : "Available", emoji: "⚡" },
            { value: "₹0", label: isHindi ? "शुरू करें" : "To Start", emoji: "🎉" },
          ].map((stat, i) => (
            <div key={i} className="relative z-10">
              <p className="text-sm mb-2">{stat.emoji}</p>
              <p className="text-3xl font-semibold text-white mb-1">{stat.value}</p>
              <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Pricing ===== */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 pb-28">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 mb-4">
            {isHindi ? "सिंपल प्लान" : "Simple pricing"}
          </h2>
          <p className="text-sm text-gray-500">{isHindi ? "कोई छिपा शुल्क नहीं" : "No hidden fees. Cancel anytime."}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { name: isHindi ? "मुफ़्त" : "Free", price: "₹0", features: isHindi ? ["3 AI जाँच/दिन", "दवाई ट्रैकिंग", "इमरजेंसी 🚨"] : ["3 AI checks/day", "Medicine tracking", "Emergency 🚨"], popular: false },
            { name: isHindi ? "साथी प्लस" : "Saathi Plus", price: "₹99", features: isHindi ? ["अनलिमिटेड AI जाँच", "रिपोर्ट अपलोड 📋", "फ़ैमिली प्रोफ़ाइल 👨‍👩‍👧‍👦"] : ["Unlimited AI checks", "Report upload 📋", "Family profiles 👨‍👩‍👧‍👦"], popular: true },
            { name: isHindi ? "फ़ैमिली" : "Family", price: "₹199", features: isHindi ? ["6 सदस्य तक", "प्राथमिकता सहायता ⚡", "सभी फ़ीचर्स ✨"] : ["Up to 6 members", "Priority support ⚡", "All features ✨"], popular: false },
          ].map((plan, i) => (
            <div key={i} className={`rounded-3xl p-8 border ${plan.popular ? "bg-gray-900 text-white border-gray-800 relative shadow-xl shadow-gray-900/20" : "bg-white border-gray-200/60 shadow-sm"} hover:shadow-lg transition-all duration-500 hover:-translate-y-1`}>
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-2xl rounded-tr-3xl">
                  {isHindi ? "लोकप्रिय" : "Popular"} ⭐
                </div>
              )}
              <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className={`text-3xl font-semibold ${plan.popular ? "text-emerald-400" : "text-gray-900"}`}>{plan.price}</span>
                <span className={`text-sm ${plan.popular ? "text-gray-400" : "text-gray-500"}`}>/{isHindi ? "महीना" : "mo"}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className={`flex items-center gap-2 text-sm ${plan.popular ? "text-gray-300" : "text-gray-600"}`}>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.popular ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-50 text-emerald-600"}`}>
                      <Zap size={10} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/login" className={`w-full text-center text-sm font-medium py-3 rounded-full block transition-all active:scale-95 min-h-[44px] flex items-center justify-center ${plan.popular ? "bg-white text-gray-900 hover:bg-gray-100" : "bg-gray-900 text-white hover:bg-gray-800"}`}>
                {isHindi ? "शुरू करें" : "Get Started"} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Final CTA ===== */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-gray-900 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-teal-500/10 rounded-full blur-3xl" />
          {/* Heartbeat in bg */}
          <div className="absolute inset-0 flex items-end opacity-10">
            <HeartbeatLine />
          </div>
          <div className="relative z-10">
            <p className="text-5xl mb-4">🫀</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 tracking-tight">
              {isHindi ? "आज ही शुरू करें" : "Start your health journey"}
            </h2>
            <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto">
              {isHindi ? "कोई क्रेडिट कार्ड नहीं चाहिए। फ़्री प्लान हमेशा के लिए।" : "No credit card required. Free plan forever. Your data stays private."}
            </p>
            <Link href="/login" className="bg-emerald-500 text-white text-sm font-semibold px-8 py-3.5 rounded-full hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/25 active:scale-95 inline-flex items-center gap-2 min-h-[48px]">
              {isHindi ? "अभी शुरू करें" : "Get Started Now"} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t border-gray-200/60 dark:border-slate-800 py-12 px-6 bg-white dark:bg-[#0f1319]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white">
              <Heart size={14} />
            </div>
            <span className="font-semibold tracking-tighter text-gray-900">HealthSathi</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Link href="/privacy" className="hover:text-gray-900 dark:hover:text-white transition-colors min-h-[44px] flex items-center">{isHindi ? "गोपनीयता" : "Privacy"}</Link>
            <Link href="/help" className="hover:text-gray-900 dark:hover:text-white transition-colors min-h-[44px] flex items-center">{isHindi ? "सहायता" : "Help"}</Link>
            <Link href="/emergency" className="hover:text-gray-900 dark:hover:text-white transition-colors min-h-[44px] flex items-center">{isHindi ? "इमरजेंसी" : "Emergency"}</Link>
          </div>
          <p className="text-xs text-gray-400">
            © 2024 HealthSathi — {isHindi ? "आपका स्वास्थ्य साथी" : "Your Health Companion"} 💚
          </p>
        </div>
      </footer>
    </div>
  );
}
