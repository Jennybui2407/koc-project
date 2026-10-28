import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

async function writeKocRow29() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';
  const sheetTitle = 'Data KOC Saga đi tiệc';
  const sheetId = 1065796303;

  const stt = '22';
  const dateStr = '27/10/2026';
  const kocName = 'Tô Đát Kỷ';
  const tiktokUrl = 'https://www.tiktok.com/@rbyhaan';
  const igUrl = 'https://www.instagram.com/rbyhaan/';
  const finder = 'Thuận';
  const tier = 'Macro';
  const style = 'Daily Vlog/Life Style';
  const field = 'Thời trang/Làm đẹp';
  const location = 'Hà Nội';
  const contact = '0344623512 (Ms.Nguyên) · IG: rbyhaan';
  const note = 'Tier Macro (710.9K follow). Tên thật Vũ Hà An (2005), mẫu ảnh/The Face. Bỏ qua 2 video ghim.';

  const requests = [
    {
      updateCells: {
        range: {
          sheetId: sheetId,
          startRowIndex: 28, // Row 29 (0-indexed: 28)
          endRowIndex: 29,
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
    range: "'Data KOC Saga đi tiệc'!A29:O29",
  });

  console.log('Verified row 29 data:', JSON.stringify(verifyRes.data.values, null, 2));
}

writeKocRow29().catch(console.error);
