import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

async function checkRow50() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "'Data KOC Saga đi tiệc'!A45:O55",
  });

  const rows = res.data.values || [];
  rows.forEach((r, idx) => {
    console.log(`Row ${idx + 45}:`, r.slice(0, 5));
  });
}

checkRow50().catch(console.error);

