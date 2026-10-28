import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

async function writeKocRow30() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';
  const sheetTitle = 'Data KOC Saga đi tiệc';
  const sheetId = 1065796303;

  const stt = '23';
  const dateStr = '27/10/2026';
  const kocName = 'Linh Kul';
  const tiktokUrl = 'https://www.tiktok.com/@linhkul03';
  const igUrl = 'https://www.instagram.com/linhkul03/';
  const finder = 'Thuận';
  const tier = 'Macro';
  const style = 'Daily Vlog/Life Style';
  const field = 'Nghệ sĩ/Người nổi tiếng';
  const location = 'Hà Nội';
  const contact = 'linhkul.booking@gmail.com · IG: linhkul03';
  const note = 'Tier Macro (613.9K follow, tích xanh). Diễn viên, Á khôi 4 Miss Charm VN 2026. Bỏ qua 3 video ghim.';

  const requests = [
    {
      updateCells: {
        range: {
          sheetId: sheetId,
          startRowIndex: 29, // Row 30 (0-indexed: 29)
          endRowIndex: 30,
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
    range: "'Data KOC Saga đi tiệc'!A30:O30",
  });

  console.log('Verified row 30 data:', JSON.stringify(verifyRes.data.values, null, 2));
}

writeKocRow30().catch(console.error);
