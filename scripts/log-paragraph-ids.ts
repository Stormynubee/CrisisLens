/**
 * Run: npx tsx scripts/log-paragraph-ids.ts
 * Prints paragraph IDs from parseDocument() — use these IDs in demo-responses JSON.
 */
import { parseDocument } from '../src/lib/paragraph-parser';
import kv from '../src/data/demo-documents/kv-heatwave-circular.json';
import hospital from '../src/data/demo-documents/hospital-discharge.json';
import pmKisan from '../src/data/demo-documents/pm-kisan-rejection.json';

const docs = [
  { name: 'kv-heatwave', raw: kv.rawText },
  { name: 'hospital-discharge', raw: hospital.rawText },
  { name: 'pm-kisan-rejection', raw: pmKisan.rawText },
];

for (const doc of docs) {
  console.log(`\n=== ${doc.name} ===`);
  parseDocument(doc.raw).forEach((p) => {
    console.log(
      `${p.id} | urgency=${p.urgency} | header=${!!p.isHeader} | ${p.text.slice(0, 70).replace(/\n/g, ' ')}...`
    );
  });
}
