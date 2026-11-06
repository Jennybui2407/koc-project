import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';
const sheetTitle = 'Data KOC (11/2026)';

async function updateMissingValues() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });

  // Update Row 2 (Huaquynhnhu): J2 = 'không có', L2 = 'không có', N2 = 'không có'
  // Update Row 3 (Những cô em): J3 = 'không có', M3 = 'không có', N3 = 'không có'
  // Update Row 6 (chanhthu__): F6 = 'không có', J6 = 'không có', L6 = 'không có', M6 = 'không có', N6 = 'không có'
  // Update Row 7 (trucanh): F7 = 'không có', J7 = 'không có', L7 = 'không có', N7 = 'không có'

  const data = [
    { range: `'${sheetTitle}'!J2`, values: [['không có']] },
    { range: `'${sheetTitle}'!L2`, values: [['không có']] },
    { range: `'${sheetTitle}'!N2`, values: [['không có']] },

    { range: `'${sheetTitle}'!J3`, values: [['không có']] },
    { range: `'${sheetTitle}'!M3`, values: [['không có']] },
    { range: `'${sheetTitle}'!N3`, values: [['không có']] },

    { range: `'${sheetTitle}'!F6`, values: [['không có']] },
    { range: `'${sheetTitle}'!J6`, values: [['không có']] },
    { range: `'${sheetTitle}'!L6`, values: [['không có']] },
    { range: `'${sheetTitle}'!M6`, values: [['không có']] },
    { range: `'${sheetTitle}'!N6`, values: [['không có']] },

    { range: `'${sheetTitle}'!F7`, values: [['không có']] },
    { range: `'${sheetTitle}'!J7`, values: [['không có']] },
    { range: `'${sheetTitle}'!L7`, values: [['không có']] },
    { range: `'${sheetTitle}'!N7`, values: [['không có']] },
  ];

  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId,
    requestBody: {
      valueInputOption: 'USER_ENTERED',
      data,
    },
  });

  console.log('Updated existing rows with "không có" successfully!');
}

updateMissingValues().catch(console.error);

