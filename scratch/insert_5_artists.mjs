import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';
const sheetTitle = 'Data KOL/KOC Mắt kính';
const sheetId = 1941783024;

async function main() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });

  const rows = [
    [
      '', // A: ba (STT)
      '30/10/2026', // B: Ngày
      'NSƯT Thành Lộc', // C: Tên
      '', // D: Tên liên hệ
      'Thuận', // E: Người tìm
      'Nam', // F: Giới tính
      'Đo mắt', // G: Dự án
      'Daily Vlog', // H: Style Content
      'Nghệ sĩ', // I: Ngách
      'Sài Gòn', // J: Địa điểm
      'https://www.facebook.com/thanhlockichdoan', // K: Link FB
      'Liên hệ qua Fanpage Kịch đoàn Thành Lộc / Sân khấu Thiên Đăng', // L: Thông tin liên hệ
      '', // M: Tiến độ liên hệ
      '' // N: Tặng sản phẩm
    ],
    [
      '',
      '30/10/2026',
      'Lam Trường',
      '',
      'Thuận',
      'Nam',
      'Đo mắt',
      'Daily Vlog',
      'Nghệ sĩ',
      'Sài Gòn',
      'https://www.facebook.com/lamtruongsinger',
      'Booking: Inbox trực tiếp qua Fanpage tích xanh / Quản lý',
      '',
      ''
    ],
    [
      '',
      '30/10/2026',
      'Diễn viên Trung Dũng',
      '',
      'Thuận',
      'Nam',
      'Đo mắt',
      'Daily Vlog',
      'Nghệ sĩ',
      'Sài Gòn',
      'https://www.facebook.com/trungdung.pham.3910',
      'Inbox trực tiếp qua FB cá nhân',
      '',
      ''
    ],
    [
      '',
      '30/10/2026',
      'Hoàng Bách',
      '',
      'Thuận',
      'Nam',
      'Đo mắt',
      'Daily Vlog',
      'Nghệ sĩ',
      'Sài Gòn',
      'https://www.facebook.com/bach20official',
      'Inbox Fanpage Bach20 Official / FB cá nhân Hoangbachgia',
      '',
      ''
    ],
    [
      '',
      '30/10/2026',
      'Diễn viên Khương Thịnh',
      '',
      'Thuận',
      'Nam',
      'Đo mắt',
      'Daily Vlog',
      'Nghệ sĩ',
      'Sài Gòn',
      'https://www.facebook.com/khuongthinh.actor',
      'Inbox trực tiếp qua FB cá nhân',
      '',
      ''
    ]
  ];

  // Update values
  const updateRes = await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `'${sheetTitle}'!A2691:N2695`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: rows
    }
  });

  console.log('Values updated:', updateRes.data.updatedRange);

  // Copy formatting from row 2677 to rows 2691-2695
  const copyFormatReq = {
    copyPaste: {
      source: {
        sheetId,
        startRowIndex: 2676, // 0-indexed: row 2677
        endRowIndex: 2677,
        startColumnIndex: 0,
        endColumnIndex: 14
      },
      destination: {
        sheetId,
        startRowIndex: 2690, // 0-indexed: row 2691
        endRowIndex: 2695, // row 2695
        startColumnIndex: 0,
        endColumnIndex: 14
      },
      pasteType: 'PASTE_FORMAT'
    }
  };

  const batchRes = await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [copyFormatReq]
    }
  });

  console.log('Format copied successfully!');
}

main().catch(console.error);

