import { getMetricsTrackingRows } from '../src/services/google/sheets.service.js';

async function checkZeros() {
  const rows = await getMetricsTrackingRows();
  console.log(`\n=== TỔNG SỐ HÀNG: ${rows.length} ===`);
  for (const r of rows) {
    if (!r.views24h || r.views24h === 0) {
      console.log(`Dòng ${r.rowNumber} (${r.kocName} - [${r.platform}]): views=${r.views24h ?? 'trống'}, tim=${r.likes24h ?? 'trống'}, url=${r.videoUrl}`);
    }
  }
}
checkZeros();
