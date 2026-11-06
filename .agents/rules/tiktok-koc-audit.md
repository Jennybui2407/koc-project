---
trigger: always_on
---

# Quy Tắc Phân Tích Ảnh Chụp Màn Hình TikTok KOC

Khi người dùng gửi ảnh chụp kênh TikTok của KOC: làm đúng theo `work-flow.md` và `workflows/01-tiktok-koc-audit.md`.

Điểm chính:
- File đích: `[0] KOC Boom (File điền Data)` → tab **`Data KOC (11/2026)`** (sheetId: `280295617`).
- **Vị trí điền**:
  - Điền lùi tuần tự từ dưới lên trên vào các hàng trống có sẵn ở phía trên dữ liệu (ví dụ Hàng 9 -> 8 -> 7... đến Hàng 2).
  - Khi hết hàng trống (Hàng 2 đã có data): Tạo thêm hàng mới ngay tại **Hàng 2** (dưới Header); nếu thêm nhiều KOC cùng lúc thì thêm theo chiều từ trên xuống (Hàng 2, 3, 4...).
- **Bảo toàn các ô màu xanh cố định (Cột A, D, X, Z, AA)**: Tuyệt đối không điền giá trị và không format đè lên các ô này để ArrayFormula tự nhảy. Giữ nguyên vẹn định dạng và chiều cao hàng cố định **`32px`**. Quá trình ghi chỉ update hai dải ô riêng: Cột B:C và Cột E:Q.
- **Kiểm tra trùng**:
  - Đã điền trong vòng 1 tháng (<= 30 ngày): Dừng ngay ở Bước 1, cảnh báo và không điền.
  - Đã điền cách đây >= 2 tháng (>= 60 ngày): Cho phép điền lại.
- **Tách bạch kênh**:
  - Cột E: Chỉ điền Tên hiển thị của kênh TikTok (text thuần không link), **tuyệt đối không điền kèm ID/username nhỏ kế bên** (như `| imneyy`).
  - Cột F: Tên thật / Nghệ danh (nếu là người nổi tiếng, celeb).
  - Cột K: Link TikTok đầy đủ dạng hyperlink.
  - Cột L: Link Facebook (nếu có).
  - Cột M: Link Instagram (nếu có).
  - Cột N: Link Youtube (nếu có).
  - Cột O: Contact (mỗi thông tin bắt buộc xuống dòng riêng `\n`).
  - Cột P: `Saga` · Cột Q: `Saga đi tiệc`.
- **Khớp 100% Dropdown Hàng 2-3**:
  - Cột G: `Mega (Trên 1 TRIỆU followers)` / `Macro (300K đến 1 TRIỆU followers)` / `Micro (10K đến 300K followers)` / `Nano (1K - 10K followers)`.
  - Cột H: Có dấu cách sau slash (`Thời trang/ Làm đẹp`, `Nghệ sĩ/ Người nổi tiếng`...).
  - Cột I: 1 trong 5 mục (`Daily Vlog/ Life Style`, `Review`, `Học thuật`, `Tips and tricks`, `Couple`).
- **Cột công thức tự động (A, D, X, Z, AA–AQ)**: Cột A (STT) và Cột D (Liên hệ lần thứ) tuyệt đối không điền gì hết (để trống 100% cho ArrayFormula tự tính), không liệt kê vào bảng tóm tắt thông tin điền. Các cột màu xanh lá/đỏ khác tuyệt đối không ghi đè. Cột deal (R–Y) để trống khi mới audit.
- **Quy tắc bắt buộc "không có"**: Ngoại trừ Cột J (để trống khi không rõ), bất kỳ ô nào từ **Cột B đến Cột Q** không có thông tin (như Cột F Tên thật, Cột L FB, Cột M IG, Cột N Youtube, Cột O Contact) thì **bắt buộc ghi chữ `không có`**, tuyệt đối không bỏ trống.
- **Khu vực (Cột J)**: Điền tỉnh/thành phố cụ thể (`Sài Gòn`, `Hà Nội`...). **Riêng cột khu vực nếu quét không ra KOC ở khu vực nào thì ĐỂ TRỐNG** (không ghi "không có" để khớp chuẩn Dropdown).
- **Định dạng chuẩn**: Font `Nunito`, cỡ chữ **`9` (9pt)** theo chuẩn Hàng 2 và Hàng 3.
- Tự động điền 100% không hỏi lại khi đã chuẩn bị xong payload.
