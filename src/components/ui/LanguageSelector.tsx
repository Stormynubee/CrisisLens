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
  { code: 'or', label: 'ଓଡ଼ିଆ', script: 'OR' },
];

export function LanguageSelector({ value, onChange }: LanguageSelectorProps) {
  return (
    <div className="flex items-center gap-1 bg-stone-100 rounded-lg p-1" role="radiogroup" aria-label="Select language">
      {languages.map((lang) => (
        <button
          key={lang.code}
          type="button"
          role="radio"
          aria-checked={value === lang.code}
          onClick={() => onChange(lang.code)}
          className={clsx(
            'px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer',
            value === lang.code
              ? 'bg-white text-stone-900 shadow-sm'
              : 'text-stone-500 hover:text-stone-700',
          )}
        >
          <span className="hidden sm:inline">{lang.label}</span>
          <span className="sm:hidden">{lang.script}</span>
        </button>
      ))}
    </div>
  );
}
