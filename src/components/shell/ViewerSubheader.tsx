'use client';

import { useRouter } from 'next/navigation';
import { Icon } from '@/components/ui/Icon';

export function ViewerSubheader() {
  const router = useRouter();
  return (
    <div className="bg-surface-container-lowest border-b border-outline-variant px-container-padding py-3 flex-shrink-0">
      <button
        type="button"
        onClick={() => router.push('/')}
        className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors text-body-sm group min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
      >
        <Icon name="arrow_back" className="w-[18px] h-[18px] group-hover:-translate-x-0.5 transition-transform" />
        Back to documents
      </button>
    </div>
  );
}
