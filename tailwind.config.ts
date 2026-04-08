import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary — Emerald (#10b981)
        primary: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",
          DEFAULT: "#10b981",
          light: "#34d399",
          dark: "#059669",
        },
        ink: {
          DEFAULT: "#111827",
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#fafafa",
          card: "#FFFFFF",
          warm: "#fafafa",
          overlay: "rgba(0, 0, 0, 0.5)",
        },
        text: {
          primary: "#111827",
          secondary: "#4b5563",
          muted: "#9ca3af",
          inverse: "#FFFFFF",
        },
        accent: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
        emergency: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
        },
        sage: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
        },
      },
      fontFamily: {
        sans: ["Inter", "Poppins", "Noto Sans Devanagari", "system-ui", "sans-serif"],
        hindi: ["Noto Sans Devanagari", "Inter", "sans-serif"],
        display: ["Inter", "Poppins", "Noto Sans Devanagari", "sans-serif"],
      },
      fontSize: {
        "xs-hindi": ["0.75rem", { lineHeight: "1.4" }],
        "sm-hindi": ["0.875rem", { lineHeight: "1.5" }],
        "base-hindi": ["1rem", { lineHeight: "1.6" }],
        "lg-hindi": ["1.125rem", { lineHeight: "1.6" }],
        "xl-hindi": ["1.25rem", { lineHeight: "1.5" }],
      },
      spacing: {
        safe: "env(safe-area-inset-bottom)",
        "nav-height": "4.5rem",
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)",
        "card-hover": "0 8px 24px rgba(0, 0, 0, 0.06)",
        "card-border": "0 0 0 1px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.04)",
        nav: "0 -1px 12px rgba(0, 0, 0, 0.04)",
        modal: "0 20px 60px rgba(0, 0, 0, 0.12)",
        glow: "0 4px 14px rgba(16, 185, 129, 0.15)",
        "glow-lg": "0 8px 30px rgba(16, 185, 129, 0.2)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "pulse-gentle": "pulseGentle 2s infinite",
        "bounce-gentle": "bounceGentle 0.6s ease-out",
        gradient: "gradientShift 6s ease infinite",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 3s infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGentle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        bounceGentle: {
          "0%": { transform: "scale(0.95)" },
          "50%": { transform: "scale(1.02)" },
          "100%": { transform: "scale(1)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      screens: {
        xs: "360px",
      },
    },
  },
  plugins: [],
};
export default config;
