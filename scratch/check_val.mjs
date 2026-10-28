import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

async function checkValidation() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';

  const res = await sheets.spreadsheets.get({
    spreadsheetId,
    ranges: ["'Data KOC Saga đi tiệc'!A7:O50"],
    fields: 'sheets.data.rowData.values.dataValidation',
  });

  const rowData = res.data.sheets[0].data[0].rowData;
  // Check row 8 (sample row) validations
  if (rowData && rowData.length > 1) {
    const cells = rowData[1].values;
    cells.forEach((c, idx) => {
      if (c && c.dataValidation) {
        console.log(`Col ${String.fromCharCode(65 + idx)} validation:`, JSON.stringify(c.dataValidation.condition));
      }
    });
  }
}

checkValidation().catch(console.error);

