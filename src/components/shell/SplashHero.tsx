'use client';

import { Icon } from '@/components/ui/Icon';

/** Minimal hero — matches landing mark, no decorative rings or feature pills. */
export function SplashHero() {
  return (
    <div className="text-center">
      <div className="relative inline-block mb-5" aria-hidden>
        <Icon name="description" className="w-14 h-14 text-outline mx-auto" />
        <span className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full border-2 border-surface-container-lowest bg-primary pulse-lens" />
      </div>
      <h1 className="font-display text-display-lg-mobile sm:text-display-lg text-on-surface text-balance">
        CrisisLens
      </h1>
      <p className="font-body-base text-body-base text-on-surface-variant max-w-[18rem] mx-auto mt-2 leading-relaxed text-balance">
        Understand emergency documents when every minute counts.
      </p>
    </div>
  );
}
