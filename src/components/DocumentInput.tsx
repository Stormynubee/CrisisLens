'use client';

import { DemoDocument } from '@/lib/types';
import { FileText, Building2, Heart, Landmark } from 'lucide-react';
import { Badge } from './ui/Badge';
import clsx from 'clsx';

interface DocumentInputProps {
  onSelectDocument: (id: string) => void;
  selectedId: string | null;
}

const demoDocuments: DemoDocument[] = [
  {
    id: 'kv-heatwave',
    title: 'KV Dharamgarh Heat-Wave Circular',
    subtitle: 'Early dismissal notice during extreme heat',
    category: 'school',
    icon: 'Building2',
    urgency: 'TIME-SENSITIVE',
    description: 'Priya, a Class XI student, received this circular about changed school timings. She needs to tell her parents whether to pick up her younger sibling early.',
  },
  {
    id: 'hospital-discharge',
    title: 'Hospital Discharge Summary',
    subtitle: 'Post-accident discharge with follow-up instructions',
    category: 'medical',
    icon: 'Heart',
    urgency: 'CRITICAL',
    description: 'Illustrative user: a mother in Kalahandi whose husband was discharged after a road accident. The letter is English medical jargon; she reads Odia. She has 48 hours to submit insurance documents.',
  },
  {
    id: 'pm-kisan-rejection',
    title: 'PM-KISAN Rejection Notice',
    subtitle: 'Payment rejection with 30-day appeal window',
    category: 'government',
    icon: 'Landmark',
    urgency: 'TIME-SENSITIVE',
    description: 'Ramesh Patra, a farmer in Dharamgarh, received this rejection letter. He thinks the rejection is final, but there is a 30-day appeal process he does not understand.',
  },
];

const iconMap: Record<string, typeof Building2> = {
  Building2,
  Heart,
  Landmark,
};

export function DocumentInput({ onSelectDocument, selectedId }: DocumentInputProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-xl font-semibold text-stone-900">
          Choose a document to understand
        </h2>
        <p className="text-sm text-stone-500 mt-1">
          Select one of the emergency documents below. CrisisLens will highlight confusing sections and translate them into plain language.
        </p>
      </div>

      <div className="grid gap-3">
        {demoDocuments.map((doc) => {
          const Icon = iconMap[doc.icon] || FileText;
          const isSelected = selectedId === doc.id;

          return (
            <button
              key={doc.id}
              type="button"
              onClick={() => onSelectDocument(doc.id)}
              className={clsx(
                'w-full text-left p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer',
                'hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
                isSelected
                  ? 'border-blue-500 bg-blue-50/50 shadow-md'
                  : 'border-stone-200 bg-white hover:border-stone-300',
              )}
            >
              <div className="flex items-start gap-3">
                <div className={clsx(
                  'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                  doc.category === 'school' && 'bg-blue-100 text-blue-700',
                  doc.category === 'medical' && 'bg-red-100 text-red-700',
                  doc.category === 'government' && 'bg-amber-100 text-amber-700',
                )}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-medium text-stone-900 text-sm">{doc.title}</h3>
                    <Badge urgency={doc.urgency} size="sm" showLabel={false} />
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">{doc.subtitle}</p>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed italic">
                    &ldquo;{doc.description}&rdquo;
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
