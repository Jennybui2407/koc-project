import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';
const sheetTitle = 'Data KOL/KOC Mắt kính';

async function main() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });

  const metadata = await sheets.spreadsheets.get({
    spreadsheetId,
  });

  const sheetObj = metadata.data.sheets.find(s => s.properties.title === sheetTitle || s.properties.sheetId === 1941783024);
  console.log('Sheet properties:', JSON.stringify(sheetObj.properties, null, 2));

  const res = await sheets.spreadsheets.get({
    spreadsheetId,
    ranges: [`'${sheetTitle}'!A2668:N2685`],
    includeGridData: true,
  });

  const rowData = res.data.sheets?.[0]?.data?.[0]?.rowData || [];
  rowData.forEach((row, idx) => {
    const rowNum = 2668 + idx;
    const vals = (row.values || []).map(c => {
      let text = c.formattedValue || '';
      let link = c.hyperlink || c.userEnteredFormat?.textFormat?.link?.uri || '';
      if (link) text += ` (${link})`;
      return text;
    });
    console.log(`Row ${rowNum}:`, JSON.stringify(vals));
  });
}

main().catch(console.error);

