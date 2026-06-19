import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        label: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        'display-lg': ['32px', { lineHeight: '40px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg-mobile': ['24px', { lineHeight: '32px', letterSpacing: '-0.01em', fontWeight: '700' }],
        'headline-md': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'body-base': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'label-md': ['13px', { lineHeight: '16px', letterSpacing: '0.02em', fontWeight: '500' }],
        'label-sm': ['11px', { lineHeight: '14px', letterSpacing: '0.05em', fontWeight: '500' }],
      },
      spacing: {
        'container-padding': '24px',
        gutter: '16px',
        'card-gap': '20px',
      },
      colors: {
        background: 'var(--color-background)',
        surface: {
          DEFAULT: 'var(--color-surface)',
          container: 'var(--color-surface-container)',
          'container-low': 'var(--color-surface-container-low)',
          'container-lowest': 'var(--color-surface-container-lowest)',
          'container-high': 'var(--color-surface-container-high)',
          variant: 'var(--color-surface-variant)',
          bright: 'var(--color-surface)',
        },
        'on-surface': 'var(--color-on-surface)',
        'on-surface-variant': 'var(--color-on-surface-variant)',
        'on-background': 'var(--color-on-background)',
        primary: {
          DEFAULT: 'var(--color-primary)',
          container: 'var(--color-primary-container)',
        },
        'on-primary': 'var(--color-on-primary)',
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          container: 'var(--color-secondary-container)',
          fixed: 'var(--color-secondary-fixed)',
          'fixed-dim': 'var(--color-secondary-fixed-dim)',
        },
        'on-secondary-container': 'var(--color-on-secondary-container)',
        outline: {
          DEFAULT: 'var(--color-outline)',
          variant: 'var(--color-outline-variant)',
        },
        error: {
          DEFAULT: 'var(--color-error)',
          container: 'var(--color-error-container)',
        },
        'on-error-container': 'var(--color-on-error-container)',
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
      },
      boxShadow: {
        card: '0 1px 3px rgba(28, 25, 23, 0.05), 0 1px 2px rgba(28, 25, 23, 0.1)',
        'card-hover': '0 4px 12px rgba(28, 25, 23, 0.05)',
        selected: '0 2px 8px rgba(28, 25, 23, 0.08)',
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
      },
      animation: {
        'urgency-flash': 'urgency-flash 2s ease-in-out infinite',
        'fade-in': 'fade-in 0.25s ease-out',
      },
      keyframes: {
        'urgency-flash': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
