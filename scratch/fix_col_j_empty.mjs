import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';
import { getRows } from '../scripts/koc_audit.mjs';

const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';
const sheetId = 280295617;

async function run() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });

  const rows = await getRows('A2:Q10');
  console.log("Current Column J values in rows 2-10:");
  const requests = [];
  rows.forEach((r, idx) => {
    const rowNum = idx + 2;
    const colJVal = r[9]?.value;
    console.log(`Row ${rowNum} (${r[4]?.value}): Col J = "${colJVal}"`);
    if (colJVal === 'không có') {
      requests.push({
        updateCells: {
          range: {
            sheetId: sheetId,
            startRowIndex: rowNum - 1,
            endRowIndex: rowNum,
            startColumnIndex: 9, // Col J is index 9 (0-based)
            endColumnIndex: 10,
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
                    textFormat: { fontFamily: 'Nunito', fontSize: 9 }
                  }
                }
              ]
            }
          ],
          fields: 'userEnteredValue,userEnteredFormat(horizontalAlignment,verticalAlignment,wrapStrategy,textFormat)'
        }
      });
    }
  });

  if (requests.length > 0) {
    console.log(`Clearing ${requests.length} rows with "không có" in Col J...`);
    const res = await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: { requests }
    });
    console.log("Cleared successfully!");
  } else {
    console.log("No rows needed clearing.");
  }
}

run().catch(console.error);
