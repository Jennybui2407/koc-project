import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

async function checkThuanRows() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';

  const res = await sheets.spreadsheets.get({
    spreadsheetId,
    ranges: ["'Data KOC Saga đi tiệc'!A7:O115"],
    includeGridData: true,
  });

  const rows = res.data.sheets[0].data[0].rowData || [];
  rows.forEach((r, idx) => {
    const rowNum = idx + 7;
    const cells = r.values || [];
    const finder = cells[4]?.formattedValue;
    if (finder === 'Thuận' || rowNum >= 95) {
      const name = cells[2]?.formattedValue;
      const tiktokLink = cells[2]?.userEnteredFormat?.textFormat?.link?.uri || cells[2]?.hyperlink || '';
      const colD = cells[3]?.formattedValue || '';
      const colDLink = cells[3]?.userEnteredFormat?.textFormat?.link?.uri || cells[3]?.hyperlink || '';
      const contact = cells[9]?.formattedValue || '';
      console.log(`Row ${rowNum} [${cells[0]?.formattedValue}]: Name="${name}" | TT_Link="${tiktokLink}" | ColD="${colD}" (Link: "${colDLink}") | Finder="${finder}"`);
    }
  });
}

checkThuanRows().catch(console.error);

