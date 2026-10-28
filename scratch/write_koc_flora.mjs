import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

async function writeKocFlora() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';
  const sheetId = 1065796303;

  const stt = '41';
  const dateStr = '28/10/2026';
  const kocName = 'flora nói chậm';
  const tiktokUrl = 'https://www.tiktok.com/@flora216__';
  const subChannel = 'https://www.youtube.com/@floramakeup';
  const finder = 'Thuận';
  const tier = 'Macro';
  const style = 'Tips and tricks';
  const field = 'Thời trang/Làm đẹp';
  const location = 'Sài Gòn';
  const contact = 'bookingflorabnc@gmail.com · beacons.ai/flora216';
  const note = 'Followers: 341.4K | Avg View: ~107.9K (9 video: 59.7K, 142.5K, 53.7K, 104K, 79.6K, 49.6K, 138.2K, 170.7K, 173.4K) | MUA Sài Gòn, visual sáng, chuyên makeup tutorial & tips trang điểm, swatch review mỹ phẩm';

  const requests = [
    {
      updateCells: {
        range: {
          sheetId: sheetId,
          startRowIndex: 46, // Row 47 (0-indexed: 46)
          endRowIndex: 47,
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
              { userEnteredValue: { stringValue: '' } },
              { userEnteredValue: { stringValue: '' } },
              { userEnteredValue: { stringValue: '' } },
              { userEnteredValue: { stringValue: '' } },
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

  console.log('Update status:', res.status, res.statusText);

  // Verify
  const verifyRes = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "'Data KOC Saga đi tiệc'!A47:O47",
  });

  console.log('Verified row 47 data:\n', JSON.stringify(verifyRes.data.values, null, 2));
}

writeKocFlora().catch(console.error);

