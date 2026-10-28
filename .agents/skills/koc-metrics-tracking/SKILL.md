---
name: koc-metrics-tracking
description: "Cào và cập nhật các chỉ số video KOC (View, Tim, Comment, Lưu trữ, Share) mốc 72h vào tab Metrics Tracking. Tự động đồng bộ link air mới từ tab Tracking KOC. Hỗ trợ TikTok, Facebook Reels, Instagram."
---

# Skill: Cào & Cập Nhật Chỉ Số Video KOC (Workflow 2)

Dùng khi người dùng yêu cầu: *"report các chỉ số"*, *"report chỉ số"*, *"cào view"*, *"cào số"*, *"sync metrics"*, *"cập nhật số liệu"*.

## 1. Nguồn Dữ Liệu & File Đích
- **File**: `[Booking KOC] Tracking sheet`
- **Spreadsheet ID**: `1-gMFNOq7Z0XXEjC3bXN41XMUNDGW0teC5xGmRizQfgE`
- **Tab nguồn**: `Tracking KOC` (cột F: `Link air`)
- **Tab đích**: `Metrics Tracking` (cột L:Q cho mốc 72h, cột S trạng thái)
- **Link**: https://docs.google.com/spreadsheets/d/1-gMFNOq7Z0XXEjC3bXN41XMUNDGW0teC5xGmRizQfgE/edit#gid=1099201539

## 2. Quy Trình Thực Hiện

### Bước 1 — Tự động đồng bộ link air mới (Auto-sync Links)
1. Quét cột `Link air` (cột F) từ tab `Tracking KOC`.
2. Đối chiếu với danh sách link hiện có ở tab `Metrics Tracking`.
3. Nếu phát hiện link air mới: tự động chèn dòng mới vào `Metrics Tracking` với Tên KOC, Nền tảng, Link air, Ngày đăng, Trạng thái: `Đang theo dõi 72h`.

### Bước 2 — Cơ chế cập nhật mốc 72h (Đã bỏ mốc 24h)
- Tính `hoursPassed = (Hiện tại - Ngày đăng)`:
  - Nếu `hoursPassed >= 72` (hoặc không rõ ngày) và chưa hoàn thành: Cào và ghi nhận đầy đủ 5 chỉ số sau 3 ngày vào **cột L:Q**, cập nhật trạng thái cột S thành `Đã hoàn thành 72h`.
  - Nếu người dùng yêu cầu "report tất cả" (`--all`): Ép cào lại toàn bộ video mốc 72h.

### Bước 3 — 5 chỉ số cần cào
1. **View** (Lượt xem)
2. **Tim** (Lượt thích)
3. **Comment** (Bình luận)
4. **Lưu trữ** (Saves / Bookmarks)
5. **Share** (Lượt chia sẻ)

### Bước 4 — Lệnh thực thi kỹ thuật (CLI Commands)
```bash
# Cào và cập nhật các video đến hạn 72h (kèm tự động kéo link mới từ Tracking KOC)
npm run sync

# Ép cào và cập nhật lại toàn bộ tất cả video mốc 72h
npm run sync:force

# Chạy cron định kỳ ngầm hàng ngày
npm run cron

# Xuất Google Doc báo cáo tổng kết nghiệm thu chiến dịch (chỉ khi được yêu cầu)
npm run export
```

### Bước 5 — Đầu ra sau khi chạy
1. Xuất bảng Markdown tóm tắt nhanh vào chat: Tổng video cập nhật, Tổng View/Tim/Cmt/Save/Share mốc 72h, Top 5 tương tác tốt, link sheet.
2. Chỉ tạo Google Doc báo cáo nghiệm thu khi người dùng có yêu cầu rõ ràng (*"xuất báo cáo"*, *"tạo Google Doc báo cáo"*).
