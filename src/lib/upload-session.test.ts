import { beforeEach, describe, expect, it } from 'vitest';
import { clearUpload, loadUpload, saveUpload, UPLOAD_SESSION_KEY } from './upload-session';
import type { DocumentData } from './types';

const sampleDoc: DocumentData = {
  id: 'upload',
  title: 'Test Upload',
  subtitle: '',
  sourceLanguage: 'en',
  category: 'government',
  rawText: 'Paragraph one.\n\nParagraph two.',
  paragraphs: [],
  overallUrgency: 'INFORMATIONAL',
  metadata: { issuer: 'Test', date: '2024-01-01', reference: 'REF-1' },
};

describe('upload-session', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('round-trips document through sessionStorage', () => {
    saveUpload(sampleDoc);
    expect(sessionStorage.getItem(UPLOAD_SESSION_KEY)).toBeTruthy();
    expect(loadUpload()?.title).toBe('Test Upload');
  });

  it('returns null when empty', () => {
    expect(loadUpload()).toBeNull();
  });

  it('clears stored upload', () => {
    saveUpload(sampleDoc);
    clearUpload();
    expect(loadUpload()).toBeNull();
  });
});
