'use client';

import { UrgencyLevel } from '@/lib/types';
import { AlertTriangle, Clock, Info } from 'lucide-react';
import clsx from 'clsx';

interface BadgeProps {
  urgency: UrgencyLevel;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const config: Record<UrgencyLevel, {
  label: string;
  bg: string;
  text: string;
  border: string;
  icon: typeof AlertTriangle;
}> = {
  CRITICAL: {
    label: 'Critical',
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-300',
    icon: AlertTriangle,
  },
  'TIME-SENSITIVE': {
    label: 'Time-Sensitive',
    bg: 'bg-amber-100',
    text: 'text-amber-800',
    border: 'border-amber-300',
    icon: Clock,
  },
  INFORMATIONAL: {
    label: 'Informational',
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-300',
    icon: Info,
  },
};

export function Badge({ urgency, size = 'md', showLabel = true }: BadgeProps) {
  const c = config[urgency];
  const Icon = c.icon;

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 font-mono font-medium border rounded-full',
        c.bg, c.text, c.border,
        size === 'sm' && 'px-2 py-0.5 text-xs',
        size === 'md' && 'px-3 py-1 text-sm',
        size === 'lg' && 'px-4 py-1.5 text-base',
        urgency === 'CRITICAL' && 'animate-urgency-flash',
      )}
      role="status"
      aria-label={`Urgency: ${c.label}`}
    >
      <Icon className={clsx(
        size === 'sm' && 'w-3 h-3',
        size === 'md' && 'w-4 h-4',
        size === 'lg' && 'w-5 h-5',
      )} />
      {showLabel && c.label}
    </span>
  );
}
