import type { Metadata, Viewport } from "next";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "HealthSathi — हेल्थसाथी | AI Health Companion",
  description:
    "AI-powered health companion for Indian families. Check symptoms in Hindi, store health records, and never miss a medicine dose. HealthSathi — आपका भरोसेमंद AI स्वास्थ्य साथी।",
  manifest: "/manifest.json",
  keywords: [
    "health app",
    "Hindi health app",
    "symptom checker Hindi",
    "medicine reminder",
    "health records India",
    "AI health companion",
    "स्वास्थ्य ऐप",
    "लक्षण जाँच",
    "दवाई रिमाइंडर",
  ],
  authors: [{ name: "HealthSathi" }],
  openGraph: {
    title: "HealthSathi — AI Health Companion",
    description: "आपका भरोसेमंद AI स्वास्थ्य साथी। लक्षण जाँचें, रिपोर्ट रखें, दवाई याद रखें।",
    type: "website",
    locale: "hi_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#FF9933",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi" className="h-full">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="192x192"
          href="/icons/icon-192.png"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="default"
        />
        <meta name="apple-mobile-web-app-title" content="HealthSathi" />
        {/* Poppins + Noto Sans Devanagari — preconnect for speed */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Service Worker registration for offline-first */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(reg) { console.log('[SW] Registered:', reg.scope); })
                    .catch(function(err) { console.log('[SW] Registration failed:', err); });
                });
              }
            `,
          }}
        />
      </head>
      <body className="h-full bg-white">
        <LanguageProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
