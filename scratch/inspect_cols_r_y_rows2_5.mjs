import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';
const sheetTitle = 'Data KOC (11/2026)';

async function inspectColsRtoY() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });

  const res = await sheets.spreadsheets.get({
    spreadsheetId,
    ranges: [`'${sheetTitle}'!J2:Q5`],
    includeGridData: true,
  });

  const rowData = res.data.sheets?.[0]?.data?.[0]?.rowData || [];
  rowData.forEach((r, idx) => {
    console.log(`\nRow ${idx + 2}:`);
    (r.values || []).forEach((c, cIdx) => {
      const colLetter = String.fromCharCode(74 + cIdx); // J is 74
      console.log(`[${colLetter}]: "${c.formattedValue || ''}"`);
    });
  });

  const res2 = await sheets.spreadsheets.get({
    spreadsheetId,
    ranges: [`'${sheetTitle}'!R2:Y5`],
    includeGridData: true,
  });
  console.log('\nColumns R to Y:');
  (res2.data.sheets?.[0]?.data?.[0]?.rowData || []).forEach((r, idx) => {
    console.log(`Row ${idx + 2}:`, (r.values || []).map((c, i) => `[${String.fromCharCode(82 + i)}]: "${c.formattedValue || ''}"`).join(' | '));
  });
}

inspectColsRtoY().catch(console.error);

