'use client';

export function LoadingSpinner({ text = 'Generating plain-language gist...' }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 gap-3">
      <div className="relative w-8 h-8" role="status" aria-label="Loading">
        <div className="absolute inset-0 border-2 border-outline-variant rounded-full" />
        <div className="absolute inset-0 border-2 border-t-primary rounded-full animate-spin" />
      </div>
      <p className="text-body-sm text-on-surface-variant">{text}</p>
    </div>
  );
}
