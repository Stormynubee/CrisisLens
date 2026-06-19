import { ReactNode } from 'react';
import { Icon } from '@/components/ui/Icon';

interface InfoPanelProps {
  title: string;
  icon?: string;
  children: ReactNode;
}

export function InfoPanel({ title, icon = 'assignment_ind', children }: InfoPanelProps) {
  return (
    <div className="bg-secondary-container border border-outline-variant rounded-lg p-5 shadow-card">
      <h3 className="font-headline-md text-body-base font-semibold text-on-secondary-container mb-3 flex items-center gap-2">
        <Icon name={icon} className="w-5 h-5" />
        {title}
      </h3>
      {children}
    </div>
  );
}
