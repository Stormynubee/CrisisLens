'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Language } from '@/lib/types';
import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { Icon } from '@/components/ui/Icon';
import clsx from 'clsx';

interface AppHeaderProps {
  language?: Language;
  onLanguageChange?: (lang: Language) => void;
  isDemoMode?: boolean;
  showLanguage?: boolean;
  variant?: 'landing' | 'viewer';
  activeNav?: 'documents' | 'analysis' | 'archives';
  onNavAnalysis?: () => void;
}

export function AppHeader({
  language = 'en',
  onLanguageChange,
  isDemoMode = true,
  showLanguage = true,
  variant = 'landing',
  activeNav = 'documents',
  onNavAnalysis,
}: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-50 h-14 border-b border-outline-variant bg-surface-container-lowest shadow-sm flex-shrink-0">
      <div className="h-full px-container-padding flex items-center justify-between max-w-[100vw]">
        <div className="flex items-center gap-6 md:gap-8 min-w-0">
          <Link href="/" className="flex items-center gap-2.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
            {variant === 'landing' ? (
              <>
                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-on-primary">
                  <Icon name="visibility" className="w-[18px] h-[18px] text-on-primary" />
                </div>
                <span className="font-headline-md text-headline-md font-bold text-primary">CrisisLens</span>
              </>
            ) : (
              <span className="font-display text-display-lg-mobile md:text-display-lg text-on-surface">CrisisLens</span>
            )}
          </Link>
          {variant === 'viewer' && (
            <nav className="hidden md:flex gap-6 text-body-base" aria-label="Main">
              <Link
                href="/"
                className={clsx(
                  'pb-1 transition-colors',
                  activeNav === 'documents'
                    ? 'text-primary border-b-2 border-primary font-medium'
                    : 'text-on-surface-variant hover:text-primary',
                )}
              >
                Documents
              </Link>
              <button
                type="button"
                onClick={onNavAnalysis}
                className={clsx(
                  'pb-1 transition-colors',
                  activeNav === 'analysis'
                    ? 'text-primary border-b-2 border-primary font-medium'
                    : 'text-on-surface-variant hover:text-primary',
                )}
              >
                Analysis
              </button>
              <span
                className="pb-1 text-on-surface-variant/50 cursor-not-allowed"
                title="Coming soon"
              >
                Archives
              </span>
            </nav>
          )}
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          {showLanguage && onLanguageChange && (
            <LanguageSelector value={language} onChange={onLanguageChange} />
          )}
          {isDemoMode && (
            <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-outline-variant bg-surface-container-lowest">
              <span className="w-2 h-2 rounded-full bg-primary/60 animate-pulse" aria-hidden />
              <span className="font-label-sm text-label-sm text-primary">Demo Mode</span>
            </span>
          )}
          {variant === 'viewer' && (
            <>
              <button
                type="button"
                className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-variant text-on-surface-variant focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Language settings"
              >
                <Icon name="language" className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 rounded-full bg-surface-variant border border-outline-variant flex items-center justify-center">
                <Image src="/logo.png" alt="" width={20} height={20} className="rounded" />
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
