import { Icon } from '@/components/ui/Icon';

interface UncertaintyCardProps {
  message?: string;
}

export function UncertaintyCard({
  message = 'Some parts of this section are unclear. Check the original document and consult a qualified person.',
}: UncertaintyCardProps) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant border-l-4 border-l-secondary rounded p-4 flex gap-3 shadow-card">
      <Icon name="warning" className="w-6 h-6 text-secondary flex-shrink-0" />
      <div>
        <h4 className="font-label-md text-label-md text-on-surface mb-1">Ambiguous Instruction</h4>
        <p className="font-body-sm text-body-sm text-on-surface-variant">{message}</p>
      </div>
    </div>
  );
}
