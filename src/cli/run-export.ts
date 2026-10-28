import { runWeeklyReportJob } from '../jobs/weekly-report.job.js';

runWeeklyReportJob().then((url) => {
  console.log('\n📄 Link báo cáo Google Doc của bạn:', url);
  process.exit(0);
});
