import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

async function writeKocRow17() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';
  const sheetTitle = 'Data KOC Saga đi tiệc';
  const sheetId = 1065796303;

  const kocName = 'Mê linh';
  const tiktokUrl = 'https://www.tiktok.com/@linh_linh2208';
  const igUrl = 'https://www.instagram.com/nilinh_2208/';
  const dateStr = '27/10/2026';
  const finder = 'Thuận';
  const tier = 'Micro';
  const style = 'Review';
  const field = 'Thời trang/Làm đẹp';
  const location = 'Hà Nội';
  const contact = '0326.506.187 (IG: nilinh_2208)';
  const note = 'Micro (45.3K follow). Bỏ qua 3 video ghim (1.1M, 585K, 690K). 3 video mới nhất không ghim: 1.2K, 35.6K, 85.7K -> Avg View: ~40.8K.';

  const requests = [
    {
      updateCells: {
        range: {
          sheetId: sheetId,
          startRowIndex: 16, // Row 17 (0-indexed: 16)
          endRowIndex: 17,
          startColumnIndex: 0,
          endColumnIndex: 15,
        },
        rows: [
          {
            values: [
              { userEnteredValue: { stringValue: '10' } },
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
    range: "'Data KOC Saga đi tiệc'!A17:O17",
  });

  console.log('Verified row 17 data:', verifyRes.data.values);
}

writeKocRow17().catch(console.error);
