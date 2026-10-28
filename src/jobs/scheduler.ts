import cron from 'node-cron';
import { runSyncMetricsJob } from './sync-metrics.job.js';
import { runWeeklyReportJob } from './weekly-report.job.js';
import { config } from '../config/env.js';
import { logger } from '../utils/logger.js';

logger.info(`⏰ Khởi động Cron Scheduler cho KOC Automation...`);
logger.info(`Lịch quét chỉ số tự động: "${config.cronSchedule}"`);

// 1. Job quét số liệu video theo mốc 24h & 3 ngày (chạy mỗi tiếng một lần)
cron.schedule(config.cronSchedule, async () => {
  logger.info('🔔 Trigger: Chạy job định kỳ kiểm tra mốc 24h & 3 ngày...');
  await runSyncMetricsJob(false);
});

// 2. Job tổng hợp báo cáo mỗi sáng thứ 2 lúc 8h00 sáng (0 8 * * 1)
cron.schedule('0 8 * * 1', async () => {
  logger.info('🔔 Trigger: Xuất báo cáo tuần KOC tự động vào Google Docs...');
  await runWeeklyReportJob();
});

logger.success('Scheduler đã sẵn sàng và đang chạy ngầm.');
