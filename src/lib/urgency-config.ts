import type { UrgencyLevel } from './types';

export const URGENCY_CONFIG: Record<
  UrgencyLevel,
  {
    label: string;
    badge: string;
    badgeText: string;
    band: string;
    bandBg: string;
    legendDot: string;
    legendLabel: string;
  }
> = {
  CRITICAL: {
    label: 'CRITICAL',
    badge: 'bg-crisis-critical-bg text-crisis-critical-text border-crisis-critical-border',
    badgeText: 'text-crisis-critical',
    band: 'border-l-crisis-critical',
    bandBg: 'bg-crisis-critical-bg',
    legendDot: 'bg-crisis-critical',
    legendLabel: 'Critical',
  },
  'TIME-SENSITIVE': {
    label: 'TIME-SENSITIVE',
    badge: 'bg-crisis-timesensitive-bg text-crisis-timesensitive-text border-crisis-timesensitive-border',
    badgeText: 'text-crisis-timesensitive',
    band: 'border-l-crisis-timesensitive',
    bandBg: 'bg-crisis-timesensitive-bg',
    legendDot: 'bg-crisis-timesensitive',
    legendLabel: 'Time-sensitive',
  },
  INFORMATIONAL: {
    label: 'INFORMATIONAL',
    badge: 'bg-crisis-info-bg text-crisis-info-text border-crisis-info-border',
    badgeText: 'text-crisis-info',
    band: 'border-l-crisis-info',
    bandBg: 'bg-crisis-info-bg',
    legendDot: 'bg-crisis-info',
    legendLabel: 'Informational',
  },
};

export function getUrgencyConfig(level: UrgencyLevel) {
  return URGENCY_CONFIG[level];
}
