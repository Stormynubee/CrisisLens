// Design tokens — single source of truth (Stitch Crisis Management Protocol + urgency)

export const m3Colors = {
  background: '#fdf8f7',
  onBackground: '#1c1b1b',
  surface: '#fdf8f7',
  onSurface: '#1c1b1b',
  onSurfaceVariant: '#4d4540',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f7f3f1',
  surfaceContainer: '#f1edec',
  surfaceContainerHigh: '#ece7e6',
  surfaceContainerHighest: '#e6e1e0',
  surfaceVariant: '#e6e1e0',
  outline: '#7e7570',
  outlineVariant: '#d0c4be',
  primary: '#000000',
  onPrimary: '#ffffff',
  primaryContainer: '#1e1b19',
  onPrimaryContainer: '#888380',
  secondary: '#625e59',
  onSecondary: '#ffffff',
  secondaryContainer: '#e5ded8',
  onSecondaryContainer: '#66625d',
  secondaryFixed: '#e8e1db',
  secondaryFixedDim: '#ccc5bf',
  error: '#ba1a1a',
  onError: '#ffffff',
  errorContainer: '#ffdad6',
  onErrorContainer: '#93000a',
} as const;

export const colors = {
  critical: {
    bg: '#FEF2F2',
    border: '#FCA5A5',
    text: '#991B1B',
    badge: '#DC2626',
    highlight: '#FECACA',
  },
  timeSensitive: {
    bg: '#FFFBEB',
    border: '#FCD34D',
    text: '#92400E',
    badge: '#D97706',
    highlight: '#FDE68A',
  },
  informational: {
    bg: '#F0FDF4',
    border: '#86EFAC',
    text: '#166534',
    badge: '#16A34A',
    highlight: '#BBF7D0',
  },
  jargon: '#FEF9C3',
  deadline: '#FEE2E2',
  instruction: '#DBEAFE',
  ...m3Colors,
} as const;

export const spacing = {
  unit: '4px',
  gutter: '16px',
  containerPadding: '24px',
  cardGap: '20px',
} as const;

export const elevation = {
  card: '0 1px 3px rgba(28, 25, 23, 0.05), 0 1px 2px rgba(28, 25, 23, 0.1)',
  cardHover: '0 4px 12px rgba(28, 25, 23, 0.05)',
  selected: '0 2px 8px rgba(28, 25, 23, 0.08)',
} as const;

export const urgencyLevels = ['CRITICAL', 'TIME-SENSITIVE', 'INFORMATIONAL'] as const;
export type UrgencyLevel = (typeof urgencyLevels)[number];
