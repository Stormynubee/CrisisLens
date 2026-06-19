'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { DocumentViewer } from '@/components/DocumentViewer';
import { GistSidebar } from '@/components/GistSidebar';
import { HITLBanner } from '@/components/ui/HITLBanner';
import { SiteFooter } from '@/components/SiteFooter';
import { useDocument } from '@/hooks/useDocument';
import { useLanguage } from '@/hooks/useLanguage';
import { useDemo } from '@/hooks/useDemo';
import { Language, Paragraph } from '@/lib/types';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

function ViewerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const docId = searchParams.get('doc') || 'kv-heatwave';
  const langParam = (searchParams.get('lang') || 'en') as Language;

  const { language, setLanguage } = useLanguage();
  const { isDemoMode } = useDemo();
  const {
    document,
    selectedParagraph,
    gistResponse,
    isLoadingGist,
    loadDemoDocument,
    selectParagraph,
  } = useDocument();

  useEffect(() => {
    setLanguage(langParam);
  }, [langParam, setLanguage]);

  useEffect(() => {
    loadDemoDocument(docId);
  }, [docId, loadDemoDocument]);

  const handleParagraphClick = (paragraph: Paragraph) => {
    selectParagraph(paragraph, language, isDemoMode, docId);
  };

  useEffect(() => {
    if (selectedParagraph && document) {
      selectParagraph(selectedParagraph, language, isDemoMode, document.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  if (!document) {
    return (
      <div className="min-h-screen bg-surface-bg flex items-center justify-center">
        <p className="text-stone-500">Loading document...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-bg flex flex-col">
      <Header
        language={language}
        onLanguageChange={setLanguage}
        isDemoMode={isDemoMode}
        showLanguage={true}
      />

      <div className="px-4 sm:px-6 py-2 border-b border-stone-200 bg-white">
        <Button variant="ghost" size="sm" onClick={() => router.push('/')}>
          <ArrowLeft className="w-4 h-4" />
          Back to documents
        </Button>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
        <div className="lg:w-[55%] flex-shrink-0 border-b lg:border-b-0 lg:border-r border-stone-200 overflow-hidden flex flex-col bg-white min-h-[40vh] lg:min-h-0">
          <DocumentViewer
            document={document}
            selectedParagraphId={selectedParagraph?.id ?? null}
            onParagraphClick={handleParagraphClick}
          />
        </div>

        <div id="gist-sidebar" className="lg:w-[45%] flex-1 overflow-hidden flex flex-col bg-surface-bg min-h-[40vh] lg:min-h-0">
          <GistSidebar
            paragraph={selectedParagraph}
            gist={gistResponse}
            isLoading={isLoadingGist}
            language={language}
          />
        </div>
      </div>

      <div className="lg:hidden p-3 border-t border-stone-200 bg-white flex-shrink-0">
        <HITLBanner />
      </div>
      <SiteFooter />
    </div>
  );
}

function ViewerFallback() {
  return (
    <div className="min-h-screen bg-surface-bg flex items-center justify-center">
      <p className="text-stone-500">Loading...</p>
    </div>
  );
}

export default function ViewerPage() {
  return (
    <Suspense fallback={<ViewerFallback />}>
      <ViewerContent />
    </Suspense>
  );
}
