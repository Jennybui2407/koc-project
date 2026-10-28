import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  });
  const page = await context.newPage();
  await page.goto('https://www.tiktok.com/@d.y.q', { waitUntil: 'networkidle', timeout: 30000 });
  const title = await page.title();
  console.log('Title:', title);
  
  const textInfo = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a')).map(a => a.href).filter(h => h.includes('/video/'));
    return {
      linksCount: links.length,
      sampleLinks: links.slice(0, 10),
      bodyTextSnippet: document.body.innerText.substring(0, 500)
    };
  });
  
  console.log('TextInfo:', JSON.stringify(textInfo, null, 2));
  await browser.close();
})().catch(e => console.error('ERR:', e.message));
