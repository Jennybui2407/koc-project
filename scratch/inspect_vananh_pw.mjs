import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36',
    locale: 'vi-VN',
  });
  const page = await context.newPage();
  await page.goto('https://www.tiktok.com/@van.anhng_', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(4000);

  const videoData = await page.evaluate(() => {
    const videoLinks = Array.from(document.querySelectorAll('a[href*="/video/"]'));
    return videoLinks.map(a => {
      const href = a.getAttribute('href') || '';
      const text = a.innerText || '';
      return { href, text };
    });
  });

  console.log('Video links count:', videoData.length);
  console.log('Sample:', JSON.stringify(videoData.slice(0, 10), null, 2));

  await browser.close();
})().catch(e => console.error('ERR:', e.message));
