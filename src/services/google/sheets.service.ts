import { google, sheets_v4 } from 'googleapis';
import { getGoogleAuthClient } from './auth.js';
import { config } from '../../config/env.js';
import { logger } from '../../utils/logger.js';
import { MetricRow, PlatformType } from '../../types/metrics.types.js';
import { detectPlatform } from '../../utils/formatters.js';

let sheetsApi: sheets_v4.Sheets | null = null;

export async function getSheetsApi(): Promise<sheets_v4.Sheets> {
  if (sheetsApi) return sheetsApi;
  const auth = await getGoogleAuthClient();
  sheetsApi = google.sheets({ version: 'v4', auth });
  return sheetsApi;
}

export async function readRange(range: string): Promise<any[][]> {
  const api = await getSheetsApi();
  const res = await api.spreadsheets.values.get({
    spreadsheetId: config.spreadsheetId,
    range,
  });
  return res.data.values || [];
}

export async function writeRange(range: string, values: any[][], valueInputOption: 'RAW' | 'USER_ENTERED' = 'USER_ENTERED') {
  const api = await getSheetsApi();
  const res = await api.spreadsheets.values.update({
    spreadsheetId: config.spreadsheetId,
    range,
    valueInputOption,
    requestBody: { values },
  });
  return res.data;
}

export async function syncAirLinksFromTrackingSheet(): Promise<number> {
  logger.info(`Đang đồng bộ Link air từ tab '${config.trackingSheetName}' sang '${config.metricsSheetName}'...`);

  // 1. Đọc dữ liệu từ Tracking KOC (cột A đến F)
  const trackingRows = await readRange(`'${config.trackingSheetName}'!A5:F150`);

  // 2. Đọc các link đã có trong Metrics Tracking để tránh trùng
  const metricsRows = await readRange(`'${config.metricsSheetName}'!A3:D150`);
  const existingUrls = new Set(metricsRows.map((r) => r[3]?.trim().toLowerCase()).filter(Boolean));

  let currentKocName = '';
  let currentDate = '';
  const newRowsToAdd: any[][] = [];
  const nextRow = metricsRows.length + 3;
  let nextStt = metricsRows.filter((r) => r[0]?.trim()).length + 1;

  for (const r of trackingRows) {
    if (r[2]?.trim()) currentKocName = r[2].trim();
    if (r[1]?.trim()) currentDate = r[1].trim();

    const airLink = r[5]?.trim();
    if (!airLink || !airLink.startsWith('http')) continue;

    if (!existingUrls.has(airLink.toLowerCase())) {
      const platform = detectPlatform(airLink);
      newRowsToAdd.push([
        nextStt.toString(),
        currentKocName,
        platform,
        airLink,
        currentDate || new Date().toLocaleDateString('vi-VN'),
        '', '', '', '', '', '', // Mốc 24h: View, Tim, Cmt, Lưu, Share, Updated
        '', '', '', '', '', '', // Mốc 72h: View, Tim, Cmt, Lưu, Share, Updated
        '', // % Tăng View
        'Đang theo dõi 72h', // Trạng thái
        '', // Ghi chú
      ]);
      existingUrls.add(airLink.toLowerCase());
      nextStt++;
    }
  }

  if (newRowsToAdd.length > 0) {
    const startRow = nextRow;
    const endRow = startRow + newRowsToAdd.length - 1;
    await writeRange(`'${config.metricsSheetName}'!A${startRow}:T${endRow}`, newRowsToAdd);
    logger.success(`Đã đồng bộ thêm ${newRowsToAdd.length} link air mới vào tab '${config.metricsSheetName}'!`);
  } else {
    logger.info(`Không có link air mới nào cần đồng bộ.`);
  }

  return newRowsToAdd.length;
}

export async function getMetricsTrackingRows(): Promise<MetricRow[]> {
  const rows = await readRange(`'${config.metricsSheetName}'!A3:T100`);
  const result: MetricRow[] = [];

  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    const rowNumber = i + 3; // Dòng thực tế trong Google Sheet
    const videoUrl = r[3]?.trim();
    if (!videoUrl) continue;

    result.push({
      rowNumber,
      stt: r[0] || '',
      kocName: r[1] || '',
      platform: (r[2] || 'Khác') as PlatformType,
      videoUrl,
      postDate: r[4] || '',
      views24h: r[5] ? Number(r[5]) : undefined,
      likes24h: r[6] ? Number(r[6]) : undefined,
      comments24h: r[7] ? Number(r[7]) : undefined,
      saves24h: r[8] ? Number(r[8]) : undefined,
      shares24h: r[9] ? Number(r[9]) : undefined,
      updated24h: r[10] || '',
      views72h: r[11] ? Number(r[11]) : undefined,
      likes72h: r[12] ? Number(r[12]) : undefined,
      comments72h: r[13] ? Number(r[13]) : undefined,
      saves72h: r[14] ? Number(r[14]) : undefined,
      shares72h: r[15] ? Number(r[15]) : undefined,
      updated72h: r[16] || '',
      growthPercent: r[17] || '',
      status: r[18] || '',
      notes: r[19] || '',
    });
  }

  return result;
}

export async function update24hMetrics(
  rowNumber: number,
  data: { views: number; likes: number; comments: number; saves: number; shares: number; timestamp: string }
) {
  logger.info(`Cập nhật mốc 24h vào dòng ${rowNumber}: Views=${data.views}, Tim=${data.likes}, Cmt=${data.comments}, Lưu=${data.saves}, Share=${data.shares}`);
  const range = `'${config.metricsSheetName}'!F${rowNumber}:K${rowNumber}`;
  await writeRange(range, [[data.views, data.likes, data.comments, data.saves, data.shares, data.timestamp]]);
  
  // Cập nhật trạng thái ở cột S
  await writeRange(`'${config.metricsSheetName}'!S${rowNumber}`, [['Đã cập nhật 24h']]);
}

export async function update72hMetrics(
  rowNumber: number,
  data: { views: number; likes: number; comments: number; saves: number; shares: number; timestamp: string },
  views24h?: number
) {
  logger.info(`Cập nhật mốc 3 ngày (72h) vào dòng ${rowNumber}: Views=${data.views}, Tim=${data.likes}, Cmt=${data.comments}, Lưu=${data.saves}, Share=${data.shares}`);
  const range = `'${config.metricsSheetName}'!L${rowNumber}:Q${rowNumber}`;
  await writeRange(range, [[data.views, data.likes, data.comments, data.saves, data.shares, data.timestamp]]);

  // Tính % tăng trưởng nếu có view 24h
  let growth = '';
  if (views24h && views24h > 0) {
    const diff = ((data.views - views24h) / views24h) * 100;
    growth = `${diff >= 0 ? '+' : ''}${diff.toFixed(1)}%`;
    await writeRange(`'${config.metricsSheetName}'!R${rowNumber}`, [[growth]]);
  }

  // Cập nhật trạng thái hoàn thành ở cột S
  await writeRange(`'${config.metricsSheetName}'!S${rowNumber}`, [['Đã hoàn thành 72h']]);
}

/**
 * Cập nhật hoặc thêm mới KOC từ ảnh chụp màn hình audit TikTok
 */
export async function appendOrUpdateKocProfile(koc: {
  kocName: string;
  channelUrl?: string;
  followers?: number | string;
  tier?: string;
  avgViews7d?: number | string;
  notes?: string;
}) {
  const rows = await readRange(`'${config.trackingSheetName}'!A5:K100`);
  let targetRow = -1;

  for (let i = 0; i < rows.length; i++) {
    const existingName = rows[i][2]?.trim().toLowerCase();
    if (existingName && (existingName.includes(koc.kocName.trim().toLowerCase()) || koc.kocName.trim().toLowerCase().includes(existingName))) {
      targetRow = i + 5;
      break;
    }
  }

  if (targetRow > 0) {
    logger.info(`Cập nhật thông tin KOC ${koc.kocName} tại dòng ${targetRow}`);
    if (koc.channelUrl) await writeRange(`'${config.trackingSheetName}'!D${targetRow}`, [[koc.channelUrl]]);
    if (koc.tier) await writeRange(`'${config.trackingSheetName}'!I${targetRow}`, [[koc.tier]]);
    if (koc.followers) await writeRange(`'${config.trackingSheetName}'!J${targetRow}`, [[koc.followers]]);
    if (koc.avgViews7d) await writeRange(`'${config.trackingSheetName}'!K${targetRow}`, [[koc.avgViews7d]]);
    return { action: 'updated', rowNumber: targetRow };
  } else {
    let nextRow = 5;
    for (let i = 0; i < rows.length; i++) {
      // Dòng được tính là có dữ liệu nếu có bất kỳ ô nào không trống
      if (rows[i] && rows[i].some(cell => cell && String(cell).trim().length > 0)) {
        nextRow = i + 6;
      }
    }
    logger.info(`Thêm mới KOC ${koc.kocName} vào dòng ${nextRow}`);
    const nextStt = rows.filter(r => r[2]?.trim()).length + 1;
    await writeRange(`'${config.trackingSheetName}'!A${nextRow}:K${nextRow}`, [[
      nextStt,
      new Date().toLocaleDateString('vi-VN'),
      koc.kocName,
      koc.channelUrl || '',
      '1. Chốt làm hợp đồng',
      '',
      koc.notes || '',
      '',
      koc.tier || '',
      koc.followers || '',
      koc.avgViews7d || '',
    ]]);
    return { action: 'inserted', rowNumber: nextRow };
  }
}
