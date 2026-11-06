import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

async function fixRemainingRows() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';
  const sheetId = 1065796303;

  const rows = [86, 89, 90];
  const requests = rows.map(r => ({
    updateCells: {
      range: {
        sheetId,
        startRowIndex: r - 1,
        endRowIndex: r,
        startColumnIndex: 8,
        endColumnIndex: 9,
      },
      rows: [
        {
          values: [
            {
              userEnteredValue: { stringValue: '' },
              userEnteredFormat: {
                horizontalAlignment: 'CENTER',
                verticalAlignment: 'MIDDLE',
                wrapStrategy: 'WRAP',
                textFormat: { fontFamily: 'Nunito', fontSize: 10 },
              },
            },
          ],
        },
      ],
      fields: 'userEnteredValue,userEnteredFormat',
    },
  }));

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: { requests },
  });
  console.log('Fixed remaining rows 86, 89, 90!');
}

fixRemainingRows().catch(console.error);

