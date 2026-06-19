'use client';

import { ActionItem, Language } from '@/lib/types';
import { useState } from 'react';
import { Check } from 'lucide-react';
import clsx from 'clsx';

interface ActionChecklistProps {
  actions: ActionItem[];
  language: Language;
}

export function ActionChecklist({ actions, language }: ActionChecklistProps) {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  if (actions.length === 0) return null;

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-1.5">
      <h4 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
        Suggested actions (you decide which apply)
      </h4>
      <ul className="space-y-1.5">
        {actions.map((action) => {
          const isChecked = checked.has(action.id);
          return (
            <li key={action.id}>
              <button
                type="button"
                onClick={() => toggle(action.id)}
                className={clsx(
                  'w-full flex items-start gap-2.5 p-2 rounded-lg text-left text-body-sm transition-all cursor-pointer min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  isChecked
                    ? 'bg-crisis-info-bg text-crisis-info-text'
                    : 'bg-surface-container-low text-on-surface hover:bg-surface-container',
                )}
              >
                <span
                  className={clsx(
                    'w-4 h-4 rounded border flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors',
                    isChecked ? 'bg-crisis-info border-crisis-info' : 'border-outline-variant',
                    action.priority === 'high' && !isChecked && 'border-crisis-critical',
                  )}
                >
                  {isChecked && <Check className="w-3 h-3 text-on-primary" />}
                </span>
                <span
                  className={clsx(
                    isChecked && 'line-through opacity-70',
                    language === 'or' && 'odia-text',
                    language === 'hi' && 'hindi-text',
                  )}
                >
                  {action.text}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
