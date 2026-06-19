/**
 * Capture production screenshots for README / GitHub releases.
 * Run: npm run screenshots
 * Optional: BASE_URL=https://crisislens-ashen.vercel.app
 */
import { chromium } from '@playwright/test';
import { mkdirSync } from 'fs';
import { join } from 'path';

const BASE_URL = process.env.BASE_URL ?? 'https://crisislens-ashen.vercel.app';
const OUT_DIR = join(__dirname, '..', 'docs', 'screenshots');
const VIEWER_URL =
  '/viewer?doc=hospital-discharge&lang=or&demo=true';
const ODIA_GIST_MARKER = 'ଔଷଧ';

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  console.log(`Capturing from ${BASE_URL}...`);

  // 1. Landing
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
  await page.getByRole('heading', { name: /Understand emergency documents/i }).waitFor();
  await page.screenshot({ path: join(OUT_DIR, '01-landing.png'), fullPage: false });
  console.log('  01-landing.png');

  // 2. Viewer split-pane
  await page.goto(`${BASE_URL}${VIEWER_URL}`, { waitUntil: 'networkidle' });
  await page.getByText('Demo Mode').waitFor({ timeout: 15000 });
  await page.locator('#gist-sidebar').waitFor();
  await page.screenshot({ path: join(OUT_DIR, '02-viewer-split-pane.png'), fullPage: false });
  console.log('  02-viewer-split-pane.png');

  // 3. Odia gist after clicking p-7
  const paragraph = page.getByTestId('paragraph-p-7');
  await paragraph.waitFor({ timeout: 15000 });
  await paragraph.click();
  await page.getByTestId('gist-sidebar-content').waitFor({ timeout: 10000 });
  await page
    .getByTestId('gist-sidebar-content')
    .getByText(ODIA_GIST_MARKER)
    .first()
    .waitFor({ timeout: 10000 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: join(OUT_DIR, '03-viewer-odia-gist.png'), fullPage: false });
  console.log('  03-viewer-odia-gist.png');

  await browser.close();

  // 4. Mobile viewport (fresh context)
  const mobileBrowser = await chromium.launch();
  const mobileContext = await mobileBrowser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(`${BASE_URL}${VIEWER_URL}`, { waitUntil: 'networkidle' });
  await mobilePage.getByTestId('paragraph-p-7').waitFor({ timeout: 15000 });
  await mobilePage.getByTestId('paragraph-p-7').click();
  await mobilePage.getByTestId('gist-sidebar-content').waitFor({ timeout: 10000 });
  await mobilePage
    .getByTestId('gist-sidebar-content')
    .getByText(ODIA_GIST_MARKER)
    .first()
    .waitFor({ timeout: 10000 });
  await mobilePage.waitForTimeout(500);
  await mobilePage.screenshot({ path: join(OUT_DIR, '04-viewer-mobile.png'), fullPage: false });
  console.log('  04-viewer-mobile.png');

  await mobileBrowser.close();
  console.log(`Done. Screenshots saved to ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
