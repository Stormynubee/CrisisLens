'use client';

import { Paragraph } from '@/lib/types';
import { Badge } from './ui/Badge';
import { HighlightedText } from './HighlightedText';
import { ChevronRight } from 'lucide-react';
import clsx from 'clsx';

interface ParagraphBlockProps {
  paragraph: Paragraph;
  isSelected: boolean;
  onClick: () => void;
}

const urgencyBandClass: Record<string, string> = {
  CRITICAL: 'urgency-band-critical',
  'TIME-SENSITIVE': 'urgency-band-timesensitive',
  INFORMATIONAL: 'urgency-band-info',
};

export function ParagraphBlock({ paragraph, isSelected, onClick }: ParagraphBlockProps) {
  const handleClick = () => {
    onClick();
    // Mobile: scroll gist panel into view after selection (demo video uses desktop)
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      requestAnimationFrame(() => {
        document.getElementById('gist-sidebar')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  };

  if (paragraph.isHeader) {
    return (
      <div className="px-4 py-2">
        <p className="font-mono text-xs text-stone-500 uppercase tracking-wider">
          {paragraph.text}
        </p>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={clsx(
        'paragraph-clickable w-full text-left',
        urgencyBandClass[paragraph.urgency],
        isSelected && 'selected',
      )}
      aria-pressed={isSelected}
      aria-label={`Paragraph ${paragraph.index + 1}: ${paragraph.urgency} urgency. Click to see plain-language explanation.`}
    >
      <div className="flex items-start gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <Badge urgency={paragraph.urgency} size="sm" />
            <span className="text-xs text-stone-400 font-mono">
              ¶{paragraph.index + 1}
            </span>
          </div>
          <p className="text-sm text-stone-800 leading-relaxed whitespace-pre-wrap">
            <HighlightedText
              text={paragraph.text}
              highlights={paragraph.highlights}
            />
          </p>
        </div>
        <ChevronRight className={clsx(
          'w-4 h-4 text-stone-400 flex-shrink-0 mt-1 transition-transform duration-200',
          isSelected && 'rotate-90 text-blue-500',
        )} />
      </div>
    </button>
  );
}
