// Core domain types — every component references these.

export type UrgencyLevel = 'CRITICAL' | 'TIME-SENSITIVE' | 'INFORMATIONAL';

export type Language = 'en' | 'hi' | 'or';

export type HighlightType = 'jargon' | 'deadline' | 'instruction';

export interface HighlightSpan {
  start: number;
  end: number;
  type: HighlightType;
  term: string;
}

export interface Paragraph {
  id: string;
  index: number;
  text: string;
  urgency: UrgencyLevel;
  highlights: HighlightSpan[];
  isHeader?: boolean;
}

export interface DocumentData {
  id: string;
  title: string;
  subtitle: string;
  sourceLanguage: string;
  category: 'school' | 'medical' | 'government';
  rawText: string;
  paragraphs: Paragraph[];
  overallUrgency: UrgencyLevel;
  metadata: {
    issuer: string;
    date: string;
    reference: string;
  };
}

export interface GistResponse {
  paragraphId: string;
  language: Language;
  gist: string;
  whatThisMeans: string;
  suggestedActions: ActionItem[];
  uncertainSections: string[];
  sourceQuote: string;
}

export interface ActionItem {
  id: string;
  text: string;
  isCompleted: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface DemoDocument {
  id: string;
  title: string;
  subtitle: string;
  category: 'school' | 'medical' | 'government';
  icon: string; // Lucide icon name
  urgency: UrgencyLevel;
  description: string;
}

export interface DemoResponse {
  documentId: string;
  paragraphId: string;
  language: Language;
  response: GistResponse;
}
