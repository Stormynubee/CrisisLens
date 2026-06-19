interface MetadataChipProps {
  label: string;
}

export function MetadataChip({ label }: MetadataChipProps) {
  return (
    <span className="font-label-sm text-label-sm bg-surface-variant text-on-surface-variant px-2.5 py-1 rounded-full uppercase border border-outline-variant">
      {label}
    </span>
  );
}
