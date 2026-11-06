import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

async function checkRow50Full() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';

  const res = await sheets.spreadsheets.get({
    spreadsheetId,
    ranges: ["'Data KOC Saga đi tiệc'!A50:O50"],
    includeGridData: true,
  });

  const cell = res.data.sheets[0].data[0].rowData[0].values;
  cell.forEach((c, idx) => {
    console.log(`Col ${String.fromCharCode(65 + idx)}:`, c.formattedValue, c.hyperlink || c.textFormatRuns);
  });
}

checkRow50Full().catch(console.error);

