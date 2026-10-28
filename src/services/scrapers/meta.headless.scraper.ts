import { chromium } from 'playwright';
import { VideoMetricData } from '../../types/metrics.types.js';
import { logger } from '../../utils/logger.js';
import { formatDateTime } from '../../utils/formatters.js';

const FB_C_USER = process.env.FB_C_USER || '';
const FB_XS = process.env.FB_XS || '';

export async function scrapeMetaHeadless(url: string): Promise<VideoMetricData> {
  logger.info(`[Playwright] Đang cào: ${url}`);

  if (!FB_C_USER || !FB_XS) {
    logger.warn('Chưa cấu hình FB_C_USER / FB_XS trong .env');
    return { views: 0, likes: 0, comments: 0, saves: 0, shares: 0, crawledAt: formatDateTime() };
  }

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const context = await browser.newContext({
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      locale: 'vi-VN',
      storageState: {
        cookies: [
          {
            name: 'c_user',
            value: FB_C_USER,
            domain: '.facebook.com',
            path: '/',
            expires: -1,
            httpOnly: true,
            secure: true,
            sameSite: 'None' as const,
          },
          {
            name: 'xs',
            value: decodeURIComponent(FB_XS),
            domain: '.facebook.com',
            path: '/',
            expires: -1,
            httpOnly: true,
            secure: true,
            sameSite: 'None' as const,
          },
        ],
        origins: [],
      },
    });

    const page = await context.newPage();
    await page.route('**/*.{png,jpg,jpeg,gif,svg,webp,woff,woff2,ttf,otf}', r => r.abort());

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(5000);

    // Đọc metrics từ đúng container của bài Reel đang xem
    const raw = await page.evaluate(() => {
      // Điểm neo: [aria-label="Video player"] là container video đang phát
      const videoPlayer = document.querySelector('[aria-label="Video player"]');
      if (!videoPlayer) return { error: 'Video player not found', buttons: [] };

      // Đi lên tối đa 15 cấp để tìm container có chứa action buttons (Thích/Bình luận/Chia sẻ)
      let container: Element | null = videoPlayer;
      let foundButtons: { label: string; text: string }[] = [];

      for (let i = 0; i < 15; i++) {
        container = container?.parentElement ?? null;
        if (!container) break;

        const actionBtns = container.querySelectorAll(
          '[aria-label*="Thích"], [aria-label*="Bình luận"], [aria-label*="Chia sẻ"], [aria-label*="lượt chia sẻ"], [aria-label*="Lưu"]'
        );

        if (actionBtns.length >= 1) {
          actionBtns.forEach(b => {
            const label = b.getAttribute('aria-label') || '';
            const text = (b as HTMLElement).innerText?.trim() || '';
            foundButtons.push({ label, text });
          });
          break;
        }
      }

      // Tìm view count trong aria-label toàn trang (nếu có)
      const viewEl = document.querySelector(
        '[aria-label*="lượt xem"], [aria-label*="lượt phát"], [aria-label*="view"]'
      );
      const viewLabel = viewEl?.getAttribute('aria-label') || '';

      return { buttons: foundButtons, viewLabel };
    });

    let views = 0;
    let likes = 0;
    let comments = 0;
    let saves = 0;
    let shares = 0;

    if ('error' in raw && raw.error) {
      logger.warn(`  → ${raw.error}`);
    } else {
      for (const { label, text } of raw.buttons) {
        const lbl = label.toLowerCase();
        const num = parseMetricString(text);

        if (lbl.includes('thích') && !lbl.includes('chia sẻ')) {
          likes = num;
        } else if (lbl.includes('bình luận') || lbl.includes('comment')) {
          if (num > comments) comments = num;
        } else if (lbl.includes('chia sẻ') || lbl.includes('share')) {
          const match = lbl.match(/([\d,\.]+[kmKM]?)\s*lượt chia sẻ/i);
          if (match) {
            shares = parseMetricString(match[1]);
          } else if (num > 0) {
            shares = num;
          }
        } else if (lbl.includes('lưu') || lbl.includes('save')) {
          saves = num;
        }
      }

      // Parse view nếu tìm thấy
      if (raw.viewLabel) {
        const vm = raw.viewLabel.match(/([\d,\.]+[kKmM]?)\s*lượt xem/i);
        if (vm) views = parseMetricString(vm[1]);
      }
    }

    logger.info(`  → Views: ${views} | Likes: ${likes} | Comments: ${comments} | Saves: ${saves} | Shares: ${shares}`);

    await context.close();
    return { views, likes, comments, saves, shares, crawledAt: formatDateTime() };
  } catch (err: any) {
    logger.error(`[Playwright] Lỗi khi cào ${url}: ${err.message}`);
    return { views: 0, likes: 0, comments: 0, saves: 0, shares: 0, crawledAt: formatDateTime() };
  } finally {
    await browser.close();
  }
}

function parseMetricString(str: string): number {
  if (!str) return 0;
  // Xử lý định dạng tiếng Việt: "20,5K" → 20500, "1.234" → 1234
  const clean = str
    .replace(/\./g, '')  // bỏ dấu chấm ngàn (1.234 → 1234)
    .replace(/,/g, '.')  // đổi phẩy thập phân (20,5 → 20.5)
    .trim()
    .toUpperCase();
  if (clean.endsWith('K')) return Math.round(parseFloat(clean) * 1_000);
  if (clean.endsWith('M')) return Math.round(parseFloat(clean) * 1_000_000);
  return parseInt(clean, 10) || 0;
}
