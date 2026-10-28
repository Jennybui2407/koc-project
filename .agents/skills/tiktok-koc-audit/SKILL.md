---
name: tiktok-koc-audit
description: "Phân tích ảnh chụp màn hình kênh TikTok của KOC, kiểm tra trùng dữ liệu tức thì và tự động điền thông tin vào sheet Data KOC Saga đi tiệc. Tự động tính Tier, Avg View 7 ngày (loại bỏ video ghim), xác định Style Content & Lĩnh vực theo dropdown."
---

# Skill: Phân Tích Kênh TikTok KOC & Nhập Data (Workflow 1)

Dùng khi người dùng gửi ảnh chụp màn hình kênh TikTok của KOC.

## 1. Nguồn Dữ Liệu & File Đích
- **File**: `[0] KOC Boom (File điền Data)`
- **Spreadsheet ID**: `1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw`
- **Tab**: `Data KOC Saga đi tiệc` (sheetId: `1065796303`)
- **Dòng tiêu đề**: Dòng 7
- **Link**: https://docs.google.com/spreadsheets/d/1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw/edit?gid=1065796303#gid=1065796303

## 2. Quy Trình Thực Hiện

### Bước 1 — Đọc ảnh & Kiểm tra trùng ngay (Dừng nếu trùng)
- **Trích xuất thông tin**:
  - Tên hiển thị và **@username** → link kênh `https://www.tiktok.com/@<username>`.
  - **Followers**: quy đổi `K` = ×1.000, `M` = ×1.000.000 (vd `265.9K` → `265,900`).
- **Kiểm tra trùng ngay lập tức**:
  - Quét cột C của tab `Data KOC Saga đi tiệc`, đối chiếu theo **@username** và **tên hiển thị** (và quét thêm tab cũ để cảnh báo lịch sử nếu có).
  - 🛑 **NẾU ĐÃ TRÙNG**: **Dừng lại ngay lập tức tại bước 1**, báo ngay cho người dùng: số dòng đã có, tên KOC, người tìm trước đó (cột E), nhóm KOC (cột F) và ghi chú cũ. **Tuyệt đối không tính view, không cào thêm và không điền sheet**.
  - ✅ **NẾU CHƯA TRÙNG**: Chuyển sang Bước 2.

### Bước 2 — Phân Tier & Nhóm KOC (Cột F)
- **Nano** (< 30K follow): Map dropdown cột F thành **`Review/Aff`**.
- **Micro** (30K – 300K follow): Điền **`Micro`**.
- **Macro** (> 300K – 1M follow): Điền **`Macro`**.
- **Mega** (> 1M follow): Điền **`Mega`**.

### Bước 3 — Avg View 7 ngày
- `Avg View = Tổng view video đăng trong 7 ngày / Số video đó`.
- ⚠️ **Tuyệt đối KHÔNG tính các video được ghim ("Đã ghim")** nếu ngày đăng của chúng không nằm trong 7 ngày gần nhất.
- Nếu ảnh không thể hiện rõ ngày đăng: bỏ qua toàn bộ các video ghim, chỉ lấy các video mới nhất không ghim (thường 6–9 video đầu) và ghi rõ số video đã dùng.

### Bước 4 — Style Content (Cột G) & Lĩnh vực (Cột H)
- Mở kênh TikTok, xem nội dung các video 7 ngày gần nhất.
- Chọn đúng 1 giá trị chuẩn theo dropdown:
  - **G – Style Content**: `Daily Vlog/Life Style`, `Review`, `Học thuật`, `Tips and tricks`, `Couple`.
  - **H – Lĩnh vực**: `Nghệ sĩ/Người nổi tiếng`, `Kinh doanh`, `Thời trang/Làm đẹp`, `Gia đình/Nhà cửa đời sống`, `Nhà hàng/Ăn uống`, `Tài chính, cổ phiếu, BĐS`, `Hàng xa xỉ`, `Công nghệ`, `Sức khỏe, Fitness`, `MC/Diễn viên/Ca sĩ`, `Couple`, `Model`, `Tiếp viên hàng không`.

### Bước 5 — Tự động điền vào sheet (Không cần hỏi lại)
Ghi tự động vào **dòng trống đầu tiên** của tab **`Data KOC Saga đi tiệc`**:
- Cột A: STT lớn nhất + 1 (số nguyên).
- Cột B: Ngày hôm nay `dd/mm/yyyy`.
- Cột C: Tên hiển thị, gắn link kênh qua `textFormat.link` (font Nunito 10).
- Cột D: Link FB/IG (nếu có).
- Cột E: `Thuận` (mặc định).
- Cột F: Nhóm KOC.
- Cột G: Style Content.
- Cột H: Lĩnh vực.
- Cột I: Địa điểm.
- Cột J: Thông tin liên hệ (Email/SĐT/Beacons).
- Cột O: `Followers: <x> | Avg View: <y> (<n> video: v1, v2, ...) | Note chi tiết`.

### Bước 6 — Trả kết quả
Xuất bảng Markdown tóm tắt thông tin đã điền kèm link xác nhận đến đúng dòng vừa tạo.
