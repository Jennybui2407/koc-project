import { getMetricsTrackingRows, readRange } from '../google/sheets.service.js';
import { CampaignSummary } from '../../types/report.types.js';
import { config } from '../../config/env.js';
import { formatDateTime } from '../../utils/formatters.js';

export async function generateCampaignSummary(): Promise<CampaignSummary> {
  // 1. Read KOC tracking status breakdown
  const trackingData = await readRange(`'${config.trackingSheetName}'!A5:I50`);
  const statusBreakdown: Record<string, number> = {};
  let totalKoc = 0;

  for (const row of trackingData) {
    const kocName = row[2]?.trim();
    const status = row[4]?.trim() || 'Chưa cập nhật';
    if (kocName) {
      totalKoc++;
      statusBreakdown[status] = (statusBreakdown[status] || 0) + 1;
    }
  }

  // 2. Read Metrics tracking rows (ưu tiên mốc 72h)
  const metricRows = await getMetricsTrackingRows();
  let totalViews24h = 0;
  let totalLikes24h = 0;
  let totalComments24h = 0;
  let totalSaves24h = 0;
  let totalShares24h = 0;
  let totalViews72h = 0;

  const videoPerformances: Array<{
    kocName: string;
    platform: string;
    videoUrl: string;
    views: number;
  }> = [];

  for (const row of metricRows) {
    if (row.views24h) totalViews24h += row.views24h;
    if (row.likes24h) totalLikes24h += row.likes24h;
    if (row.comments24h) totalComments24h += row.comments24h;
    if (row.saves24h) totalSaves24h += row.saves24h;
    if (row.shares24h) totalShares24h += row.shares24h;
    if (row.views72h) totalViews72h += row.views72h;

    const highestViews = row.views72h || row.views24h || 0;
    if (highestViews > 0) {
      videoPerformances.push({
        kocName: row.kocName,
        platform: row.platform,
        videoUrl: row.videoUrl,
        views: highestViews,
      });
    }
  }

  // Sort top videos by views descending
  videoPerformances.sort((a, b) => b.views - a.views);

  return {
    totalKoc,
    totalVideos: metricRows.length,
    statusBreakdown,
    totalViews24h,
    totalLikes24h,
    totalComments24h,
    totalSaves24h,
    totalShares24h,
    totalViews72h,
    topPerformingVideos: videoPerformances.slice(0, 5),
    generatedAt: formatDateTime(),
  };
}
