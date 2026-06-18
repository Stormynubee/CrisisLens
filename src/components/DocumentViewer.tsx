'use client';

import { DocumentData, Paragraph } from '@/lib/types';
import { ParagraphBlock } from './ParagraphBlock';
import { Badge } from './ui/Badge';
import { FileText, Calendar, Hash } from 'lucide-react';

interface DocumentViewerProps {
  document: DocumentData;
  selectedParagraphId: string | null;
  onParagraphClick: (paragraph: Paragraph) => void;
}

export function DocumentViewer({ document, selectedParagraphId, onParagraphClick }: DocumentViewerProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Document header */}
      <div className="px-4 py-4 border-b border-stone-200 bg-white">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-lg font-semibold text-stone-900">
              {document.title}
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">{document.subtitle}</p>
          </div>
          <Badge urgency={document.overallUrgency} size="md" />
        </div>

        {/* Metadata row */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-stone-500">
          <span className="flex items-center gap-1">
            <FileText className="w-3 h-3" />
            {document.metadata.issuer}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {document.metadata.date}
          </span>
          <span className="flex items-center gap-1">
            <Hash className="w-3 h-3" />
            {document.metadata.reference}
          </span>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mt-3 text-xs">
          <span className="flex items-center gap-1">
            <span className="w-3 h-2 rounded-sm bg-yellow-100 border border-yellow-400" />
            Jargon
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-2 rounded-sm bg-red-100 border border-red-400" />
            Deadline
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-2 rounded-sm bg-blue-100 border border-blue-400" />
            Action
          </span>
        </div>
      </div>

      {/* Instruction */}
      <div className="px-4 py-2 bg-stone-50 border-b border-stone-200">
        <p className="text-xs text-stone-500">
          Click any section below to see a plain-language explanation in your chosen language.
        </p>
      </div>

      {/* Paragraph list */}
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
