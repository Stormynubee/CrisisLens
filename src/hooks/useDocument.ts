'use client';

import { useState, useCallback } from 'react';
import { DocumentData, Paragraph, GistResponse, Language } from '@/lib/types';
import { parseDocument } from '@/lib/paragraph-parser';
import { classifyDocumentUrgency } from '@/lib/urgency-classifier';
import { loadUpload, UPLOAD_DOC_ID } from '@/lib/upload-session';

import kvHeatwave from '@/data/demo-documents/kv-heatwave-circular.json';
import hospitalDischarge from '@/data/demo-documents/hospital-discharge.json';
import pmKisan from '@/data/demo-documents/pm-kisan-rejection.json';

const demoDocMap: Record<string, typeof kvHeatwave> = {
  'kv-heatwave': kvHeatwave,
  'hospital-discharge': hospitalDischarge,
  'pm-kisan-rejection': pmKisan,
};

export function useDocument() {
  const [document, setDocument] = useState<DocumentData | null>(null);
  const [selectedParagraph, setSelectedParagraph] = useState<Paragraph | null>(null);
  const [gistResponse, setGistResponse] = useState<GistResponse | null>(null);
  const [isLoadingGist, setIsLoadingGist] = useState(false);

  const loadDemoDocument = useCallback((id: string) => {
    const raw = demoDocMap[id];
    if (!raw) return;

    const paragraphs = parseDocument(raw.rawText);
    const overallUrgency = classifyDocumentUrgency(paragraphs.map((p) => p.urgency));

    const doc: DocumentData = {
      id: raw.id,
      title: raw.title,
      subtitle: raw.subtitle,
      sourceLanguage: raw.sourceLanguage,
      category: raw.category as DocumentData['category'],
      rawText: raw.rawText,
      paragraphs,
      overallUrgency,
      metadata: raw.metadata,
    };

    setDocument(doc);
    setSelectedParagraph(null);
    setGistResponse(null);
  }, []);

  const loadUploadedDocument = useCallback(() => {
    const uploaded = loadUpload();
    if (!uploaded) return false;
    setDocument(uploaded);
    setSelectedParagraph(null);
    setGistResponse(null);
    return true;
  }, []);

  const loadDocument = useCallback(
    (id: string) => {
      if (id === UPLOAD_DOC_ID) {
        return loadUploadedDocument();
      }
      loadDemoDocument(id);
      return true;
    },
    [loadDemoDocument, loadUploadedDocument],
  );

  const selectParagraph = useCallback(
    async (paragraph: Paragraph, language: Language, isDemoMode: boolean, documentId: string) => {
      setSelectedParagraph(paragraph);
      setGistResponse(null);
      setIsLoadingGist(true);

      const useDemo = isDemoMode && documentId !== UPLOAD_DOC_ID;

      try {
        if (useDemo) {
          const responses = await loadDemoResponse(documentId, language);
          const match = responses?.find(
            (r) => (r as { paragraphId: string }).paragraphId === paragraph.id,
          );
          if (match) {
            await new Promise((resolve) => setTimeout(resolve, 400));
            setGistResponse(match as unknown as GistResponse);
          } else {
            setGistResponse(createFallbackGist(paragraph, language));
          }
        } else {
          const res = await fetch('/api/gist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              paragraphId: paragraph.id,
              paragraphText: paragraph.text,
              language,
              documentContext: document?.title || '',
              urgency: paragraph.urgency,
            }),
          });
          if (res.ok) {
            const data = await res.json();
            setGistResponse(data);
          } else {
            setGistResponse(createFallbackGist(paragraph, language));
          }
        }
      } catch (err) {
        console.error('Failed to load gist:', err);
        setGistResponse(createFallbackGist(paragraph, language));
      } finally {
        setIsLoadingGist(false);
      }
    },
    [document],
  );

  return {
    document,
    selectedParagraph,
    gistResponse,
    isLoadingGist,
    loadDemoDocument,
    loadUploadedDocument,
    loadDocument,
    selectParagraph,
  };
}

async function loadDemoResponse(documentId: string, language: Language) {
  try {
    const fileMap: Record<string, Partial<Record<Language, () => Promise<{ default: { responses: unknown[] } }>>>> = {
      'kv-heatwave': {
        en: () => import('@/data/demo-responses/kv-heatwave-en.json'),
        or: () => import('@/data/demo-responses/kv-heatwave-or.json'),
      },
      'hospital-discharge': {
        en: () => import('@/data/demo-responses/hospital-discharge-en.json'),
        or: () => import('@/data/demo-responses/hospital-discharge-or.json'),
      },
      'pm-kisan-rejection': {
        en: () => import('@/data/demo-responses/pm-kisan-rejection-en.json'),
        or: () => import('@/data/demo-responses/pm-kisan-rejection-or.json'),
      },
    };

    const loader = fileMap[documentId]?.[language];
    if (loader) {
      const module = await loader();
      return module.default.responses;
    }
    return null;
  } catch {
    return null;
  }
}

function createFallbackGist(paragraph: Paragraph, language: Language): GistResponse {
  return {
    paragraphId: paragraph.id,
    language,
    gist:
      language === 'en'
        ? 'This section contains information that may need professional interpretation.'
        : language === 'hi'
          ? 'इस खंड में ऐसी जानकारी है जिसके लिए पेशेवर व्याख्या की आवश्यकता हो सकती है।'
          : 'ଏହି ବିଭାଗରେ ସୂଚନା ଅଛି ଯାହା ପେଶାଦାର ବ୍ୟାଖ୍ୟା ଆବଶ୍ୟକ କରିପାରେ।',
    whatThisMeans:
      language === 'en'
        ? 'Review the original text carefully or ask a qualified person to explain.'
        : language === 'hi'
          ? 'मूल पाठ को ध्यान से पढ़ें या किसी योग्य व्यक्ति से पूछें।'
          : 'ମୂଳ ପାଠ୍ୟକୁ ଧ୍ୟାନର ସହ ପଢ଼ନ୍ତୁ କିମ୍ବା ଜଣେ ଯୋଗ୍ୟ ବ୍ୟକ୍ତିଙ୍କୁ ପଚାରନ୍ତୁ।',
    suggestedActions: [],
    uncertainSections: [paragraph.text.substring(0, 100)],
    sourceQuote: paragraph.text.substring(0, 200),
  };
}
