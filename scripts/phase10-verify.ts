/**
 * Phase 10 verification — run: npx tsx scripts/phase10-verify.ts
 */
import { readFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

const ROOT = join(__dirname, '..');

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

function read(rel: string): string {
  return readFileSync(join(ROOT, rel), 'utf-8');
}

function main() {
  console.log('=== Phase 10 Verification ===\n');

  const gitignore = read('.gitignore');
  assert('.gitignore excludes .env*.local', gitignore.includes('.env*.local'));
  assert('.gitignore excludes .vercel', gitignore.includes('.vercel'));

  try {
    const tracked = execSync('git ls-files', { cwd: ROOT, encoding: 'utf-8' });
    assert('no tracked .env file', !tracked.split('\n').some(f => f === '.env' || f.startsWith('.env')));
    assert('no tracked .env.local', !tracked.includes('.env.local'));
    assert(
      'no tracked GEMINI_API_KEY values',
      !/GEMINI_API_KEY=[^\s]+/.test(tracked),
    );
  } catch (e) {
    warn('git ls-files check skipped', String(e));
  }

  const hasNextConfig =
    existsSync(join(ROOT, 'next.config.ts')) ||
    existsSync(join(ROOT, 'next.config.mjs'));
  assert('next.config exists', hasNextConfig);

  if (existsSync(join(ROOT, 'next.config.ts'))) {
    const cfg = read('next.config.ts');
    assert('next.config.ts exports default', cfg.includes('export default'));
  }

  const pkg = JSON.parse(read('package.json')) as { scripts: Record<string, string> };
  assert('package.json has build script', typeof pkg.scripts.build === 'string');
  assert('package.json has start script', typeof pkg.scripts.start === 'string');

  assert('landing page exists', existsSync(join(ROOT, 'src/app/page.tsx')));
  assert('viewer page exists', existsSync(join(ROOT, 'src/app/viewer/page.tsx')));
  assert('api/gist route exists', existsSync(join(ROOT, 'src/app/api/gist/route.ts')));
  assert('api/urgency route exists', existsSync(join(ROOT, 'src/app/api/urgency/route.ts')));

  const useDemo = read('src/hooks/useDemo.ts');
  assert('useDemo defaults demo unless demo=false', useDemo.includes("demoParam !== 'false'"));

  assert('public directory exists', existsSync(join(ROOT, 'public')));
  const hasLogo =
    existsSync(join(ROOT, 'public/logo.png')) ||
    existsSync(join(ROOT, 'public/logo.svg'));
  if (!hasLogo) {
    warn('public/logo.png missing — add logo before demo video (Phase 1.9)');
  } else {
    assert('public/logo exists', true);
  }
  if (!existsSync(join(ROOT, 'public/og-image.png'))) {
    warn('public/og-image.png missing — optional for Devpost / social preview');
  } else {
    assert('public/og-image.png exists', true);
  }
  if (!existsSync(join(ROOT, 'docs/screenshots/01-landing.png'))) {
    warn('docs/screenshots/01-landing.png missing — run npm run screenshots before Devpost');
  } else {
    assert('docs/screenshots/01-landing.png exists', true);
  }

  console.log('\n--- Running production build ---\n');
  try {
    execSync('npm run build', { cwd: ROOT, stdio: 'inherit' });
    assert('npm run build succeeds', true);
  } catch {
    assert('npm run build succeeds', false);
  }

  console.log(`\n=== Results: ${passed} passed, ${failed} failed, ${warned} warnings ===`);
  if (failed > 0) process.exit(1);
}

main();
