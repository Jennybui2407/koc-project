---
name: koc-invitation
description: "Soạn tin nhắn Zalo, Instagram, Facebook và tự động tạo bản nháp Email (Gmail Draft) mời KOC tham gia dự án Saga Đi Tiệc. Tự động tra cứu sheet Data KOC Saga đi tiệc để xác định Tier KOC lớn/nhỏ, quản lý hoặc family/couple, định dạng HTML in đậm đẹp mắt."
---

# Skill: Soạn Tin Nhắn & Email Mời KOC Tham Gia Dự Án (Workflow 4)

Dùng khi người dùng yêu cầu: *"liên hệ [Tên KOC]"*, *"gửi tên KOC kêu liên hệ"*, *"soạn tin liên hệ"*, *"viết tin nhắn mời KOC"*, *"viết mail mời KOC"*, *"tin nhắn zalo mời KOC"*, hoặc chỉ định 1 KOC cụ thể trong sheet.

## 1. Nguồn Dữ Liệu
- **File Thư viện Mẫu**: `[Booking KOC] TIN NHẮN & MAIL MẪU` (ID: `1GMlmUQbsl2Dev6u0b3FIOdE1BPKWWlgiXSILC1CUcyo`)
  - Tab `Zalo`: Mẫu `Z01` (KOC nhỏ), `Z02` (KOC lớn), `Z03` (Quản lý KOC nhỏ), `Z04` (Quản lý KOC lớn).
  - Tab `Email`: Mẫu `E01` (KOC nhỏ), `E02` (KOC lớn), `E03` (Family/Couple), `E04` (Quản lý KOC nhỏ), `E05` (Quản lý KOC lớn).
- **File Data KOC**: `[0] KOC Boom (File điền Data)` → tab `Data KOC Saga đi tiệc` (ID: `1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw`, gid: `1065796303`).
- **Link SP KOC Nhỏ**: `https://docs.google.com/spreadsheets/d/1w7-kSEP_EIWazCEQqNLlAxOBxBhPnXAlnibRd_aFlwc/edit?gid=0#gid=0`
- **Link SP KOC Lớn**: `https://docs.google.com/spreadsheets/d/18TcUSlDWNbVZeZ6ZYxmstdQkd55F6SkuGBTwwPsWSSM/edit?gid=1868563297#gid=1868563297`

## 2. Quy Trình Thực Hiện

### Bước 1 — Tra cứu KOC
Dò tìm theo Tên KOC hoặc @username trong tab `Data KOC Saga đi tiệc` để lấy:
- Tier (Cột F) / Số followers (Cột O)
- Style Content (Cột G) & Lĩnh vực (Cột H)
- Thông tin liên hệ: Email, SĐT/Zalo, Instagram/Facebook (Cột J & D)

### Bước 2 — Phân Loại KOC & Chọn Mẫu Chuẩn
1. **KOC Nhỏ** (< 300K follow / Nano, Micro):
   - Nói thẳng hình thức **barter deal tặng sản phẩm** để KOC trải nghiệm.
   - Gắn kèm link chọn mẫu KOC nhỏ.
   - Mẫu Zalo: `Z01` | Mẫu Email: `E01`.
2. **KOC Lớn** (> 300K follow / Macro, Mega / Nghệ sĩ):
   - **Tuyệt đối KHÔNG nói barter deal liền**.
   - Khen ngợi visual, phong cách thanh lịch/thời thượng phù hợp định vị BST Saga Đi Tiệc.
   - Gắn kèm link BST KOC lớn và mở cửa hỏi thăm lịch trình/định hướng hợp tác.
   - Mẫu Zalo: `Z02` | Mẫu Email: `E02`.
3. **Quản lý / Manager** (Khi liên hệ có ghi `Ms`, `Mr`, `Manager`, `For work`...):
   - Lời văn trang trọng, lịch sự, nêu rõ Brand, Campaign, tên Talent muốn mời.
   - Xin thông tin quy trình làm việc và ratecard.
   - Mẫu Zalo: `Z03`/`Z04` | Mẫu Email: `E04`/`E05`.
4. **Family / Couple**: Dùng mẫu Email `E03`.

### Bước 3 — Xuất Nội Dung & Tạo Gmail Draft Tự Động
1. **Nếu KOC có Email**:
   - Tự động gọi Gmail API (sử dụng token tại `~/.config/google-drive-mcp/tokens.json`) để tạo **Bản nháp (Draft)** trực tiếp vào hộp thư Gmail.
   - Định dạng **HTML chuyên nghiệp**: **tô đậm (`<b>`)** các thông tin quan trọng (Tên KOC, Saga & Hải Triều, điểm mạnh visual, yêu cầu hợp tác/báo giá/chọn mẫu).
   - **Lưu ý định dạng**: Bỏ phần thông tin liên hệ nhanh (để người dùng dùng chữ ký có sẵn của Gmail), và bỏ dấu bullet ở phần link tham khảo thêm.
2. **Nếu KOC có Zalo / Instagram / Facebook**:
   - Xuất khối tin nhắn codeblock hoàn chỉnh trong chat để người dùng 1-click copy gửi ngay.
