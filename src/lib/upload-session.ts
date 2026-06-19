import type { DocumentData } from './types';

export const UPLOAD_SESSION_KEY = 'crisislens:upload';
export const UPLOAD_DOC_ID = 'upload';

export function saveUpload(doc: DocumentData): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(UPLOAD_SESSION_KEY, JSON.stringify(doc));
}

export function loadUpload(): DocumentData | null {
  if (typeof window === 'undefined') return null;
  const raw = sessionStorage.getItem(UPLOAD_SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as DocumentData;
  } catch {
    return null;
  }
}

export function clearUpload(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(UPLOAD_SESSION_KEY);
}
