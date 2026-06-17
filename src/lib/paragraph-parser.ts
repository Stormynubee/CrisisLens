import { Paragraph } from './types';
import { classifyUrgency } from './urgency-classifier';
import { detectHighlights } from './highlight-engine';

export function parseDocument(rawText: string): Paragraph[] {
  // Split on double newlines or line breaks that separate logical blocks.
  const blocks = rawText
    .split(/\n\s*\n/)
    .map(b => b.trim())
    .filter(b => b.length > 0);

  return blocks.map((text, index) => {
    const isHeader = text.length < 100 && (
      text === text.toUpperCase() ||
      /^(subject|ref|no\.|date|from|to)[:]/i.test(text) ||
      /^[A-Z\s\-:]+$/.test(text.trim())
    );

    return {
      id: `p-${index}`,
      index,
      text,
      urgency: classifyUrgency(text),
      highlights: detectHighlights(text),
      isHeader,
    };
  });
}
