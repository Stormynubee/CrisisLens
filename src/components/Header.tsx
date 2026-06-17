'use client';

import Image from 'next/image';
import { Language } from '@/lib/types';
import { LanguageSelector } from './ui/LanguageSelector';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isDemoMode: boolean;
  showLanguage?: boolean;
}

export function Header({ language, onLanguageChange, isDemoMode, showLanguage = false }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="CrisisLens"
            width={32}
            height={32}
            className="rounded-lg"
            priority
          />
          <div>
            <h1 className="font-display font-bold text-lg leading-none text-stone-900">
              CrisisLens
            </h1>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {isDemoMode && (
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-200">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
              Demo Mode
            </span>
          )}
          {showLanguage && (
            <LanguageSelector value={language} onChange={onLanguageChange} />
          )}
        </div>
      </div>
    </header>
  );
}
