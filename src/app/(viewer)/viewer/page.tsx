'use client';

import { useEffect, useState, Suspense, useRef, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { AppHeader } from '@/components/shell/AppHeader';
import { ViewerSubheader } from '@/components/shell/ViewerSubheader';
import { DocumentViewer } from '@/components/DocumentViewer';
import { GistSidebar } from '@/components/GistSidebar';
import { GistDrawer } from '@/components/GistDrawer';
import { useDocument } from '@/hooks/useDocument';
import { useLanguage } from '@/hooks/useLanguage';
import { useDemo } from '@/hooks/useDemo';
import { Language, Paragraph } from '@/lib/types';
import { UPLOAD_DOC_ID } from '@/lib/upload-session';

function ViewerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const docId = searchParams.get('doc') || 'kv-heatwave';
  const langParam = (searchParams.get('lang') || 'en') as Language;
  const isUpload = docId === UPLOAD_DOC_ID;

  const { language, setLanguage } = useLanguage();
  const { isDemoMode } = useDemo();
  const demoActive = isUpload ? false : isDemoMode;

  const {
    document,
    selectedParagraph,
    gistResponse,
    isLoadingGist,
    loadDocument,
    selectParagraph,
  } = useDocument();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const gistPaneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLanguage(langParam);
  }, [langParam, setLanguage]);

  useEffect(() => {
    const ok = loadDocument(docId);
    if (!ok && isUpload) {
      router.replace('/');
    }
  }, [docId, loadDocument, isUpload, router]);

  const handleParagraphClick = useCallback(
    (paragraph: Paragraph) => {
      selectParagraph(paragraph, language, demoActive, docId);
      if (typeof window !== 'undefined' && window.innerWidth < 1024) {
        setDrawerOpen(true);
      }
    },
    [selectParagraph, language, demoActive, docId],
  );

  useEffect(() => {
    if (selectedParagraph && document) {
      selectParagraph(selectedParagraph, language, demoActive, document.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const focusGistPane = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setDrawerOpen(true);
    } else {
      gistPaneRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!document) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <p className="text-on-surface-variant">Loading document...</p>
      </div>
    );
  }

  const gistPanel = (
    <GistSidebar
      paragraph={selectedParagraph}
      gist={gistResponse}
      isLoading={isLoadingGist}
      language={language}
      isUploaded={isUpload}
    />
  );

  return (
    <>
      <AppHeader
        language={language}
        onLanguageChange={setLanguage}
        isDemoMode={demoActive}
        showLanguage
        variant="viewer"
        activeNav={drawerOpen ? 'analysis' : 'documents'}
        onNavAnalysis={focusGistPane}
      />

      <ViewerSubheader />

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
        <div className="lg:w-[55%] flex-shrink-0 border-b lg:border-b-0 lg:border-r border-outline-variant overflow-hidden flex flex-col min-h-[40vh] lg:min-h-0">
          <DocumentViewer
            document={document}
            selectedParagraphId={selectedParagraph?.id ?? null}
            onParagraphClick={handleParagraphClick}
          />
        </div>

        <div
          id="gist-sidebar"
          ref={gistPaneRef}
          className="hidden lg:flex lg:w-[45%] flex-1 overflow-hidden flex-col min-h-0"
        >
          {gistPanel}
        </div>
      </div>

      <GistDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {gistPanel}
      </GistDrawer>
    </>
  );
}

function ViewerFallback() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center">
      <p className="text-on-surface-variant">Loading...</p>
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
