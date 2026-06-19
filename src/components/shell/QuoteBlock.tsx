interface QuoteBlockProps {
  quote: string;
}

export function QuoteBlock({ quote }: QuoteBlockProps) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded p-4 shadow-card relative">
      <div className="absolute left-0 top-4 bottom-4 w-[3px] bg-outline rounded-full" aria-hidden />
      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-2 block">
        Source Text
      </span>
      <p className="font-display text-body-base italic text-on-surface-variant leading-relaxed pl-2">
        &ldquo;{quote}&rdquo;
      </p>
    </div>
  );
}
