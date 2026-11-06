import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

async function checkRow92Format() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';

  const res = await sheets.spreadsheets.get({
    spreadsheetId,
    ranges: ["'Data KOC Saga đi tiệc'!A92:O92"],
    includeGridData: true,
  });

  const rowData = res.data.sheets[0].data[0].rowData[0];
  console.log('Row 92 formats:');
  rowData.values.forEach((cell, idx) => {
    const colName = String.fromCharCode(65 + idx);
    console.log(`Col ${colName}:`, {
      formattedValue: cell.formattedValue,
      userEnteredFormat: cell.userEnteredFormat,
      effectiveFormat: {
        textFormat: cell.effectiveFormat?.textFormat,
        wrapStrategy: cell.effectiveFormat?.wrapStrategy,
        verticalAlignment: cell.effectiveFormat?.verticalAlignment,
        horizontalAlignment: cell.effectiveFormat?.horizontalAlignment,
      }
    });
  });
}

checkRow92Format().catch(console.error);
