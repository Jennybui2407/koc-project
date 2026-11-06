import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

async function checkColumnI() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "'Data KOC Saga đi tiệc'!A80:O95",
  });

  const rows = res.data.values || [];
  rows.forEach((r, idx) => {
    const rowNum = idx + 80;
    console.log(`Row ${rowNum}: STT=${r[0]}, Name=${r[2]}, Location(Col I)=${r[8]}`);
  });
}

checkColumnI().catch(console.error);

