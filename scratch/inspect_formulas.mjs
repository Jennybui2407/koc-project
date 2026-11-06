import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';
const sheetTitle = 'Data KOC (11/2026)';

async function inspectMore() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });

  // Inspect rows 1 to 5 with formulas
  const res = await sheets.spreadsheets.get({
    spreadsheetId,
    ranges: [`'${sheetTitle}'!A1:Z6`],
    includeGridData: true,
  });

  const rowData = res.data.sheets?.[0]?.data?.[0]?.rowData || [];
  rowData.forEach((row, rIdx) => {
    console.log(`\n--- ROW ${rIdx + 1} ---`);
    const cells = row.values || [];
    cells.forEach((c, cIdx) => {
      const colLetter = String.fromCharCode(65 + cIdx);
      if (c.userEnteredValue || c.formattedValue) {
        console.log(`Col ${colLetter}: formatted="${c.formattedValue}", entered=${JSON.stringify(c.userEnteredValue)}`);
      }
    });
  });
}

inspectMore().catch(console.error);

