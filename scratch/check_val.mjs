import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

async function checkValidation() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';

  const res = await sheets.spreadsheets.get({
    spreadsheetId,
    ranges: ["'Data KOC Saga đi tiệc'!I7:I100"],
    includeGridData: true,
  });

  const cells = res.data.sheets[0].data[0].rowData;
  for (let i = 0; i < cells.length; i++) {
    const row = cells[i];
    if (row && row.values && row.values[0] && row.values[0].dataValidation) {
      console.log(`Row ${i + 7} validation:`, JSON.stringify(row.values[0].dataValidation, null, 2));
      break;
    }
  }
}

checkValidation().catch(console.error);
