/**
 * Phase 4 verification — run: npx tsx scripts/phase4-verify.ts
 */
import { detectHighlights } from '../src/lib/highlight-engine';
import { parseDocument } from '../src/lib/paragraph-parser';
import hospital from '../src/data/demo-documents/hospital-discharge.json';
import kv from '../src/data/demo-documents/kv-heatwave-circular.json';

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

async function main() {
  console.log('=== Phase 4 Verification ===\n');

  const modules = [
    ['HighlightedText', '../src/components/HighlightedText'],
    ['ParagraphBlock', '../src/components/ParagraphBlock'],
    ['DocumentViewer', '../src/components/DocumentViewer'],
  ] as const;

  for (const [name, path] of modules) {
    try {
      await import(path);
      assert(`${name} module imports`, true);
    } catch (e) {
      assert(`${name} module imports`, false, String(e));
    }
  }

  const hospitalParagraphs = parseDocument(hospital.rawText);
  const withJargonAndDeadline = hospitalParagraphs.some((p) => {
    const hasJargon = p.highlights.some((h) => h.type === 'jargon');
    const hasDeadline = p.highlights.some((h) => h.type === 'deadline');
    return hasJargon && hasDeadline;
  });
  assert(
    'hospital-discharge has paragraph with jargon + deadline highlights',
    withJargonAndDeadline,
  );

  const p8 = hospitalParagraphs.find((p) => p.id === 'p-8');
  if (p8) {
    const has48h = p8.highlights.some((h) => h.type === 'deadline' && /48 hours/i.test(h.term));
    const hasInstruction = p8.highlights.some((h) => h.type === 'instruction');
    assert('hospital p-8 has 48 hours deadline highlight', has48h);
    assert('hospital p-8 has instruction highlight', hasInstruction, JSON.stringify(p8.highlights.map((h) => h.term)));
  } else {
    assert('hospital p-8 exists', false);
  }

  const kvParagraphs = parseDocument(kv.rawText);
  const headerCount = kvParagraphs.filter((p) => p.isHeader).length;
  assert('kv-heatwave has header paragraphs', headerCount > 0, `headerCount=${headerCount}`);

  const highlightSample = detectHighlights('Patient was given analgesic within 48 hours');
  assert(
    'detectHighlights finds analgesic + within 48 hours',
    highlightSample.some((h) => h.type === 'jargon') &&
      highlightSample.some((h) => h.type === 'deadline'),
    JSON.stringify(highlightSample.map((h) => ({ type: h.type, term: h.term }))),
  );

  assert(
    'hospital-discharge paragraph count > 0',
    hospitalParagraphs.length > 0,
    `count=${hospitalParagraphs.length}`,
  );

  console.log(`\n=== Results: ${passed} passed, ${failed} failed ===`);
  if (failed > 0) process.exit(1);
}

main();
