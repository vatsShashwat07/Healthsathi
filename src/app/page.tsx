"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Search,
  FolderHeart,
  Pill,
  ArrowRight,
  Shield,
  Smartphone,
  Globe,
  Mic,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Heart,
  Check,
  Star,
  Users,
  Clock,
  Zap,
  Crown,
  Menu,
  X,
  Phone,
  FileText,
  Activity,
  Lock,
  Download,
} from "lucide-react";
import Link from "next/link";

/* ============== NAVBAR ============== */
function Navbar() {
  const { isHindi, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { href: "#features", label: isHindi ? "विशेषताएँ" : "Features" },
    { href: "#how-it-works", label: isHindi ? "कैसे काम करे" : "How it Works" },
    { href: "#pricing", label: isHindi ? "प्लान" : "Pricing" },
    { href: "#testimonials", label: isHindi ? "समीक्षा" : "Reviews" },
    { href: "#faq", label: isHindi ? "सवाल" : "FAQ" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
      ? "bg-white/80 backdrop-blur-xl shadow-sm border-b border-sage-100"
      : "bg-transparent"
      }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center"
            style={{
              background: scrolled
                ? "linear-gradient(135deg, #FF9933, #E67A00)"
                : "rgba(255,255,255,0.2)",
              boxShadow: scrolled ? "0 2px 8px rgba(255,153,51,0.3)" : "none",
            }}>
            <Heart size={18} className={scrolled ? "text-white" : "text-white"} />
          </div>
          <div>
            <span className={`text-lg sm:text-xl font-extrabold tracking-tight ${scrolled ? "text-text-primary" : "text-white"}`}>
              HealthSathi
            </span>
            <span className={`hidden sm:block text-[10px] font-medium -mt-1 ${scrolled ? "text-text-muted" : "text-white/60"}`}>
              हेल्थसाथी
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <a key={link.href} href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${scrolled ? "text-text-secondary" : "text-white/80 hover:text-white"}`}>
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setLanguage(isHindi ? "en" : "hi")}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all
              ${scrolled ? "bg-sage-100 text-text-secondary hover:bg-sage-200" : "bg-white/15 text-white hover:bg-white/25"}`}
          >
            <Globe size={12} />
            {isHindi ? "EN" : "हिंदी"}
          </button>

          <Link href="/dashboard"
            className="hidden sm:inline-flex btn-primary !py-2.5 !px-5 !min-h-[38px] text-sm !rounded-xl gap-1.5">
            {isHindi ? "ऐप खोलें" : "Open App"}
            <ArrowRight size={14} />
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className={`lg:hidden w-10 h-10 rounded-xl flex items-center justify-center ${scrolled ? "bg-sage-100" : "bg-white/15"}`}
          >
            {mobileMenu
              ? <X size={18} className={scrolled ? "text-text-primary" : "text-white"} />
              : <Menu size={18} className={scrolled ? "text-text-primary" : "text-white"} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenu && (
        <div className="lg:hidden bg-white border-t border-sage-100 shadow-lg animate-slide-down">
          <div className="p-4 space-y-1">
            {links.map((link) => (
              <a key={link.href} href={link.href}
                onClick={() => setMobileMenu(false)}
                className="block py-3 px-4 text-sm font-medium text-text-secondary hover:bg-sage-50 rounded-xl transition-colors">
                {link.label}
              </a>
            ))}
            <div className="pt-3 flex gap-2">
              <button onClick={() => { setLanguage(isHindi ? "en" : "hi"); setMobileMenu(false); }}
                className="btn-ghost flex-1 text-sm !min-h-[40px]">
                <Globe size={14} /> {isHindi ? "English" : "हिंदी"}
              </button>
              <Link href="/dashboard" className="btn-primary flex-1 text-sm !min-h-[40px]" onClick={() => setMobileMenu(false)}>
                {isHindi ? "ऐप खोलें" : "Open App"} <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ============== HERO ============== */
function HeroSection() {
  const { isHindi } = useLanguage();

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Animated gradient */}
      <div className="absolute inset-0 animate-gradient"
        style={{ background: "linear-gradient(135deg, #7A3300 0%, #8B3D00 20%, #993D00 40%, #B35400 60%, #CC6600 80%, #993D00 100%)", backgroundSize: "300% 300%" }} />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-[0.07] animate-float"
        style={{ background: "radial-gradient(circle, white, transparent)" }} />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle, #14b8a6, transparent)" }} />
      <div className="absolute top-40 right-[20%] w-2 h-2 bg-white/20 rounded-full animate-pulse-gentle" />
      <div className="absolute top-60 left-[15%] w-3 h-3 bg-white/10 rounded-full animate-float" />
      <div className="absolute bottom-40 left-[30%] w-1.5 h-1.5 bg-white/15 rounded-full animate-pulse-gentle" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20 w-full">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 animate-slide-down"
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(10px)" }}>
            <Sparkles size={14} className="text-yellow-200" />
            <span className="text-xs font-bold text-white" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}>
              {isHindi ? "AI-Powered • 140 करोड़ भारतीयों के लिए" : "AI-Powered • Built for 1.4B Indians"}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white leading-[1.1] tracking-tight" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.35)" }}>
            {isHindi ? (
              <>
                आपका <span className="bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent">भरोसेमंद</span>
                <br />हेल्थसाथी
              </>
            ) : (
              <>
                Your <span className="bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent">Trusted</span>
                <br />Health Companion
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-white mt-6 max-w-xl mx-auto leading-relaxed font-medium" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}>
            {isHindi
              ? "लक्षण जाँचें • रिपोर्ट समझें • दवाई याद दिलाएँ — सब हिंदी में, सब AI से, सब मुफ़्त।"
              : "Check symptoms • Understand reports • Medicine reminders — Hindi-first, AI-powered, free to start."}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
            <Link href="/dashboard" className="btn-primary w-full sm:w-auto text-base !py-4 !px-8 gap-2">
              {isHindi ? "अभी शुरू करें — मुफ़्त" : "Start Free Now"}
              <ArrowRight size={18} />
            </Link>
            <a href="#features" className="btn w-full sm:w-auto text-base !py-4 !px-8 text-white gap-2"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
              {isHindi ? "और जानें" : "Learn More"}
              <ChevronDown size={18} />
            </a>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-white/40 text-xs font-medium">
            <span className="flex items-center gap-1.5"><Lock size={12} /> {isHindi ? "DPDPA अनुपालन" : "DPDPA Compliant"}</span>
            <span className="flex items-center gap-1.5"><Shield size={12} /> {isHindi ? "कोई डेटा बिक्री नहीं" : "No Data Selling"}</span>
            <span className="flex items-center gap-1.5"><Smartphone size={12} /> {isHindi ? "PWA • ऑफ़लाइन" : "PWA • Works Offline"}</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown size={24} className="text-white/30" />
      </div>
    </section>
  );
}

/* ============== FEATURES ============== */
function FeaturesSection() {
  const { isHindi } = useLanguage();

  const features = [
    {
      icon: Search, gradient: "linear-gradient(135deg, #d3f3e4, #aae8cd)", iconColor: "text-emerald-700",
      shadowColor: "rgba(5,150,105,0.15)",
      title: isHindi ? "AI लक्षण जाँच" : "AI Symptom Checker",
      desc: isHindi
        ? "बस बताइए कहाँ दर्द है — AI आपको बताएगा क्या हो सकता है, घर पर क्या करें, और डॉक्टर को क्या बताएँ।"
        : "Point where it hurts — AI tells you possible causes, home care tips, and what to tell your doctor.",
      highlights: isHindi
        ? ["हिंदी में बोलें या लिखें", "बॉडी डायग्राम पर टैप", "WhatsApp पर रिपोर्ट भेजें"]
        : ["Speak or type in Hindi", "Tap on body diagram", "Share report via WhatsApp"],
    },
    {
      icon: FolderHeart, gradient: "linear-gradient(135deg, #ccfbf1, #cffafe)", iconColor: "text-teal-700",
      shadowColor: "rgba(13,148,136,0.15)",
      title: isHindi ? "हेल्थ रिकॉर्ड मैनेजर" : "Health Record Manager",
      desc: isHindi
        ? "फ़ोटो खींचो, AI पढ़ेगा — ब्लड टेस्ट, एक्स-रे, पर्चे सब एक जगह, पूरे परिवार के।"
        : "Snap a photo, AI reads it — blood tests, X-rays, prescriptions all in one place, for your entire family.",
      highlights: isHindi
        ? ["OCR से रिपोर्ट पढ़ाई", "असामान्य वैल्यू हाइलाइट", "सुरक्षित शेयर लिंक"]
        : ["OCR-powered extraction", "Abnormal values highlighted", "Secure share links"],
    },
    {
      icon: Pill, gradient: "linear-gradient(135deg, #fef3c7, #fde68a)", iconColor: "text-amber-700",
      shadowColor: "rgba(245,158,11,0.15)",
      title: isHindi ? "दवाई रिमाइंडर + रीफ़िल" : "Medicine Reminder + Refill",
      desc: isHindi
        ? "दवाई कभी न भूलें — AI पर्चा पढ़कर रिमाइंडर सेट करेगा, जेनेरिक से पैसे बचाएगा, और दवाई ख़त्म होने से पहले मँगवाएगा।"
        : "Never miss a dose — AI reads prescriptions, sets reminders, saves money with generics, auto-orders refills.",
      highlights: isHindi
        ? ["पर्चा स्कैन → ऑटो सेटअप", "जेनेरिक से 90% तक बचत", "दवाई ख़त्म होने की चेतावनी"]
        : ["Scan prescription → auto-setup", "Save up to 90% with generics", "Low stock alerts + refill"],
    },
  ];

  return (
    <section id="features" className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="badge-green text-xs mb-4 inline-block">
            {isHindi ? "मुख्य विशेषताएँ" : "Core Features"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
            {isHindi ? "3 समस्याएँ, 1 ऐप" : "3 Problems, 1 App"}
          </h2>
          <p className="text-text-muted mt-3 max-w-lg mx-auto">
            {isHindi ? "हर भारतीय की 3 सबसे बड़ी स्वास्थ्य समस्याओं का एक समाधान" : "One solution for every Indian family's 3 biggest health pain points"}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="rounded-3xl p-6 sm:p-8 transition-all duration-500 group hover:-translate-y-2"
                style={{ background: "#fafbf9", border: "1px solid #f0f2eb" }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
                  style={{ background: f.gradient, boxShadow: `0 8px 24px ${f.shadowColor}` }}>
                  <Icon size={28} className={f.iconColor} />
                </div>
                <h3 className="text-xl font-extrabold text-text-primary mb-2">{f.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed mb-4">{f.desc}</p>
                <ul className="space-y-2">
                  {f.highlights.map((h, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: f.gradient }}>
                        <Check size={10} className={f.iconColor} />
                      </div>
                      <span className="text-text-secondary font-medium">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============== HOW IT WORKS ============== */
function HowItWorksSection() {
  const { isHindi } = useLanguage();

  const steps = [
    { num: "01", emoji: "📱", title: isHindi ? "ऐप खोलें" : "Open the App", desc: isHindi ? "फ़ोन नंबर से OTP लॉगिन — 30 सेकंड" : "Login with phone OTP — 30 seconds" },
    { num: "02", emoji: "🗣️", title: isHindi ? "बताइए क्या हुआ" : "Describe Your Issue", desc: isHindi ? "हिंदी में बोलें या लिखें, बॉडी पर टैप करें" : "Speak or type in Hindi, tap on body diagram" },
    { num: "03", emoji: "🤖", title: isHindi ? "AI जवाब देगा" : "Get AI Analysis", desc: isHindi ? "संभावित कारण, घरेलू उपाय, डॉक्टर नोट्स — सब तुरंत" : "Possible causes, home care, doctor notes — instantly" },
    { num: "04", emoji: "📋", title: isHindi ? "रिकॉर्ड रखें" : "Track Everything", desc: isHindi ? "रिपोर्ट अपलोड करें, दवाई सेट करें, सब एक जगह" : "Upload reports, set medicine reminders, all in one place" },
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28"
      style={{ background: "linear-gradient(180deg, #f5f7f2 0%, #fff 100%)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="badge-blue text-xs mb-4 inline-block">
            {isHindi ? "कैसे काम करता है" : "How it Works"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
            {isHindi ? "4 आसान स्टेप में शुरू करें" : "Get Started in 4 Simple Steps"}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="text-center group animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="relative inline-block mb-4">
                <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-3xl mx-auto
                               group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500"
                  style={{ background: "linear-gradient(135deg, #f0fdf4, #d3f3e4)", boxShadow: "0 8px 24px rgba(5,150,105,0.1)" }}>
                  {step.emoji}
                </div>
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-extrabold text-white"
                  style={{ background: "linear-gradient(135deg, #FF9933, #E67A00)" }}>
                  {step.num}
                </span>
              </div>
              <h3 className="text-base font-bold text-text-primary mb-1">{step.title}</h3>
              <p className="text-sm text-text-muted">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============== STATS ============== */
function StatsSection() {
  const { isHindi } = useLanguage();
  const stats = [
    { value: "140Cr+", label: isHindi ? "भारत की जनसंख्या" : "India's Population" },
    { value: "78%", label: isHindi ? "हिंदी बोलने वाले" : "Hindi Speakers" },
    { value: "₹99", label: isHindi ? "प्रति माह से शुरू" : "Per Month Starts At" },
    { value: "90%", label: isHindi ? "जेनेरिक से बचत" : "Savings with Generics" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="text-center p-6 rounded-2xl" style={{ background: "#fafbf9" }}>
              <p className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                {s.value}
              </p>
              <p className="text-sm text-text-muted mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============== PRICING (Premium Animated Dark Cards) ============== */
function PricingSection() {
  const { isHindi } = useLanguage();
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  const plans = [
    {
      name: isHindi ? "मुफ़्त" : "Starter",
      subtitle: isHindi ? "शुरू करने के लिए" : "Perfect for beginners",
      price: "₹0",
      period: isHindi ? "हमेशा" : "forever",
      periodSub: isHindi ? "कोई क्रेडिट कार्ड नहीं" : "No credit card required",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
      ),
      features: isHindi
        ? ["3 लक्षण जाँच/दिन", "50 MB स्टोरेज", "1 प्रोफ़ाइल", "5 AI रिपोर्ट/महीना", "3 दवाई रिमाइंडर"]
        : ["3 symptom checks/day", "50 MB storage", "1 profile", "5 AI reports/mo", "3 reminders"],
      cta: isHindi ? "मुफ़्त शुरू करें" : "START FREE",
      highlighted: false,
      glowColors: "radial-gradient(at 0% 64%, hsla(142, 80%, 40%, 0.6) 0px, transparent 85%), radial-gradient(at 41% 94%, hsla(160, 80%, 70%, 0.4) 0px, transparent 85%), radial-gradient(at 100% 99%, hsla(174, 80%, 50%, 0.5) 0px, transparent 85%)",
    },
    {
      name: isHindi ? "साथी प्लस" : "Saathi Plus",
      subtitle: isHindi ? "पूरे परिवार के लिए" : "For your entire family",
      price: billing === "monthly" ? "₹99" : "₹799",
      period: billing === "monthly" ? (isHindi ? "/महीना" : "/ mo") : (isHindi ? "/साल" : "/ yr"),
      periodSub: billing === "annual" ? (isHindi ? "₹200+ बचत" : "Save ₹200+") : (isHindi ? "एक कप चाय से कम" : "Less than a cup of chai"),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /><path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" /></svg>
      ),
      features: isHindi
        ? ["सब कुछ Free में +", "अनलिमिटेड लक्षण जाँच", "5 GB स्टोरेज", "4 परिवार प्रोफ़ाइल", "अनलिमिटेड AI रिपोर्ट", "पर्चा स्कैन + दवाई चेक", "2% कैशबैक", "कोई विज्ञापन नहीं"]
        : ["Everything in Free +", "Unlimited symptom checks", "5 GB storage", "4 family profiles", "Unlimited AI reports", "Prescription scan + drug check", "2% cashback", "No ads"],
      cta: isHindi ? "अभी शुरू करें" : "GET STARTED",
      highlighted: true,
      glowColors: "radial-gradient(at 0% 64%, hsla(263, 93%, 56%, 1) 0px, transparent 85%), radial-gradient(at 41% 94%, hsla(284, 100%, 84%, 1) 0px, transparent 85%), radial-gradient(at 100% 99%, hsla(306, 100%, 57%, 1) 0px, transparent 85%)",
    },
    {
      name: isHindi ? "साथी फ़ैमिली" : "Saathi Family",
      subtitle: isHindi ? "बड़े परिवारों के लिए" : "For large families & clinics",
      price: billing === "monthly" ? "₹199" : "₹1599",
      period: billing === "monthly" ? (isHindi ? "/महीना" : "/ mo") : (isHindi ? "/साल" : "/ yr"),
      periodSub: billing === "annual" ? (isHindi ? "₹800+ बचत" : "Save ₹800+") : (isHindi ? "प्राइअरिटी सपोर्ट" : "Priority support"),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m16 6 4 14" /><path d="M12 6v14" /><path d="M8 8v12" /><path d="M4 4v16" /></svg>
      ),
      features: isHindi
        ? ["सब कुछ Plus में +", "10 GB स्टोरेज", "10 परिवार प्रोफ़ाइल", "बल्क डाउनलोड", "5% कैशबैक", "साप्ताहिक हेल्थ रिपोर्ट", "प्राइअरिटी सपोर्ट"]
        : ["Everything in Plus +", "10 GB storage", "10 family profiles", "Bulk download", "5% cashback", "Weekly health report", "Priority support"],
      cta: isHindi ? "अपग्रेड करें" : "UPGRADE",
      highlighted: false,
      glowColors: "radial-gradient(at 0% 64%, hsla(220, 80%, 50%, 0.5) 0px, transparent 85%), radial-gradient(at 41% 94%, hsla(240, 80%, 75%, 0.4) 0px, transparent 85%), radial-gradient(at 100% 99%, hsla(260, 80%, 60%, 0.5) 0px, transparent 85%)",
    },
  ];

  return (
    <section id="pricing" className="py-20 sm:py-28 overflow-hidden w-full"
      style={{ background: "hsla(240, 15%, 4%, 1)", fontFamily: "'Inter', sans-serif" }}>

      {/* Animated border keyframes */}
      <style>{`
        @keyframes rotateBorder {
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col items-center">

        {/* Header */}
        <div className="text-center mb-16 relative w-full flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-normal tracking-tight mb-4 text-white max-w-4xl mx-auto leading-[1.1]">
            {isHindi ? "एक कप चाय से भी " : "Plans for "}
            <span className="text-transparent bg-clip-text" style={{
              backgroundImage: "linear-gradient(135deg, hsl(277, 95%, 60%), hsl(306, 100%, 57%), hsl(284, 100%, 84%))"
            }}>
              {isHindi ? "कम दाम" : "every family"}
            </span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 mb-8">{isHindi ? "मुफ़्त शुरू करें, बाद में अपग्रेड करें" : "Start free, upgrade when you need more"}</p>

          {/* Monthly/Annual Toggle */}
          <div className="inline-flex items-center p-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-sm">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-6 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${billing === "monthly"
                ? "text-zinc-100 bg-white/10 shadow-sm border border-white/5"
                : "text-zinc-400 hover:text-zinc-200"
                }`}
            >
              {isHindi ? "मासिक" : "MONTHLY"}
            </button>
            <button
              onClick={() => setBilling("annual")}
              className={`px-6 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${billing === "annual"
                ? "text-zinc-100 bg-white/10 shadow-sm border border-white/5"
                : "text-zinc-400 hover:text-zinc-200"
                }`}
            >
              {isHindi ? "वार्षिक (-33%)" : "ANNUALLY (-33%)"}
            </button>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full items-stretch relative z-10">
          {plans.map((plan, i) => (
            <div key={i}
              className={`relative hover:bg-white/[0.04] transition-all duration-300 group rounded-2xl p-6 ${plan.highlighted ? "md:-mt-4 md:-mb-4" : ""}`}
              style={{
                backgroundColor: "hsla(240, 15%, 9%, 1)",
                backgroundImage: `radial-gradient(at 88% 40%, hsla(240, 15%, 9%, 1) 0px, transparent 85%), radial-gradient(at 49% 30%, hsla(240, 15%, 9%, 1) 0px, transparent 85%), radial-gradient(at 14% 26%, hsla(240, 15%, 9%, 1) 0px, transparent 85%), ${plan.glowColors}`,
                boxShadow: "0px -16px 24px 0px rgba(255, 255, 255, 0.25) inset",
              }}
            >
              {/* Animated border overlay */}
              <div style={{
                overflow: "hidden",
                pointerEvents: "none",
                position: "absolute",
                zIndex: -10,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "calc(100% + 2px)",
                height: "calc(100% + 2px)",
                backgroundImage: "linear-gradient(0deg, hsl(0, 0%, 100%) -50%, hsl(0, 0%, 40%) 100%)",
                borderRadius: "1rem",
              }}>
                <div style={{
                  pointerEvents: "none",
                  position: "fixed",
                  zIndex: 200,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%) rotate(0deg)",
                  transformOrigin: "left",
                  width: "200%",
                  height: "10rem",
                  backgroundImage: plan.highlighted
                    ? "linear-gradient(0deg, hsla(0, 0%, 100%, 0) 0%, hsl(277, 95%, 60%) 40%, hsl(277, 95%, 60%) 60%, hsla(0, 0%, 40%, 0) 100%)"
                    : "linear-gradient(0deg, hsla(0, 0%, 100%, 0) 0%, hsl(142, 70%, 45%) 40%, hsl(142, 70%, 45%) 60%, hsla(0, 0%, 40%, 0) 100%)",
                  animation: "rotateBorder 8s linear infinite",
                }} />
              </div>

              {/* Recommended Badge */}
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full z-30"
                  style={{
                    background: "linear-gradient(135deg, hsl(277, 95%, 60%), hsl(306, 100%, 57%))",
                    boxShadow: "0 0 20px hsla(277, 95%, 60%, 0.4)",
                  }}>
                  <span className="text-[10px] text-white font-semibold tracking-widest uppercase">
                    {isHindi ? "लोकप्रिय" : "RECOMMENDED"}
                  </span>
                </div>
              )}

              {/* Card Header — Icon + Name */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl border border-white/20 flex items-center justify-center"
                    style={{
                      background: plan.highlighted
                        ? "linear-gradient(135deg, hsla(277, 95%, 60%, 0.2), hsla(306, 100%, 57%, 0.2))"
                        : "linear-gradient(135deg, hsla(142, 70%, 45%, 0.2), hsla(174, 80%, 50%, 0.2))",
                    }}>
                    <span className={plan.highlighted ? "text-purple-400" : "text-emerald-400"}>{plan.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium tracking-tight text-white">{plan.name}</h3>
                    <p className="text-xs text-neutral-500">{plan.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-semibold tracking-tight text-white">{plan.price}</span>
                  <span className="text-sm text-neutral-400">{plan.period}</span>
                </div>
                <p className="text-xs text-neutral-500 mt-1">{plan.periodSub}</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 text-sm text-neutral-300 mb-8 flex-1">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <div className="shrink-0 mt-0.5" style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "1rem",
                      height: "1rem",
                      backgroundColor: plan.highlighted ? "hsl(277, 92%, 58%)" : "hsl(142, 70%, 45%)",
                      borderRadius: "50%",
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="hsla(240, 15%, 9%, 1)" stroke="hsla(240, 15%, 9%, 1)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link href="/subscription" className={`w-full py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center text-sm font-medium tracking-wide ${plan.highlighted
                ? "text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 shadow-[0_0_20px_hsla(277,95%,60%,0.3)]"
                : "text-zinc-300 border border-white/10 bg-white/5 hover:bg-white/10 hover:text-white"
                }`}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============== TESTIMONIALS ============== */
function TestimonialsSection() {
  const { isHindi } = useLanguage();

  const reviews = [
    {
      name: "रमेश कुमार", city: isHindi ? "कानपुर" : "Kanpur", avatar: "👨", rating: 5,
      text: isHindi ? "पहली बार किसी ऐप ने हिंदी में इतना अच्छा काम किया। मेरी माँ भी अपनी रिपोर्ट समझ पाती हैं अब।" : "First app that works so well in Hindi. Even my mother can now understand her reports."
    },
    {
      name: "प्रिया शर्मा", city: isHindi ? "जयपुर" : "Jaipur", avatar: "👩", rating: 5,
      text: isHindi ? "जेनेरिक दवाई से हर महीने ₹800 बचत हो रही है। बहुत ही काम का ऐप है!" : "Saving ₹800 every month with generic medicines. Extremely useful app!"
    },
    {
      name: "अमित वर्मा", city: isHindi ? "लखनऊ" : "Lucknow", avatar: "👨‍⚕️", rating: 5,
      text: isHindi ? "मरीज़ अब अपनी रिपोर्ट लेकर आते हैं तो सब organized होता है। डॉक्टर नोट्स फ़ीचर बहुत अच्छा है।" : "Patients come with organized reports now. The doctor notes feature is excellent."
    },
  ];

  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="badge-yellow text-xs mb-4 inline-block">
            {isHindi ? "उपयोगकर्ता समीक्षा" : "User Reviews"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
            {isHindi ? "लोग क्या कहते हैं" : "What People Say"}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="rounded-3xl p-6 sm:p-8 transition-all duration-500 hover:-translate-y-1"
              style={{ background: "#fafbf9", border: "1px solid #f0f2eb" }}>
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} size={16} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-text-primary leading-relaxed mb-6">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: "linear-gradient(135deg, #d3f3e4, #aae8cd)" }}>
                  {r.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold text-text-primary">{r.name}</p>
                  <p className="text-xs text-text-muted">{r.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============== FAQ ============== */
function FAQSection() {
  const { isHindi } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: isHindi ? "क्या HealthSathi मुफ़्त है?" : "Is HealthSathi free?",
      a: isHindi ? "हाँ! मुफ़्त प्लान में 3 लक्षण जाँच/दिन, 50MB स्टोरेज, और 3 दवाई रिमाइंडर शामिल हैं। कोई क्रेडिट कार्ड नहीं चाहिए।" : "Yes! Free plan includes 3 daily symptom checks, 50MB storage, and 3 medicine reminders. No credit card required."
    },
    {
      q: isHindi ? "क्या AI सलाह सुरक्षित है?" : "Is the AI advice safe?",
      a: isHindi ? "HealthSathi कभी निश्चित निदान नहीं देता। हर जवाब में 'यह डॉक्टर की सलाह का विकल्प नहीं है' लिखा होता है। इमरजेंसी में सीधे 108 कॉल बटन दिखता है।" : "HealthSathi never gives a definitive diagnosis. Every response includes a 'this is not a substitute for medical advice' disclaimer. Emergency cases show a direct 108 call button."
    },
    {
      q: isHindi ? "मेरा डेटा कहाँ स्टोर होता है?" : "Where is my data stored?",
      a: isHindi ? "आपका डेटा एन्क्रिप्टेड सर्वर पर भारत में स्टोर होता है। DPDPA 2023 का पूरा अनुपालन। AI को भेजने से पहले सभी PII हटा दिए जाते हैं।" : "Your data is stored on encrypted servers in India. Full DPDPA 2023 compliance. All PII is stripped before sending to AI."
    },
    {
      q: isHindi ? "परिवार के सदस्य कैसे जोड़ें?" : "How do I add family members?",
      a: isHindi ? "प्रोफ़ाइल में जाकर '+ सदस्य जोड़ें' पर टैप करें। मुफ़्त प्लान में 1, Plus में 4, और Family में 10 सदस्य जोड़ सकते हैं।" : "Go to Profile and tap '+ Add Member'. Free plan allows 1, Plus allows 4, and Family allows 10 members."
    },
    {
      q: isHindi ? "जेनेरिक दवाई कैसे बचत करती है?" : "How do generic medicines save money?",
      a: isHindi ? "जब आप दवाई जोड़ते हैं, AI उसका सस्ता जेनेरिक विकल्प दिखाता है — ज़्यादातर में 70-93% बचत होती है, और दोनों में एक ही सॉल्ट होता है।" : "When you add a medicine, AI shows its cheaper generic alternative — most save 70-93%, and both contain the same active ingredient."
    },
  ];

  return (
    <section id="faq" className="py-20 sm:py-28"
      style={{ background: "linear-gradient(180deg, #f5f7f2 0%, #fff 100%)" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="badge-blue text-xs mb-4 inline-block">FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
            {isHindi ? "अक्सर पूछे जाने वाले सवाल" : "Frequently Asked Questions"}
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-2xl overflow-hidden border border-sage-200 bg-white transition-all duration-300"
              style={openIndex === i ? { boxShadow: "0 4px 16px rgba(0,0,0,0.06)" } : {}}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-sm font-semibold text-text-primary pr-4">{faq.q}</span>
                {openIndex === i
                  ? <ChevronUp size={18} className="text-primary-600 shrink-0" />
                  : <ChevronDown size={18} className="text-text-muted shrink-0" />}
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5 animate-slide-down">
                  <p className="text-sm text-text-muted leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============== CTA ============== */
function CTASection() {
  const { isHindi } = useLanguage();

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 animate-gradient"
        style={{ background: "linear-gradient(135deg, #7A3300, #993F00, #CC6600, #FF9933)", backgroundSize: "300% 300%" }} />
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 animate-float"
        style={{ background: "radial-gradient(circle, white, transparent)" }} />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center text-white">
        <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight">
          {isHindi ? "आज ही अपना स्वास्थ्य साथी बनाएँ" : "Make Your Health Companion Today"}
        </h2>
        <p className="text-white/60 mt-4 max-w-lg mx-auto text-base">
          {isHindi ? "मुफ़्त प्लान से शुरू — कोई क्रेडिट कार्ड नहीं" : "Start with free plan — no credit card needed"}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
          <Link href="/dashboard" className="btn-primary w-full sm:w-auto text-base !py-4 !px-10 gap-2 !bg-white !text-emerald-700"
            style={{ boxShadow: "0 4px 20px rgba(255,255,255,0.3)" }}>
            {isHindi ? "अभी शुरू करें" : "Get Started Free"}
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============== FOOTER ============== */
function Footer() {
  const { isHindi } = useLanguage();

  return (
    <footer className="bg-text-primary text-white/60 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #FF9933, #E67A00)" }}>
                <Heart size={16} className="text-white" />
              </div>
              <span className="text-lg font-extrabold text-white">HealthSathi</span>
            </div>
            <p className="text-sm leading-relaxed">
              {isHindi ? "AI-पावर्ड हेल्थ कम्पैनियन — हिंदी में, भारत के लिए।" : "AI-Powered Health Companion — Hindi-first, built for India."}
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">{isHindi ? "प्रोडक्ट" : "Product"}</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#features" className="hover:text-white transition-colors">{isHindi ? "विशेषताएँ" : "Features"}</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">{isHindi ? "प्लान" : "Pricing"}</a></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">{isHindi ? "ऐप खोलें" : "Open App"}</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">{isHindi ? "कानूनी" : "Legal"}</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">{isHindi ? "गोपनीयता नीति" : "Privacy Policy"}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{isHindi ? "नियम व शर्तें" : "Terms of Service"}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{isHindi ? "DPDPA अनुपालन" : "DPDPA Compliance"}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">{isHindi ? "संपर्क" : "Contact"}</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2"><Phone size={12} /> +91 98765 43210</li>
              <li className="flex items-center gap-2"><FileText size={12} /> support@healthsathi.in</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">© 2026 HealthSathi (हेल्थसाथी). {isHindi ? "सर्वाधिकार सुरक्षित।" : "All rights reserved."}</p>
          <p className="text-xs flex items-center gap-2">
            <span>{isHindi ? "भारत में बनाया" : "Made in India"} 🇮🇳</span>
            <span>•</span>
            <span>{isHindi ? "प्यार से" : "with"} 🧡</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ============== MAIN PAGE ============== */
export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <StatsSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}
