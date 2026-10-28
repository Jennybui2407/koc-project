import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    locale: 'vi-VN',
  });
  const page = await context.newPage();
  await page.goto('https://www.tiktok.com/@hanhxuka2804', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);

  const videoData = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('[data-e2e="user-post-item"], div[class*="DivItemContainer"]'));
    return {
      cardsCount: cards.length,
      links: Array.from(document.querySelectorAll('a')).map(a => a.href).filter(h => h.includes('/video/')),
      text: document.body.innerText.substring(0, 1000)
    };
  });

  console.log('Result:', JSON.stringify(videoData, null, 2));
  await browser.close();
})().catch(e => console.error('ERR:', e.message));
