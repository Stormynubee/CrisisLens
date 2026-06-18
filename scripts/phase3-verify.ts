/**
 * Phase 3 verification — run: npx tsx scripts/phase3-verify.ts
 */
import { classifyUrgency } from '../src/lib/urgency-classifier';
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

async function main() {
  console.log('=== Phase 3 Verification ===\n');

  const modules = [
    ['Badge', '../src/components/ui/Badge'],
    ['Button', '../src/components/ui/Button'],
    ['Header', '../src/components/Header'],
    ['DocumentInput', '../src/components/DocumentInput'],
    ['useDemo', '../src/hooks/useDemo'],
    ['useLanguage', '../src/hooks/useLanguage'],
    ['useDocument', '../src/hooks/useDocument'],
    ['HITLBanner', '../src/components/ui/HITLBanner'],
    ['LanguageSelector', '../src/components/ui/LanguageSelector'],
  ] as const;

  for (const [name, path] of modules) {
    try {
      await import(path);
      assert(`${name} module imports`, true);
    } catch (e) {
      assert(`${name} module imports`, false, String(e));
    }
  }

  assert('3 demo document JSON files parse', (() => {
    try {
      parseDocument(kv.rawText);
      parseDocument(hospital.rawText);
      parseDocument(pmKisan.rawText);
      return true;
    } catch {
      return false;
    }
  })());

  assert('classifyUrgency CRITICAL sample', classifyUrgency('report immediately within 24 hours') === 'CRITICAL');
  assert('classifyUrgency TIME-SENSITIVE sample', classifyUrgency('deadline for appeal is 30 days') === 'TIME-SENSITIVE');
  assert('classifyUrgency INFORMATIONAL sample', classifyUrgency('this is for your information') === 'INFORMATIONAL');

  const demoDocMap: Record<string, typeof kv> = {
    'kv-heatwave': kv,
    'hospital-discharge': hospital,
    'pm-kisan-rejection': pmKisan,
  };
  for (const id of ['kv-heatwave', 'hospital-discharge', 'pm-kisan-rejection']) {
    const raw = demoDocMap[id];
    const paragraphs = parseDocument(raw.rawText);
    assert(`loadDemoDocument('${id}') produces paragraphs`, paragraphs.length > 0, `count=${paragraphs.length}`);
  }

  console.log(`\n=== Results: ${passed} passed, ${failed} failed ===`);
  if (failed > 0) process.exit(1);
}

main();
