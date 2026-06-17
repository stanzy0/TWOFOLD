/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        rose: {
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48",
          700: "#be123c",
          800: "#9f1239",
          900: "#881337",
          950: "#4c0519",
        },
        twofold: {
          pink: "#fce7f3",
          purple: "#e9d5ff",
          indigo: "#e0e7ff",
          rose: "#ffe4e6",
        },
      },
      borderColor: {
        border: "hsl(var(--border))",
      },
      backgroundColor: {
        background: "hsl(var(--background))",
      },
      textColor: {
        foreground: "hsl(var(--foreground))",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "float-slow": "float 8s ease-in-out 1s infinite",
        "pulse-soft": "pulseSoft 4s ease-in-out infinite",
        "glow": "glow 3s ease-in-out infinite",
        "aurora-1": "aurora1 12s ease-in-out infinite",
        "aurora-2": "aurora2 14s ease-in-out infinite",
        "aurora-3": "aurora3 10s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "heart-beat": "heartBeat 1.5s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        glow: {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        aurora1: {
          "0%, 100%": { transform: "translate(-50%, -50%) rotate(0deg) scale(1)" },
          "33%": { transform: "translate(-30%, -60%) rotate(120deg) scale(1.1)" },
          "66%": { transform: "translate(-70%, -40%) rotate(240deg) scale(0.9)" },
        },
        aurora2: {
          "0%, 100%": { transform: "translate(-50%, -50%) rotate(0deg) scale(1.2)" },
          "33%": { transform: "translate(-70%, -30%) rotate(-120deg) scale(1)" },
          "66%": { transform: "translate(-30%, -70%) rotate(-240deg) scale(1.3)" },
        },
        aurora3: {
          "0%, 100%": { transform: "translate(-50%, -50%) rotate(0deg) scale(0.8)" },
          "50%": { transform: "translate(-50%, -50%) rotate(180deg) scale(1.1)" },
        },
        heartBeat: {
          "0%, 100%": { transform: "scale(1)" },
          "14%": { transform: "scale(1.3)" },
          "28%": { transform: "scale(1)" },
          "42%": { transform: "scale(1.3)" },
          "70%": { transform: "scale(1)" },
        },
      },
      backdropBlur: { xs: "2px" },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "aurora":
          "linear-gradient(135deg, rgba(251, 113, 133, 0.15), rgba(168, 85, 247, 0.15), rgba(99, 102, 241, 0.15), rgba(236, 72, 153, 0.15))",
        "heart-gradient":
          "linear-gradient(135deg, #f43f5e, #ec4899, #a855f7, #6366f1)",
      },
    },
  },
  plugins: [],
};
