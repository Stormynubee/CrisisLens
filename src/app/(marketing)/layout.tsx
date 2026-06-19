import { SiteFooter } from '@/components/SiteFooter';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {children}
      <SiteFooter />
    </div>
  );
}
