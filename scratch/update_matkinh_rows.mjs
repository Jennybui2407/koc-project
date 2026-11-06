import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';
const sheetTitle = 'Data KOL/KOC Mắt kính';

async function main() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });

  // 1. Update row 2679: Cột J = "Sài Gòn"
  // 2. Update row 2686: Cột L = "Inbox trực tiếp qua Fanpage tích xanh / Quản lý"
  // 3. Update row 2687: Cột K = "https://www.facebook.com/huavivan", Cột L = "Inbox trực tiếp qua Fanpage / FB tích xanh"
  // 4. Update row 2688: Cột K = "https://www.facebook.com/caominhdat220475/", Cột L = "Liên hệ qua FB cá nhân / Vợ (Trúc Trương)", Cột M = "Trùng hàng 2676 (Thanh Hà đã nhắn FB)"
  // 5. Update row 2689: Cột K = "https://www.facebook.com/truongminhquocthai", Cột L = "Inbox trực tiếp qua FB cá nhân"
  // 6. Update row 2690: Cột K = "https://www.facebook.com/phamgiachibao", Cột L = "Liên hệ qua FB cá nhân / Bà xã Lý Thùy Chang"

  const updates = [
    {
      range: `'${sheetTitle}'!J2679`,
      values: [['Sài Gòn']]
    },
    {
      range: `'${sheetTitle}'!L2686`,
      values: [['Inbox trực tiếp qua Fanpage tích xanh / Quản lý']]
    },
    {
      range: `'${sheetTitle}'!K2687:L2687`,
      values: [['https://www.facebook.com/huavivan', 'Inbox trực tiếp qua FB cá nhân tích xanh']]
    },
    {
      range: `'${sheetTitle}'!K2688:M2688`,
      values: [['https://www.facebook.com/caominhdat220475/', 'Liên hệ qua FB cá nhân / Vợ (Trúc Trương)', 'Trùng hàng 2676 (Thanh Hà đã nhắn FB)']]
    },
    {
      range: `'${sheetTitle}'!K2689:L2689`,
      values: [['https://www.facebook.com/truongminhquocthai', 'Inbox trực tiếp qua FB cá nhân']]
    },
    {
      range: `'${sheetTitle}'!K2690:L2690`,
      values: [['https://www.facebook.com/phamgiachibao', 'Liên hệ qua FB cá nhân / Bà xã Lý Thùy Chang']]
    }
  ];

  for (const u of updates) {
    const res = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: u.range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: u.values
      }
    });
    console.log(`Updated ${u.range}: ${res.statusText}`);
  }

  console.log('All updates complete!');
}

main().catch(console.error);

