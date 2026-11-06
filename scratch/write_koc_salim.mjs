import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

async function writeKocSalim() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';
  const sheetId = 1065796303;

  const stt = '46';
  const dateStr = '28/10/2026';
  const kocName = 'Salim';
  const tiktokUrl = 'https://www.tiktok.com/@salimhwg';
  const subChannel = 'https://www.instagram.com/salimhwg';
  const finder = 'Thuận';
  const tier = 'Mega';
  const style = 'Daily Vlog/Life Style';
  const field = 'Gia đình/Nhà cửa đời sống';
  const location = 'Hà Nội';
  const contact = 'hatnhaifamily@theantsmedia.com (The Ants Media) · IG: salimhwg';
  const note = 'Followers: 1.2M | Avg View: ~948.1K (9 video: 208.5K, 1.3M, 1.6M, 84.8K, 1.1M, 105.5K, 188.3K, 3.2M, 745.7K; bỏ qua 3 video ghim: 4.5M, 7.8M, 8.8M) | Tier Mega. Nghệ sĩ/Hot Mom nổi tiếng (mẹ Pam Yêu Ơi - gia đình Hạt Nhài). Tương tác khủng, visual sang trọng, tệp khán giả gia đình & phái đẹp cực lớn. Lịch sử: từng có tên trong data cũ Saga.';

  const requests = [
    {
      updateCells: {
        range: {
          sheetId: sheetId,
          startRowIndex: 51, // Row 52 (0-indexed: 51)
          endRowIndex: 52,
          startColumnIndex: 0,
          endColumnIndex: 15,
        },
        rows: [
          {
            values: [
              {
                userEnteredValue: { stringValue: stt },
                userEnteredFormat: {
                  horizontalAlignment: 'CENTER',
                  verticalAlignment: 'MIDDLE',
                  textFormat: { fontFamily: 'Nunito', fontSize: 10 },
                },
              },
              {
                userEnteredValue: { stringValue: dateStr },
                userEnteredFormat: {
                  horizontalAlignment: 'CENTER',
                  verticalAlignment: 'MIDDLE',
                  textFormat: { fontFamily: 'Nunito', fontSize: 10 },
                },
              },
              {
                userEnteredValue: { stringValue: kocName },
                userEnteredFormat: {
                  horizontalAlignment: 'LEFT',
                  verticalAlignment: 'MIDDLE',
                  textFormat: {
                    fontFamily: 'Nunito',
                    fontSize: 10,
                    link: { uri: tiktokUrl },
                    underline: true,
                  },
                },
              },
              {
                userEnteredValue: { stringValue: subChannel },
                userEnteredFormat: {
                  horizontalAlignment: 'LEFT',
                  verticalAlignment: 'MIDDLE',
                  textFormat: {
                    fontFamily: 'Nunito',
                    fontSize: 10,
                    link: { uri: subChannel },
                    underline: true,
                  },
                },
              },
              {
                userEnteredValue: { stringValue: finder },
                userEnteredFormat: {
                  horizontalAlignment: 'CENTER',
                  verticalAlignment: 'MIDDLE',
                  textFormat: { fontFamily: 'Nunito', fontSize: 10 },
                },
              },
              {
                userEnteredValue: { stringValue: tier },
                userEnteredFormat: {
                  horizontalAlignment: 'CENTER',
                  verticalAlignment: 'MIDDLE',
                  textFormat: { fontFamily: 'Nunito', fontSize: 10 },
                },
              },
              {
                userEnteredValue: { stringValue: style },
                userEnteredFormat: {
                  horizontalAlignment: 'CENTER',
                  verticalAlignment: 'MIDDLE',
                  textFormat: { fontFamily: 'Nunito', fontSize: 10 },
                },
              },
              {
                userEnteredValue: { stringValue: field },
                userEnteredFormat: {
                  horizontalAlignment: 'CENTER',
                  verticalAlignment: 'MIDDLE',
                  textFormat: { fontFamily: 'Nunito', fontSize: 10 },
                },
              },
              {
                userEnteredValue: { stringValue: location },
                userEnteredFormat: {
                  horizontalAlignment: 'CENTER',
                  verticalAlignment: 'MIDDLE',
                  textFormat: { fontFamily: 'Nunito', fontSize: 10 },
                },
              },
              {
                userEnteredValue: { stringValue: contact },
                userEnteredFormat: {
                  horizontalAlignment: 'LEFT',
                  verticalAlignment: 'MIDDLE',
                  textFormat: { fontFamily: 'Nunito', fontSize: 10 },
                },
              },
              {
                userEnteredValue: { stringValue: '' },
                userEnteredFormat: {
                  horizontalAlignment: 'CENTER',
                  verticalAlignment: 'MIDDLE',
                  textFormat: { fontFamily: 'Nunito', fontSize: 10 },
                },
              },
              {
                userEnteredValue: { stringValue: '' },
                userEnteredFormat: {
                  horizontalAlignment: 'CENTER',
                  verticalAlignment: 'MIDDLE',
                  textFormat: { fontFamily: 'Nunito', fontSize: 10 },
                },
              },
              {
                userEnteredValue: { stringValue: '' },
                userEnteredFormat: {
                  horizontalAlignment: 'CENTER',
                  verticalAlignment: 'MIDDLE',
                  textFormat: { fontFamily: 'Nunito', fontSize: 10 },
                },
              },
              {
                userEnteredValue: { stringValue: '' },
                userEnteredFormat: {
                  horizontalAlignment: 'CENTER',
                  verticalAlignment: 'MIDDLE',
                  textFormat: { fontFamily: 'Nunito', fontSize: 10 },
                },
              },
              {
                userEnteredValue: { stringValue: note },
                userEnteredFormat: {
                  horizontalAlignment: 'LEFT',
                  verticalAlignment: 'MIDDLE',
                  textFormat: { fontFamily: 'Nunito', fontSize: 10 },
                },
              },
            ],
          },
        ],
        fields: 'userEnteredValue,userEnteredFormat',
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
    range: "'Data KOC Saga đi tiệc'!A52:O52",
  });

  console.log('Verified row 52 data:', JSON.stringify(verifyRes.data.values, null, 2));
}

writeKocSalim().catch(console.error);

