'use client';

import { ReactNode, useEffect } from 'react';
import clsx from 'clsx';

interface GistDrawerProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function GistDrawer({ open, onClose, children }: GistDrawerProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end" role="dialog" aria-modal="true" aria-label="Analysis panel">
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        aria-label="Close analysis"
        onClick={onClose}
      />
      <div className="relative bg-surface-container-low max-h-[85vh] flex flex-col rounded-t-xl border-t border-outline-variant shadow-card animate-fade-in">
        <div className="flex justify-center py-2">
          <div className="w-10 h-1 rounded-full bg-outline-variant" aria-hidden />
        </div>
        <div className={clsx('flex-1 overflow-hidden flex flex-col min-h-0')}>{children}</div>
      </div>
    </div>
  );
}
