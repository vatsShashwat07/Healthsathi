"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useLanguage } from "@/context/LanguageContext";
import { Heart, Mail, Lock, AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();
    const { isHindi } = useLanguage();

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isSignUp) {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${window.location.origin}/dashboard`
                    }
                });
                if (error) throw error;
                alert(isHindi ? "चेक करें! ईमेल पर पुष्टि लिंक भेजा गया है।" : "Check your email for the confirmation link!");
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                router.push("/dashboard");
                router.refresh();
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-sage-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link href="/" className="flex justify-center items-center gap-2.5 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center shadow-lg shadow-primary/20">
                        <Heart size={24} className="text-white" />
                    </div>
                </Link>
                <h2 className="text-center text-3xl font-extrabold text-ink-900 tracking-tight">
                    {isSignUp
                        ? (isHindi ? "खाता बनाएँ" : "Create an account")
                        : (isHindi ? "लॉग इन करें" : "Welcome back")}
                </h2>
                <p className="mt-2 text-center text-sm text-text-muted">
                    {isSignUp
                        ? (isHindi ? "HealthSathi परिवार में आपका स्वागत है" : "Join the HealthSathi family")
                        : (isHindi ? "अपने स्वास्थ्य विवरण तक पहुंचें" : "Access your health companion")}
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-xl sm:rounded-3xl sm:px-10 border border-sage-100">
                    <form className="space-y-6" onSubmit={handleAuth}>
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
                                <div className="flex items-center gap-3">
                                    <AlertCircle className="text-red-500" size={20} />
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-semibold text-ink-900">
                                {isHindi ? "ईमेल एड्रेस" : "Email address"}
                            </label>
                            <div className="mt-2 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-sage-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all sm:text-sm bg-sage-50/50"
                                    placeholder={isHindi ? "aapka@email.com" : "you@example.com"}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-ink-900">
                                {isHindi ? "पासवर्ड" : "Password"}
                            </label>
                            <div className="mt-2 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-sage-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all sm:text-sm bg-sage-50/50"
                                    placeholder={isHindi ? " कम से कम 6 अक्षर" : "Min 6 characters"}
                                    minLength={6}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-70"
                        >
                            {loading
                                ? (isHindi ? "कृपया प्रतीक्षा करें..." : "Please wait...")
                                : (isSignUp
                                    ? (isHindi ? "साइन अप" : "Sign up")
                                    : (isHindi ? "लॉग इन" : "Sign in"))}
                            {!loading && <ArrowRight size={16} />}
                        </button>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-sage-200" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500 font-medium">
                                    {isSignUp
                                        ? (isHindi ? "पहले से खाता है?" : "Already have an account?")
                                        : (isHindi ? "खाता नहीं है?" : "Don't have an account?")}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => { setIsSignUp(!isSignUp); setError(null); }}
                            className="w-full mt-4 flex justify-center py-3 px-4 border-2 border-sage-200 rounded-xl text-sm font-bold text-ink-900 bg-white hover:bg-sage-50 transition-all"
                        >
                            {isSignUp
                                ? (isHindi ? "लॉग इन करें" : "Sign in instead")
                                : (isHindi ? "नया खाता बनाएँ" : "Create an account")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
