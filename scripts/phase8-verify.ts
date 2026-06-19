/**
 * Phase 8 verification — run: npx tsx scripts/phase8-verify.ts
 */
import { readFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';

const ROOT = join(__dirname, '..');
const FORBIDDEN_RE = /\byou must\b|\byou should\b/i;

const HITL_TITLE = 'AI guidance only — you make the final decision';
const HITL_BODY =
  'CrisisLens translates and highlights. It does NOT give legal, medical, or safety decisions. The original document is the source of truth. Consult qualified professionals for important decisions.';

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

interface DemoResponseFile {
  documentId: string;
  responses: Array<{
    paragraphId: string;
    gist: string;
    whatThisMeans: string;
    suggestedActions: Array<{ text: string }>;
    uncertainSections: string[];
    sourceQuote: string;
  }>;
}

function main() {
  console.log('=== Phase 8 Verification ===\n');

  const hitl = read('src/components/ui/HITLBanner.tsx');
  const hitlNormalized = hitl.replace(/\s+/g, ' ');
  assert('HITLBanner has exact title text', hitl.includes(HITL_TITLE));
  assert('HITLBanner has exact body text', hitlNormalized.includes(HITL_BODY));
  assert('HITLBanner uses ShieldAlert', hitl.includes('ShieldAlert'));
  assert('HITLBanner has role=alert', hitl.includes('role="alert"'));
  assert('HITLBanner uses hitl-banner class', hitl.includes('hitl-banner'));

  const globals = read('src/app/globals.css');
  assert('globals.css defines .hitl-banner', globals.includes('.hitl-banner'));
  assert('globals.css hitl-banner uses amber-50', globals.includes('amber-50'));
  assert('globals.css hitl-banner uses amber-200', globals.includes('amber-200'));

  const sidebar = read('src/components/GistSidebar.tsx');
  assert('GistSidebar imports HITLBanner', sidebar.includes("from './ui/HITLBanner'"));
  assert('GistSidebar renders HITLBanner', sidebar.includes('<HITLBanner />'));
  assert(
    'GistSidebar HITL footer outside scroll area',
    /overflow-y-auto[\s\S]*border-t[\s\S]*HITLBanner/.test(sidebar),
  );
  assert('GistSidebar empty state includes HITLBanner', (sidebar.match(/<HITLBanner \/>/g) || []).length >= 2);
  assert('GistSidebar has Original text label', sidebar.includes('Original text'));
  assert('GistSidebar has In plain language label', sidebar.includes('In plain language'));
  assert(
    'GistSidebar source quote before plain language in file',
    sidebar.indexOf('Original text') < sidebar.indexOf('In plain language'),
  );
  assert('GistSidebar uncertainty header', sidebar.includes('Uncertain — verify with original'));
  assert('GistSidebar uncertainty body phrase', sidebar.includes('Some parts of this section are unclear'));
  assert('GistSidebar uses AlertTriangle', sidebar.includes('AlertTriangle'));

  const prompts = read('src/lib/prompts.ts');
  assert('prompts.ts forbids you must/should', prompts.includes('Never say "you must" or "you should."'));
  assert('prompts.ts no-hallucination rule', prompts.includes('Do NOT add facts'));

  const demoDir = join(ROOT, 'src/data/demo-responses');
  const demoFiles = readdirSync(demoDir).filter(f => f.endsWith('.json'));
  assert('demo-responses has 6 JSON files', demoFiles.length === 6);

  const uncertainByDoc: Record<string, boolean> = {};

  for (const file of demoFiles) {
    const data = JSON.parse(read(`src/data/demo-responses/${file}`)) as DemoResponseFile;
    uncertainByDoc[data.documentId] = uncertainByDoc[data.documentId] || false;

    for (const r of data.responses) {
      const blob = [r.gist, r.whatThisMeans, ...r.suggestedActions.map(a => a.text)].join(' ');
      assert(
        `${file} ${r.paragraphId} no forbidden phrasing`,
        !FORBIDDEN_RE.test(blob),
        blob.match(FORBIDDEN_RE)?.[0],
      );
      assert(`${file} ${r.paragraphId} has sourceQuote`, r.sourceQuote.length > 0);
      if (r.uncertainSections.length > 0) {
        uncertainByDoc[data.documentId] = true;
      }
    }
  }

  for (const docId of ['kv-heatwave', 'hospital-discharge', 'pm-kisan-rejection']) {
    assert(`${docId} has uncertainSections entry`, uncertainByDoc[docId] === true);
  }

  // Expected demo paragraphs with uncertainty (Phase 6)
  const kvEn = JSON.parse(read('src/data/demo-responses/kv-heatwave-en.json')) as DemoResponseFile;
  const hospEn = JSON.parse(read('src/data/demo-responses/hospital-discharge-en.json')) as DemoResponseFile;
  const pmEn = JSON.parse(read('src/data/demo-responses/pm-kisan-rejection-en.json')) as DemoResponseFile;

  assert(
    'kv-heatwave p-8 has uncertainSections',
    kvEn.responses.find(r => r.paragraphId === 'p-8')?.uncertainSections.length! > 0,
  );
  assert(
    'hospital-discharge p-7 or p-8 has uncertainSections',
    [hospEn.responses.find(r => r.paragraphId === 'p-7'), hospEn.responses.find(r => r.paragraphId === 'p-8')]
      .some(r => r && r.uncertainSections.length > 0),
  );
  assert(
    'pm-kisan-rejection p-6 has uncertainSections',
    pmEn.responses.find(r => r.paragraphId === 'p-6')?.uncertainSections.length! > 0,
  );

  const useDocument = read('src/hooks/useDocument.ts');
  assert(
    'createFallbackGist sets uncertainSections',
    useDocument.includes('uncertainSections:'),
  );

  console.log(`\n=== Results: ${passed} passed, ${failed} failed ===`);
  if (failed > 0) process.exit(1);
}

main();
