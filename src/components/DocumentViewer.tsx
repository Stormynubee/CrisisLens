'use client';

import { DocumentData, Paragraph } from '@/lib/types';
import { ParagraphBlock } from './ParagraphBlock';
import { Badge } from './ui/Badge';
import { MetadataChip } from './shell/MetadataChip';
import { HighlightLegend } from './shell/HighlightLegend';
import { Icon } from './ui/Icon';

interface DocumentViewerProps {
  document: DocumentData;
  selectedParagraphId: string | null;
  onParagraphClick: (paragraph: Paragraph) => void;
}

export function DocumentViewer({ document, selectedParagraphId, onParagraphClick }: DocumentViewerProps) {
  return (
    <div className="flex flex-col h-full bg-surface-container-lowest">
      <div className="px-container-padding py-4 border-b border-outline-variant">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="font-display text-headline-md text-on-surface">{document.title}</h2>
            {document.subtitle && (
              <p className="text-body-sm text-on-surface-variant mt-0.5">{document.subtitle}</p>
            )}
          </div>
          <Badge urgency={document.overallUrgency} size="md" />
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          <MetadataChip label={document.metadata.issuer} />
          <MetadataChip label={document.metadata.date} />
          <MetadataChip label={document.metadata.reference} />
        </div>

        <div className="mt-3">
          <HighlightLegend />
        </div>
      </div>

      <div className="px-container-padding py-2 bg-surface-container-low border-b border-outline-variant flex items-center gap-2">
        <Icon name="touch_app" className="w-4 h-4 text-on-surface-variant shrink-0" />
        <p className="text-body-sm text-on-surface-variant">
          Click any section below to analyze
        </p>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin p-2 space-y-2">
        {document.paragraphs.map((paragraph) => (
          <ParagraphBlock
            key={paragraph.id}
            paragraph={paragraph}
            isSelected={selectedParagraphId === paragraph.id}
            onClick={() => onParagraphClick(paragraph)}
          />
        ))}
      </div>
    </div>
  );
}
