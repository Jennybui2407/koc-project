import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';
const sheetTitle = 'Data KOC (11/2026)';

async function inspectAllCols() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });

  const res = await sheets.spreadsheets.get({
    spreadsheetId,
    ranges: [`'${sheetTitle}'!1:1`],
    includeGridData: true,
  });

  const cells = res.data.sheets?.[0]?.data?.[0]?.rowData?.[0]?.values || [];
  console.log(`Total columns in row 1: ${cells.length}`);

  cells.forEach((c, idx) => {
    // Convert 0-indexed column to A, B, ... Z, AA, AB...
    let letter = '';
    let temp = idx;
    while (temp >= 0) {
      letter = String.fromCharCode((temp % 26) + 65) + letter;
      temp = Math.floor(temp / 26) - 1;
    }
    const val = (c.formattedValue || '').replace(/\n/g, ' ');
    const bg = c.effectiveFormat?.backgroundColor || {};
    const r = Math.round((bg.red || 0) * 255);
    const g = Math.round((bg.green || 0) * 255);
    const b = Math.round((bg.blue || 0) * 255);
    console.log(`Col ${letter} (${idx}): "${val}" | RGB(${r},${g},${b})`);
  });
}

inspectAllCols().catch(console.error);

