import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

async function writeKocLuongThucHien() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';
  const sheetId = 1065796303;

  const stt = '42';
  const dateStr = '28/10/2026';
  const kocName = 'Lương Thục Hiền';
  const tiktokUrl = 'https://www.tiktok.com/@luongthuchien6868';
  const subChannel = 'https://www.instagram.com/thuchiendaily68';
  const finder = 'Thuận';
  const tier = 'Micro';
  const style = 'Tips and tricks';
  const field = 'Thời trang/Làm đẹp';
  const location = '';
  const contact = 'hienlt.jpt@gmail.com · thuchien68.passio.eco';
  const note = 'Followers: 215.7K | Avg View: ~42.2K (8 video: 47.2K, 21.9K, 17.9K, 71.5K, 39.6K, 83.2K, 30.4K, 25.8K) | Beauty creator/MUA chuyên tutorial makeup & tips làm đẹp. Visual sáng, nữ tính. Lịch sử: từng có tên trong data cũ Saga.';

  const requests = [
    {
      updateCells: {
        range: {
          sheetId: sheetId,
          startRowIndex: 47, // Row 48 (0-indexed: 47)
          endRowIndex: 48,
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
    range: "'Data KOC Saga đi tiệc'!A48:O48",
  });

  console.log('Verified row 48 data:', JSON.stringify(verifyRes.data.values, null, 2));
}

writeKocLuongThucHien().catch(console.error);

