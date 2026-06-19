/**
 * Phase 9 verification — run: npx tsx scripts/phase9-verify.ts
 */
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const ROOT = join(__dirname, '..');
const EMOJI_RE = /[\u{1F300}-\u{1FAFF}]/u;

let passed = 0;
let failed = 0;

function assert(name: string, condition: boolean, detail?: string) {
  if (condition) {
    console.log(`PASS: ${name}`);
    passed++;
  } else {
    console.log(`FAIL: ${name}${detail ? ` — ${detail}` : ''}`);
    failed++;
  }
}

function read(rel: string): string {
  return readFileSync(join(ROOT, rel), 'utf-8');
}

function main() {
  console.log('=== Phase 9 Verification ===\n');

  assert('src/app/page.tsx exists', existsSync(join(ROOT, 'src/app/page.tsx')));
  assert('src/app/viewer/page.tsx exists', existsSync(join(ROOT, 'src/app/viewer/page.tsx')));

  const landing = read('src/app/page.tsx');
  assert('landing has hero headline', landing.includes('Understand emergency documents'));
  assert('landing has hero subline', landing.includes('when every minute counts'));
  assert('landing has feature pill Original always visible', landing.includes('Original always visible'));
  assert('landing has feature pill AI guides', landing.includes('AI guides, you decide'));
  assert('landing has feature pill English · Odia', landing.includes('English · Odia'));
  assert('landing has feature pill Rule-based urgency', landing.includes('Rule-based urgency'));
  assert('landing has DocumentInput', landing.includes('DocumentInput'));
  assert('landing has Analyze Document button', landing.includes('Analyze Document'));
  assert('landing has Kalahandi user story', landing.includes('Picture a mother in Kalahandi'));
  assert('landing navigates to /viewer', landing.includes('/viewer?doc='));
  assert('landing passes lang and demo in URL', landing.includes('&lang=${language}&demo=${isDemoMode}'));
  assert('landing does not embed split-pane viewer', !landing.includes('DocumentViewer'));
  assert('landing uses Lucide icons', landing.includes('lucide-react'));

  const viewer = read('src/app/viewer/page.tsx');
  assert('viewer uses useSearchParams', viewer.includes('useSearchParams'));
  assert('viewer wraps content in Suspense', viewer.includes('<Suspense'));
  assert('viewer has ViewerContent component', viewer.includes('function ViewerContent'));
  assert('viewer has DocumentViewer', viewer.includes('DocumentViewer'));
  assert('viewer has GistSidebar', viewer.includes('GistSidebar'));
  assert('viewer has gist-sidebar id', viewer.includes('id="gist-sidebar"'));
  assert('viewer split-pane lg:flex-row', viewer.includes('lg:flex-row'));
  assert('viewer 55/45 width split', viewer.includes('lg:w-[55%]') && viewer.includes('lg:w-[45%]'));
  assert('viewer has Back to documents', viewer.includes('Back to documents'));
  assert('viewer router.push home', viewer.includes("router.push('/')"));
  assert('viewer loads doc from URL param', viewer.includes("searchParams.get('doc')"));
  assert('viewer sets language from URL', viewer.includes("searchParams.get('lang')"));
  assert('viewer mobile HITL footer lg:hidden', viewer.includes('lg:hidden') && viewer.includes('HITLBanner'));
  assert('viewer language change effect', viewer.includes('[language]'));

  const paragraphBlock = read('src/components/ParagraphBlock.tsx');
  assert('ParagraphBlock scrollIntoView on mobile', paragraphBlock.includes('scrollIntoView'));
  assert('ParagraphBlock targets gist-sidebar', paragraphBlock.includes("getElementById('gist-sidebar')"));
  assert('ParagraphBlock mobile breakpoint 1024', paragraphBlock.includes('1024'));

  const srcApp = ['src/app/page.tsx', 'src/app/viewer/page.tsx'];
  for (const f of srcApp) {
    const content = read(f);
    assert(`${f} no emoji characters`, !EMOJI_RE.test(content));
  }

  console.log(`\n=== Results: ${passed} passed, ${failed} failed ===`);
  if (failed > 0) process.exit(1);
}

main();
