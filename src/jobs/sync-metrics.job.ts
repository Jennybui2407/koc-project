import {
  getMetricsTrackingRows,
  syncAirLinksFromTrackingSheet,
  update72hMetrics,
} from '../services/google/sheets.service.js';
import { scrapeVideoMetrics } from '../services/scrapers/index.js';
import { logger } from '../utils/logger.js';
import { formatDateTime } from '../utils/formatters.js';

export async function runSyncMetricsJob(forceAll = false) {
  logger.info('🚀 Bắt đầu Job đồng bộ chỉ số video KOC (mốc 72h / 3 ngày)...');

  try {
    // 1. Tự động đồng bộ link air mới từ 'Tracking KOC' sang 'Metrics Tracking'
    await syncAirLinksFromTrackingSheet();

    // 2. Lấy danh sách video cần cào chỉ số
    const rows = await getMetricsTrackingRows();
    logger.info(`Tìm thấy ${rows.length} video trong tab Metrics Tracking.`);

    const now = new Date();

    for (const item of rows) {
      if (!item.videoUrl) continue;

      let postDate: Date | null = null;
      if (item.postDate) {
        // Support DD/MM/YYYY or YYYY-MM-DD
        const parts = item.postDate.split(/[-/]/);
        if (parts.length === 3) {
          if (parts[0].length === 4) {
            postDate = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
          } else {
            postDate = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
          }
        }
      }

      const hoursPassed = postDate ? (now.getTime() - postDate.getTime()) / (1000 * 60 * 60) : null;

      // Điều kiện cập nhật: forceAll hoặc đã đủ 72h (3 ngày) và chưa hoàn thành 72h
      const shouldUpdate72h =
        forceAll ||
        ((hoursPassed === null || hoursPassed >= 72) && item.status !== 'Đã hoàn thành 72h');

      if (shouldUpdate72h) {
        logger.info(`Đến hạn cập nhật mốc 72h cho video: ${item.kocName} (${item.videoUrl})`);
        const metrics = await scrapeVideoMetrics(item.videoUrl);
        await update72hMetrics(
          item.rowNumber,
          {
            views: metrics.views,
            likes: metrics.likes,
            comments: metrics.comments,
            saves: metrics.saves,
            shares: metrics.shares,
            timestamp: formatDateTime(now),
          },
          item.views24h
        );
      } else {
        logger.info(`Bỏ qua video ${item.kocName}: Chưa đủ 72h hoặc đã hoàn thành (${item.status})`);
      }

      // Delay nhẹ giữa các request
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    logger.success('Hoàn thành job đồng bộ chỉ số video KOC!');
  } catch (error: any) {
    logger.error('Lỗi khi chạy Job đồng bộ chỉ số:', error.message);
  }
}
