'use client';

import { useState } from 'react';
import { Paragraph, GistResponse, Language } from '@/lib/types';
import { Badge } from './ui/Badge';
import { HITLBanner } from './ui/HITLBanner';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { ActionChecklist } from './ActionChecklist';
import { QuoteBlock } from './shell/QuoteBlock';
import { InfoPanel } from './shell/InfoPanel';
import { UncertaintyCard } from './shell/UncertaintyCard';
import { Icon } from './ui/Icon';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

interface GistSidebarProps {
  paragraph: Paragraph | null;
  gist: GistResponse | null;
  isLoading: boolean;
  language: Language;
  isUploaded?: boolean;
}

const langLabel: Record<Language, string> = {
  en: 'English',
  hi: 'हिंदी',
  or: 'ଓଡ଼ିଆ',
};

export function GistSidebar({ paragraph, gist, isLoading, language, isUploaded }: GistSidebarProps) {
  const [feedbackToast, setFeedbackToast] = useState(false);

  const handleCopy = async () => {
    if (!gist) return;
    const text = [gist.gist, gist.whatThisMeans].filter(Boolean).join('\n\n');
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* clipboard may be unavailable */
    }
  };

  const handleFlag = () => {
    setFeedbackToast(true);
    setTimeout(() => setFeedbackToast(false), 2500);
  };

  if (!paragraph) {
    return (
      <div className="flex flex-col h-full bg-surface-container-low">
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-surface-container flex items-center justify-center mb-4">
            <Icon name="lightbulb" className="w-7 h-7 text-on-surface-variant" />
          </div>
          <h3 className="font-display text-headline-md text-on-surface">Select a section</h3>
          <p
            className={clsx(
              'text-body-sm text-on-surface-variant mt-2 max-w-[240px]',
              language === 'or' && 'odia-text',
              language === 'hi' && 'hindi-text',
            )}
          >
            Click any paragraph on the left to see its plain-language explanation in {langLabel[language]}.
          </p>
        </div>
        <div className="p-3 border-t border-outline-variant bg-surface-container-lowest flex-shrink-0">
          <HITLBanner isUploaded={isUploaded} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-surface-container-low">
      <div className="px-4 py-3 border-b border-outline-variant bg-surface-container-lowest flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <h3 className="font-label-md text-label-md text-on-surface truncate">
            Analysis: Paragraph {paragraph.index + 1}
          </h3>
          <Badge urgency={paragraph.urgency} size="sm" />
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={handleCopy}
            disabled={!gist || isLoading}
            className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-container text-on-surface-variant focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Copy analysis to clipboard"
          >
            <Icon name="content_copy" className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleFlag}
            className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-container text-on-surface-variant focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Flag this analysis"
          >
            <Icon name="flag" className="w-5 h-5" />
          </button>
        </div>
      </div>

      {feedbackToast && (
        <p role="status" className="px-4 py-2 text-body-sm bg-secondary-container text-on-secondary-container">
          Thanks for your feedback
        </p>
      )}

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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
              <QuoteBlock quote={gist.sourceQuote} />

              <div>
                <h4 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1.5">
                  In Plain Language
                </h4>
                <p
                  className={clsx(
                    'text-body-sm text-on-surface leading-relaxed',
                    language === 'or' && 'odia-text',
                    language === 'hi' && 'hindi-text',
                  )}
                >
                  {gist.gist}
                </p>
              </div>

              {gist.whatThisMeans && (
                <InfoPanel title="What this means for you" icon="assignment_ind">
                  <p
                    className={clsx(
                      'text-body-sm text-on-secondary-container leading-relaxed',
                      language === 'or' && 'odia-text',
                      language === 'hi' && 'hindi-text',
                    )}
                  >
                    {gist.whatThisMeans}
                  </p>
                  {gist.suggestedActions && gist.suggestedActions.length > 0 && (
                    <div className="mt-3">
                      <ActionChecklist actions={gist.suggestedActions} language={language} />
                    </div>
                  )}
                </InfoPanel>
              )}

              {gist.uncertainSections && gist.uncertainSections.length > 0 && (
                <UncertaintyCard />
              )}

              {!gist.whatThisMeans && gist.suggestedActions && gist.suggestedActions.length > 0 && (
                <ActionChecklist actions={gist.suggestedActions} language={language} />
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="p-3 border-t border-outline-variant bg-surface-container-lowest flex-shrink-0">
        <HITLBanner isUploaded={isUploaded} />
      </div>
    </div>
  );
}
