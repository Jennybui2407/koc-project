import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

async function writeKocRow31() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';
  const sheetTitle = 'Data KOC Saga đi tiệc';
  const sheetId = 1065796303;

  const stt = '24';
  const dateStr = '27/10/2026';
  const kocName = 'Đan Quỳnh Daily';
  const tiktokUrl = 'https://www.tiktok.com/@danquynh.daily';
  const igUrl = 'https://www.instagram.com/dwuynh_ng/';
  const finder = 'Thuận';
  const tier = 'Micro';
  const style = 'Daily Vlog/Life Style';
  const field = 'Thời trang/Làm đẹp';
  const location = 'Sài Gòn';
  const contact = '0923504640 · danquynh3011@gmail.com · IG: dwuynh_ng';
  const note = 'Tier Micro (172.7K follow). Á hậu Nguyễn Vũ Đan Quỳnh. Content Beauty/Lifestyle/Food/Unbox. Bỏ qua 3 video ghim.';

  const requests = [
    {
      updateCells: {
        range: {
          sheetId: sheetId,
          startRowIndex: 30, // Row 31 (0-indexed: 30)
          endRowIndex: 31,
          startColumnIndex: 0,
          endColumnIndex: 15,
        },
        rows: [
          {
            values: [
              { userEnteredValue: { stringValue: stt } },
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
    range: "'Data KOC Saga đi tiệc'!A31:O31",
  });

  console.log('Verified row 31 data:', JSON.stringify(verifyRes.data.values, null, 2));
}

writeKocRow31().catch(console.error);
