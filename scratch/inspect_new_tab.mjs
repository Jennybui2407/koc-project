import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';
const sheetTitle = 'Data KOC (11/2026)';

async function inspectTab() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });

  const res = await sheets.spreadsheets.get({
    spreadsheetId,
    ranges: [`'${sheetTitle}'!A1:Z15`],
    includeGridData: true,
  });

  const sheet = res.data.sheets?.[0];
  const rowData = sheet?.data?.[0]?.rowData || [];

  console.log(`Inspecting tab: ${sheetTitle}`);
  console.log(`Total rows fetched: ${rowData.length}`);

  rowData.forEach((row, rIdx) => {
    const rowNum = rIdx + 1;
    const cells = row.values || [];
    const summary = cells.map((c, cIdx) => {
      const colLetter = String.fromCharCode(65 + cIdx);
      const val = c.formattedValue || '';
      const bg = c.effectiveFormat?.backgroundColor || {};
      const red = Math.round((bg.red || 0) * 255);
      const green = Math.round((bg.green || 0) * 255);
      const blue = Math.round((bg.blue || 0) * 255);
      return { col: colLetter, val, rgb: `${red},${green},${blue}` };
    });
    console.log(`Row ${rowNum}:`, summary.filter(s => s.val).map(s => `[${s.col}] ${s.val} (RGB: ${s.rgb})`).join(' | '));
  });
}

inspectTab().catch(console.error);

