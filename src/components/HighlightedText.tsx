'use client';

import { type ReactElement } from 'react';
import { HighlightSpan } from '@/lib/types';
import clsx from 'clsx';

interface HighlightedTextProps {
  text: string;
  highlights: HighlightSpan[];
}

const highlightStyles: Record<string, string> = {
  jargon: 'bg-yellow-100 border-b-2 border-yellow-400 text-stone-900',
  deadline: 'bg-red-100 border-b-2 border-red-400 text-red-900 font-medium',
  instruction: 'bg-blue-100 border-b-2 border-blue-400 text-blue-900',
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
    // Text before this highlight
    if (h.start > lastEnd) {
      segments.push(
        <span key={`text-${lastEnd}`}>{text.substring(lastEnd, h.start)}</span>
      );
    }

    // The highlighted span
    segments.push(
      <mark
        key={`hl-${h.start}`}
        className={clsx('rounded px-0.5 cursor-help', highlightStyles[h.type])}
        title={tooltipLabels[h.type]}
        role="mark"
      >
        {text.substring(h.start, h.end)}
      </mark>
    );

    lastEnd = h.end;
  }

  // Remaining text
  if (lastEnd < text.length) {
    segments.push(
      <span key={`text-${lastEnd}`}>{text.substring(lastEnd)}</span>
    );
  }

  return <>{segments}</>;
}
