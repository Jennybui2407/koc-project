import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';

async function inspectSpreadsheet() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });

  const meta = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: 'sheets(properties(sheetId,title,index,gridProperties))',
  });

  console.log('Sheets in spreadsheet:');
  for (const s of meta.data.sheets || []) {
    console.log(`- ${s.properties?.title} (id: ${s.properties?.sheetId})`);
  }
}

inspectSpreadsheet().catch(console.error);

