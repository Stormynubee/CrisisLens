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
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-1.5">
      <h4 className="text-xs font-medium text-stone-500 uppercase tracking-wider">
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
                  'w-full flex items-start gap-2.5 p-2 rounded-lg text-left text-sm transition-all cursor-pointer',
                  isChecked
                    ? 'bg-green-50 text-green-800'
                    : 'bg-stone-50 text-stone-700 hover:bg-stone-100',
                )}
              >
                <span className={clsx(
                  'w-4 h-4 rounded border flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors',
                  isChecked
                    ? 'bg-green-600 border-green-600'
                    : 'border-stone-300',
                  action.priority === 'high' && !isChecked && 'border-red-300',
                )}>
                  {isChecked && <Check className="w-3 h-3 text-white" />}
                </span>
                <span className={clsx(
                  isChecked && 'line-through opacity-70',
                  language === 'or' && 'odia-text',
                  language === 'hi' && 'hindi-text',
                )}>
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
