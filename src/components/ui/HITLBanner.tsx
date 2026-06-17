'use client';

import { ShieldAlert } from 'lucide-react';

export function HITLBanner() {
  return (
    <div
      className="hitl-banner flex items-start gap-3"
      role="alert"
      aria-live="polite"
    >
      <ShieldAlert className="w-5 h-5 mt-0.5 flex-shrink-0 text-amber-600" />
      <div>
        <p className="font-medium text-amber-900 text-sm">
          AI guidance only — you make the final decision
        </p>
        <p className="text-amber-700 text-xs mt-1">
          CrisisLens translates and highlights. It does NOT give legal, medical, or safety decisions.
          The original document is the source of truth. Consult qualified professionals for important decisions.
        </p>
      </div>
    </div>
  );
}
