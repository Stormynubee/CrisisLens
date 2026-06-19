import { Icon } from '@/components/ui/Icon';

export function HighlightLegend() {
  return (
    <div className="flex flex-wrap items-center gap-4 border border-outline-variant rounded bg-surface p-3 font-label-sm text-label-sm text-on-surface-variant">
      <span className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-secondary-fixed-dim" />
        Jargon
      </span>
      <span className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-error" />
        Deadline
      </span>
      <span className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-primary" />
        Action
      </span>
      <span className="sr-only">Highlight legend for document annotations</span>
    </div>
  );
}
