import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';
const sheetTitle = 'Data KOC (11/2026)';

async function inspectTopRows() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });

  const res = await sheets.spreadsheets.get({
    spreadsheetId,
    ranges: [`'${sheetTitle}'!A1:Q10`],
    includeGridData: true,
  });

  const rowData = res.data.sheets?.[0]?.data?.[0]?.rowData || [];

  for (let r = 0; r < Math.min(10, rowData.length); r++) {
    const rowNum = r + 1;
    const cells = rowData[r]?.values || [];
    console.log(`\n=== ROW ${rowNum} ===`);
    cells.forEach((c, idx) => {
      const colLetter = String.fromCharCode(65 + idx);
      const val = c.formattedValue || '';
      console.log(`[${colLetter}] "${val}"`);
    });
  }
}

inspectTopRows().catch(console.error);

