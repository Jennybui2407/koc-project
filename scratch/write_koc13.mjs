import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

async function writeKocRow13() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';
  const sheetTitle = 'Data KOC Saga đi tiệc';
  const sheetId = 1065796303;

  const kocName = 'Vân Tuổi Tý';
  const tiktokUrl = 'https://www.tiktok.com/@vantuoity';
  const dateStr = '27/10/2026';
  const finder = 'Thuận';
  const tier = 'Review/Aff';
  const style = 'Daily Vlog/Life Style';
  const field = 'Gia đình/Nhà cửa đời sống';
  const location = 'Hà Nội';
  const contact = 'Nhắn tin qua TikTok';
  const note = 'Tier Nano (1.5K follow). Kênh ngưng đăng từ 12/07/2026 (0 video trong 7 ngày gần nhất). Avg 3 video mới nhất không ghim: ~11.7K (16.2K, 11.6K, 7.2K).';

  const requests = [
    {
      updateCells: {
        range: {
          sheetId: sheetId,
          startRowIndex: 12, // Row 13 (0-indexed: 12)
          endRowIndex: 13,
          startColumnIndex: 0,
          endColumnIndex: 15,
        },
        rows: [
          {
            values: [
              { userEnteredValue: { stringValue: '6' } },
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
              { userEnteredValue: { stringValue: '' } }, // D: Link FB/IG
              { userEnteredValue: { stringValue: finder } }, // E: Người tìm Data
              { userEnteredValue: { stringValue: tier } }, // F: Nhóm KOC
              { userEnteredValue: { stringValue: style } }, // G: Style Content
              { userEnteredValue: { stringValue: field } }, // H: Lĩnh vực
              { userEnteredValue: { stringValue: location } }, // I: Địa điểm
              { userEnteredValue: { stringValue: contact } }, // J: Thông tin liên hệ
              { userEnteredValue: { stringValue: '' } }, // K: Tiến độ liên hệ
              { userEnteredValue: { stringValue: '' } }, // L: Tặng sản phẩm
              { userEnteredValue: { stringValue: '' } }, // M: Cast
              { userEnteredValue: { stringValue: '' } }, // N: Tình trạng booking
              { userEnteredValue: { stringValue: note } }, // O: Note đánh giá
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
    range: "'Data KOC Saga đi tiệc'!A13:O13",
  });

  console.log('Verified row 13 data:', verifyRes.data.values);
}

writeKocRow13().catch(console.error);
