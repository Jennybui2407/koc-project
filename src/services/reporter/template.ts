import { CampaignSummary } from '../../types/report.types.js';
import { formatNumber } from '../../utils/formatters.js';

export function buildCampaignReportHtml(summary: CampaignSummary): string {
  const statusRows = Object.entries(summary.statusBreakdown)
    .map(
      ([status, count]) => `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">${status}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: center; font-weight: bold;">${count}</td>
      </tr>`
    )
    .join('');

  const topVideoRows = summary.topPerformingVideos.length > 0
    ? summary.topPerformingVideos
        .map(
          (v, idx) => `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">#${idx + 1}</td>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">${v.kocName}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${v.platform}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right; color: #1a73e8; font-weight: bold;">${formatNumber(v.views)}</td>
        <td style="padding: 8px; border: 1px solid #ddd;"><a href="${v.videoUrl}">Xem video</a></td>
      </tr>`
        )
        .join('')
    : `<tr><td colspan="5" style="padding: 8px; text-align: center; color: #888;">Chưa có video phát sinh view đo lường</td></tr>`;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>BÁO CÁO TỔNG HỢP CHIẾN DỊCH KOC</title>
  <style>
    body { font-family: 'Roboto', Arial, sans-serif; line-height: 1.6; color: #333; margin: 20px; }
    h1 { color: #1a365d; border-bottom: 2px solid #1a365d; padding-bottom: 8px; }
    h2 { color: #2b6cb0; margin-top: 24px; }
    table { width: 100%; border-collapse: collapse; margin-top: 12px; }
    th { background-color: #2b6cb0; color: white; padding: 10px; text-align: left; }
    .metric-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 12px; }
    .metric-card { background: #f7fafc; border: 1px solid #e2e8f0; padding: 15px; border-radius: 8px; text-align: center; }
    .metric-val { font-size: 24px; font-weight: bold; color: #2b6cb0; margin-top: 5px; }
  </style>
</head>
<body>
  <h1>📊 BÁO CÁO NGHIỆM THU CHIẾN DỊCH KOC</h1>
  <p><em>Thời gian xuất báo cáo: ${summary.generatedAt}</em></p>

  <h2>1. Tổng quan chiến dịch</h2>
  <div class="metric-grid">
    <div class="metric-card">
      <div>Tổng KOC</div>
      <div class="metric-val">${summary.totalKoc}</div>
    </div>
    <div class="metric-card">
      <div>Tổng Video/Post</div>
      <div class="metric-val">${summary.totalVideos}</div>
    </div>
    <div class="metric-card">
      <div>Tổng View (24h)</div>
      <div class="metric-val">${formatNumber(summary.totalViews24h)}</div>
    </div>
    <div class="metric-card">
      <div>Tổng View (72h)</div>
      <div class="metric-val">${formatNumber(summary.totalViews72h)}</div>
    </div>
    <div class="metric-card">
      <div>Tổng Lưu trữ (24h)</div>
      <div class="metric-val">${formatNumber(summary.totalSaves24h || 0)}</div>
    </div>
    <div class="metric-card">
      <div>Tổng Chia sẻ (24h)</div>
      <div class="metric-val">${formatNumber(summary.totalShares24h || 0)}</div>
    </div>
  </div>

  <h2>2. Tiến độ triển khai theo tình trạng</h2>
  <table>
    <thead>
      <tr>
        <th>Tình trạng</th>
        <th style="text-align: center; width: 120px;">Số lượng KOC</th>
      </tr>
    </thead>
    <tbody>
      ${statusRows}
    </tbody>
  </table>

  <h2>3. Top Video hiệu quả nhất</h2>
  <table>
    <thead>
      <tr>
        <th style="width: 50px; text-align: center;">Hạng</th>
        <th>Tên KOC</th>
        <th style="width: 100px; text-align: center;">Nền tảng</th>
        <th style="text-align: right; width: 120px;">Lượt xem</th>
        <th style="width: 120px;">Link Air</th>
      </tr>
    </thead>
    <tbody>
      ${topVideoRows}
    </tbody>
  </table>

  <h2>4. Đánh giá & Khuyến nghị</h2>
  <p>- <strong>Tỷ lệ tương tác 24h đầu:</strong> Video nhận được tương tác tốt nhất trong 24 giờ đầu sau khi KOC đăng bài.</p>
  <p>- <strong>Tăng trưởng sau 3 ngày:</strong> Cần tiếp tục theo dõi các video đạt ngưỡng viral để cân nhắc đẩy ngân sách Ads/Spark Ads.</p>
</body>
</html>
`;
}
