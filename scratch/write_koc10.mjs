import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

async function writeKocRow10() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';
  const sheetTitle = 'Data KOC Saga đi tiệc';
  const sheetId = 1065796303;

  const kocName = 'Diem Quynh Nguyen';
  const tiktokUrl = 'https://www.tiktok.com/@diqueengdaily';
  const igUrl = 'https://www.instagram.com/Diqueeng/';
  const dateStr = '27/10/2026';
  const finder = 'Thuận';
  const tier = 'Review/Aff';
  const style = 'Review';
  const field = 'Thời trang/Làm đẹp';
  const location = 'Hà Nội';
  const contact = 'IG: Diqueeng (linkbio.co/Diqueengdaily)';
  const note = 'Tier Nano (18.4K follow). 4 video 7 ngày (loại 3 video ghim 1.2M-1.7M): 3.6K, 8.8K, 8.0K, 7.8K -> Avg View 7 ngày: ~7.1K.';

  const requests = [
    {
      updateCells: {
        range: {
          sheetId: sheetId,
          startRowIndex: 9, // Row 10 (0-indexed: 9)
          endRowIndex: 10,
          startColumnIndex: 0,
          endColumnIndex: 15,
        },
        rows: [
          {
            values: [
              { userEnteredValue: { stringValue: '3' } }, // A: STT
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
              { userEnteredValue: { stringValue: igUrl } }, // D: Link FB/IG
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
    range: "'Data KOC Saga đi tiệc'!A10:O10",
  });

  console.log('Verified row 10 data:', verifyRes.data.values);
}

writeKocRow10().catch(console.error);
