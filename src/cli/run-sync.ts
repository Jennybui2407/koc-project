import { runSyncMetricsJob } from '../jobs/sync-metrics.job.js';

const force = process.argv.includes('--force');
runSyncMetricsJob(force).then(() => {
  process.exit(0);
});
