'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { UploadZone } from '@/components/shell/UploadZone';
import { SplashHero } from '@/components/shell/SplashHero';
import { Icon } from '@/components/ui/Icon';
import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { useLanguage } from '@/hooks/useLanguage';
import { markOnboarded } from '@/lib/onboarding';
import { saveUpload } from '@/lib/upload-session';
import { ONBOARDING_QUICK_PICKS } from '@/data/demo-catalog';
import { getUrgencyConfig } from '@/lib/urgency-config';
import type { UrgencyLevel } from '@/lib/types';

const demoRowTone: Record<string, string> = {
  critical:
    'border-crisis-critical-border bg-crisis-critical-bg text-crisis-critical-text hover:bg-crisis-critical-bg/80',
  amber:
    'border-crisis-timesensitive-border bg-crisis-timesensitive-bg text-crisis-timesensitive-text hover:bg-crisis-timesensitive-bg/80',
  government:
    'border-crisis-info-border bg-crisis-info-bg text-crisis-info-text hover:bg-crisis-info-bg/80',
};

function DemoQuickPick({
  id,
  label,
  urgency,
  stitchIcon,
  tone,
  onSelect,
}: {
  id: string;
  label: string;
  urgency: UrgencyLevel;
  stitchIcon: string;
  tone: keyof typeof demoRowTone;
  onSelect: (id: string) => void;
}) {
  const cfg = getUrgencyConfig(urgency);
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={clsx(
        'w-full flex items-center justify-between gap-3 px-3 py-3 rounded-lg border text-left min-h-[48px]',
        'transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        demoRowTone[tone],
      )}
      aria-label={`Open demo: ${label}, ${cfg.legendLabel}`}
    >
      <span className="flex items-center gap-3 min-w-0">
        <Icon name={stitchIcon} className="w-5 h-5 shrink-0" />
        <span className="font-body-sm text-body-sm font-medium truncate">{label}</span>
      </span>
      <Icon name="arrow_forward" className="w-5 h-5 shrink-0 opacity-50" />
    </button>
  );
}

export function WelcomeSplash() {
  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const goToViewer = (docId: string, demo: boolean) => {
    markOnboarded();
    router.push(`/viewer?doc=${docId}&lang=${language}&demo=${demo}`);
  };

  const handleUpload = async (file: File) => {
    setIsLoading(true);
    setUploadError(null);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/ingest', { method: 'POST', body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed.');
      saveUpload(data.document);
      goToViewer('upload', false);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    markOnboarded();
    router.push('/');
  };

  return (
    <div className="min-h-dvh bg-background flex flex-col">
      <header className="flex items-center justify-between px-container-padding h-14 border-b border-outline-variant bg-surface-container-lowest">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <Icon name="visibility" className="w-[18px] h-[18px] text-on-primary" />
          </div>
          <span className="font-headline-md text-headline-md font-bold text-primary">CrisisLens</span>
        </div>
        <LanguageSelector value={language} onChange={setLanguage} />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10 w-full max-w-lg mx-auto">
        <SplashHero />

        <section
          className="w-full mt-8 bg-surface-container-lowest rounded-lg border border-outline-variant p-6 sm:p-8 shadow-card"
          aria-labelledby="welcome-upload-heading"
        >
          <h2 id="welcome-upload-heading" className="sr-only">
            Upload or try a demo document
          </h2>

          <UploadZone onFile={handleUpload} isLoading={isLoading} />
          {uploadError && (
            <p role="alert" className="mt-2 text-body-sm text-error font-medium">
              {uploadError}
            </p>
          )}

          <div className="relative my-8" role="separator">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-surface-container-lowest font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Or choose a demo
              </span>
            </div>
          </div>

          <ul className="space-y-2 list-none p-0 m-0">
            {ONBOARDING_QUICK_PICKS.map((pick) => (
              <li key={pick.id}>
                <DemoQuickPick
                  id={pick.id}
                  label={pick.label}
                  urgency={pick.urgency}
                  stitchIcon={pick.stitchIcon}
                  tone={pick.tone}
                  onSelect={(id) => goToViewer(id, true)}
                />
              </li>
            ))}
          </ul>
        </section>

        <footer className="w-full text-center mt-8 space-y-3 max-w-sm">
          <button
            type="button"
            onClick={handleSkip}
            className="font-label-md text-label-md text-primary underline-offset-4 hover:underline min-h-[44px] px-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          >
            Continue to sample documents
          </button>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            PDF or plain text, up to 5&nbsp;MB. English, Hindi, and Odia supported. Verify any AI summary against the original.
          </p>
        </footer>
      </main>
    </div>
  );
}
