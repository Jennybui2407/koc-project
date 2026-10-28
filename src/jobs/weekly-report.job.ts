import { generateCampaignSummary } from '../services/reporter/summary.service.js';
import { buildCampaignReportHtml } from '../services/reporter/template.js';
import { createGoogleDocReport } from '../services/google/docs.service.js';
import { logger } from '../utils/logger.js';
import { formatDateTime } from '../utils/formatters.js';

export async function runWeeklyReportJob(): Promise<string> {
  logger.info('📊 Bắt đầu Job xuất báo cáo tổng kết chiến dịch KOC...');
  try {
    const summary = await generateCampaignSummary();
    const html = buildCampaignReportHtml(summary);
    const title = `Báo cáo nghiệm thu KOC - ${formatDateTime(new Date())}`;
    const docUrl = await createGoogleDocReport(title, html);
    logger.success(`Xuất báo cáo thành công! Xem tại: ${docUrl}`);
    return docUrl;
  } catch (error: any) {
    logger.error('Lỗi khi tạo báo cáo Google Docs:', error.message);
    throw error;
  }
}
