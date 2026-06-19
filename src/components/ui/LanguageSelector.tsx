'use client';

import { Language } from '@/lib/types';
import clsx from 'clsx';

interface LanguageSelectorProps {
  value: Language;
  onChange: (lang: Language) => void;
}

const languages: { code: Language; label: string; script: string }[] = [
  { code: 'en', label: 'English', script: 'EN' },
  { code: 'hi', label: 'हिंदी', script: 'HI' },
  { code: 'or', label: 'ଓଡ଼ିଆ', script: 'OD' },
];

export function LanguageSelector({ value, onChange }: LanguageSelectorProps) {
  return (
    <div
      className="flex items-center gap-1 bg-surface-container-low rounded-full p-1 border border-outline-variant"
      role="radiogroup"
      aria-label="Select language"
    >
      {languages.map((lang) => (
        <button
          key={lang.code}
          type="button"
          role="radio"
          aria-checked={value === lang.code}
          onClick={() => onChange(lang.code)}
          className={clsx(
            'px-3 py-1.5 rounded-full font-label-sm text-label-sm transition-all min-h-[36px] min-w-[36px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
            value === lang.code
              ? 'bg-surface-container-lowest text-primary shadow-sm'
              : 'text-on-surface-variant hover:text-primary',
            lang.code === 'or' && 'odia-text',
            lang.code === 'hi' && 'hindi-text',
          )}
        >
          <span className="hidden sm:inline">{lang.label}</span>
          <span className="sm:hidden">{lang.script}</span>
        </button>
      ))}
    </div>
  );
}
