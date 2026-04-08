"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import LanguageToggle from "@/components/shared/LanguageToggle";
import ThemeToggle from "@/components/shared/ThemeToggle";
import FloatingOrgans from "@/components/shared/FloatingOrgans";
import BottomNav from "@/components/shared/BottomNav";
import {
  Search, Upload, Pill, ChevronRight, Clock, ArrowRight,
  Sparkles, AlertTriangle, Activity, CalendarCheck, Heart,
  Stethoscope, Shield,
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
  const [stats, setStats] = React.useState({ medCount: 0, recordCount: 0 });

  React.useEffect(() => {
    if (!isLoading && !user) { router.push("/login"); }
    else if (user) {
      const fetchData = async () => {
        const [medsRes, recsRes] = await Promise.all([
          supabase.from('medicines').select('*').eq('user_id', user.id).limit(3),
          supabase.from('health_records').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(3)
        ]);
        if (medsRes.data) { setMedicines(medsRes.data); setStats(s => ({ ...s, medCount: medsRes.data.length })); }
        if (recsRes.data) { setRecords(recsRes.data); setStats(s => ({ ...s, recordCount: recsRes.data.length })); }
      };
      fetchData();
    }
  }, [user, isLoading, router]);

  const userName = user?.email ? user.email.split('@')[0] : "";

  return (
    <div className="w-full min-h-screen pb-nav bg-[#f8faf9] dark:bg-[#0c0f14] relative">
      {/* Floating organs background */}
      <FloatingOrgans />

      {/* Header */}
      <header className="px-5 md:px-12 pt-14 pb-6 bg-white dark:bg-[#1a1f2e] dark:bg-[#0f1319] border-b border-slate-100/60 dark:border-slate-800/40 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-1">
            <div>
              <p suppressHydrationWarning className="text-slate-400 dark:text-slate-500 text-sm font-medium">{greeting}</p>
              <h1 suppressHydrationWarning className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mt-0.5 tracking-tight">
                {userName ? `${userName} 👋` : "HealthSathi 👋"}
              </h1>
            </div>
            <div className="flex items-center gap-2.5">
              <ThemeToggle />
              <LanguageToggle />
              <Link href="/emergency" className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center border border-red-100 hover:scale-105 active:scale-95 transition-transform">
                <AlertTriangle className="text-red-500" size={20} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {[
            { icon: <Search size={22} />, label: isHindi ? "लक्षण जाँचें" : "Symptoms", href: "/symptoms", bg: "bg-emerald-50", iconColor: "text-emerald-600" },
            { icon: <Upload size={22} />, label: isHindi ? "रिपोर्ट" : "Reports", href: "/records", bg: "bg-teal-50", iconColor: "text-teal-600" },
            { icon: <Pill size={22} />, label: isHindi ? "दवाइयाँ" : "Medicines", href: "/medicines", bg: "bg-violet-50", iconColor: "text-violet-600" },
            { icon: <Stethoscope size={22} />, label: isHindi ? "AI सलाह" : "AI Advice", href: "/symptoms", bg: "bg-blue-50", iconColor: "text-blue-600" },
            { icon: <Heart size={22} />, label: isHindi ? "इमरजेंसी" : "Emergency", href: "/emergency", bg: "bg-red-50", iconColor: "text-red-500" },
            { icon: <CalendarCheck size={22} />, label: isHindi ? "प्लान" : "Plans", href: "/subscription", bg: "bg-amber-50", iconColor: "text-amber-600" },
          ].map((action, i) => (
            <Link key={i} href={action.href}
              className="bg-white dark:bg-[#1a1f2e] rounded-3xl p-4 md:p-5 flex flex-col items-center gap-2.5 transition-all duration-500 hover:shadow-lg hover:-translate-y-1 active:scale-[0.97] border border-slate-100/60 group">
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${action.bg} flex items-center justify-center ${action.iconColor} group-hover:scale-110 transition-transform duration-500`}>
                {action.icon}
              </div>
              <span className="text-xs md:text-sm font-extrabold text-slate-800 text-center leading-tight">{action.label}</span>
            </Link>
          ))}
        </div>

        {/* Health Summary */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-5 mb-8 border border-emerald-100/60">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 flex items-center justify-center">
              <Activity size={20} className="text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-emerald-900 uppercase tracking-wider">{isHindi ? "स्वास्थ्य सारांश" : "Health Summary"}</p>
              <p className="text-sm text-emerald-800 font-extrabold mt-0.5">
                {isHindi
                  ? `${stats.medCount} दवाइयाँ ट्रैक • ${stats.recordCount} रिपोर्ट सेव`
                  : `${stats.medCount} medicines tracked • ${stats.recordCount} records saved`}
              </p>
            </div>
          </div>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Medicines */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-emerald-600" />
                <h2 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">{isHindi ? "आज की दवाइयाँ" : "Today's Medicines"}</h2>
              </div>
              <Link href="/medicines" className="text-sm font-extrabold text-emerald-600 flex items-center gap-1 hover:gap-2 transition-all">
                {isHindi ? "सभी" : "All"} <ChevronRight size={16} />
              </Link>
            </div>
            <div className="space-y-3">
              {medicines.length === 0 ? (
                <div className="p-8 bg-white dark:bg-[#1a1f2e] rounded-3xl border border-dashed border-slate-200 text-center">
                  <Pill size={28} className="text-slate-300 mx-auto mb-3" />
                  <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 font-extrabold">{isHindi ? "अभी कोई दवाई नहीं" : "No medicines added yet"}</p>
                  <Link href="/medicines" className="text-sm text-emerald-600 font-extrabold mt-2 inline-block">{isHindi ? "दवाई जोड़ें →" : "Add Medicine →"}</Link>
                </div>
              ) : medicines.map((med) => (
                <div key={med.id} className="card flex items-center justify-between"
                  style={{ borderLeft: `3px solid ${med.status === "taken" ? "#22c55e" : "#10b981"}` }}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-base ${med.status === "taken" ? "bg-green-50" : "bg-emerald-50"}`}>
                      {med.status === "taken" ? "✅" : (med.emoji || "💊")}
                    </div>
                    <div>
                      <p suppressHydrationWarning className={`font-extrabold text-sm ${med.status === "taken" ? "text-slate-400 dark:text-slate-500 line-through" : "text-slate-900"}`}>
                        {isHindi ? med.name_hi : med.name_en}
                      </p>
                      <p suppressHydrationWarning className="text-xs text-slate-400 dark:text-slate-500 font-medium">{isHindi ? med.time_hi : med.time_en}</p>
                    </div>
                  </div>
                  {med.status === "pending" && (
                    <button className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-extrabold hover:bg-slate-800 transition-all active:scale-95">
                      {isHindi ? "लिया" : "Take"}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Records + Upgrade */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">{isHindi ? "हाल की रिपोर्ट" : "Recent Records"}</h2>
                <Link href="/records" className="text-sm font-extrabold text-emerald-600 flex items-center gap-1 hover:gap-2 transition-all">
                  {isHindi ? "सभी" : "All"} <ChevronRight size={16} />
                </Link>
              </div>
              <div className="space-y-3">
                {records.length === 0 ? (
                  <div className="p-8 bg-white dark:bg-[#1a1f2e] rounded-3xl border border-dashed border-slate-200 text-center">
                    <Upload size={28} className="text-slate-300 mx-auto mb-3" />
                    <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 font-extrabold">{isHindi ? "अभी कोई रिपोर्ट नहीं" : "No records yet"}</p>
                    <Link href="/records" className="text-sm text-emerald-600 font-extrabold mt-2 inline-block">{isHindi ? "अपलोड करें →" : "Upload →"}</Link>
                  </div>
                ) : records.map((rec) => (
                  <div key={rec.id} className="card flex items-center gap-3 cursor-pointer group">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-base">{rec.emoji || '📋'}</div>
                    <div className="flex-1">
                      <p suppressHydrationWarning className="font-extrabold text-slate-900 dark:text-white text-sm">{isHindi ? rec.name_hi : rec.name_en}</p>
                      <p suppressHydrationWarning className="text-xs text-slate-400 dark:text-slate-500 font-medium">{rec.record_date}</p>
                    </div>
                    <ArrowRight size={16} className="text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>

            {/* Upgrade Banner */}
            <div className="rounded-3xl p-6 text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)" }}>
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={20} className="text-emerald-400" />
                  <h3 className="font-extrabold text-lg">{isHindi ? "साथी प्लस" : "Saathi Plus"}</h3>
                </div>
                <p className="text-white/60 text-sm mb-4 font-medium">
                  {isHindi ? "अनलिमिटेड AI, फ़ैमिली प्रोफ़ाइल, और बहुत कुछ!" : "Unlimited AI, family profiles, and more!"}
                </p>
                <Link href="/subscription" className="inline-flex items-center gap-2 bg-emerald-500 text-white font-extrabold text-sm px-5 py-2.5 rounded-xl hover:bg-emerald-600 transition-all active:scale-95">
                  {isHindi ? "अपग्रेड" : "Upgrade"} <ArrowRight size={16} />
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
