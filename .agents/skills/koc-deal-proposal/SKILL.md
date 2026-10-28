---
name: koc-deal-proposal
description: "Soạn tin nhắn đề xuất deal KOC chuẩn chỉnh gửi group duyệt (tag @Liên Kim @Bích Anh Nguyễn Ngọc). Tự động tra cứu Data KOC, tra cứu giá niêm yết trong Bảng giá SP để tính chi phí giá vốn (30%), và tự động cập nhật Cột K của sheet thành 'Đã deal SOW - Chờ duyệt'."
---

# Skill: Soạn Đề Xuất Deal KOC Gửi Group Duyệt (Workflow 3)

Dùng khi người dùng yêu cầu: *"viết tin nhắn deal"*, *"soạn tin duyệt deal"*, *"viết proposal deal"*, *"deal KOC gửi group"*, hoặc gửi thông tin deal KOC (Tên KOC + Sản phẩm + SOW).

## 1. Nguồn Dữ Liệu
- **File Data KOC**: `[0] KOC Boom (File điền Data)` → tab **`Data KOC Saga đi tiệc`** (ID: `1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw`, gid: `1065796303`).
- **File Bảng giá SP**: `Trang tính1` (ID: `1WYeRjjw_NL-PVQ5URrmKeE7DjqdRduC1aqDoRcvNNfw`, gid: `0`).
- **Cột cập nhật**: Cột K (`Tình trạng liên hệ`) → Ghi `Đã deal SOW - Chờ duyệt`.

## 2. Quy Trình Thực Hiện

### Bước 1 — Tiếp nhận thông tin & Tra cứu
- Định danh KOC: Tìm theo Tên KOC hoặc @username trong tab `Data KOC Saga đi tiệc` để lấy thông tin followers, tier, style, link TikTok.
- Tra cứu Sản phẩm: Tìm mã sản phẩm/tên BST trong file Bảng giá để lấy **Giá niêm yết**, tự động tính:
  $$\text{Chi phí giá vốn} = 30\% \times \text{Giá niêm yết}$$
  Format: `[Tên SP + Mã] trị giá X.XXX.000 đồng (Chi phí Y.YYY.000đ)`.

### Bước 2 — Chuẩn hóa nội dung theo Format chuẩn
- Lời chào: `Hi các chị @Liên Kim @Bích Anh Nguyễn Ngọc hiện tại em đang deal với 1 bạn cho Camp Saga đi tiệc, em nhờ chị xem check giúp em với ạ`
- Đánh giá KOC: Trau chuốt các ý tích cực (visual, concept, style) và hạn chế (view, tần suất) từ brief của người dùng.
- SOW đã deal: Liệt kê chi tiết từng video + câu bắt buộc:
  `Bao gồm: Hashtag, tag brand, link sản phẩm/bio; Brand được toàn quyền SDHA`

### Bước 3 — Mẫu Tin Nhắn Chuẩn
```text
Hi các chị @Liên Kim @Bích Anh Nguyễn Ngọc hiện tại em đang deal với 1 bạn cho Camp Saga đi tiệc, em nhờ chị xem check giúp em với ạ
Thông tin KOC
Tên KOC: [Tên hiển thị] (@[username])
Số followers: [X]K/[X]M TikTok (Tổng [Y]M lượt thích, [Z] video)
Nhóm: [Tier followers] (Followers) / [Tier view] (Views thực tế)
Kịch bản: Gồm [số lượng] video TikTok
Video 1 ([Có voice / Không voice]): [Mô tả chi tiết kịch bản]
Video 2 ([Có voice / Không voice]): [Mô tả chi tiết kịch bản]
Đánh giá KOC:
Tích cực:
(1) [Điểm mạnh visual, phong cách]
(2) [Thế mạnh về phong cách dựng video]
Hạn chế: [Điểm hạn chế]
Sản phẩm tặng: [Tên BST + Mã sản phẩm] trị giá [X.XXX.000] đồng (Chi phí [Y.YYY.000]đ)
Kênh air thành phẩm
TikTok: [Link TikTok KOC]
SOW đã deal
[Danh sách các video deal]
Bao gồm: Hashtag, tag brand, link sản phẩm/bio; Brand được toàn quyền SDHA
```

### Bước 4 — Tự động cập nhật Sheet & Trả kết quả
- Cập nhật đúng dòng KOC trong tab `Data KOC Saga đi tiệc`: **Cột K (`Tình trạng liên hệ`)** = `Đã deal SOW - Chờ duyệt`.
- Xuất khối codeblock trong chat để 1-click copy + kèm link xác nhận dòng trang tính.
