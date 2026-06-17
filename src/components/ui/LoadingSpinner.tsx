'use client';

export function LoadingSpinner({ text = 'Generating plain-language gist...' }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 gap-3">
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 border-2 border-stone-200 rounded-full" />
        <div className="absolute inset-0 border-2 border-t-stone-600 rounded-full animate-spin" />
      </div>
      <p className="text-sm text-stone-500">{text}</p>
    </div>
  );
}
