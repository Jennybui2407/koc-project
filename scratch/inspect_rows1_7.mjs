import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';
const sheetTitle = 'Data KOC (11/2026)';

async function inspectRows1to7() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `'${sheetTitle}'!A1:Q8`,
  });

  console.log('Values in A1:Q8:');
  (res.data.values || []).forEach((r, idx) => {
    console.log(`Row ${idx + 1}: [A]=${r[0]}, [B]=${r[1]}, [C]=${r[2]}, [E]=${r[4]}, [K]=${r[10]}`);
  });
}

inspectRows1to7().catch(console.error);

