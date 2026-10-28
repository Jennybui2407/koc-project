import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

async function writeKocBatch() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';
  const sheetTitle = 'Data KOC Saga đi tiệc';
  const sheetId = 1065796303;

  const rowsData = [
    {
      stt: '17',
      date: '27/10/2026',
      name: 'Nguyễn Cao Minh Anh',
      link: 'https://www.facebook.com/nguyen.cao.minh.anh.216882',
      ig: 'https://www.instagram.com/ngcaominhanh/',
      finder: 'Thuận',
      tier: 'Review/Aff',
      style: 'Daily Vlog/Life Style',
      field: 'Nghệ sĩ/Người nổi tiếng',
      location: 'Hà Nội',
      contact: 'nguyencaominhanh30072002@gmail.com (IG: ngcaominhanh)',
      note: 'Tier Nano (26K follow FB). Á hậu 1 Miss International Queen VN 2026, Veterinary Doctor & Model.',
    },
    {
      stt: '18',
      date: '27/10/2026',
      name: 'Diệu Anh',
      link: 'https://www.tiktok.com/@tracyy2512',
      ig: 'https://www.instagram.com/tracyy_____/',
      finder: 'Thuận',
      tier: 'Micro',
      style: 'Daily Vlog/Life Style',
      field: 'Thời trang/Làm đẹp',
      location: 'Hà Nội',
      contact: 'IG: tracyy_____',
      note: 'Tier Micro (178.2K follow). Không có video ghim. 3 video trong 7 ngày (20-23/10): 68K, 30.7K, 109.7K -> Avg View 7 ngày: ~69.5K views. (Sheet cũ từng note: Không để thông tin liên hệ cụ thể).',
    },
    {
      stt: '19',
      date: '27/10/2026',
      name: 'LinhTruong.LD',
      link: 'https://www.tiktok.com/@linhtruong.ld',
      ig: 'https://www.instagram.com/truongdieulinh/',
      finder: 'Thuận',
      tier: 'Macro',
      style: 'Daily Vlog/Life Style',
      field: 'Thời trang/Làm đẹp',
      location: 'Hà Nội',
      contact: 'linhtruongld249@gmail.com (JANE)',
      note: 'Tier Macro (737.5K follow, tích xanh). Hot girl/Model Trương Diệu Linh. Tỉ lệ tương tác đều 5-9% theo KOLSprite.',
    },
  ];

  const rows = rowsData.map(item => ({
    values: [
      { userEnteredValue: { stringValue: item.stt } },
      { userEnteredValue: { stringValue: item.date } },
      {
        userEnteredValue: { stringValue: item.name },
        textFormatRuns: [
          {
            startIndex: 0,
            format: {
              link: { uri: item.link },
              underline: true,
            },
          },
        ],
      },
      { userEnteredValue: { stringValue: item.ig } },
      { userEnteredValue: { stringValue: item.finder } },
      { userEnteredValue: { stringValue: item.tier } },
      { userEnteredValue: { stringValue: item.style } },
      { userEnteredValue: { stringValue: item.field } },
      { userEnteredValue: { stringValue: item.location } },
      { userEnteredValue: { stringValue: item.contact } },
      { userEnteredValue: { stringValue: '' } },
      { userEnteredValue: { stringValue: '' } },
      { userEnteredValue: { stringValue: '' } },
      { userEnteredValue: { stringValue: '' } },
      { userEnteredValue: { stringValue: item.note } },
    ],
  }));

  const requests = [
    {
      updateCells: {
        range: {
          sheetId: sheetId,
          startRowIndex: 23, // Row 24 (0-indexed: 23)
          endRowIndex: 26,   // Up to Row 26 (exclusive: 26)
          startColumnIndex: 0,
          endColumnIndex: 15,
        },
        rows: rows,
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
    range: "'Data KOC Saga đi tiệc'!A24:O26",
  });

  console.log('Verified rows 24-26 data:', JSON.stringify(verifyRes.data.values, null, 2));
}

writeKocBatch().catch(console.error);
