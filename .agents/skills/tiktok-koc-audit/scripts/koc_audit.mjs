import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';
const sheetId = 280295617; // Data KOC (11/2026)
const sheetTitle = 'Data KOC (11/2026)';

async function getSheetsClient() {
  const auth = await getGoogleAuthClient();
  return google.sheets({ version: 'v4', auth });
}

function parseDateDMY(dStr) {
  if (!dStr) return null;
  const parts = dStr.trim().split('/');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }
  return null;
}

// Map Tier to exact dropdown string of Data KOC (11/2026)
export function normalizeTier(tier) {
  const t = (tier || '').toLowerCase();
  if (t.includes('nano') || t.includes('<10k') || t.includes('aff') || t.includes('1k - 10k') || t.includes('1k-10k')) return 'Nano (1K - 10K followers)';
  if (t.includes('mega') || t.includes('>1m') || t.includes('trên 1 triệu')) return 'Mega (Trên 1 TRIỆU followers)';
  if (t.includes('macro') || t.includes('>300k') || t.includes('300k đến 1')) return 'Macro (300K đến 1 TRIỆU followers)';
  if (t.includes('micro') || t.includes('30k') || t.includes('10k')) return 'Micro (10K đến 300K followers)';
  return 'Micro (10K đến 300K followers)';
}

// Map Field to exact dropdown string of Data KOC (11/2026)
export function normalizeField(field) {
  const f = (field || '').toLowerCase();
  if (f.includes('thời trang') || f.includes('làm đẹp') || f.includes('beauty') || f.includes('fashion')) return 'Thời trang/ Làm đẹp';
  if (f.includes('nghệ sĩ') || f.includes('nổi tiếng') || f.includes('celeb')) return 'Nghệ sĩ/ Người nổi tiếng';
  if (f.includes('gia đình') || f.includes('nhà cửa') || f.includes('đời sống')) return 'Gia đình/ Nhà cửa đời sống';
  if (f.includes('nhà hàng') || f.includes('ăn uống') || f.includes('ẩm thực') || f.includes('food')) return 'Nhà hàng/ Ăn uống';
  if (f.includes('tài chính') || f.includes('cổ phiếu') || f.includes('bất động sản')) return 'Tài chính/ Cổ phiếu/ Bất động sản';
  if (f.includes('tiếp viên')) return 'Tiếp viên hàng không';
  if (f.includes('xa xỉ') || f.includes('luxury')) return 'Hàng xa xỉ';
  if (f.includes('công nghệ') || f.includes('tech')) return 'Công nghệ';
  if (f.includes('sức khỏe') || f.includes('fitness')) return 'Sức khỏe, Fitness';
  if (f.includes('mc') || f.includes('diễn viên') || f.includes('ca sĩ')) return 'MC/Diễn viên/Ca sĩ';
  if (f.includes('couple')) return 'Couple';
  if (f.includes('model') || f.includes('người mẫu')) return 'Model';
  if (f.includes('kinh doanh')) return 'Kinh doanh';
  return 'Thời trang/ Làm đẹp';
}

// Map Style to exact dropdown string of Data KOC (11/2026)
export function normalizeStyle(style) {
  const s = (style || '').toLowerCase();
  if (s.includes('review') || s.includes('trải nghiệm')) return 'Review';
  if (s.includes('học thuật')) return 'Học thuật';
  if (s.includes('tips') || s.includes('trick')) return 'Tips and tricks';
  if (s.includes('couple')) return 'Couple';
  return 'Daily Vlog/ Life Style';
}

// Clean channel name: Chỉ lấy Tên hiển thị TikTok, bỏ phần ID nhỏ kế bên (ví dụ "Phi Yen Pham | imneyy" -> "Phi Yen Pham")
export function cleanChannelName(rawName) {
  if (!rawName) return 'không có';
  let name = rawName.trim();
  // Nếu có dấu phân cách | hoặc • kèm username phía sau thì tách bỏ
  if (name.includes('|')) {
    name = name.split('|')[0].trim();
  } else if (name.includes('•')) {
    name = name.split('•')[0].trim();
  }
  return name || 'không có';
}

export async function checkDuplicate(query) {
  const sheets = await getSheetsClient();
  const res = await sheets.spreadsheets.get({
    spreadsheetId,
    ranges: [`'${sheetTitle}'!A2:Q500`],
    includeGridData: true,
  });
  const rowData = res.data.sheets?.[0]?.data?.[0]?.rowData || [];
  const q = query.toLowerCase().trim().replace(/^@/, '');
  
  const today = new Date();
  const matchesCurrent = [];

  rowData.forEach((row, idx) => {
    const cells = row.values || [];
    let rowText = '';
    const simpleRow = [];
    cells.forEach(c => {
      const val = c.formattedValue || '';
      simpleRow.push(val);
      rowText += ' ' + val;
      if (c.hyperlink) rowText += ' ' + c.hyperlink;
      if (c.userEnteredFormat?.textFormat?.link?.uri) rowText += ' ' + c.userEnteredFormat.textFormat.link.uri;
      if (c.textFormatRuns) {
        c.textFormatRuns.forEach(run => {
          if (run.format?.link?.uri) rowText += ' ' + run.format.link.uri;
        });
      }
    });

    if (rowText.toLowerCase().includes(q)) {
      const dateStr = simpleRow[2] || '';
      const rowDate = parseDateDMY(dateStr);
      let diffDays = null;
      let isBlocked = false;
      let isAllowedReAdd = false;

      if (rowDate && !isNaN(rowDate.getTime())) {
        diffDays = Math.round((today - rowDate) / (1000 * 60 * 60 * 24));
        if (diffDays <= 31) {
          isBlocked = true; // <= 1 tháng: không điền
        } else if (diffDays >= 60) {
          isAllowedReAdd = true; // >= 2 tháng: cho phép điền lại
        }
      } else {
        isBlocked = true;
      }

      matchesCurrent.push({
        rowNumber: idx + 2,
        stt: simpleRow[0] || '',
        finder: simpleRow[1] || '',
        date: dateStr,
        channelName: simpleRow[4] || '',
        name: simpleRow[5] || '',
        tier: simpleRow[6] || '',
        field: simpleRow[7] || '',
        style: simpleRow[8] || '',
        tiktokUrl: simpleRow[10] || '',
        contact: simpleRow[14] || '',
        brand: simpleRow[15] || '',
        project: simpleRow[16] || '',
        diffDays,
        isBlocked,
        isAllowedReAdd,
        row: simpleRow,
      });
    }
  });

  return {
    totalRows: rowData.length,
    matchesCurrent,
  };
}

export async function insertKoc(data) {
  const sheets = await getSheetsClient();
  
  // 1. Tìm vị trí hàng trống để điền:
  // Quét Col B:E từ Hàng 2 đến Hàng 100 để tìm hàng đầu tiên có dữ liệu (tránh ghi đè hàng người khác đã điền tên/ngày)
  const scanRes = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `'${sheetTitle}'!B2:E100`,
  });
  const scanRows = scanRes.data.values || [];
  let firstRowWithData = -1; // 1-based row number
  for (let i = 0; i < scanRows.length; i++) {
    const row = scanRows[i] || [];
    const colB = row[0] ? String(row[0]).trim() : '';
    const colC = row[1] ? String(row[1]).trim() : '';
    const colE = row[3] ? String(row[3]).trim() : '';
    if (colB !== '' || colC !== '' || colE !== '') {
      firstRowWithData = i + 2; // ví dụ i=5 -> Hàng 7
      break;
    }
  }

  const requests = [];
  let targetRowNumber;

  if (firstRowWithData > 2) {
    // Có hàng trống ở trên dữ liệu cũ -> Điền lùi từ dưới lên trên (18, 17, 16... đến 2)
    targetRowNumber = firstRowWithData - 1;
  } else if (firstRowWithData === 2) {
    // Không còn hàng trống (Hàng 2 đã có data) -> Tạo thêm 1 hàng mới ngay tại Hàng 2 (dưới Header)
    targetRowNumber = 2;
    requests.push({
      insertDimension: {
        range: {
          sheetId: sheetId,
          dimension: 'ROWS',
          startIndex: 1,
          endIndex: 2,
        },
        inheritFromBefore: false,
      },
    });
  } else {
    // Sheet hoàn toàn trống từ Hàng 2 trở đi -> Điền vào Hàng 2
    targetRowNumber = 2;
  }

  const targetRowIndex = targetRowNumber - 1; // 0-indexed row

  // Đảm bảo chiều cao hàng cố định 32px
  requests.push({
    updateDimensionProperties: {
      range: {
        sheetId: sheetId,
        dimension: 'ROWS',
        startIndex: targetRowIndex,
        endIndex: targetRowIndex + 1,
      },
      properties: {
        pixelSize: 32,
      },
      fields: 'pixelSize',
    },
  });

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const dateStr = data.date || `${day}/${month}/${year}`;

  const validLocations = [
    'Hà Nội', 'Sài Gòn', 'Bình Dương', 'Đắk Lắk', 'Phú Thọ', 'Bến Tre',
    'Cần Thơ', 'Đà Nẵng', 'Hải Phòng', 'Quảng Nam', 'BMT', 'Vinh',
    'Thái Bình', 'Đà Lạt', 'Đồng Tháp', 'Huế', 'Nha Trang'
  ];

  let normalizedLocation = '';
  if (data.location) {
    const loc = data.location.trim();
    if (/hcm|hồ chí minh|sài gòn/i.test(loc)) {
      normalizedLocation = 'Sài Gòn';
    } else if (/hà nội|hn/i.test(loc)) {
      normalizedLocation = 'Hà Nội';
    } else {
      const match = validLocations.find(vl => vl.toLowerCase() === loc.toLowerCase());
      if (match) {
        normalizedLocation = match;
      }
    }
  }

  // Format chuẩn theo Hàng 2 & 3: Font Nunito 9pt
  const cellFmt = (align = 'CENTER', wrap = 'WRAP') => ({
    horizontalAlignment: align,
    verticalAlignment: 'MIDDLE',
    wrapStrategy: wrap,
    textFormat: { fontFamily: 'Nunito', fontSize: 9 },
  });

  const fbUrl = data.facebookUrl && data.facebookUrl.trim() !== '' ? data.facebookUrl.trim() : 'không có';
  const igUrl = data.instagramUrl && data.instagramUrl.trim() !== '' ? data.instagramUrl.trim() : 'không có';
  const ytUrl = data.youtubeUrl && data.youtubeUrl.trim() !== '' ? data.youtubeUrl.trim() : 'không có';
  const realName = data.realName && data.realName.trim() !== '' ? data.realName.trim() : (data.stageName && data.stageName.trim() !== '' ? data.stageName.trim() : 'không có');
  const contact = data.contact && data.contact.trim() !== '' ? data.contact.trim() : 'không có';

  // 1. Cụm Cột B và C: Người phụ trách & Ngày tìm (Tuyệt đối không đụng Cột A - STT Auto)
  const colsBC = [
    // Col B: Người phụ trách
    {
      userEnteredValue: { stringValue: data.finder || process.env.KOC_FINDER_NAME || 'Thuận' },
      userEnteredFormat: cellFmt('CENTER', 'OVERFLOW_CELL'),
    },
    // Col C: Ngày tìm
    {
      userEnteredValue: { stringValue: dateStr },
      userEnteredFormat: cellFmt('CENTER', 'OVERFLOW_CELL'),
    },
  ];

  // 2. Cụm Cột E đến Q: Thông tin KOC (Tuyệt đối không đụng Cột D - Liên hệ lần thứ Auto, và Cột X, Z, AA)
  const colsEQ = [
    // Col E: Tên kênh (Chỉ lấy tên hiển thị TikTok, KHÔNG kèm ID nhỏ như | @username, font Nunito 9pt, text thuần)
    {
      userEnteredValue: { stringValue: cleanChannelName(data.channelName || data.name) },
      userEnteredFormat: cellFmt('LEFT', 'WRAP'),
    },
    // Col F: Tên KOC / Nghệ danh (nếu không có thì ghi "không có")
    {
      userEnteredValue: { stringValue: realName },
      userEnteredFormat: cellFmt('LEFT', 'OVERFLOW_CELL'),
    },
    // Col G: Tệp / nhóm KOC (Chuỗi dropdown chuẩn)
    {
      userEnteredValue: { stringValue: normalizeTier(data.tier) },
      userEnteredFormat: cellFmt('CENTER', 'WRAP'),
    },
    // Col H: Ngành / lĩnh vực (Chuỗi dropdown chuẩn có dấu cách)
    {
      userEnteredValue: { stringValue: normalizeField(data.field) },
      userEnteredFormat: cellFmt('CENTER', 'WRAP'),
    },
    // Col I: Style Content (Chuỗi dropdown chuẩn)
    {
      userEnteredValue: { stringValue: normalizeStyle(data.style) },
      userEnteredFormat: cellFmt('CENTER', 'WRAP'),
    },
    // Col J: Khu vực (nếu không rõ khu vực thì để trống "")
    {
      userEnteredValue: { stringValue: normalizedLocation },
      userEnteredFormat: cellFmt('CENTER', 'WRAP'),
    },
    // Col K: Kênh TikTok (Link TikTok)
    {
      userEnteredValue: { stringValue: data.tiktokUrl || 'không có' },
      userEnteredFormat: {
        ...cellFmt('LEFT', 'CLIP'),
        textFormat: {
          fontFamily: 'Nunito',
          fontSize: 9,
          link: data.tiktokUrl && data.tiktokUrl.startsWith('http') ? { uri: data.tiktokUrl } : undefined,
          underline: !!(data.tiktokUrl && data.tiktokUrl.startsWith('http')),
        },
      },
    },
    // Col L: Link Facebook (nếu không có ghi "không có")
    {
      userEnteredValue: { stringValue: fbUrl },
      userEnteredFormat: {
        ...cellFmt('LEFT', 'CLIP'),
        textFormat: {
          fontFamily: 'Nunito',
          fontSize: 9,
          link: fbUrl.startsWith('http') ? { uri: fbUrl } : undefined,
          underline: fbUrl.startsWith('http'),
        },
      },
    },
    // Col M: Kênh Instagram (nếu không có ghi "không có")
    {
      userEnteredValue: { stringValue: igUrl },
      userEnteredFormat: {
        ...cellFmt('LEFT', 'CLIP'),
        textFormat: {
          fontFamily: 'Nunito',
          fontSize: 9,
          link: igUrl.startsWith('http') ? { uri: igUrl } : undefined,
          underline: igUrl.startsWith('http'),
        },
      },
    },
    // Col N: Kênh Youtube (nếu không có ghi "không có")
    {
      userEnteredValue: { stringValue: ytUrl },
      userEnteredFormat: {
        ...cellFmt('LEFT', 'CLIP'),
        textFormat: {
          fontFamily: 'Nunito',
          fontSize: 9,
          link: ytUrl.startsWith('http') ? { uri: ytUrl } : undefined,
          underline: ytUrl.startsWith('http'),
        },
      },
    },
    // Col O: Contact (nếu không có ghi "không có")
    {
      userEnteredValue: { stringValue: contact },
      userEnteredFormat: cellFmt('CENTER', 'WRAP'),
    },
    // Col P: Thương hiệu hợp tác
    {
      userEnteredValue: { stringValue: data.brand || 'Saga' },
      userEnteredFormat: cellFmt('CENTER', 'OVERFLOW_CELL'),
    },
    // Col Q: Dự án đã liên hệ
    {
      userEnteredValue: { stringValue: data.project || 'Saga đi tiệc' },
      userEnteredFormat: cellFmt('CENTER', 'WRAP'),
    },
  ];

  // Cập nhật Cột B:C
  requests.push({
    updateCells: {
      range: {
        sheetId: sheetId,
        startRowIndex: targetRowIndex,
        endRowIndex: targetRowIndex + 1,
        startColumnIndex: 1,
        endColumnIndex: 3,
      },
      rows: [{ values: colsBC }],
      fields: 'userEnteredValue,userEnteredFormat',
    },
  });

  // Cập nhật Cột E:Q
  requests.push({
    updateCells: {
      range: {
        sheetId: sheetId,
        startRowIndex: targetRowIndex,
        endRowIndex: targetRowIndex + 1,
        startColumnIndex: 4,
        endColumnIndex: 17,
      },
      rows: [{ values: colsEQ }],
      fields: 'userEnteredValue,userEnteredFormat',
    },
  });

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: { requests },
  });

  return {
    success: true,
    rowNumber: targetRowNumber,
    dateStr,
    channelName: data.channelName || data.name,
    sheetUrl: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit?gid=${sheetId}#gid=${sheetId}&range=A${targetRowNumber}:Q${targetRowNumber}`,
  };
}

export async function deleteRow(rowNumber) {
  const sheets = await getSheetsClient();
  const rowIndex = rowNumber - 1;
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [
        {
          deleteDimension: {
            range: {
              sheetId: sheetId,
              dimension: 'ROWS',
              startIndex: rowIndex,
              endIndex: rowIndex + 1,
            },
          },
        },
      ],
    },
  });
  return { success: true, deletedRow: rowNumber };
}

export async function getRows(range) {
  const sheets = await getSheetsClient();
  const res = await sheets.spreadsheets.get({
    spreadsheetId,
    ranges: [`'${sheetTitle}'!${range}`],
    includeGridData: true,
  });
  const rowData = res.data.sheets?.[0]?.data?.[0]?.rowData || [];
  return rowData.map(r => (r.values || []).map(c => ({
    value: c.formattedValue || '',
    link: c.hyperlink || c.userEnteredFormat?.textFormat?.link?.uri || '',
    wrap: c.effectiveFormat?.wrapStrategy || '',
    fontFamily: c.effectiveFormat?.textFormat?.fontFamily || '',
    fontSize: c.effectiveFormat?.textFormat?.fontSize || '',
  })));
}
