import { VideoMetricData } from '../../types/metrics.types.js';
import { detectPlatform } from '../../utils/formatters.js';
import { scrapeTikTok } from './tiktok.scraper.js';
import { scrapeMeta } from './meta.scraper.js';
import { scrapeMetaHeadless } from './meta.headless.scraper.js';

export async function scrapeVideoMetrics(url: string): Promise<VideoMetricData> {
  const platform = detectPlatform(url);
  switch (platform) {
    case 'TikTok':
      return await scrapeTikTok(url);
    case 'Facebook':
      // Dùng Playwright headless cho Facebook (cần render JS để lấy metrics)
      return await scrapeMetaHeadless(url);
    case 'Instagram':
    case 'Threads':
      return await scrapeMeta(url);
    default:
      return {
        views: 0,
        likes: 0,
        comments: 0,
        saves: 0,
        shares: 0,
        crawledAt: new Date().toISOString(),
      };
  }
}
