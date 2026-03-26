"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import LanguageToggle from "@/components/shared/LanguageToggle";
import BottomNav from "@/components/shared/BottomNav";
import {
  Search,
  Upload,
  Pill,
  ChevronRight,
  Clock,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  Activity,
  CalendarCheck,
} from "lucide-react";
import Link from "next/link";

function getGreeting(t: (key: string) => string): string {
  const hour = new Date().getHours();
  if (hour < 12) return t("greeting.morning");
  if (hour < 17) return t("greeting.afternoon");
  if (hour < 21) return t("greeting.evening");
  return t("greeting.night");
}

export default function HomePage() {
  const { t, isHindi } = useLanguage();
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const supabase = createClient();
  const greeting = getGreeting(t);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [medicines, setMedicines] = React.useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [records, setRecords] = React.useState<any[]>([]);
  const [stats, setStats] = React.useState({ todayCount: 0, recordCount: 0 });

  React.useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    } else if (user) {
      // Fetch live data from Supabase!
      const fetchData = async () => {
        const [medsRes, recsRes] = await Promise.all([
          supabase.from('medicines').select('*').eq('user_id', user.id).limit(3),
          supabase.from('health_records').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(2)
        ]);

        if (medsRes.data) {
          setMedicines(medsRes.data);
          setStats(s => ({ ...s, todayCount: medsRes.data.length }));
        }
        if (recsRes.data) {
          setRecords(recsRes.data);
          setStats(s => ({ ...s, recordCount: recsRes.data.length }));
        }
      };

      fetchData();
    }
  }, [user, isLoading, router]);

  React.useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  const userName = user?.email ? user.email.split('@')[0] : "Ramesh";
  const userNameHi = user?.email ? userName : "रमेश";

  return (
    <div className="w-full min-h-screen pb-nav bg-white">
      {/* ===== Hero Header — Full Width Saffron ===== */}
      <header className="relative overflow-hidden px-5 md:px-12 lg:px-20 pt-14 pb-10 text-white">
        {/* Animated saffron gradient background */}
        <div
          className="absolute inset-0 animate-gradient"
          style={{
            background: "linear-gradient(135deg, #993D00 0%, #B35400 25%, #CC6600 50%, #E67A00 75%, #B35400 100%)",
            backgroundSize: "300% 300%",
          }}
        />
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 animate-float"
          style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }} />
        <div className="absolute top-20 left-10 w-2 h-2 bg-white/20 rounded-full animate-pulse-gentle" />
        <div className="absolute top-32 right-20 w-3 h-3 bg-white/15 rounded-full animate-float" />
        <div className="hidden md:block absolute top-16 right-[30%] w-4 h-4 bg-white/10 rounded-full animate-float" />
        <div className="hidden md:block absolute bottom-10 right-[20%] w-6 h-6 bg-white/5 rounded-full animate-pulse-gentle" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6 md:mb-10">
            <div>
              <p suppressHydrationWarning className="text-white text-sm md:text-base font-semibold tracking-wide" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}>
                {greeting}
              </p>
              <h1 suppressHydrationWarning className="text-3xl md:text-5xl font-extrabold mt-1 tracking-tight text-white" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
                {isHindi ? userNameHi : userName} {t("greeting.suffix")} 👋
              </h1>
            </div>
            <div className="flex items-center gap-2.5 md:gap-4">
              <LanguageToggle />
              <Link
                href="/emergency"
                className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-red-500/20 backdrop-blur-sm flex items-center justify-center border border-red-400/30 transition-transform hover:scale-105 active:scale-95"
                aria-label="Emergency"
              >
                <AlertTriangle className="text-red-300" size={22} />
              </Link>
            </div>
          </div>

          {/* Health Summary Card */}
          <div className="bg-black/20 backdrop-blur-md rounded-2xl px-5 md:px-8 py-4 mb-3 border border-white/20 transition-all max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                <Activity size={20} className="text-white" />
              </div>
              <div>
                <p className="text-white text-xs font-bold tracking-wider uppercase" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.4)" }}>
                  {isHindi ? "स्वास्थ्य सारांश" : "Health Summary"}
                </p>
                <p className="text-sm md:text-base text-white font-bold" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}>
                  {isHindi
                    ? `${stats.todayCount} दवाइयाँ आज • ${stats.recordCount} रिपोर्ट • 0 दिन स्ट्रीक`
                    : `${stats.todayCount} medicines today • ${stats.recordCount} records • 0-day streak`}
                </p>
              </div>
            </div>
            <p className="text-center text-white/40 text-lg mt-1">🔥</p>
          </div>

          {/* Desktop-only stats pills */}
          <div className="hidden lg:flex gap-4 mt-4">
            {[
              { icon: "🔥", label: isHindi ? "7 दिन स्ट्रीक" : "7 Day Streak" },
              { icon: "📊", label: isHindi ? "89% पालन" : "89% Adherence" },
              { icon: "📅", label: isHindi ? "अगली: कल सुबह 8 बजे" : "Next: Tomorrow 8 AM" },
            ].map((s, i) => (
              <div key={i} className="bg-black/20 backdrop-blur-md rounded-xl px-5 py-3 border border-white/20 flex items-center gap-2">
                <span className="text-lg">{s.icon}</span>
                <span className="text-white text-sm font-bold" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ===== Main Content ===== */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 -mt-2">
        {/* Quick Actions */}
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-8">
          {[
            { icon: <Search size={24} />, label: isHindi ? "लक्षण जाँचें" : "Check Symptoms", href: "/symptoms", color: "bg-orange-50", iconColor: "text-primary-600" },
            { icon: <Upload size={24} />, label: isHindi ? "रिपोर्ट अपलोड" : "Upload Record", href: "/records", color: "bg-amber-50", iconColor: "text-amber-600" },
            { icon: <Pill size={24} />, label: isHindi ? "दवाई जोड़ें" : "Add Medicine", href: "/medicines", color: "bg-yellow-50", iconColor: "text-yellow-600" },
            { icon: <CalendarCheck size={24} />, label: isHindi ? "अपॉइंटमेंट" : "Appointments", href: "/profile", color: "bg-blue-50", iconColor: "text-blue-600" },
            { icon: <Activity size={24} />, label: isHindi ? "रिपोर्ट देखें" : "View Reports", href: "/records", color: "bg-purple-50", iconColor: "text-purple-600" },
            { icon: <Sparkles size={24} />, label: isHindi ? "AI सलाह" : "AI Advice", href: "/symptoms", color: "bg-pink-50", iconColor: "text-pink-600" },
          ].map((action, i) => (
            <Link
              key={i}
              href={action.href}
              className={`${action.color} rounded-2xl p-4 md:p-5 flex flex-col items-center gap-2.5 transition-all hover:scale-[1.03] hover:shadow-lg active:scale-[0.98]`}
              style={{ border: "0.5px solid rgba(26, 26, 26, 0.08)" }}
            >
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl ${action.color} flex items-center justify-center ${action.iconColor}`}>
                {action.icon}
              </div>
              <span className="text-xs md:text-sm font-semibold text-ink-900 text-center leading-tight">
                {action.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Two-Column Grid on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* ===== LEFT COLUMN: Today's Medicines ===== */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-primary" />
                <h2 className="text-lg md:text-xl font-bold text-ink-900">
                  {isHindi ? "आज की दवाइयाँ" : "Today's Medicines"}
                </h2>
              </div>
              <Link
                href="/medicines"
                className="text-sm font-semibold text-primary flex items-center gap-1 hover:gap-2 transition-all"
              >
                {isHindi ? "सभी देखें" : "View All"} <ChevronRight size={16} />
              </Link>
            </div>

            <div className="space-y-3">
              {medicines.length === 0 ? (
                <div className="p-4 bg-sage-50 rounded-2xl border border-dashed border-sage-200 text-center">
                  <p className="text-xs text-text-muted">{isHindi ? "आज कोई दवाई नहीं है।" : "No medicines scheduled for today."}</p>
                </div>
              ) : (
                medicines.map((med) => (
                  <div
                    key={med.id}
                    className={`rounded-2xl p-4 flex items-center justify-between transition-all ${med.status === "taken" ? "bg-gray-50 opacity-70" : "bg-white shadow-card-border"
                      }`}
                    style={{ borderLeft: `3px solid ${med.status === "taken" ? "#22c55e" : "#FF9933"}` }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg ${med.status === "taken" ? "bg-green-100" : "bg-orange-50"
                          }`}
                      >
                        {med.status === "taken" ? "✅" : med.emoji}
                      </div>
                      <div>
                        <p suppressHydrationWarning className={`font-semibold text-[15px] ${med.status === "taken" ? "text-gray-400 line-through" : "text-ink-900"}`}>
                          {isHindi ? med.name_hi : med.name_en}
                        </p>
                        <p suppressHydrationWarning className="text-xs text-gray-400">{isHindi ? med.time_hi : med.time_en}</p>
                      </div>
                    </div>
                    {med.status === "pending" ? (
                      <button className="px-5 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-all active:scale-95 shadow-saffron">
                        {isHindi ? "लिया" : "Take"}
                      </button>
                    ) : (
                      <span className="text-green-500 text-sm font-semibold flex items-center gap-1">✓ {isHindi ? "लिया" : "Taken"}</span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ===== RIGHT COLUMN: Records + Upgrade ===== */}
          <div className="space-y-6">
            {/* Recent Records */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg md:text-xl font-bold text-ink-900">
                  {isHindi ? "हाल की रिपोर्ट" : "Recent Records"}
                </h2>
                <Link
                  href="/records"
                  className="text-sm font-semibold text-primary flex items-center gap-1 hover:gap-2 transition-all"
                >
                  {isHindi ? "सभी देखें" : "View All"} <ChevronRight size={16} />
                </Link>
              </div>
              <div className="space-y-3">
                {records.length === 0 ? (
                  <div className="p-4 bg-sage-50 rounded-2xl border border-dashed border-sage-200 text-center">
                    <p className="text-xs text-text-muted">{isHindi ? "अभी तक कोई रिपोर्ट नहीं है।" : "No health records found."}</p>
                  </div>
                ) : (
                  records.map((rec) => (
                    <div
                      key={rec.id}
                      className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-card-border transition-all hover:shadow-card-hover cursor-pointer"
                    >
                      <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center text-lg">
                        {rec.emoji || '📋'}
                      </div>
                      <div className="flex-1">
                        <p suppressHydrationWarning className="font-semibold text-ink-900 text-[15px]">{isHindi ? rec.name_hi : rec.name_en}</p>
                        <p suppressHydrationWarning className="text-xs text-gray-400 shrink-0">{rec.record_date} • {rec.lab_name || "Self"}</p>
                      </div>
                      <ArrowRight size={16} className="text-gray-300" />
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Upgrade Banner — Saffron */}
            <div
              className="rounded-2xl p-6 text-white relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #FF9933 0%, #E67A00 50%, #CC6600 100%)",
              }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={20} className="text-yellow-200" />
                  <h3 className="font-bold text-lg">{isHindi ? "साथी प्लस" : "Saathi Plus"}</h3>
                </div>
                <p className="text-white/80 text-sm mb-4">
                  {isHindi
                    ? "अनलिमिटेड AI रिपोर्ट, परिवार प्रोफ़ाइल, और बहुत कुछ!"
                    : "Unlimited AI reports, family profiles, and much more!"}
                </p>
                <Link
                  href="/subscription"
                  className="inline-flex items-center gap-2 bg-white text-primary-700 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-white/90 transition-all active:scale-95"
                >
                  {isHindi ? "अपग्रेड करें" : "Upgrade Now"} <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
