// Design tokens — single source of truth for the entire UI.
// No magic numbers. No inline colors. Every value referenced from here.

export const colors = {
  // Urgency system — the core visual language of CrisisLens
  critical: {
    bg: '#FEF2F2',      // red-50
    border: '#FCA5A5',   // red-300
    text: '#991B1B',     // red-800
    badge: '#DC2626',    // red-600
    highlight: '#FECACA', // red-200
  },
  timeSensitive: {
    bg: '#FFFBEB',       // amber-50
    border: '#FCD34D',   // amber-300
    text: '#92400E',     // amber-800
    badge: '#D97706',    // amber-600
    highlight: '#FDE68A', // amber-200
  },
  informational: {
    bg: '#F0FDF4',       // green-50
    border: '#86EFAC',   // green-300
    text: '#166534',     // green-800
    badge: '#16A34A',    // green-600
    highlight: '#BBF7D0', // green-200
  },

  // Highlight types — inline span colors
  jargon: '#FEF9C3',       // yellow-100 — medical/legal terms
  deadline: '#FEE2E2',     // red-100 — dates, deadlines
  instruction: '#DBEAFE',  // blue-100 — action items

  // App chrome
  bg: '#FAFAF9',           // stone-50 — warm off-white
  surface: '#FFFFFF',
  surfaceElevated: '#F5F5F4', // stone-100
  border: '#E7E5E4',       // stone-200
  borderStrong: '#D6D3D1', // stone-300
  text: '#1C1917',         // stone-900
  textSecondary: '#57534E', // stone-600
  textMuted: '#A8A29E',    // stone-400
  accent: '#1D4ED8',       // blue-700 — links, focus rings
  accentLight: '#EFF6FF',  // blue-50

  // Dark mode (optional — only if time permits)
  dark: {
    bg: '#0C0A09',         // stone-950
    surface: '#1C1917',    // stone-900
    text: '#FAFAF9',       // stone-50
  },
} as const;

export const fonts = {
  // Display: Source Serif 4 — editorial credibility, reads as "newspaper"
  display: "'Source Serif 4', 'Georgia', serif",
  // Body: Inter — clear at small sizes, good for document text
  body: "'Inter', 'system-ui', sans-serif",
  // Mono: JetBrains Mono — for urgency codes, technical labels
  mono: "'JetBrains Mono', monospace",
} as const;

export const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
} as const;

export const urgencyLevels = ['CRITICAL', 'TIME-SENSITIVE', 'INFORMATIONAL'] as const;
export type UrgencyLevel = typeof urgencyLevels[number];
