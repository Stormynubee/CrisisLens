export default function ViewerLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-surface flex flex-col overflow-hidden">{children}</div>;
}
