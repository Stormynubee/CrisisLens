'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppHeader } from '@/components/shell/AppHeader';
import { FeaturePill } from '@/components/shell/FeaturePill';
import { DocumentCard } from '@/components/shell/DocumentCard';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { useLanguage } from '@/hooks/useLanguage';
import { useDemo } from '@/hooks/useDemo';
import { DEMO_CATALOG } from '@/data/demo-catalog';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const [selectedDocId, setSelectedDocId] = useState<string | null>('hospital-discharge');
  const { language, setLanguage } = useLanguage();
  const { isDemoMode } = useDemo();
  const router = useRouter();

  const handleAnalyze = () => {
    if (!selectedDocId) return;
    router.push(`/viewer?doc=${selectedDocId}&lang=${language}&demo=${isDemoMode}`);
  };

  return (
    <>
      <AppHeader
        language={language}
        onLanguageChange={setLanguage}
        isDemoMode={isDemoMode}
        showLanguage
        variant="landing"
      />

      <main className="flex-grow flex flex-col items-center p-container-padding w-full">
        <div className="w-full max-w-[640px] flex flex-col gap-12 mt-8 mb-16">
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center text-center gap-4"
          >
            <h1 className="font-display text-display-lg-mobile md:text-display-lg text-primary max-w-lg mx-auto text-balance">
              Understand emergency documents when every minute counts
            </h1>
            <p className="font-body-base text-body-base text-on-surface-variant max-w-md mx-auto">
              CrisisLens highlights confusing sections, translates complex jargon, and extracts actionable steps from bureaucratic paperwork.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              <FeaturePill icon="visibility" label="Clarity" />
              <FeaturePill icon="shield" label="Secure" />
              <FeaturePill icon="language" label="Multi-lingual" />
              <FeaturePill icon="bolt" label="Fast" />
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.25 }}
            className="flex flex-col gap-6"
          >
            <h2 className="font-label-md text-label-md uppercase text-on-surface-variant tracking-wider border-b border-outline-variant pb-2">
              Choose a document to understand
            </h2>
            <div className="flex flex-col gap-card-gap">
              {DEMO_CATALOG.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  doc={doc}
                  selected={selectedDocId === doc.id}
                  onSelect={setSelectedDocId}
                />
              ))}
            </div>
            <Button size="lg" onClick={handleAnalyze} disabled={!selectedDocId} className="mt-2">
              Analyze Document
              <Icon name="arrow_forward" className="w-[18px] h-[18px]" />
            </Button>
          </motion.section>
        </div>
      </main>
    </>
  );
}
