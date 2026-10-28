import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

async function writeKocRow22() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';
  const sheetTitle = 'Data KOC Saga đi tiệc';
  const sheetId = 1065796303;

  const kocName = 'Chang SunF';
  const tiktokUrl = 'https://www.tiktok.com/@changsunf';
  const igUrl = 'https://www.instagram.com/_trag.ixu/';
  const dateStr = '27/10/2026';
  const finder = 'Thuận';
  const tier = 'Review/Aff';
  const style = 'Daily Vlog/Life Style';
  const field = 'Thời trang/Làm đẹp';
  const location = 'Hà Nội';
  const contact = 'dinhthihuyentrang1609@gmail.com (IG: _trag.ixu)';
  const note = 'Tier Nano (8K follow). Bỏ qua 3 video ghim tháng 3/2026. 3 video đăng gần nhất (24-27/10): 5.2K, 11.2K, ~8K -> Avg View 7 ngày: ~8.1K.';

  const requests = [
    {
      updateCells: {
        range: {
          sheetId: sheetId,
          startRowIndex: 21, // Row 22 (0-indexed: 21)
          endRowIndex: 22,
          startColumnIndex: 0,
          endColumnIndex: 15,
        },
        rows: [
          {
            values: [
              { userEnteredValue: { stringValue: '15' } },
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
              { userEnteredValue: { stringValue: igUrl } },
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
    range: "'Data KOC Saga đi tiệc'!A22:O22",
  });

  console.log('Verified row 22 data:', verifyRes.data.values);
}

writeKocRow22().catch(console.error);
