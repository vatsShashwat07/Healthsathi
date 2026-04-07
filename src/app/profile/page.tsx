"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import FloatingHearts from "@/components/shared/FloatingHearts";
import BottomNav from "@/components/shared/BottomNav";
import LanguageToggle from "@/components/shared/LanguageToggle";
import {
    Users,
    CreditCard,
    Bell,
    Globe,
    Shield,
    Trash2,
    LogOut,
    ChevronRight,
    Plus,
    Heart,
    Sparkles,
    X,
    User,
    HelpCircle,
    AlertTriangle,
} from "lucide-react";
import Link from "next/link";

const menuItems = [
    { key: "subscription", icon: CreditCard, href: "/subscription", bg: "bg-indigo-50", color: "text-indigo-600" },
    { key: "help", icon: HelpCircle, href: "/help", bg: "bg-amber-50", color: "text-amber-600", labelEn: "Help Centre", labelHi: "सहायता केंद्र" },
    { key: "privacy", icon: Shield, href: "/privacy", bg: "bg-teal-50", color: "text-teal-600" },
];

export default function ProfilePage() {
    const { t, isHindi } = useLanguage();
    const { user, signOut, isLoading } = useAuth();
    const router = useRouter();
    const supabase = createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [profile, setProfile] = useState<any>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [familyMembers, setFamilyMembers] = useState<any[]>([]);
    const [showAddMember, setShowAddMember] = useState(false);
    const [newMember, setNewMember] = useState({ name: "", relation: "", age: "" });
    const [saving, setSaving] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleDeleteAllData = async () => {
        if (!user) return;
        setDeleting(true);
        try {
            await Promise.all([
                supabase.from('medicines').delete().eq('user_id', user.id),
                supabase.from('health_records').delete().eq('user_id', user.id),
                supabase.from('family_members').delete().eq('user_id', user.id),
            ]);
            await signOut();
            window.location.href = '/login';
        } catch (e) {
            console.error('Delete failed:', e);
            setDeleting(false);
        }
    };

    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/login");
        } else if (user) {
            supabase.from('profiles').select('*').eq('id', user.id).single()
                .then(({ data }) => {
                    if (data) setProfile(data);
                });

            // Fetch family members
            supabase.from('family_members').select('*').eq('user_id', user.id)
                .then(({ data }) => {
                    if (data) setFamilyMembers(data);
                });
        }
    }, [user, isLoading, router]);

    const userName = profile?.name || (user?.email ? user.email.split('@')[0] : "");
    const userContact = profile?.phone || user?.email || "";
    const isPremium = profile?.is_premium || false;

    const handleAddMember = async () => {
        if (!newMember.name.trim() || !user) return;
        setSaving(true);
        try {
            const { data, error } = await supabase.from('family_members').insert({
                user_id: user.id,
                name: newMember.name.trim(),
                relation: newMember.relation.trim() || (isHindi ? "परिवार" : "Family"),
                age: parseInt(newMember.age) || 0,
            }).select().single();

            if (data && !error) {
                setFamilyMembers(prev => [...prev, data]);
                setNewMember({ name: "", relation: "", age: "" });
                setShowAddMember(false);
            }
        } catch (e) {
            console.error("Error adding family member:", e);
        } finally {
            setSaving(false);
        }
    };

    const emojiForRelation = (relation: string) => {
        const r = relation.toLowerCase();
        if (r.includes("wife") || r.includes("पत्नी")) return "👩";
        if (r.includes("husband") || r.includes("पति")) return "👨";
        if (r.includes("father") || r.includes("पिताजी") || r.includes("पापा")) return "👴";
        if (r.includes("mother") || r.includes("माताजी") || r.includes("माँ")) return "👵";
        if (r.includes("son") || r.includes("बेटा")) return "👦";
        if (r.includes("daughter") || r.includes("बेटी")) return "👧";
        return "👤";
    };

    return (
        <div className="w-full min-h-screen pb-nav bg-white">
            {/* Header */}
            <header className="px-5 pt-14 pb-8 bg-white border-b border-slate-100">
                <div className="flex items-center justify-between mb-5">
                    <h1 className="text-xl font-bold text-slate-900">{t("profile.title")}</h1>
                    <LanguageToggle />
                </div>

                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center border border-emerald-100">
                        <User size={28} className="text-emerald-600" />
                    </div>
                    <div>
                        <h2 suppressHydrationWarning className="text-xl font-bold text-slate-900 capitalize">{userName || (isHindi ? "उपयोगकर्ता" : "User")}</h2>
                        <p suppressHydrationWarning className="text-slate-500 text-sm mt-0.5">{userContact}</p>
                        <span suppressHydrationWarning className="inline-flex items-center gap-1 mt-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                            <Heart size={10} />
                            {isPremium ? (isHindi ? "प्लस मेंबर" : "Plus Member") : (isHindi ? "फ्री प्लान" : "Free Plan")}
                        </span>
                    </div>
                </div>
            </header>

            <div className="px-4 py-4 space-y-4">
                {/* Upgrade card */}
                {!isPremium && (
                    <Link href="/subscription"
                        className="card flex items-center gap-3.5 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100">
                        <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                            style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}>
                            <Sparkles size={18} className="text-white" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-bold text-emerald-900">
                                {isHindi ? "साथी प्लस में अपग्रेड करें" : "Upgrade to Saathi Plus"}
                            </p>
                            <p className="text-xs text-emerald-600 mt-0.5">
                                {isHindi ? "₹99/महीना — अनलिमिटेड" : "₹99/month — Unlimited"}
                            </p>
                        </div>
                        <ChevronRight size={18} className="text-blue-400" />
                    </Link>
                )}

                {/* Family Members — from DB */}
                <section className="card">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center">
                                <Users size={14} className="text-emerald-600" />
                            </div>
                            {t("profile.familyMembers")}
                        </h3>
                        <button
                            onClick={() => setShowAddMember(true)}
                            className="text-xs text-emerald-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                        >
                            <Plus size={12} />
                            {t("profile.addMember")}
                        </button>
                    </div>
                    <div className="space-y-2">
                        {familyMembers.length === 0 ? (
                            <div className="py-6 text-center">
                                <Users size={24} className="text-slate-300 mx-auto mb-2" />
                                <p className="text-sm text-slate-500">
                                    {isHindi ? "अभी कोई सदस्य नहीं जोड़ा गया" : "No family members added"}
                                </p>
                                <button
                                    onClick={() => setShowAddMember(true)}
                                    className="text-sm text-emerald-600 font-semibold mt-1"
                                >
                                    {isHindi ? "सदस्य जोड़ें →" : "Add Member →"}
                                </button>
                            </div>
                        ) : (
                            familyMembers.map((member, i) => (
                                <div key={member.id || i} className="flex items-center gap-3 py-2.5 border-b border-slate-50 last:border-0 group cursor-pointer">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-sm">
                                        {emojiForRelation(member.relation || "")}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-slate-900">{member.name}</p>
                                        <p className="text-xs text-slate-500">{member.relation}{member.age ? ` • ${member.age} ${isHindi ? "वर्ष" : "yrs"}` : ""}</p>
                                    </div>
                                    <ChevronRight size={14} className="text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                                </div>
                            ))
                        )}
                    </div>
                </section>

                {/* Settings Menu */}
                <section className="card divide-y divide-slate-50">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link key={item.key} href={item.href} className="flex items-center gap-3 py-3.5 first:pt-0 last:pb-0 group">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.bg}`}>
                                    <Icon size={16} className={item.color} />
                                </div>
                                <span className="flex-1 text-sm font-semibold text-slate-900">{t(`profile.${item.key}`)}</span>
                                <ChevronRight size={14} className="text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                            </Link>
                        );
                    })}
                </section>

                {/* Danger zone */}
                <section className="card divide-y divide-slate-50">
                    <button onClick={() => setShowDeleteConfirm(true)} className="flex items-center gap-3 py-3.5 w-full text-left">
                        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                            <Trash2 size={16} className="text-red-500" />
                        </div>
                        <span className="flex-1 text-sm font-extrabold text-red-600">{t("profile.deleteData")}</span>
                    </button>
                    <button onClick={async () => { await signOut(); window.location.href = "/login"; }} className="flex items-center gap-3 py-3.5 w-full text-left">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                            <LogOut size={16} className="text-slate-500" />
                        </div>
                        <span className="flex-1 text-sm font-extrabold text-slate-600">{t("profile.logout")}</span>
                    </button>
                </section>

                <p className="text-center text-[11px] text-slate-400 py-3 font-medium">
                    HealthSathi v1.0.0 — {isHindi ? "आपका भरोसेमंद स्वास्थ्य साथी" : "Your trusted health companion"} 💚
                </p>

                {/* Delete Confirmation Modal */}
                {showDeleteConfirm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-5" style={{ background: "rgba(0,0,0,0.5)" }}>
                        <div className="bg-white max-w-sm w-full rounded-3xl p-6 text-center animate-scale-in">
                            <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
                                <AlertTriangle size={28} className="text-red-500" />
                            </div>
                            <h3 className="text-lg font-extrabold text-slate-900 mb-2">
                                {isHindi ? "सारा डेटा हटाएँ?" : "Delete All Data?"}
                            </h3>
                            <p className="text-sm text-slate-500 mb-6 font-medium">
                                {isHindi
                                    ? "आपकी सभी दवाइयाँ, रिपोर्ट, और परिवार सदस्य हटा दिए जाएँगे। यह क्रिया पलटी नहीं जा सकती।"
                                    : "All your medicines, records, and family members will be permanently deleted. This action cannot be undone."}
                            </p>
                            <div className="flex gap-3">
                                <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 py-3 rounded-2xl bg-slate-100 text-sm font-bold text-slate-700">
                                    {isHindi ? "रद्द करें" : "Cancel"}
                                </button>
                                <button onClick={handleDeleteAllData} disabled={deleting} className="flex-1 py-3 rounded-2xl bg-red-500 text-white text-sm font-bold disabled:opacity-50">
                                    {deleting ? (isHindi ? "हटा रहे हैं..." : "Deleting...") : (isHindi ? "हाँ, हटाएँ" : "Yes, Delete")}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Add Family Member Modal */}
            {showAddMember && (
                <div className="bottom-sheet">
                    <div className="bottom-sheet-overlay" onClick={() => setShowAddMember(false)} />
                    <div className="bottom-sheet-content">
                        <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-4" />
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-slate-900">
                                {isHindi ? "परिवार सदस्य जोड़ें" : "Add Family Member"}
                            </h3>
                            <button onClick={() => setShowAddMember(false)} className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center">
                                <X size={16} className="text-slate-500" />
                            </button>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <label className="text-xs font-semibold text-slate-600 mb-1 block">
                                    {isHindi ? "नाम *" : "Name *"}
                                </label>
                                <input
                                    type="text"
                                    value={newMember.name}
                                    onChange={e => setNewMember(p => ({ ...p, name: e.target.value }))}
                                    className="input text-sm"
                                    placeholder={isHindi ? "जैसे: राहुल" : "e.g., Rahul"}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-slate-600 mb-1 block">
                                    {isHindi ? "रिश्ता" : "Relation"}
                                </label>
                                <input
                                    type="text"
                                    value={newMember.relation}
                                    onChange={e => setNewMember(p => ({ ...p, relation: e.target.value }))}
                                    className="input text-sm"
                                    placeholder={isHindi ? "जैसे: पिताजी, पत्नी, बेटा" : "e.g., Father, Wife, Son"}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-slate-600 mb-1 block">
                                    {isHindi ? "उम्र" : "Age"}
                                </label>
                                <input
                                    type="number"
                                    value={newMember.age}
                                    onChange={e => setNewMember(p => ({ ...p, age: e.target.value }))}
                                    className="input text-sm"
                                    placeholder={isHindi ? "जैसे: 45" : "e.g., 45"}
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleAddMember}
                            disabled={!newMember.name.trim() || saving}
                            className="btn-primary w-full mt-5 text-sm gap-2 disabled:opacity-40"
                        >
                            <Plus size={16} />
                            {saving ? (isHindi ? "जोड़ रहे हैं..." : "Adding...") : (isHindi ? "सदस्य जोड़ें" : "Add Member")}
                        </button>
                    </div>
                </div>
            )}

            <FloatingHearts />
            <BottomNav />
        </div>
    );
}
