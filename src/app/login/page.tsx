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

    const handleGoogleSignIn = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/api/auth/callback`,
                },
            });
            if (error) throw error;
        } catch (error: Error | any) {
            setError(error.message || (isHindi ? "Google लॉगिन में त्रुटि" : "Google login error"));
        }
    };

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isSignUp) {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${window.location.origin}/dashboard`
                    }
                });
                if (error) throw error;

                if (data.session) {
                    router.push("/dashboard");
                    router.refresh();
                } else {
                    alert(isHindi ? "चेक करें! ईमेल पर पुष्टि लिंक भेजा गया है।" : "Check your email for the confirmation link!");
                }
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
                                    {isHindi ? "या" : "Or"}
                                </span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            className="w-full mt-4 flex justify-center items-center gap-2 py-3 px-4 border border-sage-200 rounded-xl shadow-sm text-sm font-bold text-ink-900 bg-white hover:bg-sage-50 focus:outline-none transition-all"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            {isHindi ? "Google के साथ जारी रखें" : "Continue with Google"}
                        </button>
                    </div>

                    <div className="mt-6 pt-4 border-t border-sage-100 text-center">
                        <span className="text-sm text-gray-500 font-medium mr-2">
                            {isSignUp
                                ? (isHindi ? "पहले से खाता है?" : "Already have an account?")
                                : (isHindi ? "खाता नहीं है?" : "Don't have an account?")}
                        </span>
                        <button
                            onClick={() => { setIsSignUp(!isSignUp); setError(null); }}
                            className="text-sm font-bold text-primary hover:text-primary-700 transition-all underline decoration-2 underline-offset-2"
                        >
                            {isSignUp
                                ? (isHindi ? "लॉग इन करें" : "Sign in here")
                                : (isHindi ? "नया खाता बनाएँ" : "Create one now")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
