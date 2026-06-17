/**
 * Phase 2 verification — run: npx tsx scripts/phase2-verify.ts
 */
import { classifyUrgency } from '../src/lib/urgency-classifier';
import { detectHighlights } from '../src/lib/highlight-engine';
import { parseDocument } from '../src/lib/paragraph-parser';
import kv from '../src/data/demo-documents/kv-heatwave-circular.json';
import hospital from '../src/data/demo-documents/hospital-discharge.json';
import pmKisan from '../src/data/demo-documents/pm-kisan-rejection.json';

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

console.log('=== Phase 2 Verification ===\n');

// Demo JSON parse
for (const [label, doc] of [
  ['kv-heatwave-circular', kv],
  ['hospital-discharge', hospital],
  ['pm-kisan-rejection', pmKisan],
] as const) {
  try {
    const paragraphs = parseDocument(doc.rawText);
    assert(`${label}.json parses`, paragraphs.length > 0, `got ${paragraphs.length} paragraphs`);
  } catch (e) {
    assert(`${label}.json parses`, false, String(e));
  }
}

// Classifier tests
assert(
  'classifyUrgency("report immediately within 24 hours") === CRITICAL',
  classifyUrgency('report immediately within 24 hours') === 'CRITICAL',
  `got ${classifyUrgency('report immediately within 24 hours')}`
);
assert(
  'classifyUrgency("deadline for appeal is 30 days") === TIME-SENSITIVE',
  classifyUrgency('deadline for appeal is 30 days') === 'TIME-SENSITIVE',
  `got ${classifyUrgency('deadline for appeal is 30 days')}`
);
assert(
  'classifyUrgency("this is for your information") === INFORMATIONAL',
  classifyUrgency('this is for your information') === 'INFORMATIONAL',
  `got ${classifyUrgency('this is for your information')}`
);

// Highlight test
const highlightText = 'Patient was given analgesic within 48 hours';
const highlights = detectHighlights(highlightText);
const hasAnalgesic = highlights.some(h => h.type === 'jargon' && h.term.toLowerCase() === 'analgesic');
const hasDeadline = highlights.some(h => h.type === 'deadline' && /within 48 hours/i.test(h.term));
assert(
  'detectHighlights finds analgesic (jargon) and within 48 hours (deadline)',
  hasAnalgesic && hasDeadline,
  JSON.stringify(highlights.map(h => ({ type: h.type, term: h.term })))
);

// parseDocument test
const kvParagraphs = parseDocument(kv.rawText);
assert(
  'parseDocument(kvCircularRawText) returns Paragraph[] with urgency and highlights',
  kvParagraphs.every(p => p.id && p.urgency && Array.isArray(p.highlights)),
  `count=${kvParagraphs.length}`
);

console.log(`\n=== Results: ${passed} passed, ${failed} failed ===`);
if (failed > 0) process.exit(1);
