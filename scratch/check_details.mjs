import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

async function checkDetails() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';

  // Check tab names first
  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  console.log('Sheets in spreadsheet:');
  for (const s of meta.data.sheets) {
    console.log(`- ${s.properties.title} (id: ${s.properties.sheetId})`);
  }

  // Check row 45 to 50
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "'Data KOC Saga đi tiệc'!A45:O50",
  });
  console.log('Rows A45:O50:', JSON.stringify(res.data.values, null, 2));
}

checkDetails().catch(console.error);

