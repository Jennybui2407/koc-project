import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';
const sheetTitle = 'Data KOC (11/2026)';

async function testWriteColJ() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });

  try {
    const res = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `'${sheetTitle}'!J2`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [['không có']],
      },
    });
    console.log('Write result:', res.data);
  } catch (e) {
    console.error('Error writing to Col J:', e.message);
  }
}

testWriteColJ().catch(console.error);

