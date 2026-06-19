'use client';

import { type ReactElement } from 'react';
import { HighlightSpan } from '@/lib/types';
import clsx from 'clsx';

interface HighlightedTextProps {
  text: string;
  highlights: HighlightSpan[];
}

const highlightStyles: Record<string, string> = {
  jargon: 'bg-highlight-jargon border-b-2 border-secondary-fixed-dim text-on-surface',
  deadline: 'bg-highlight-deadline border-b-2 border-error text-on-error-container font-medium',
  instruction: 'bg-highlight-instruction border-b-2 border-primary text-on-surface',
};

const tooltipLabels: Record<string, string> = {
  jargon: 'Technical/jargon term',
  deadline: 'Date or deadline',
  instruction: 'Action required',
};

export function HighlightedText({ text, highlights }: HighlightedTextProps) {
  if (highlights.length === 0) {
    return <span>{text}</span>;
  }

  const segments: ReactElement[] = [];
  let lastEnd = 0;

  for (const h of highlights) {
    if (h.start > lastEnd) {
      segments.push(<span key={`text-${lastEnd}`}>{text.substring(lastEnd, h.start)}</span>);
    }

    segments.push(
      <mark
        key={`hl-${h.start}`}
        className={clsx('rounded px-0.5 cursor-help', highlightStyles[h.type])}
        title={tooltipLabels[h.type]}
      >
        {text.substring(h.start, h.end)}
      </mark>,
    );

    lastEnd = h.end;
  }

  if (lastEnd < text.length) {
    segments.push(<span key={`text-${lastEnd}`}>{text.substring(lastEnd)}</span>);
  }

  return <>{segments}</>;
}
