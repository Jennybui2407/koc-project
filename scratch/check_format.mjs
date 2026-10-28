import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

async function checkRowFormat() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';

  const res = await sheets.spreadsheets.get({
    spreadsheetId,
    ranges: ["'Data KOC Saga đi tiệc'!A46:O46"],
    fields: 'sheets.data.rowData.values(userEnteredValue,userEnteredFormat,textFormatRuns)',
  });

  console.log('Row 46 formatting:', JSON.stringify(res.data.sheets[0].data[0].rowData[0].values, null, 2));
}

checkRowFormat().catch(console.error);

