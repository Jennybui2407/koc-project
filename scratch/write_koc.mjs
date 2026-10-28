import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

async function writeKocToSheet() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';
  const sheetTitle = 'Data KOC Saga đi tiệc';
  const sheetId = 1065796303;

  const kocName = 'Túc Anh Hoa';
  const tiktokUrl = 'https://www.tiktok.com/@tucanhhoa_';
  const fbUrl = 'https://www.facebook.com/anhtuc.hoa.3150';
  const dateStr = '27/10/2026';
  const finder = 'Thuận';
  const tier = 'Micro';
  const style = 'Daily Vlog/Life Style';
  const field = 'Thời trang/Làm đẹp';
  const location = 'Hà Nội';
  const contact = 'beacons.ai/tucanhhoa';
  const note = 'Mẫu lookbook / KOL thời trang. 2 video 7 ngày: 158.8K & 71.8K -> Avg View: 115.3K. (Sheet cũ từng note Ghost chọn quà).';

  const requests = [
    {
      updateCells: {
        range: {
          sheetId: sheetId,
          startRowIndex: 8, // Row 9
          endRowIndex: 9,
          startColumnIndex: 0,
          endColumnIndex: 15,
        },
        rows: [
          {
            values: [
              { userEnteredValue: { stringValue: '2' } },
              { userEnteredValue: { stringValue: dateStr } },
              {
                userEnteredValue: { stringValue: kocName },
                textFormatRuns: [
                  {
                    startIndex: 0,
                    format: {
                      link: { uri: tiktokUrl },
                      underline: true,
                    },
                  },
                ],
              },
              { userEnteredValue: { stringValue: fbUrl } },
              { userEnteredValue: { stringValue: finder } },
              { userEnteredValue: { stringValue: tier } },
              { userEnteredValue: { stringValue: style } },
              { userEnteredValue: { stringValue: field } },
              { userEnteredValue: { stringValue: location } },
              { userEnteredValue: { stringValue: contact } },
              { userEnteredValue: { stringValue: '' } },
              { userEnteredValue: { stringValue: '' } },
              { userEnteredValue: { stringValue: '' } },
              { userEnteredValue: { stringValue: '' } },
              { userEnteredValue: { stringValue: note } },
            ],
          },
        ],
        fields: 'userEnteredValue,textFormatRuns',
      },
    },
  ];

  const res = await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: { requests },
  });

  console.log('Update result:', res.status, res.statusText);

  const verifyRes = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "'Data KOC Saga đi tiệc'!A9:O9",
  });

  console.log('Verified row 9 data:', verifyRes.data.values);
}

writeKocToSheet().catch(console.error);
