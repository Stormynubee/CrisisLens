'use client';

import { Paragraph, GistResponse, Language } from '@/lib/types';
import { Badge } from './ui/Badge';
import { HITLBanner } from './ui/HITLBanner';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { ActionChecklist } from './ActionChecklist';
import { Quote, AlertTriangle, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

interface GistSidebarProps {
  paragraph: Paragraph | null;
  gist: GistResponse | null;
  isLoading: boolean;
  language: Language;
}

const langLabel: Record<Language, string> = {
  en: 'English',
  hi: 'हिंदी',
  or: 'ଓଡ଼ିଆ',
};

export function GistSidebar({ paragraph, gist, isLoading, language }: GistSidebarProps) {
  if (!paragraph) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center mb-4">
            <Lightbulb className="w-7 h-7 text-stone-400" />
          </div>
          <h3 className="font-display text-lg font-medium text-stone-700">
            Select a section
          </h3>
          <p className={clsx(
            'text-sm text-stone-500 mt-2 max-w-[240px]',
            language === 'or' && 'odia-text',
            language === 'hi' && 'hindi-text',
          )}>
            Click any paragraph on the left to see its plain-language explanation in {langLabel[language]}.
          </p>
        </div>
        <div className="p-3 border-t border-stone-200 bg-white flex-shrink-0">
          <HITLBanner />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Sidebar header */}
      <div className="px-4 py-3 border-b border-stone-200 bg-white">
        <div className="flex items-center gap-2">
          <Badge urgency={paragraph.urgency} size="md" />
          <span className={clsx(
            'text-xs text-stone-400 font-mono',
            language === 'or' && 'odia-text',
            language === 'hi' && 'hindi-text',
          )}>
            ¶{paragraph.index + 1} — {langLabel[language]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingSpinner />
            </motion.div>
          ) : gist ? (
            <motion.div
              key={`gist-${paragraph.id}-${language}`}
              data-testid="gist-sidebar-content"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              lang={language}
              className="p-4 space-y-4"
            >
              {/* Source quote (provenance) */}
              <div className="bg-stone-50 rounded-lg p-3 border border-stone-200">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Quote className="w-3 h-3 text-stone-400" />
                  <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">
                    Original text
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed italic line-clamp-4">
                  &ldquo;{gist.sourceQuote}&rdquo;
                </p>
              </div>

              {/* Plain-language gist */}
              <div>
                <h4 className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-1.5">
                  In plain language
                </h4>
                <p className={clsx(
                  'text-sm text-stone-900 leading-relaxed',
                  language === 'or' && 'odia-text',
                  language === 'hi' && 'hindi-text',
                )}>
                  {gist.gist}
                </p>
              </div>

              {/* What this means for you */}
              {gist.whatThisMeans && (
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <h4 className="text-xs font-medium text-blue-700 uppercase tracking-wider mb-1">
                    What this means for you
                  </h4>
                  <p className={clsx(
                    'text-sm text-blue-900 leading-relaxed',
                    language === 'or' && 'odia-text',
                    language === 'hi' && 'hindi-text',
                  )}>
                    {gist.whatThisMeans}
                  </p>
                </div>
              )}

              {/* Uncertainty warnings */}
              {gist.uncertainSections && gist.uncertainSections.length > 0 && (
                <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                  <div className="flex items-center gap-1.5 mb-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span className="text-xs font-medium text-amber-700">
                      Uncertain — verify with original
                    </span>
                  </div>
                  <p className="text-xs text-amber-800">
                    Some parts of this section are unclear. Check the original document and consult a qualified person.
                  </p>
                </div>
              )}

              {/* Action checklist */}
              <ActionChecklist actions={gist.suggestedActions || []} language={language} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* HITL banner — always visible at bottom */}
      <div className="p-3 border-t border-stone-200 bg-white flex-shrink-0">
        <HITLBanner />
      </div>
    </div>
  );
}
