// Highlight engine — identifies jargon, deadlines, and instructions in text.
// All client-side. No LLM calls. Pure regex + keyword matching.

import { HighlightSpan, HighlightType } from './types';

const JARGON_TERMS: string[] = [
  // Medical
  'prognosis', 'diagnosis', 'contraindicated', 'comorbidity', 'etiology',
  'bilateral', 'subcutaneous', 'intr.tunic', 'analgesic', 'antipyretic',
  'hemoglobin', 'platelet', 'creatinine', 'pathology', 'biopsy',
  'prophylaxis', 'tachycardia', 'bradycardia', 'edema', 'hemorrhage',
  'OPD', 'ICU', 'IPD', 'mg/dL', 'mmHg',
  // Legal/Government
  'notwithstanding', 'hereinafter', 'aforementioned', 'pursuant to',
  'in accordance with', 'vide', 'suo moto', 'ex parte', 'inter alia',
  'deemed', 'liable', 'indemnify', 'jurisdiction', 'adjudication',
  'gazette notification', 'standing order', 'proviso',
  'sub-section', 'clause', 'schedule', 'annexure',
  // Administrative (Indian English)
  'endorsement', 'sanction', 'deputation', 'relieving order',
  'charge memo', 'show cause notice', 'departmental enquiry',
  'compassionate appointment', 'ex-gratia', 'ad hoc',
  'KVS', 'CBSE', 'DPC', 'APAR',
];

const DEADLINE_PATTERNS: RegExp[] = [
  /\b\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}\b/g,           // dates: 15/06/2026
  /\b\d{1,2}\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\w*\s+\d{4}\b/gi,
  /within\s+\d+\s*(days?|weeks?|months?|hours?)/gi,
  /by\s+\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}/gi,
  /before\s+\d{1,2}\s+\w+\s+\d{4}/gi,
  /last\s+date[:\s]+\S+/gi,
  /due\s+(date|by)[:\s]+\S+/gi,
  /deadline[:\s]+\S+/gi,
  /\b(24|48|72)\s*hours?\b/gi,
  /\b\d+\s*days?\s*(from|after|of)\b/gi,
];

const INSTRUCTION_PATTERNS: RegExp[] = [
  /\b(must|shall|should|required to|directed to|instructed to)\b/gi,
  /\b(report to|submit|contact|visit|bring|carry|produce)\b/gi,
  /\b(ensure|comply|adhere|furnish|deposit|remit)\b/gi,
  /\bplease\s+(submit|contact|report|visit|bring|note)\b/gi,
  /\bfailure\s+to\b/gi,
  /\byou\s+are\s+(advised|directed|required|requested)\b/gi,
];

export function detectHighlights(text: string): HighlightSpan[] {
  const highlights: HighlightSpan[] = [];
  const lowerText = text.toLowerCase();

  // Detect jargon terms
  for (const term of JARGON_TERMS) {
    const lowerTerm = term.toLowerCase();
    let searchStart = 0;
    while (true) {
      const idx = lowerText.indexOf(lowerTerm, searchStart);
      if (idx === -1) break;

      // Only match whole words (rough boundary check)
      const before = idx > 0 ? text[idx - 1] : ' ';
      const after = idx + term.length < text.length ? text[idx + term.length] : ' ';
      if (/\W/.test(before) && /\W/.test(after)) {
        highlights.push({
          start: idx,
          end: idx + term.length,
          type: 'jargon',
          term: text.substring(idx, idx + term.length),
        });
      }
      searchStart = idx + term.length;
    }
  }

  // Detect deadlines via patterns
  for (const pattern of DEADLINE_PATTERNS) {
    const regex = new RegExp(pattern.source, pattern.flags);
    let match;
    while ((match = regex.exec(text)) !== null) {
      highlights.push({
        start: match.index,
        end: match.index + match[0].length,
        type: 'deadline',
        term: match[0],
      });
    }
  }

  // Detect instructions via patterns
  for (const pattern of INSTRUCTION_PATTERNS) {
    const regex = new RegExp(pattern.source, pattern.flags);
    let match;
    while ((match = regex.exec(text)) !== null) {
      highlights.push({
        start: match.index,
        end: match.index + match[0].length,
        type: 'instruction',
        term: match[0],
      });
    }
  }

  // Remove overlapping highlights — prefer higher-priority type
  return deduplicateHighlights(highlights);
}

function deduplicateHighlights(highlights: HighlightSpan[]): HighlightSpan[] {
  const priorityOrder: Record<HighlightType, number> = {
    deadline: 3,
    instruction: 2,
    jargon: 1,
  };

  // Sort by priority (highest first), then by start position
  highlights.sort((a, b) => {
    const pDiff = priorityOrder[b.type] - priorityOrder[a.type];
    if (pDiff !== 0) return pDiff;
    return a.start - b.start;
  });

  const result: HighlightSpan[] = [];
  const occupied = new Set<number>();

  for (const h of highlights) {
    let overlaps = false;
    for (let i = h.start; i < h.end; i++) {
      if (occupied.has(i)) { overlaps = true; break; }
    }
    if (!overlaps) {
      for (let i = h.start; i < h.end; i++) occupied.add(i);
      result.push(h);
    }
  }

  return result.sort((a, b) => a.start - b.start);
}
