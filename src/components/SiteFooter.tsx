import { APP_VERSION, RELEASE_NAME } from '@/lib/version';

export function SiteFooter() {
  return (
    <footer className="border-t border-stone-200 bg-white px-4 sm:px-6 py-3 text-center text-xs text-stone-500">
      <p>
        CrisisLens v{APP_VERSION} · {RELEASE_NAME} ·{' '}
        <a
          href="https://github.com/Stormynubee/CrisisLens"
          className="text-blue-700 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source on GitHub
        </a>
      </p>
    </footer>
  );
}
