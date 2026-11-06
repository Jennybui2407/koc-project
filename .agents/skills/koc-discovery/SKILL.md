---
name: koc-discovery
description: "Tự động tìm kiếm và khai thác data KOC tiềm năng cho chiến dịch Saga Đi Tiệc theo tiêu chí học từ sheet (40% Micro, 40% Nano, 20% Macro, style đi tiệc/trang sức/cưới hỏi, view >= 10K). Tự động kiểm tra trùng lặp và điền thẳng vào sheet Data KOC Saga đi tiệc theo chuẩn hàng 92."
---

# Skill: Tự Động Tìm Kiếm & Khai Thác KOC (Workflow 5)

Dùng khi người dùng yêu cầu tìm kiếm, khai thác KOC mới (vd: *"Tìm giúp tôi 5 KOC Micro"*, *"Quét 10 KOC đi tiệc"*, *"Tự tìm KOC theo tiêu chí Saga"*).

## 1. Nguồn Dữ Liệu & File Đích
- **File**: `[0] KOC Boom (File điền Data)`
- **Spreadsheet ID**: `1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw`
- **Tab**: `Data KOC Saga đi tiệc` (sheetId: `1065796303`)
- **Dòng tiêu đề**: Dòng 7
- **Người tìm Data mặc định**: `Thuận`

## 2. Tiêu Chuẩn Tuyển Chọn Hạt Nhân
1. **Nguồn quét**:
   - Hashtag xu hướng: `#outfitditiec`, `#grwmditiec`, `#damditiec`, `#trangsuc`, `#vlogcuoi`, `#lifestylevlog`.
   - Danh sách "Tài khoản đề xuất tương tự" từ các KOC chất lượng cao đã có trong sheet.
2. **Cơ cấu Tier**:
   - `40% Micro` (30K–300K followers).
   - `40% Nano` (10K–30K followers, map cột F: `Review/Aff`).
   - `20% Macro` (>300K–1M followers).
3. **Chỉ số & Nội dung**:
   - Video OOTD đi tiệc / cưới hỏi / trang sức / GRWM trong 30 ngày gần nhất.
   - Avg View không ghim $\ge$ **10.000 view** (hoặc >15% follower).
   - Có thông tin liên hệ rõ ràng (Email / SĐT / Zalo / Bio link).

## 3. Quy Trình Thực Hiện
1. **Kiểm tra trùng lặp**: Quét cột C và hyperlink trong `Data KOC Saga đi tiệc`. Nếu đã trùng thì bỏ qua, tìm ứng viên khác.
2. **Nhập liệu tự động**: Ghi vào dòng trống đầu tiên qua `scripts/run_audit.mjs`.
3. **Định dạng chuẩn hàng 92**:
   - Font `Nunito`, size `10`.
   - Bật xuống dòng tự động (`wrapStrategy: 'WRAP'`).
   - Cột I (Địa điểm): Để trống `""` nếu không có tỉnh/thành phố cụ thể.
4. **Báo cáo**: Xuất bảng Markdown tóm tắt các KOC mới đã điền kèm link kiểm tra trên sheet.

