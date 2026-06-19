import type { DemoCatalogItem } from '@/data/demo-catalog';
import { Icon } from '@/components/ui/Icon';
import clsx from 'clsx';

const urgencyStyles = {
  CRITICAL: 'bg-error-container text-on-error-container',
  'TIME-SENSITIVE': 'bg-amber-100 text-amber-800',
  INFORMATIONAL: 'bg-crisis-info-bg text-crisis-info-text',
} as const;

const iconTone = {
  article: 'bg-surface-container border-outline-variant text-primary',
  favorite: 'bg-error-container border-outline-variant text-error',
  account_balance: 'bg-crisis-timesensitive-bg border-crisis-timesensitive-border text-crisis-timesensitive',
} as const;

interface DocumentCardProps {
  doc: DemoCatalogItem;
  selected: boolean;
  onSelect: (id: string) => void;
  name?: string;
}

export function DocumentCard({ doc, selected, onSelect, name = 'document-selection' }: DocumentCardProps) {
  const tone = iconTone[doc.stitchIcon as keyof typeof iconTone] ?? iconTone.article;
  return (
    <label
      className={clsx(
        'group relative flex flex-col p-5 bg-surface-container-lowest border rounded-lg cursor-pointer transition-all shadow-card min-h-[44px]',
        selected ? 'border-primary ring-1 ring-primary' : 'border-outline-variant hover:border-primary hover:shadow-card-hover',
      )}
    >
      <input
        type="radio"
        name={name}
        checked={selected}
        onChange={() => onSelect(doc.id)}
        className="absolute right-5 top-5 w-4 h-4 text-primary border-outline-variant focus:ring-primary"
        aria-label={doc.title}
      />
      <div className="flex items-start gap-4 pr-8">
        <div className={clsx('w-10 h-10 rounded-full border flex items-center justify-center shrink-0', tone)}>
          <Icon name={doc.stitchIcon} className="w-5 h-5" />
        </div>
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-headline-md text-headline-md text-primary">{doc.title}</span>
            <span className={clsx('px-2 py-0.5 font-label-sm text-[10px] uppercase rounded-full tracking-wide', urgencyStyles[doc.urgency])}>
              {doc.urgency === 'TIME-SENSITIVE' ? 'Time-Sensitive' : doc.urgency.charAt(0) + doc.urgency.slice(1).toLowerCase()}
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 border-l-2 border-outline-variant pl-3 italic">
            {doc.scenarioQuote}
          </p>
        </div>
      </div>
    </label>
  );
}
