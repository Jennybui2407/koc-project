import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

async function checkKoc() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "'Data KOC Saga đi tiệc'!A1:O100",
  });

  const rows = res.data.values || [];
  console.log(`Total rows read: ${rows.length}`);
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const rowStr = (row || []).join(' | ');
    if (rowStr.toLowerCase().includes('flora') || rowStr.toLowerCase().includes('flora216')) {
      console.log(`MATCH at row ${i + 1}: ${rowStr}`);
    }
  }

  // Also print the last 5 rows to see current STT and row index
  console.log('\n--- LAST 5 ROWS ---');
  for (let i = Math.max(0, rows.length - 5); i < rows.length; i++) {
    console.log(`Row ${i + 1}: ${JSON.stringify(rows[i])}`);
  }
}

checkKoc().catch(console.error);
