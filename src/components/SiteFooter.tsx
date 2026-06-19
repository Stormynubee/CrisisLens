import { APP_VERSION, RELEASE_NAME } from '@/lib/version';

export function SiteFooter() {
  return (
    <footer className="border-t border-outline-variant bg-surface-container-lowest px-container-padding py-3 text-center text-label-sm text-on-surface-variant">
      <p>
        CrisisLens v{APP_VERSION} · {RELEASE_NAME} ·{' '}
        <a
          href="https://github.com/Stormynubee/CrisisLens"
          className="text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source on GitHub
        </a>
      </p>
    </footer>
  );
}
