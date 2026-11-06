import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

async function fixLocationsAndFormats() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';
  const sheetId = 1065796303;

  // 1. Clear invalid "Việt Nam" in column I (index 8) for rows 82, 83, 85, 88, 91, 92, and set row 84 to "Sài Gòn"
  const clearRows = [82, 83, 85, 88, 91, 92]; // 1-indexed row numbers
  const requests = [];

  clearRows.forEach(rowNum => {
    requests.push({
      updateCells: {
        range: {
          sheetId,
          startRowIndex: rowNum - 1,
          endRowIndex: rowNum,
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
    });
  });

  // Row 84 (Hang Pham): map HCM to valid dropdown option "Sài Gòn"
  requests.push({
    updateCells: {
      range: {
        sheetId,
        startRowIndex: 83,
        endRowIndex: 84,
        startColumnIndex: 8,
        endColumnIndex: 9,
      },
      rows: [
        {
          values: [
            {
              userEnteredValue: { stringValue: 'Sài Gòn' },
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
  });

  // Apply wrapStrategy: WRAP, Nunito 10, vertical MIDDLE to all cells in rows 81 to 93
  requests.push({
    repeatCell: {
      range: {
        sheetId,
        startRowIndex: 80, // Row 81
        endRowIndex: 93,   // Row 93
        startColumnIndex: 0,
        endColumnIndex: 15,
      },
      cell: {
        userEnteredFormat: {
          verticalAlignment: 'MIDDLE',
          wrapStrategy: 'WRAP',
          textFormat: { fontFamily: 'Nunito', fontSize: 10 },
        },
      },
      fields: 'userEnteredFormat.verticalAlignment,userEnteredFormat.wrapStrategy,userEnteredFormat.textFormat.fontFamily,userEnteredFormat.textFormat.fontSize',
    },
  });

  const res = await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: { requests },
  });

  console.log('Fixed successfully!', res.status);
}

fixLocationsAndFormats().catch(console.error);

