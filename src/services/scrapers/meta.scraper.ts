import axios from 'axios';
import * as cheerio from 'cheerio';
import { VideoMetricData } from '../../types/metrics.types.js';
import { logger } from '../../utils/logger.js';
import { formatDateTime } from '../../utils/formatters.js';

// Lấy cookie từ biến môi trường
const FB_C_USER = process.env.FB_C_USER || '';
const FB_XS = process.env.FB_XS || '';

function buildFacebookCookieHeader(): string {
  if (!FB_C_USER || !FB_XS) return '';
  const xs = decodeURIComponent(FB_XS); // decode %3A → :
  return `c_user=${FB_C_USER}; xs=${xs}`;
}

export async function scrapeMeta(url: string): Promise<VideoMetricData> {
  logger.info(`Đang xử lý link Meta (FB/Instagram/Threads): ${url}`);

  const cookieHeader = buildFacebookCookieHeader();
  const isFacebook = url.includes('facebook.com');

  const headers: Record<string, string> = {
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Accept-Language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7',
    Accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Upgrade-Insecure-Requests': '1',
  };

  // Gắn cookie Facebook nếu đây là link Facebook
  if (isFacebook && cookieHeader) {
    headers['Cookie'] = cookieHeader;
    logger.info('  → Đã gắn cookie Facebook session');
  }

  try {
    const response = await axios.get(url, {
      headers,
      timeout: 20000,
      maxRedirects: 5,
      validateStatus: (status) => status < 500,
    });

    if (response.status === 302 || response.status === 301) {
      logger.warn(`  → Bị redirect (${response.status}), cookie có thể đã hết hạn`);
    }

    const $ = cheerio.load(response.data);
    const html = response.data as string;

    let views = 0;
    let likes = 0;
    let comments = 0;
    let saves = 0;
    let shares = 0;

    // --- Thử parse từ JSON embedded trong script tags ---
    const jsonMatches = html.match(/"video_view_count"\s*:\s*(\d+)/);
    const likesJson = html.match(/"reaction_count"\s*:\s*\{\s*"count"\s*:\s*(\d+)/);
    const cmtJson = html.match(/"total_comment_count"\s*:\s*(\d+)/);
    const viewJson2 = html.match(/"play_count"\s*:\s*(\d+)/);
    const shareJson = html.match(/"share_count"\s*:\s*(\d+)/);

    if (jsonMatches) views = parseInt(jsonMatches[1], 10);
    if (!views && viewJson2) views = parseInt(viewJson2[1], 10);
    if (likesJson) likes = parseInt(likesJson[1], 10);
    if (cmtJson) comments = parseInt(cmtJson[1], 10);
    if (shareJson) shares = parseInt(shareJson[1], 10);

    // --- Fallback: OpenGraph meta tags ---
    if (!views && !likes) {
      const ogDesc =
        $('meta[property="og:description"]').attr('content') ||
        $('meta[name="description"]').attr('content') ||
        '';

      const likesMatch = ogDesc.match(/([\d.,KkMm]+)\s*(?:likes|lượt thích|thích)/i);
      const cmtMatch = ogDesc.match(/([\d.,KkMm]+)\s*(?:comments|bình luận)/i);
      const viewMatch = ogDesc.match(/([\d.,KkMm]+)\s*(?:views|lượt xem|xem)/i);

      if (likesMatch) likes = parseMetricString(likesMatch[1]);
      if (cmtMatch) comments = parseMetricString(cmtMatch[1]);
      if (viewMatch) views = parseMetricString(viewMatch[1]);
    }

    logger.info(`  → Kết quả: ${views} views | ${likes} likes | ${comments} comments | ${saves} saves | ${shares} shares`);

    return {
      views,
      likes,
      comments,
      saves,
      shares,
      crawledAt: formatDateTime(),
    };
  } catch (error: any) {
    logger.warn(`Không thể cào Meta link (${url}): ${error.message}`);
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
  if (clean.endsWith('M')) return Math.round(parseFloat(clean) * 1_000_000);
  return parseInt(clean, 10) || 0;
}
