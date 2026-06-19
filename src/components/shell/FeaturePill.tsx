import { Icon } from '@/components/ui/Icon';

interface FeaturePillProps {
  icon: string;
  label: string;
}

export function FeaturePill({ icon, label }: FeaturePillProps) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-container rounded-full border border-outline-variant">
      <Icon name={icon} className="w-4 h-4 text-on-surface-variant" />
      <span className="font-label-sm text-label-sm text-on-surface-variant">{label}</span>
    </div>
  );
}
