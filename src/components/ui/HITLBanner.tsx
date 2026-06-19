'use client';

import { ShieldAlert } from 'lucide-react';

interface HITLBannerProps {
  isUploaded?: boolean;
}

export function HITLBanner({ isUploaded }: HITLBannerProps) {
  return (
    <div className="hitl-banner flex items-start gap-3" role="alert" aria-live="polite">
      <ShieldAlert className="w-5 h-5 mt-0.5 flex-shrink-0 text-secondary" />
      <div>
        <p className="font-medium text-on-surface text-body-sm">
          AI guidance only — you make the final decision
        </p>
        <p className="text-on-surface-variant text-body-sm mt-1">
          {isUploaded
            ? 'AI analysis for uploaded documents — verify with the original. CrisisLens does not give legal, medical, or safety decisions.'
            : 'CrisisLens translates and highlights. It does NOT give legal, medical, or safety decisions. The original document is the source of truth.'}
        </p>
      </div>
    </div>
  );
}
