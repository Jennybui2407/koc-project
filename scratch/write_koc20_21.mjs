import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

async function writeKocRows20And21() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';
  const sheetTitle = 'Data KOC Saga đi tiệc';
  const sheetId = 1065796303;

  const dateStr = '27/10/2026';
  const finder = 'Thuận';

  const requests = [
    // Row 20: MAI HUONG (0-indexed: 19)
    {
      updateCells: {
        range: {
          sheetId: sheetId,
          startRowIndex: 19,
          endRowIndex: 20,
          startColumnIndex: 0,
          endColumnIndex: 15,
        },
        rows: [
          {
            values: [
              { userEnteredValue: { stringValue: '13' } },
              { userEnteredValue: { stringValue: dateStr } },
              {
                userEnteredValue: { stringValue: 'MAI HUONG' },
                textFormatRuns: [
                  {
                    startIndex: 0,
                    format: {
                      link: { uri: 'https://www.tiktok.com/@blmhuong' },
                      underline: true,
                    },
                  },
                ],
              },
              { userEnteredValue: { stringValue: 'https://www.instagram.com/blmhuong/' } },
              { userEnteredValue: { stringValue: finder } },
              { userEnteredValue: { stringValue: 'Macro' } },
              { userEnteredValue: { stringValue: 'Daily Vlog/Life Style' } },
              { userEnteredValue: { stringValue: 'Gia đình/Nhà cửa đời sống' } },
              { userEnteredValue: { stringValue: 'Hà Nội' } },
              { userEnteredValue: { stringValue: '039 895 0895 (Ms. Vũ Ngân) · workwithmaihuong@gmail.com' } },
              { userEnteredValue: { stringValue: '' } },
              { userEnteredValue: { stringValue: '' } },
              { userEnteredValue: { stringValue: '' } },
              { userEnteredValue: { stringValue: '' } },
              { userEnteredValue: { stringValue: 'Tier Macro (941.9K follow). Kênh không có video ghim hàng 1. 3 video mới nhất: 38.7K, 121.2K, 74.2K -> Avg ~78K (Avg 6 video: ~601K).' } },
            ],
          },
        ],
        fields: 'userEnteredValue,textFormatRuns',
      },
    },
    // Row 21: thuỵ hân ♡ (0-indexed: 20)
    {
      updateCells: {
        range: {
          sheetId: sheetId,
          startRowIndex: 20,
          endRowIndex: 21,
          startColumnIndex: 0,
          endColumnIndex: 15,
        },
        rows: [
          {
            values: [
              { userEnteredValue: { stringValue: '14' } },
              { userEnteredValue: { stringValue: dateStr } },
              {
                userEnteredValue: { stringValue: 'thuỵ hân ♡' },
                textFormatRuns: [
                  {
                    startIndex: 0,
                    format: {
                      link: { uri: 'https://www.tiktok.com/@thuyhannnn' },
                      underline: true,
                    },
                  },
                ],
              },
              { userEnteredValue: { stringValue: 'https://www.instagram.com/hiann_/' } },
              { userEnteredValue: { stringValue: finder } },
              { userEnteredValue: { stringValue: 'Micro' } },
              { userEnteredValue: { stringValue: 'Daily Vlog/Life Style' } },
              { userEnteredValue: { stringValue: 'Thời trang/Làm đẹp' } },
              { userEnteredValue: { stringValue: 'Sài Gòn' } },
              { userEnteredValue: { stringValue: 'thuyhan.booking@gmail.com (IG: hiann_)' } },
              { userEnteredValue: { stringValue: '' } },
              { userEnteredValue: { stringValue: '' } },
              { userEnteredValue: { stringValue: '' } },
              { userEnteredValue: { stringValue: '' } },
              { userEnteredValue: { stringValue: 'Tier Micro (132K follow). Bỏ qua 1 video ghim (2.2M). 3 video mới nhất không ghim: 22.3K, 9.3K, 59.5K -> Avg View: ~30.4K. (Sheet cũ từng note Không phản hồi).' } },
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
    range: "'Data KOC Saga đi tiệc'!A20:O21",
  });

  console.log('Verified row 20-21 data:', verifyRes.data.values);
}

writeKocRows20And21().catch(console.error);
