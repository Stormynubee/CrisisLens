import { describe, expect, it } from 'vitest';
import {
  buildDocumentFromText,
  MAX_UPLOAD_BYTES,
  validateUploadFile,
} from './ingest-document';

describe('ingest-document', () => {
  it('builds DocumentData from plain text', () => {
    const doc = buildDocumentFromText('First block.\n\nSecond block with deadline May 24.', {
      title: 'Notice.pdf',
    });
    expect(doc.id).toBe('upload');
    expect(doc.paragraphs.length).toBeGreaterThanOrEqual(2);
    expect(doc.title).toBe('Notice.pdf');
  });

  it('rejects empty text', () => {
    expect(() => buildDocumentFromText('   ', { title: 'x' })).toThrow(/empty/i);
  });

  it('rejects unsupported file types', () => {
    expect(validateUploadFile({ name: 'doc.docx', size: 100 })).toMatch(/supported/i);
  });

  it('rejects oversized files', () => {
    expect(validateUploadFile({ name: 'a.txt', size: MAX_UPLOAD_BYTES + 1 })).toMatch(/5 MB/i);
  });

  it('accepts valid txt upload', () => {
    expect(validateUploadFile({ name: 'letter.txt', size: 512 })).toBeNull();
  });
});
