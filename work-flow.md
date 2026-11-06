# Hệ Thống Vận Hành & Automation Workflows KOC

> **Trung tâm điều phối (Master Hub)** toàn bộ các workflow và kỹ năng tự động hóa chiến dịch Booking KOC Saga Đi Tiệc.

---

## ⚡ Nguyên Tắc Thực Thi Tự Động Hóa (Golden Rules)
1. **Thực thi tự động 100%**: Tất cả các workflow và bước đã được testing/thống nhất thành công (Workflow 1, 2, 3, 4, 5) khi có trigger **tuyệt đối không hỏi lại xác nhận** mà chạy thẳng ra kết quả cuối cùng.
2. **Kiểm tra trùng tức thì**: Với Workflow 1 (TikTok Audit), luôn check trùng ngay tại Bước 1; nếu trùng thì dừng ngay lập tức.
3. **Chuẩn hóa dữ liệu**: Tuân thủ 100% giá trị dropdown và các công thức chi phí ($30\% \times \text{giá niêm yết}$).

---

## 🧭 Danh Mục Các Workflow Hệ Thống

| Workflow | Tài Liệu Chi Tiết | Skill Tương Ứng | Trigger Kích Hoạt | File Đích |
| :--- | :--- | :--- | :--- | :--- |
| **Workflow 1** | [01-tiktok-koc-audit.md](./workflows/01-tiktok-koc-audit.md) | `tiktok-koc-audit` | Gửi ảnh chụp màn hình kênh TikTok | Sheet `Data KOC (11/2026)` (`1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw`, sheetId: `280295617`) |
| **Workflow 2** | [02-koc-metrics-tracking.md](./workflows/02-koc-metrics-tracking.md) | `koc-metrics-tracking` | *"report các chỉ số"*, *"cào view"*, *"sync metrics"* | Sheet `Metrics Tracking` (`1-gMFNOq7Z0XXEjC3bXN41XMUNDGW0teC5xGmRizQfgE`) |
| **Workflow 3** | [03-koc-deal-proposal.md](./workflows/03-koc-deal-proposal.md) | `koc-deal-proposal` | *"viết tin nhắn deal"*, *"proposal deal"*, gửi SOW | Sheet `Data KOC Saga đi tiệc` (Cột K) |
| **Workflow 4** | [04-koc-invitation.md](./workflows/04-koc-invitation.md) | `koc-invitation` | *"liên hệ [Tên KOC]"*, *"viết mail mời KOC"* | Hộp thư Gmail (Draft HTML) + Chat (Zalo/IG/FB) |
| **Workflow 5** | [05-koc-discovery.md](./workflows/05-koc-discovery.md) | `koc-discovery` | *"tìm giúp tôi [n] KOC"*, *"quét KOC đi tiệc"*, *"tự tìm KOC"* | Sheet `Data KOC Saga đi tiệc` (Dòng trống đầu tiên) |
| **Workflow 6** | [06-kinh-hai-trieu-male-artist.md](./workflows/06-kinh-hai-trieu-male-artist.md) | `kinh-hai-trieu-male-artist` | *"tìm nghệ sĩ nam"*, *"booking Kính Hải Triều"*, *"celeb nam đeo kính"* | File/Tab Quản lý Nghệ Sĩ Nam - Kính Hải Triều |

---

## 🔗 Nguồn Dữ Liệu & Tài Nguyên Trực Tuyến

| Tài nguyên | Spreadsheet ID / GID | Mô tả |
| :--- | :--- | :--- |
| **[0] KOC Boom (File điền Data)** | `1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw` (gid `280295617`) | Chứa danh sách data KOC toàn chiến dịch (Tab chính: `Data KOC (11/2026)`) |
| **[Booking KOC] Tracking sheet** | `1-gMFNOq7Z0XXEjC3bXN41XMUNDGW0teC5xGmRizQfgE` (gid `1099201539`) | Quản lý link air và theo dõi chỉ số nghiệm thu 72h |
| **[Booking KOC] TIN NHẮN & MAIL MẪU** | `1GMlmUQbsl2Dev6u0b3FIOdE1BPKWWlgiXSILC1CUcyo` | Thư viện mẫu tin Zalo và Email chuẩn của Brand |
| **Bảng giá Sản phẩm Saga** | `1WYeRjjw_NL-PVQ5URrmKeE7DjqdRduC1aqDoRcvNNfw` (gid `0`) | Tra cứu giá niêm yết để tính chi phí giá vốn (30%) |
| **Link BST SP KOC Nhỏ** | [Danh mục KOC Nhỏ](https://docs.google.com/spreadsheets/d/1w7-kSEP_EIWazCEQqNLlAxOBxBhPnXAlnibRd_aFlwc/edit?gid=0#gid=0) | Barter deal tặng sản phẩm |
| **Link BST SP KOC Lớn** | [Danh mục KOC Lớn](https://docs.google.com/spreadsheets/d/18TcUSlDWNbVZeZ6ZYxmstdQkd55F6SkuGBTwwPsWSSM/edit?gid=1868563297#gid=1868563297) | Chọn mẫu dành riêng cho Macro/Mega |

---

## 🚀 Quy Trình Mở Rộng Workflow Mới

Mỗi khi hoàn thành hoặc thống nhất xong một nghiệp vụ mới với người dùng:
1. **Chủ động hỏi xác nhận**:
   > *"Bạn có muốn tạo/lưu workflow cho quy trình này vào file `work-flow.md` để tự động hóa và ghi nhớ cho các lần sau không?"*
2. Khi người dùng đồng ý:
   - Tạo file chi tiết mới trong thư mục `workflows/` (vd: `workflows/05-<ten-workflow>.md`).
   - Tạo Skill tương ứng trong `.agents/skills/<ten-skill>/SKILL.md`.
   - Cập nhật dòng mới vào bảng điều hướng của file `work-flow.md` và `AGENTS.md`.
