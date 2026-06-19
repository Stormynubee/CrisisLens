import { parseDocument } from './paragraph-parser';
import { classifyDocumentUrgency } from './urgency-classifier';
import type { DocumentData } from './types';
import { UPLOAD_DOC_ID } from './upload-session';

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
export const ALLOWED_EXTENSIONS = ['.txt', '.text', '.pdf'] as const;

export interface IngestMeta {
  title: string;
  issuer?: string;
  date?: string;
  reference?: string;
  category?: DocumentData['category'];
}

export function validateUploadFile(file: { name: string; size: number }): string | null {
  const lower = file.name.toLowerCase();
  const ok = ALLOWED_EXTENSIONS.some((ext) => lower.endsWith(ext));
  if (!ok) return 'Only .txt and .pdf files are supported.';
  if (file.size === 0) return 'File is empty.';
  if (file.size > MAX_UPLOAD_BYTES) return 'File must be 5 MB or smaller.';
  return null;
}

export function extractMetadataFromText(rawText: string): Pick<IngestMeta, 'issuer' | 'date' | 'reference'> {
  const head = rawText.slice(0, 800);
  const dateMatch = head.match(/\b(\d{1,2}[\/.-]\d{1,2}[\/.-]\d{2,4}|\d{4}-\d{2}-\d{2})\b/);
  const refMatch = head.match(/(?:ref(?:erence)?|no\.?)\s*[:#]?\s*([A-Z0-9\/\-]+)/i);
  const fromMatch = head.match(/(?:from|issuer)\s*[:]\s*(.+)/i);
  return {
    date: dateMatch?.[1],
    reference: refMatch?.[1],
    issuer: fromMatch?.[1]?.trim().slice(0, 80),
  };
}

export function buildDocumentFromText(rawText: string, meta: IngestMeta): DocumentData {
  const trimmed = rawText.trim();
  if (!trimmed) {
    throw new Error('Document text is empty.');
  }

  const paragraphs = parseDocument(trimmed);
  const overallUrgency = classifyDocumentUrgency(paragraphs.map((p) => p.urgency));
  const hints = extractMetadataFromText(trimmed);

  return {
    id: UPLOAD_DOC_ID,
    title: meta.title || 'Uploaded document',
    subtitle: 'User-uploaded document',
    sourceLanguage: 'en',
    category: meta.category ?? 'government',
    rawText: trimmed,
    paragraphs,
    overallUrgency,
    metadata: {
      issuer: meta.issuer ?? hints.issuer ?? 'Unknown issuer',
      date: meta.date ?? hints.date ?? 'Unknown date',
      reference: meta.reference ?? hints.reference ?? '—',
    },
  };
}
