import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';
const sheetTitle = 'Data KOC (11/2026)';

async function inspectRow6to8() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });

  const res = await sheets.spreadsheets.get({
    spreadsheetId,
    ranges: [`'${sheetTitle}'!A1:Q8`],
    includeGridData: true,
  });

  const sheet = res.data.sheets?.[0];
  const rowData = sheet?.data?.[0]?.rowData || [];
  const header = (rowData[0]?.values || []).map(c => c.formattedValue?.replace(/\n/g, ' ') || '');

  for (let r = 5; r < 8; r++) {
    console.log(`\n=== ROW ${r + 1} ===`);
    const values = rowData[r]?.values || [];
    values.forEach((c, idx) => {
      const colLetter = String.fromCharCode(65 + idx);
      const h = header[idx] || '';
      const v = c.formattedValue || '';
      const link = c.hyperlink || c.userEnteredFormat?.textFormat?.link?.uri || '';
      console.log(`[${colLetter}] ${h}: "${v}" ${link ? `(link: ${link})` : ''}`);
    });
  }
}

inspectRow6to8().catch(console.error);

