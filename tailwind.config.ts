import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta "Ignition" (Claude Design)
        base: "#13110E",
        bg2: "#15120E",
        surface: "#1A1712",
        surface2: "#1E1B16",
        line: "rgba(244,239,230,0.10)",
        sand: "#F4EFE6",
        soft: "#e4ded4",
        cream: "#cfc7ba",
        muted: "#a9a299",
        muted2: "#9A938A",
        faint: "#6f6960",
        // Acento principal
        acc: "#FF5A36",
        acc2: "#ff8a66",
        blue: "#3E7BFF",
      },
      fontFamily: {
        // display -> Archivo, sans -> Hanken Grotesk, mono -> JetBrains Mono
        display: ["var(--font-archivo)", "system-ui", "sans-serif"],
        sans: ["var(--font-hanken)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        lift: "0 24px 50px -30px rgba(0,0,0,0.9)",
      },
      keyframes: {
        charIn: {
          from: { opacity: "0", transform: "translateY(118%) rotate(3deg)" },
          to: { opacity: "1", transform: "none" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "none" },
        },
        cueline: {
          "0%": { transform: "scaleY(0)", transformOrigin: "top" },
          "40%": { transform: "scaleY(1)", transformOrigin: "top" },
          "60%": { transform: "scaleY(1)", transformOrigin: "bottom" },
          "100%": { transform: "scaleY(0)", transformOrigin: "bottom" },
        },
        pulse: {
          "0%": { boxShadow: "0 0 0 0 rgba(255,90,54,.5)" },
          "70%": { boxShadow: "0 0 0 9px rgba(255,90,54,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(255,90,54,0)" },
        },
        popIn: {
          from: { transform: "translateY(24px) scale(.972)" },
          to: { transform: "none" },
        },
        glassSheen: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        auroraBreathe: {
          "0%, 100%": { opacity: ".55", transform: "translate(-50%,-50%) scale(1)" },
          "50%": { opacity: ".92", transform: "translate(-50%,-50%) scale(1.12)" },
        },
      },
      animation: {
        cueline: "cueline 2.2s ease-in-out infinite",
        pulse2: "pulse 2s infinite",
        "aurora-breathe": "auroraBreathe 9s ease-in-out infinite",
        "glass-sheen": "glassSheen 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
