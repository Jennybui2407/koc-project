import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';
const sheetTitle = 'Data KOC (11/2026)';

async function checkColJValidation() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });

  const res = await sheets.spreadsheets.get({
    spreadsheetId,
    ranges: [`'${sheetTitle}'!J1:J5`],
    includeGridData: true,
  });

  const rows = res.data.sheets?.[0]?.data?.[0]?.rowData || [];
  rows.forEach((r, idx) => {
    const c = r.values?.[0];
    console.log(`Row ${idx + 1} Col J: val="${c?.formattedValue}", dataVal=${JSON.stringify(c?.dataValidation)}`);
  });
}

checkColJValidation().catch(console.error);

