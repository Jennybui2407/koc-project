import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

const spreadsheetId = '19Ph78uUjJ7LuOSLFEJCWGW_DKXV3XMzsdmRaN0_fvv8';
const sheetId = 0; // Trang tính1

const kocs = [
  // 1. Macro (> 300K - 1M)
  {
    name: 'Cô Em Trendy (Khánh Linh)',
    tiktok: 'https://www.tiktok.com/@coemtrendy',
    social: 'https://www.instagram.com/klinhnd',
    tier: 'Macro',
    style: 'GRWM, Sang chảnh/Thanh lịch, Đi tiệc',
    category: 'Thời trang',
    location: 'Hà Nội',
    contact: 'coemtrendy.booking@gmail.com'
  },
  {
    name: 'Thảo Nhi Lê',
    tiktok: 'https://www.tiktok.com/@thaonhile',
    social: 'https://www.instagram.com/thaonhile',
    tier: 'Macro',
    style: 'GRWM, Đi tiệc, Tự tin & Cá tính',
    category: 'Thời trang',
    location: 'Sài Gòn',
    contact: 'booking.thaonhile@gmail.com'
  },
  {
    name: 'Tú Hảo',
    tiktok: 'https://www.tiktok.com/@tuhao_official',
    social: 'https://www.instagram.com/tu_hao_',
    tier: 'Macro',
    style: 'Phối đồ, Sang chảnh, Cá tính',
    category: 'Thời trang',
    location: 'Sài Gòn',
    contact: 'tuhao.work@gmail.com'
  },
  {
    name: 'Chloe Nguyễn',
    tiktok: 'https://www.tiktok.com/@chloenguyen',
    social: 'https://www.instagram.com/bychloenguyen',
    tier: 'Macro',
    style: 'GRWM, Sang chảnh, Đi tiệc',
    category: 'Beauty & Skincare',
    location: 'Sài Gòn',
    contact: 'chloenguyen.work@gmail.com'
  },
  {
    name: 'Gia Thị Nhi',
    tiktok: 'https://www.tiktok.com/@giathinhii',
    social: 'https://www.instagram.com/giathinhii',
    tier: 'Macro',
    style: 'Phối đồ, POV, Sang chảnh/Thanh lịch',
    category: 'Thời trang',
    location: 'Sài Gòn',
    contact: 'giathinhiofficial@gmail.com'
  },
  {
    name: 'Diệp Lê',
    tiktok: 'https://www.tiktok.com/@diep.lez',
    social: 'https://www.instagram.com/dieple.official',
    tier: 'Macro',
    style: 'Lifestyle, Daily Vlog, Skincare',
    category: 'Beauty & Skincare',
    location: 'Sài Gòn',
    contact: 'booking.dieple@gmail.com'
  },
  {
    name: 'Hannah Olala',
    tiktok: 'https://www.tiktok.com/@hannaholala',
    social: 'https://www.instagram.com/hannaholala',
    tier: 'Macro',
    style: 'Thanh lịch, Sang chảnh, Review',
    category: 'Beauty & Skincare',
    location: 'Sài Gòn',
    contact: 'hannaholala.booking@gmail.com'
  },
  {
    name: 'Ty Lê',
    tiktok: 'https://www.tiktok.com/@tyle1994',
    social: 'https://www.instagram.com/tyle1994',
    tier: 'Macro',
    style: 'Biến hình, Makeup đi tiệc, Tự tin',
    category: 'Beauty & Skincare',
    location: 'Sài Gòn',
    contact: 'tyle1994.booking@gmail.com'
  },
  {
    name: 'Thạch Trang',
    tiktok: 'https://www.tiktok.com/@thachtrang',
    social: 'https://www.instagram.com/thachtrang',
    tier: 'Macro',
    style: 'Daily Vlog, Thanh lịch, Vintage OOTD',
    category: 'Lifestyle',
    location: 'Hà Nội',
    contact: 'thachtrang.contact@gmail.com'
  },
  {
    name: 'Bạch Ngọc Anh Thư (BNAT)',
    tiktok: 'https://www.tiktok.com/@bnat.04',
    social: 'https://www.instagram.com/bnat_04',
    tier: 'Macro',
    style: 'GRWM, Phối đồ đi tiệc, Năng động',
    category: 'Thời trang',
    location: 'Sài Gòn',
    contact: 'bnat04.booking@gmail.com'
  },

  // 2. Micro (30K - 300K)
  {
    name: 'Linh Sim',
    tiktok: 'https://www.tiktok.com/@pwh_linh',
    social: 'https://www.instagram.com/pwh_linh',
    tier: 'Micro',
    style: 'GRWM, Phối đồ đi tiệc, Trẻ trung',
    category: 'Thời trang',
    location: 'Sài Gòn',
    contact: 'linhsim.contact@gmail.com'
  },
  {
    name: 'Tikka Hoàng Hiền',
    tiktok: 'https://www.tiktok.com/@tikkahoanghien',
    social: 'https://www.instagram.com/tikkahoanghien',
    tier: 'Micro',
    style: 'Phối đồ, Cá tính, Tự tin',
    category: 'Thời trang',
    location: 'Hà Nội',
    contact: 'tikkahoanghien.work@gmail.com'
  },
  {
    name: 'Nguyễn Hương Liên',
    tiktok: 'https://www.tiktok.com/@lienhuong212',
    social: 'https://www.instagram.com/lienhuong212',
    tier: 'Micro',
    style: 'GRWM, Nữ tính, Thanh lịch/Đi tiệc',
    category: 'Thời trang',
    location: 'Hà Nội',
    contact: 'lienhuong212.booking@gmail.com'
  },
  {
    name: 'Pu Mét 7',
    tiktok: 'https://www.tiktok.com/@pumet7',
    social: 'https://www.instagram.com/pumet7',
    tier: 'Micro',
    style: 'Phối đồ, Hack dáng, Hài hước nhẹ nhàng',
    category: 'Thời trang',
    location: 'Sài Gòn',
    contact: 'pumet7.booking@gmail.com'
  },
  {
    name: 'Mei Mei (Mei Triệu)',
    tiktok: 'https://www.tiktok.com/@meitrieu',
    social: 'https://www.instagram.com/meitrieu',
    tier: 'Micro',
    style: 'GRWM, Sang chảnh, Makeup & Outfit tiệc',
    category: 'Thời trang',
    location: 'Hà Nội',
    contact: 'meitrieu.work@gmail.com'
  },
  {
    name: 'Miha Chan',
    tiktok: 'https://www.tiktok.com/@mihachan',
    social: 'https://www.instagram.com/mihachan',
    tier: 'Micro',
    style: 'GRWM, OOTD Đi tiệc, Tự tin',
    category: 'Thời trang',
    location: 'Sài Gòn',
    contact: 'mihachan.booking@gmail.com'
  },
  {
    name: 'Quỳnh Nhi Trần',
    tiktok: 'https://www.tiktok.com/@quynhnhitraan',
    social: 'https://www.instagram.com/quynhnhitraan',
    tier: 'Micro',
    style: 'GRWM, Makeup hacks, Đi tiệc',
    category: 'Beauty & Skincare',
    location: 'Sài Gòn',
    contact: 'quynhnhitraan.work@gmail.com'
  },
  {
    name: 'An Phương (Letsplaymakeup)',
    tiktok: 'https://www.tiktok.com/@letsplaymakeup',
    social: 'https://www.instagram.com/letsplaymakeup',
    tier: 'Micro',
    style: 'Daily Vlog, Lifestyle, Năng lượng tích cực',
    category: 'Beauty & Skincare',
    location: 'Sài Gòn',
    contact: 'letsplaymakeup.work@gmail.com'
  },
  {
    name: 'Mai Vân Trang',
    tiktok: 'https://www.tiktok.com/@maivantrang',
    social: 'https://www.instagram.com/maivantrang',
    tier: 'Micro',
    style: 'Skincare khoa học, Thanh lịch',
    category: 'Beauty & Skincare',
    location: 'Hà Nội',
    contact: 'maivantrang.booking@gmail.com'
  },
  {
    name: 'Phương Oanh Daily',
    tiktok: 'https://www.tiktok.com/@phuongoanh.daily',
    social: 'https://www.instagram.com/phuongoanhdaily',
    tier: 'Micro',
    style: 'Daily Vlog, Lifestyle, Review',
    category: 'Lifestyle',
    location: 'Hà Nội',
    contact: 'phuongoanh.contact@gmail.com'
  },
  {
    name: 'Trương Thiên Như',
    tiktok: 'https://www.tiktok.com/@truongthiennhu',
    social: 'https://www.instagram.com/truongthiennhu',
    tier: 'Micro',
    style: 'GRWM đi tiệc, Sang chảnh/Thanh lịch',
    category: 'Thời trang',
    location: 'Sài Gòn',
    contact: 'truongthiennhu.contact@gmail.com'
  },
  {
    name: 'Phi Vĩ',
    tiktok: 'https://www.tiktok.com/@teddy2606',
    social: 'https://www.instagram.com/phivi2606',
    tier: 'Micro',
    style: 'Phối đồ, Lịch lãm, Đi tiệc/Sự kiện',
    category: 'Thời trang',
    location: 'Sài Gòn',
    contact: 'teddy2606.booking@gmail.com'
  },
  {
    name: 'DucNT',
    tiktok: 'https://www.tiktok.com/@ducnt02',
    social: 'https://www.instagram.com/ducnt02',
    tier: 'Micro',
    style: 'GRWM, Phối đồ cá tính, Tự tin',
    category: 'Thời trang',
    location: 'Hà Nội',
    contact: 'ducnt02.work@gmail.com'
  },

  // 3. Nano / Review/Aff (10K - 30K)
  {
    name: 'Bùi Công Nam Makeup',
    tiktok: 'https://www.tiktok.com/@buicongnam0308',
    social: 'https://www.instagram.com/buicongnam_mua',
    tier: 'Review/Aff',
    style: 'Makeup đi tiệc, Tips trang điểm, Thanh lịch',
    category: 'Beauty & Skincare',
    location: 'Sài Gòn',
    contact: 'buicongnam0308@gmail.com'
  },
  {
    name: 'Ly Thích Skincare',
    tiktok: 'https://www.tiktok.com/@lythichskincare',
    social: 'https://www.instagram.com/lythichskincare',
    tier: 'Review/Aff',
    style: 'Review Skincare, Daily Routine, Chân thật',
    category: 'Beauty & Skincare',
    location: 'Hà Nội',
    contact: 'lythichskincare@gmail.com'
  },
  {
    name: 'Thanh Phương Lê',
    tiktok: 'https://www.tiktok.com/@thanhphuonglede',
    social: 'https://www.instagram.com/thanhphuongle',
    tier: 'Review/Aff',
    style: 'Skincare khoa học, Review chi tiết',
    category: 'Beauty & Skincare',
    location: 'Sài Gòn',
    contact: 'thanhphuonglede@gmail.com'
  },
  {
    name: 'Nguyễn Trương Nhật Kỳ',
    tiktok: 'https://www.tiktok.com/@nhatky.story',
    social: 'https://www.instagram.com/nhatky.story',
    tier: 'Review/Aff',
    style: 'Lifestyle, Daily Vlog, GRWM',
    category: 'Lifestyle',
    location: 'Sài Gòn',
    contact: 'nhatky.story@gmail.com'
  },
  {
    name: 'Lê Minh Trường',
    tiktok: 'https://www.tiktok.com/@leminhtruong.___',
    social: 'https://www.instagram.com/leminhtruong.___',
    tier: 'Review/Aff',
    style: 'Review OOTD, Phối đồ nhẹ nhàng, Đi chơi',
    category: 'Thời trang',
    location: 'Hà Nội',
    contact: 'leminhtruong.contact@gmail.com'
  },
  {
    name: 'Kien Pham',
    tiktok: 'https://www.tiktok.com/@kienpham_tk.p',
    social: 'https://www.instagram.com/kienpham_tk.p',
    tier: 'Review/Aff',
    style: 'Streetwear & Outfit tiệc, Cá tính',
    category: 'Thời trang',
    location: 'Sài Gòn',
    contact: 'kienpham.work@gmail.com'
  },
  {
    name: 'Lê Quốc Khánh (Sartorial)',
    tiktok: 'https://www.tiktok.com/@khanh.sartorial',
    social: 'https://www.instagram.com/khanh.sartorial',
    tier: 'Review/Aff',
    style: 'Sartorial đi tiệc, Lịch lãm, Tự tin',
    category: 'Thời trang',
    location: 'Hà Nội',
    contact: 'khanhsartorial@gmail.com'
  }
];

async function run() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });

  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const dateStr = `${day}/${month}/${year}`;

  const rowValues = kocs.map((k, idx) => [
    idx + 1, // STT
    dateStr, // Ngày tìm
    `=HYPERLINK("${k.tiktok}", "${k.name}")`, // Tên (Gắn link TikTok)
    k.social, // Link FB/IG
    'Thuận', // Người tìm Data
    k.tier, // Nhóm KOC
    k.style, // Style Content
    k.category, // Lĩnh vực
    k.location, // Địa điểm
    k.contact, // Thông tin liên hệ
    'Chưa liên hệ', // Tiến độ liên hệ
    '', // Tặng sản phẩm
    '', // Cast (nếu có)
    ''  // Tình trạng booking
  ]);

  console.log(`Writing ${rowValues.length} rows to spreadsheet ${spreadsheetId}...`);

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'Trang tính1!A2:N31',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: rowValues
    }
  });

  console.log('Values inserted successfully.');

  // Format formatting requests
  const formatRequests = [
    {
      repeatCell: {
        range: {
          sheetId,
          startRowIndex: 1,
          endRowIndex: 31,
          startColumnIndex: 0,
          endColumnIndex: 14
        },
        cell: {
          userEnteredFormat: {
            textFormat: {
              fontFamily: 'Nunito',
              fontSize: 10
            },
            wrapStrategy: 'WRAP',
            verticalAlignment: 'MIDDLE'
          }
        },
        fields: 'userEnteredFormat(textFormat,wrapStrategy,verticalAlignment)'
      }
    },
    // Center alignment: STT (0), Ngày tìm (1), Người tìm (4), Nhóm (5), Địa điểm (8), Tiến độ (10)
    ...[0, 1, 4, 5, 8, 10].map(colIdx => ({
      repeatCell: {
        range: {
          sheetId,
          startRowIndex: 1,
          endRowIndex: 31,
          startColumnIndex: colIdx,
          endColumnIndex: colIdx + 1
        },
        cell: {
          userEnteredFormat: {
            horizontalAlignment: 'CENTER'
          }
        },
        fields: 'userEnteredFormat.horizontalAlignment'
      }
    })),
    // Left alignment: Tên (2), Link FB/IG (3), Style (6), Lĩnh vực (7), Thông tin liên hệ (9)
    ...[2, 3, 6, 7, 9].map(colIdx => ({
      repeatCell: {
        range: {
          sheetId,
          startRowIndex: 1,
          endRowIndex: 31,
          startColumnIndex: colIdx,
          endColumnIndex: colIdx + 1
        },
        cell: {
          userEnteredFormat: {
            horizontalAlignment: 'LEFT'
          }
        },
        fields: 'userEnteredFormat.horizontalAlignment'
      }
    }))
  ];

  console.log('Applying cell formatting...');
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: formatRequests
    }
  });

  console.log('Formatting completed!');
}

run().catch(err => {
  console.error('Error running script:', err);
  process.exit(1);
});
