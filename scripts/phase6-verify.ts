/**
 * Phase 6 verification — run: npx tsx scripts/phase6-verify.ts
 */
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { parseDocument } from '../src/lib/paragraph-parser';
import kv from '../src/data/demo-documents/kv-heatwave-circular.json';
import hospital from '../src/data/demo-documents/hospital-discharge.json';
import pmKisan from '../src/data/demo-documents/pm-kisan-rejection.json';

const ROOT = join(__dirname, '..');
const ODIA_RE = /[\u0B00-\u0B7F]/;
const FORBIDDEN_RE = /\byou must\b|\byou should\b/i;

interface DemoResponseFile {
  documentId: string;
  responses: Array<{
    paragraphId: string;
    language: string;
    gist: string;
    whatThisMeans: string;
    suggestedActions: Array<{ id: string; text: string }>;
    uncertainSections: string[];
    sourceQuote: string;
  }>;
}

const DOC_MAP: Record<string, { id: string; rawText: string }> = {
  'kv-heatwave': { id: 'kv-heatwave', rawText: kv.rawText },
  'hospital-discharge': { id: 'hospital-discharge', rawText: hospital.rawText },
  'pm-kisan-rejection': { id: 'pm-kisan-rejection', rawText: pmKisan.rawText },
};

const FILES = [
  { path: 'src/data/demo-responses/kv-heatwave-en.json', docId: 'kv-heatwave', lang: 'en' },
  { path: 'src/data/demo-responses/kv-heatwave-or.json', docId: 'kv-heatwave', lang: 'or' },
  { path: 'src/data/demo-responses/hospital-discharge-en.json', docId: 'hospital-discharge', lang: 'en' },
  { path: 'src/data/demo-responses/hospital-discharge-or.json', docId: 'hospital-discharge', lang: 'or' },
  { path: 'src/data/demo-responses/pm-kisan-rejection-en.json', docId: 'pm-kisan-rejection', lang: 'en' },
  { path: 'src/data/demo-responses/pm-kisan-rejection-or.json', docId: 'pm-kisan-rejection', lang: 'or' },
] as const;

const parsedIds: Record<string, Set<string>> = {};
for (const [docId, doc] of Object.entries(DOC_MAP)) {
  parsedIds[docId] = new Set(parseDocument(doc.rawText).map(p => p.id));
}

let passed = 0;
let failed = 0;
let warned = 0;

function assert(name: string, condition: boolean, detail?: string) {
  if (condition) {
    console.log(`PASS: ${name}`);
    passed++;
  } else {
    console.log(`FAIL: ${name}${detail ? ` — ${detail}` : ''}`);
    failed++;
  }
}

function warn(name: string, detail?: string) {
  console.log(`WARN: ${name}${detail ? ` — ${detail}` : ''}`);
  warned++;
}

function loadJson(relPath: string): DemoResponseFile {
  const full = join(ROOT, relPath);
  return JSON.parse(readFileSync(full, 'utf-8')) as DemoResponseFile;
}

function main() {
  console.log('=== Phase 6 Verification ===\n');

  const loaded = new Map<string, DemoResponseFile>();

  for (const f of FILES) {
    const full = join(ROOT, f.path);
    assert(`${f.path} exists`, existsSync(full));
    if (!existsSync(full)) continue;

    let data: DemoResponseFile;
    try {
      data = loadJson(f.path);
      assert(`${f.path} parses as JSON`, true);
    } catch (e) {
      assert(`${f.path} parses as JSON`, false, String(e));
      continue;
    }

    loaded.set(f.path, data);
    assert(`${f.path} documentId matches`, data.documentId === f.docId, `got ${data.documentId}`);
    assert(`${f.path} has responses`, data.responses.length > 0, 'responses array empty');

    for (const r of data.responses) {
      assert(
        `${f.path} ${r.paragraphId} exists in document`,
        parsedIds[f.docId]?.has(r.paragraphId) ?? false,
      );
      assert(`${f.path} ${r.paragraphId} language`, r.language === f.lang, `got ${r.language}`);
      assert(`${f.path} ${r.paragraphId} has gist`, r.gist.length > 0);
      assert(`${f.path} ${r.paragraphId} has sourceQuote`, r.sourceQuote.length > 0);

      const textBlob = [r.gist, r.whatThisMeans, ...r.suggestedActions.map(a => a.text)].join(' ');
      assert(
        `${f.path} ${r.paragraphId} no forbidden phrasing`,
        !FORBIDDEN_RE.test(textBlob),
        textBlob.match(FORBIDDEN_RE)?.[0],
      );

      if (f.lang === 'or') {
        assert(
          `${f.path} ${r.paragraphId} contains Odia script`,
          ODIA_RE.test(r.gist) && ODIA_RE.test(r.whatThisMeans),
        );
      }
    }
  }

  // EN/OR pairing: same paragraphIds and action ids per document
  for (const docId of ['kv-heatwave', 'hospital-discharge', 'pm-kisan-rejection'] as const) {
    const enFile = FILES.find(f => f.docId === docId && f.lang === 'en')!;
    const orFile = FILES.find(f => f.docId === docId && f.lang === 'or')!;
    const en = loaded.get(enFile.path);
    const or = loaded.get(orFile.path);
    if (!en || !or) continue;

    const enIds = en.responses.map(r => r.paragraphId).sort().join(',');
    const orIds = or.responses.map(r => r.paragraphId).sort().join(',');
    assert(`${docId} EN/OR paragraphId parity`, enIds === orIds, `en=[${enIds}] or=[${orIds}]`);

    for (const enR of en.responses) {
      const orR = or.responses.find(r => r.paragraphId === enR.paragraphId);
      if (!orR) continue;
      const enActionIds = enR.suggestedActions.map(a => a.id).sort().join(',');
      const orActionIds = orR.suggestedActions.map(a => a.id).sort().join(',');
      assert(
        `${docId} ${enR.paragraphId} action id parity`,
        enActionIds === orActionIds,
        `en=[${enActionIds}] or=[${orActionIds}]`,
      );
      assert(
        `${docId} ${enR.paragraphId} sourceQuote parity`,
        enR.sourceQuote === orR.sourceQuote,
      );
    }
  }

  // Total entry count
  let totalEntries = 0;
  for (const data of loaded.values()) {
    totalEntries += data.responses.length;
  }
  console.log(`\nINFO: ${totalEntries} total response entries across ${loaded.size} files`);
  if (totalEntries < 8 || totalEntries > 14) {
    warn('entry count outside 8–14 range', `count=${totalEntries}`);
  } else {
    assert('entry count in acceptable range (8–14)', true);
  }

  // At least one uncertainSections per document (EN files)
  for (const docId of ['kv-heatwave', 'hospital-discharge', 'pm-kisan-rejection'] as const) {
    const enPath = FILES.find(f => f.docId === docId && f.lang === 'en')!.path;
    const en = loaded.get(enPath);
    const hasUncertain = en?.responses.some(r => r.uncertainSections.length > 0) ?? false;
    assert(`${docId} has uncertainSections entry`, hasUncertain);
  }

  console.log(`\n=== Results: ${passed} passed, ${failed} failed, ${warned} warnings ===`);
  if (failed > 0) process.exit(1);
}

main();
