import { Command } from 'commander';
import { runSyncMetricsJob } from '../jobs/sync-metrics.job.js';
import { runWeeklyReportJob } from '../jobs/weekly-report.job.js';

const program = new Command();

program
  .name('koc-cli')
  .description('Hệ thống tự động hóa chiến dịch KOC (Google Drive, Sheets, Docs)')
  .version('1.0.0');

program
  .command('sync')
  .description('Quét và cập nhật chỉ số video KOC (mốc 24h & 3 ngày) vào Google Sheet')
  .option('-f, --force', 'Quét và cập nhật tất cả video bất kể đã đến hạn hay chưa')
  .action(async (options) => {
    await runSyncMetricsJob(!!options.force);
  });

program
  .command('export')
  .description('Tổng hợp dữ liệu và tạo Google Doc báo cáo nghiệm thu')
  .action(async () => {
    const url = await runWeeklyReportJob();
    console.log('\n📄 Đã tạo báo cáo Google Doc:', url);
  });

program.parse(process.argv);
