import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

async function writeKocRow11() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';
  const sheetTitle = 'Data KOC Saga đi tiệc';
  const sheetId = 1065796303;

  const kocName = 'Hạnh Xuka';
  const tiktokUrl = 'https://www.tiktok.com/@hanhxuka2804';
  const fbUrl = 'https://www.facebook.com/profile.php?id=100095205667899';
  const dateStr = '27/10/2026';
  const finder = 'Thuận';
  const tier = 'Macro';
  const style = 'Daily Vlog/Life Style';
  const field = 'Gia đình/Nhà cửa đời sống';
  const location = 'Hà Nội';
  const contact = 'Zalo Trợ lý: 0983069699 (IG: hanhxuka.love)';
  const note = 'Macro (639.2K follow). Bỏ qua 3 video ghim (5.2M-7.6M). Avg View 6 video mới nhất không ghim: ~465K (869.6K, 498.5K, 910.8K, 258.9K, 130.3K, 122.1K). (Sheet cũ từng note Không OK tặng quà).';

  const requests = [
    {
      updateCells: {
        range: {
          sheetId: sheetId,
          startRowIndex: 10, // Row 11 (0-indexed: 10)
          endRowIndex: 11,
          startColumnIndex: 0,
          endColumnIndex: 15,
        },
        rows: [
          {
            values: [
              { userEnteredValue: { stringValue: '4' } }, // A: STT
              { userEnteredValue: { stringValue: dateStr } }, // B: Ngày tìm
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
              }, // C: Tên (Gắn link TikTok)
              { userEnteredValue: { stringValue: fbUrl } }, // D: Link FB/IG
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
    range: "'Data KOC Saga đi tiệc'!A11:O11",
  });

  console.log('Verified row 11 data:', verifyRes.data.values);
}

writeKocRow11().catch(console.error);
