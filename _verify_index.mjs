import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 1100 } });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));

await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await page.locator('text=// index').scrollIntoViewIfNeeded();
await page.screenshot({ path: '/private/tmp/claude-501/-Users-bhanu-teju-devbuddy/416a091b-1377-428f-92b5-93a0f9585788/scratchpad/index-section.png' });

console.log('ERRORS', JSON.stringify(errors));
await browser.close();
