import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

async function writeKocRow12() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';
  const sheetTitle = 'Data KOC Saga đi tiệc';
  const sheetId = 1065796303;

  const kocName = 'Bằng Linh ♡';
  const tiktokUrl = 'https://www.tiktok.com/@bybling';
  const igUrl = 'https://www.instagram.com/byblingg/';
  const dateStr = '27/10/2026';
  const finder = 'Thuận';
  const tier = 'Review/Aff';
  const style = 'Daily Vlog/Life Style';
  const field = 'Thời trang/Làm đẹp';
  const location = 'Hà Nội';
  const contact = 'IG: @byblingg (công việc: @blingatwork)';
  const note = 'Tier Nano (16.2K follow). Bỏ qua 3 video ghim (166.5K, 289.5K). 3 video mới nhất không ghim: 3.6K, 3.4K, 3.2K -> Avg View: ~3.4K.';

  const requests = [
    {
      updateCells: {
        range: {
          sheetId: sheetId,
          startRowIndex: 11, // Row 12 (0-indexed: 11)
          endRowIndex: 12,
          startColumnIndex: 0,
          endColumnIndex: 15,
        },
        rows: [
          {
            values: [
              { userEnteredValue: { stringValue: '5' } },
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
    range: "'Data KOC Saga đi tiệc'!A12:O12",
  });

  console.log('Verified row 12 data:', verifyRes.data.values);
}

writeKocRow12().catch(console.error);
