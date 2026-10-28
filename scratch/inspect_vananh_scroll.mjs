import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    locale: 'vi-VN',
  });
  const page = await context.newPage();
  await page.goto('https://www.tiktok.com/@van.anhng_', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(3000);

  const text = await page.evaluate(() => document.body.innerText);
  console.log('Body text snippet:', text.substring(0, 500));
  
  const videoLinks = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a[href*="/video/"]')).map(a => ({
      href: a.href,
      text: a.innerText
    }));
  });
  console.log('Video links:', videoLinks);

  await browser.close();
})().catch(e => console.error('ERR:', e.message));
