import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';
const sheetTitle = 'Data KOC (11/2026)';

async function inspectColJValues() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `'${sheetTitle}'!J1:J200`,
  });

  const vals = (res.data.values || []).map(r => r[0]).filter(Boolean);
  const counts = {};
  vals.forEach(v => counts[v] = (counts[v] || 0) + 1);
  console.log('Unique values in Col J (first 200 rows):', counts);
}

inspectColJValues().catch(console.error);

