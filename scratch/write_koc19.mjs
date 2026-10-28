import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

async function writeKocRow19() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';
  const sheetTitle = 'Data KOC Saga đi tiệc';
  const sheetId = 1065796303;

  const kocName = 'Ngọc Kem';
  const tiktokUrl = 'https://www.tiktok.com/@ngockemm';
  const igUrl = 'https://www.instagram.com/ngockem_/';
  const dateStr = '27/10/2026';
  const finder = 'Thuận';
  const tier = 'Mega';
  const style = 'Daily Vlog/Life Style';
  const field = 'Nghệ sĩ/Người nổi tiếng';
  const location = 'Hà Nội';
  const contact = 'ngockemm2422@gmail.com (IG: ngockem_)';
  const note = 'Tier Mega (3.3M follow). Bỏ qua 3 video ghim (4.9M, 2M, 10M). 3 video mới nhất không ghim: 85.4K, 1M, 1.7M -> Avg View: ~928.5K.';

  const requests = [
    {
      updateCells: {
        range: {
          sheetId: sheetId,
          startRowIndex: 18, // Row 19 (0-indexed: 18)
          endRowIndex: 19,
          startColumnIndex: 0,
          endColumnIndex: 15,
        },
        rows: [
          {
            values: [
              { userEnteredValue: { stringValue: '12' } },
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
    range: "'Data KOC Saga đi tiệc'!A19:O19",
  });

  console.log('Verified row 19 data:', verifyRes.data.values);
}

writeKocRow19().catch(console.error);
