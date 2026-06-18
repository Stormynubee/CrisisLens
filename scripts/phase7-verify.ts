/**
 * Phase 7 verification — run: npx tsx scripts/phase7-verify.ts
 */
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const ROOT = join(__dirname, '..');
const ODIA_RE = /[\u0B00-\u0B7F]/;
const DEVANAGARI_RE = /[\u0900-\u097F]/;

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
  console.log('=== Phase 7 Verification ===\n');

  const globals = read('src/app/globals.css');
  assert('globals.css imports Noto Sans Oriya', globals.includes('Noto+Sans+Oriya'));
  assert('globals.css imports Noto Sans Devanagari', globals.includes('Noto+Sans+Devanagari'));
  assert('globals.css defines .odia-text', globals.includes('.odia-text'));
  assert('globals.css defines .hindi-text', globals.includes('.hindi-text'));
  assert('globals.css Odia line-height 1.8', /\[lang="or"\],\s*\.odia-text[\s\S]*?line-height:\s*1\.8/.test(globals));
  assert('globals.css Hindi line-height 1.7', /\[lang="hi"\],\s*\.hindi-text[\s\S]*?line-height:\s*1\.7/.test(globals));

  const gistSidebar = read('src/components/GistSidebar.tsx');
  assert('GistSidebar uses odia-text class', gistSidebar.includes('odia-text'));
  assert('GistSidebar uses hindi-text class', gistSidebar.includes('hindi-text'));
  assert('GistSidebar sets lang attribute on gist content', gistSidebar.includes('lang={language}'));
  assert('GistSidebar passes language to ActionChecklist', gistSidebar.includes('language={language}'));

  const actionChecklist = read('src/components/ActionChecklist.tsx');
  assert('ActionChecklist accepts language prop', actionChecklist.includes('language: Language'));
  assert('ActionChecklist applies odia-text on action text', actionChecklist.includes("language === 'or' && 'odia-text'"));
  assert('ActionChecklist applies hindi-text on action text', actionChecklist.includes("language === 'hi' && 'hindi-text'"));

  const langSelector = read('src/components/ui/LanguageSelector.tsx');
  assert('LanguageSelector shows Odia script label', langSelector.includes('ଓଡ଼ିଆ'));
  assert('LanguageSelector shows Devanagari label', langSelector.includes('हिंदी'));

  const page = read('src/app/viewer/page.tsx');
  assert('viewer passes language to GistSidebar', page.includes('language={language}'));
  assert('viewer re-fetches gist on language change', page.includes('[language]'));

  const orFiles = [
    'src/data/demo-responses/kv-heatwave-or.json',
    'src/data/demo-responses/hospital-discharge-or.json',
    'src/data/demo-responses/pm-kisan-rejection-or.json',
  ];
  for (const f of orFiles) {
    assert(`${f} exists`, existsSync(join(ROOT, f)));
    const data = JSON.parse(read(f)) as { responses: Array<{ gist: string; whatThisMeans: string }> };
    const hasOdia = data.responses.some(r => ODIA_RE.test(r.gist) && ODIA_RE.test(r.whatThisMeans));
    assert(`${f} contains Odia script in gists`, hasOdia);
  }

  const fallback = read('src/hooks/useDocument.ts');
  assert('useDocument createFallbackGist has Hindi text', DEVANAGARI_RE.test(fallback));
  assert('useDocument createFallbackGist has Odia text', fallback.includes('ଏହି ବିଭାଗରେ'));

  console.log(`\n=== Results: ${passed} passed, ${failed} failed ===`);
  if (failed > 0) process.exit(1);
}

main();
