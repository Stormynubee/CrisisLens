import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Source Serif 4'", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        crisis: {
          critical: '#DC2626',
          'critical-bg': '#FEF2F2',
          'critical-border': '#FCA5A5',
          'critical-text': '#991B1B',
          timesensitive: '#D97706',
          'timesensitive-bg': '#FFFBEB',
          'timesensitive-border': '#FCD34D',
          'timesensitive-text': '#92400E',
          info: '#16A34A',
          'info-bg': '#F0FDF4',
          'info-border': '#86EFAC',
          'info-text': '#166534',
        },
        highlight: {
          jargon: '#FEF9C3',
          deadline: '#FEE2E2',
          instruction: '#DBEAFE',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          elevated: '#F5F5F4',
          bg: '#FAFAF9',
        },
      },
      animation: {
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'urgency-flash': 'urgencyFlash 2s ease-in-out infinite',
      },
      keyframes: {
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        urgencyFlash: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
