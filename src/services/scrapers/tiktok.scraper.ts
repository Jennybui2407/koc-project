import axios from 'axios';
import * as cheerio from 'cheerio';
import { VideoMetricData } from '../../types/metrics.types.js';
import { logger } from '../../utils/logger.js';
import { formatDateTime } from '../../utils/formatters.js';

export async function scrapeTikTok(url: string): Promise<VideoMetricData> {
  logger.info(`Đang lấy chỉ số TikTok từ: ${url}`);
  
  const headers = {
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Accept-Language': 'vi,en-US;q=0.9,en;q=0.8',
  };

  try {
    // 1. Resolve redirect if shortlink
    let targetUrl = url;
    if (url.includes('vt.tiktok.com') || url.includes('tt.site')) {
      try {
        const redirectRes = await axios.get(url, {
          headers,
          maxRedirects: 5,
          timeout: 10000,
        });
        targetUrl = redirectRes.request?.res?.responseUrl || url;
      } catch (err: any) {
        if (err.request?.res?.responseUrl) {
          targetUrl = err.request.res.responseUrl;
        }
      }
    }

    // 2. Fetch page HTML
    const response = await axios.get(targetUrl, {
      headers,
      timeout: 15000,
    });

    const html = response.data;
    const $ = cheerio.load(html);

    let views = 0;
    let likes = 0;
    let comments = 0;
    let saves = 0;
    let shares = 0;

    // A. Parse __UNIVERSAL_DATA_FOR_REHYDRATION__
    const scriptUniversal = $('script#__UNIVERSAL_DATA_FOR_REHYDRATION__').html() || $('#__UNIVERSAL_DATA_FOR_REHYDRATION__').html();
    if (scriptUniversal) {
      try {
        const data = JSON.parse(scriptUniversal);
        const itemInfo = data?.__DEFAULT_SCOPE__?.['webapp.video-detail']?.itemInfo?.itemStruct;
        if (itemInfo && itemInfo.stats) {
          views = Number(itemInfo.stats.playCount || 0);
          likes = Number(itemInfo.stats.diggCount || 0);
          comments = Number(itemInfo.stats.commentCount || 0);
          saves = Number(itemInfo.stats.collectCount || 0);
          shares = Number(itemInfo.stats.shareCount || 0);
        }
      } catch (e) {}
    }

    // B. Parse SIGI_STATE fallback
    if (!views) {
      const scriptSigi = $('#SIGI_STATE').html();
      if (scriptSigi) {
        try {
          const data = JSON.parse(scriptSigi);
          const itemModule = data?.ItemModule;
          if (itemModule) {
            const firstKey = Object.keys(itemModule)[0];
            const stats = itemModule[firstKey]?.stats;
            if (stats) {
              views = Number(stats.playCount || 0);
              likes = Number(stats.diggCount || 0);
              comments = Number(stats.commentCount || 0);
              saves = Number(stats.collectCount || 0);
              shares = Number(stats.shareCount || 0);
            }
          }
        } catch (e) {}
      }
    }

    // C. Fallback: meta tag / description regex
    if (!likes) {
      const desc = $('meta[name="description"]').attr('content') || '';
      const likesMatch = desc.match(/([\d.,KkMm]+)\s*(?:likes|lượt thích|thích)/i);
      const cmtMatch = desc.match(/([\d.,KkMm]+)\s*(?:comments|bình luận)/i);
      if (likesMatch) likes = parseMetricString(likesMatch[1]);
      if (cmtMatch) comments = parseMetricString(cmtMatch[1]);
    }

    logger.info(`  → Kết quả TikTok: ${views} views | ${likes} likes | ${comments} cmt | ${saves} lưu | ${shares} share`);

    return {
      views,
      likes,
      comments,
      saves,
      shares,
      crawledAt: formatDateTime(),
    };
  } catch (error: any) {
    logger.warn(`Không thể tự động cào TikTok (${url}):`, error.message);
    return {
      views: 0,
      likes: 0,
      comments: 0,
      saves: 0,
      shares: 0,
      crawledAt: formatDateTime(),
    };
  }
}

function parseMetricString(str: string): number {
  if (!str) return 0;
  const clean = str.replace(/,/g, '').trim().toUpperCase();
  if (clean.endsWith('K')) return Math.round(parseFloat(clean) * 1000);
  if (clean.endsWith('M')) return Math.round(parseFloat(clean) * 1000000);
  return parseInt(clean, 10) || 0;
}
