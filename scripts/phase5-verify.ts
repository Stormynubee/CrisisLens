/**
 * Phase 5 verification — run: npx tsx scripts/phase5-verify.ts
 * Optional: BASE_URL=http://localhost:3000 for API curl tests via fetch
 */
import { classifyUrgency } from '../src/lib/urgency-classifier';
import { buildGistPrompt } from '../src/lib/prompts';

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
  console.log('=== Phase 5 Verification ===\n');

  const modules = [
    ['ActionChecklist', '../src/components/ActionChecklist'],
    ['GistSidebar', '../src/components/GistSidebar'],
    ['prompts', '../src/lib/prompts'],
    ['gemini', '../src/lib/gemini'],
  ] as const;

  for (const [name, path] of modules) {
    try {
      await import(path);
      assert(`${name} module imports`, true);
    } catch (e) {
      assert(`${name} module imports`, false, String(e));
    }
  }

  const prompt = buildGistPrompt(
    'All classes shall be dismissed at 12:00 noon.',
    'en',
    'TIME-SENSITIVE',
    'KV Heatwave Circular',
  );
  assert('buildGistPrompt includes source paragraph', prompt.includes('12:00 noon'));
  assert('buildGistPrompt includes no-hallucination rules', prompt.includes('Do NOT add facts'));
  assert('buildGistPrompt includes JSON format', prompt.includes('"gist"'));

  assert(
    'classifyUrgency CRITICAL via direct import',
    classifyUrgency('report immediately within 24 hours') === 'CRITICAL',
  );

  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

  try {
    const urgencyRes = await fetch(`${baseUrl}/api/urgency`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: 'report immediately within 24 hours' }),
    });
    if (urgencyRes.ok) {
      const data = await urgencyRes.json() as { urgency: string; method: string };
      assert('/api/urgency returns CRITICAL', data.urgency === 'CRITICAL', JSON.stringify(data));
      assert('/api/urgency method is deterministic', data.method === 'deterministic-keyword-regex');
    } else {
      assert('/api/urgency reachable', false, `status=${urgencyRes.status} (is dev server running?)`);
    }
  } catch (e) {
    assert('/api/urgency reachable', false, String(e));
  }

  const hasGeminiKey = !!process.env.GEMINI_API_KEY;
  if (hasGeminiKey) {
    try {
      const gistRes = await fetch(`${baseUrl}/api/gist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paragraphText: 'All classes shall be dismissed at 12:00 noon.',
          language: 'en',
          documentContext: 'KV Heatwave',
          urgency: 'TIME-SENSITIVE',
          paragraphId: 'p-4',
        }),
      });
      if (gistRes.ok) {
        const data = await gistRes.json() as { gist?: string; whatThisMeans?: string };
        assert('/api/gist returns gist field', typeof data.gist === 'string');
        assert('/api/gist returns whatThisMeans field', typeof data.whatThisMeans === 'string');
      } else {
        const err = await gistRes.text();
        assert('/api/gist returns 200', false, `status=${gistRes.status} body=${err.slice(0, 200)}`);
      }
    } catch (e) {
      assert('/api/gist call', false, String(e));
    }
  } else {
    console.log('SKIP: /api/gist live test (GEMINI_API_KEY not set in env)');
  }

  console.log(`\n=== Results: ${passed} passed, ${failed} failed ===`);
  if (failed > 0) process.exit(1);
}

main();
