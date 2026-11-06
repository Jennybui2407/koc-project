import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';
const sheetTitle = 'Data KOC (11/2026)';

async function inspectColsRtoAQ() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });

  const res = await sheets.spreadsheets.get({
    spreadsheetId,
    ranges: [`'${sheetTitle}'!R6:AQ15`],
    includeGridData: true,
  });

  const sheet = res.data.sheets?.[0];
  const rowData = sheet?.data?.[0]?.rowData || [];

  rowData.forEach((row, rIdx) => {
    const rowNum = rIdx + 6;
    const cells = row.values || [];
    const values = cells.map((c, cIdx) => {
      const colLetter = String.fromCharCode(82 + cIdx); // 82 is 'R'
      const v = c.formattedValue || '';
      return v ? `[${colLetter}]: ${v}` : null;
    }).filter(Boolean);
    if (values.length > 0) {
      console.log(`Row ${rowNum}:`, values.join(' | '));
    }
  });
}

inspectColsRtoAQ().catch(console.error);

