'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UploadZone } from '@/components/shell/UploadZone';
import { Icon } from '@/components/ui/Icon';
import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { useLanguage } from '@/hooks/useLanguage';
import { markOnboarded } from '@/lib/onboarding';
import { saveUpload } from '@/lib/upload-session';
import { ONBOARDING_QUICK_PICKS } from '@/data/demo-catalog';
import clsx from 'clsx';

const quickPickTone: Record<string, string> = {
  critical: 'border-red-200 bg-red-50 hover:bg-red-100 text-red-800',
  amber: 'border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-800',
  government: 'border-green-200 bg-green-50 hover:bg-green-100 text-green-800',
};

export default function WelcomePage() {
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
      if (!res.ok) {
        throw new Error(data.error || 'Upload failed.');
      }
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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <LanguageSelector value={language} onChange={setLanguage} />
      </div>

      <main className="w-full max-w-lg mx-auto flex flex-col items-center space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <div className="relative inline-block mb-4">
            <Icon name="description" className="w-16 h-16 text-outline-variant mx-auto" />
            <div
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-surface-container-lowest bg-primary pulse-lens shadow-sm"
              aria-hidden
            />
          </div>
          <h1 className="font-display text-display-lg text-on-surface">CrisisLens</h1>
          <p className="font-body-base text-body-base text-on-surface-variant max-w-sm mx-auto">
            Understand emergency documents when every minute counts.
          </p>
        </div>

        <div className="w-full bg-surface-container-lowest rounded-xl border border-outline-variant p-8 shadow-card">
          <UploadZone onFile={handleUpload} isLoading={isLoading} />
          {uploadError && (
            <p role="alert" className="mt-2 text-body-sm text-error font-medium">
              {uploadError}
            </p>
          )}

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-surface-container-lowest font-label-sm text-label-sm text-on-surface-variant">
                OR CHOOSE A DEMO
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {ONBOARDING_QUICK_PICKS.map((pick) => (
              <button
                key={pick.id}
                type="button"
                onClick={() => goToViewer(pick.id, true)}
                className={clsx(
                  'w-full flex items-center justify-between p-3 rounded-lg border transition-colors text-left group min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  quickPickTone[pick.tone],
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon name={pick.stitchIcon} className="w-5 h-5" />
                  <span className="font-body-sm text-body-sm font-medium">{pick.label}</span>
                </div>
                <Icon
                  name="arrow_forward"
                  className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="text-center space-y-3 max-w-sm">
          <button
            type="button"
            onClick={handleSkip}
            className="font-label-md text-label-md text-primary hover:underline min-h-[44px] px-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          >
            Continue to sample documents
          </button>
          <div className="flex justify-center items-center gap-1.5 text-on-surface-variant">
            <Icon name="lock" className="w-4 h-4" />
            <p className="font-body-sm text-body-sm">
              Your uploaded documents are processed for analysis — verify with the original.
            </p>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Supports Plain English, Hindi (हिन्दी), and Odia (ଓଡ଼ିଆ).
          </p>
        </div>
      </main>
    </div>
  );
}
