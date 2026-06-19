'use client';

import { useCallback, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { validateUploadFile } from '@/lib/ingest-document';
import clsx from 'clsx';

interface UploadZoneProps {
  onFile: (file: File) => void;
  isLoading?: boolean;
}

export function UploadZone({ onFile, isLoading }: UploadZoneProps) {
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = useCallback(
    (file: File | undefined) => {
      if (!file) return;
      const err = validateUploadFile(file);
      if (err) {
        setError(err);
        return;
      }
      setError(null);
      onFile(file);
    },
    [onFile],
  );

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload a document. Drag and drop or press Enter to select a file."
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            document.getElementById('welcome-file-input')?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFile(e.dataTransfer.files[0]);
        }}
        className={clsx(
          'border-2 border-dashed rounded-lg p-6 sm:p-8 text-center transition-colors duration-150 cursor-pointer',
          dragOver
            ? 'border-primary bg-surface-container-low'
            : 'border-outline-variant hover:bg-surface-container-low',
        )}
      >
        <Icon name="cloud_upload" className="w-9 h-9 text-outline mx-auto mb-3 block" />
        <p className="font-body-sm text-body-sm text-on-surface-variant mb-5 max-w-xs mx-auto">
          Drag and drop your emergency letter, discharge circular, or medical bill
        </p>
        <label className="inline-flex">
          <input
            id="welcome-file-input"
            type="file"
            accept=".txt,.text,.pdf"
            className="sr-only"
            disabled={isLoading}
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <span
            className={clsx(
              'bg-primary text-on-primary px-6 py-2.5 rounded font-label-md text-label-md inline-flex items-center min-h-[44px]',
              isLoading ? 'opacity-60 cursor-wait' : 'hover:opacity-90 cursor-pointer',
            )}
          >
            {isLoading ? 'Processing…' : 'Select file'}
          </span>
        </label>
      </div>
      {error && (
        <p role="alert" className="mt-2 text-body-sm text-error font-medium">
          {error}
        </p>
      )}
    </div>
  );
}
