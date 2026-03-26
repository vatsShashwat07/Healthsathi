import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary — Professional Saffron (#FF9933) — "Modern Bharat"
        primary: {
          50: "#fff8f0",
          100: "#ffedd5",
          200: "#ffd8a8",
          300: "#ffc078",
          400: "#ffa94d",
          500: "#FF9933",  // ← main saffron
          600: "#e6852b",
          700: "#cc7224",
          800: "#a35a1c",
          900: "#7a4315",
          950: "#52290c",
          DEFAULT: "#FF9933",
          light: "#FFB366",
          dark: "#E67A00",
        },
        // Deep Black for typography and headers
        ink: {
          DEFAULT: "#1A1A1A",
          50: "#f5f5f5",
          100: "#e5e5e5",
          200: "#cccccc",
          300: "#a3a3a3",
          400: "#737373",
          500: "#525252",
          600: "#404040",
          700: "#333333",
          800: "#262626",
          900: "#1A1A1A",
        },
        // Surface — clean whites
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#FAFAFA",
          card: "#FFFFFF",
          warm: "#FFF9F2",
          overlay: "rgba(0, 0, 0, 0.5)",
        },
        // Text colors — black-based
        text: {
          primary: "#1A1A1A",
          secondary: "#525252",
          muted: "#737373",
          inverse: "#FFFFFF",
        },
        // Accent — warm amber for secondary highlights
        accent: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        // Emergency — stays red for medical safety
        emergency: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
        },
        // Sage — soft neutral for subtle backgrounds
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
        sans: ["Poppins", "Noto Sans Devanagari", "system-ui", "sans-serif"],
        hindi: ["Noto Sans Devanagari", "Poppins", "sans-serif"],
        display: ["Poppins", "Noto Sans Devanagari", "sans-serif"],
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
        card: "0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)",
        "card-hover": "0 8px 24px rgba(0, 0, 0, 0.08)",
        "card-border": "0 0 0 0.5px rgba(26, 26, 26, 0.12), 0 1px 3px rgba(0, 0, 0, 0.06)",
        nav: "0 -1px 12px rgba(0, 0, 0, 0.06)",
        modal: "0 20px 60px rgba(0, 0, 0, 0.15)",
        saffron: "0 4px 14px rgba(255, 153, 51, 0.25)",
        "saffron-lg": "0 8px 30px rgba(255, 153, 51, 0.3)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "pulse-gentle": "pulseGentle 2s infinite",
        "bounce-gentle": "bounceGentle 0.6s ease-out",
        gradient: "gradientShift 6s ease infinite",
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
      },
      screens: {
        xs: "360px",
      },
    },
  },
  plugins: [],
};
export default config;
