import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

async function writeKocHuongLien() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';
  const sheetId = 1065796303;

  const stt = '48';
  const dateStr = '28/10/2026';
  const kocName = 'Nguyễn Hương Liên';
  const tiktokUrl = 'https://www.tiktok.com/@lienhuong2003';
  const subChannel = 'https://www.instagram.com/lienhuong20.11';
  const finder = 'Thuận';
  const tier = 'Macro';
  const style = 'Daily Vlog/Life Style';
  const field = 'Model';
  const location = 'Hà Nội';
  const contact = 'huonglienwork@gmail.com · IG: lienhuong20.11';
  const note = 'Followers: 708.7K | Avg View: ~135.5K (9 video: 158.7K, 157K, 17.3K, 39.8K, 179.4K, 34K, 158.7K, 191K, 283.4K; không có video ghim) | Tier Macro. Model The Face VN 2023, hot girl nụ cười triệu view. Visual đẹp sáng, style đầm dạ hội/đi tiệc sang chảnh, ăn khớp 100% với Campaign Saga đi tiệc. Lịch sử: từng có tên trong data cũ Saga.';

  const requests = [
    {
      updateCells: {
        range: {
          sheetId: sheetId,
          startRowIndex: 53, // Row 54 (0-indexed: 53)
          endRowIndex: 54,
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
    range: "'Data KOC Saga đi tiệc'!A54:O54",
  });

  console.log('Verified row 54 data:', JSON.stringify(verifyRes.data.values, null, 2));
}

writeKocHuongLien().catch(console.error);

