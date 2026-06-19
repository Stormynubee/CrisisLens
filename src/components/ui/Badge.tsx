'use client';

import { UrgencyLevel } from '@/lib/types';
import { getUrgencyConfig } from '@/lib/urgency-config';
import { AlertTriangle, Clock, Info } from 'lucide-react';
import clsx from 'clsx';

interface BadgeProps {
  urgency: UrgencyLevel;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const icons = {
  CRITICAL: AlertTriangle,
  'TIME-SENSITIVE': Clock,
  INFORMATIONAL: Info,
} as const;

export function Badge({ urgency, size = 'md', showLabel = true }: BadgeProps) {
  const cfg = getUrgencyConfig(urgency);
  const Icon = icons[urgency];

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 font-mono font-medium border rounded-full uppercase',
        cfg.badge,
        size === 'sm' && 'px-2 py-0.5 text-label-sm',
        size === 'md' && 'px-3 py-1 text-label-md',
        size === 'lg' && 'px-4 py-1.5 text-body-sm',
        urgency === 'CRITICAL' && 'animate-urgency-flash',
      )}
      role="status"
      aria-label={`Urgency: ${cfg.legendLabel}`}
    >
      <Icon
        className={clsx(
          size === 'sm' && 'w-3 h-3',
          size === 'md' && 'w-4 h-4',
          size === 'lg' && 'w-5 h-5',
        )}
      />
      {showLabel && cfg.label}
    </span>
  );
}
