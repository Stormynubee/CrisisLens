'use client';

import { Paragraph } from '@/lib/types';
import { Badge } from './ui/Badge';
import { HighlightedText } from './HighlightedText';
import { Icon } from './ui/Icon';
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
  if (paragraph.isHeader) {
    return (
      <div className="px-4 py-2">
        <p className="font-mono text-label-sm text-on-surface-variant uppercase tracking-wider">
          {paragraph.text}
        </p>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      data-testid={`paragraph-${paragraph.id}`}
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
            <span className="text-label-sm text-on-surface-variant font-mono">
              ¶{paragraph.index + 1}
            </span>
          </div>
          <p className="text-body-sm text-on-surface leading-relaxed whitespace-pre-wrap">
            <HighlightedText text={paragraph.text} highlights={paragraph.highlights} />
          </p>
        </div>
        <Icon
          name="chevron_right"
          className={clsx(
            'w-4 h-4 text-on-surface-variant flex-shrink-0 mt-1 transition-transform duration-200',
            isSelected && 'rotate-90 text-primary',
          )}
        />
      </div>
    </button>
  );
}
