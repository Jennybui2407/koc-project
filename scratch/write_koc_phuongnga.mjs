import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

async function writeKocPhuongNga() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';
  const sheetId = 1065796303;

  const stt = '47';
  const dateStr = '28/10/2026';
  const kocName = 'Phương Nga Bùi';
  const tiktokUrl = 'https://www.tiktok.com/@nanananana.nana';
  const subChannel = 'https://www.instagram.com/phuongngabui_';
  const finder = 'Thuận';
  const tier = 'Macro';
  const style = 'Daily Vlog/Life Style';
  const field = 'MC/Diễn viên/Ca sĩ';
  const location = 'Hà Nội';
  const contact = 'thenogust.booking@gmail.com · FB: phuongnga.tueanh · IG: phuongngabui_';
  const note = 'Followers: 947.3K | Avg View: ~1.08M (9 video: 174.3K, 1.3M, 4.3M, 50.1K, 1.2M, 372.2K, 811.1K, 272K, 1.3M; không có video ghim) | Tier Macro. Á hậu 1 Hoa hậu VN 2018, MC VTV. Visual đỉnh cao, sang chảnh tiệc tùng, tương tác triệu view. Rất hợp định vị cao cấp của Saga. Lịch sử: từng có tên trong data cũ Saga.';

  const requests = [
    {
      updateCells: {
        range: {
          sheetId: sheetId,
          startRowIndex: 52, // Row 53 (0-indexed: 52)
          endRowIndex: 53,
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
    range: "'Data KOC Saga đi tiệc'!A53:O53",
  });

  console.log('Verified row 53 data:', JSON.stringify(verifyRes.data.values, null, 2));
}

writeKocPhuongNga().catch(console.error);
