import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

async function writeKocRow14() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';
  const sheetTitle = 'Data KOC Saga đi tiệc';
  const sheetId = 1065796303;

  const kocName = 'xu và xì';
  const tiktokUrl = 'https://www.tiktok.com/@xuxidaily';
  const igUrl = 'https://www.instagram.com/xuvaxi_/';
  const dateStr = '27/10/2026';
  const finder = 'Thuận';
  const tier = 'Review/Aff';
  const style = 'Couple';
  const field = 'Couple';
  const location = 'Hà Nội';
  const contact = 'IG: xuvaxi_';
  const note = 'Tier Nano (15.9K follow). Bỏ qua 2 video ghim (2.3M, Vừa xem). 4 video mới nhất không ghim: 13.9K, 64.8K, 19.5K, 21.9K -> Avg View: ~30K.';

  const requests = [
    {
      updateCells: {
        range: {
          sheetId: sheetId,
          startRowIndex: 13, // Row 14 (0-indexed: 13)
          endRowIndex: 14,
          startColumnIndex: 0,
          endColumnIndex: 15,
        },
        rows: [
          {
            values: [
              { userEnteredValue: { stringValue: '7' } },
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
    range: "'Data KOC Saga đi tiệc'!A14:O14",
  });

  console.log('Verified row 14 data:', verifyRes.data.values);
}

writeKocRow14().catch(console.error);
