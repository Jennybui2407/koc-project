---
name: tiktok-koc-audit
description: "Phân tích ảnh chụp màn hình kênh TikTok KOC, kiểm tra trùng dữ liệu tức thì trong vòng 30 ngày / 60 ngày và tự động điền thông tin vào sheet Data KOC (11/2026). Điền tuần tự lùi dần từ dưới lên trên vào các hàng trống (ví dụ Hàng 9 -> 8 -> 7... đến Hàng 2); khi hết hàng trống mới tạo thêm hàng mới tại Hàng 2. Giữ nguyên định dạng và kích thước 32px của các ô màu xanh công thức (A, D, X, Z, AA) không điền dữ liệu để công thức tự nhảy."
---

# Skill: Phân Tích Kênh TikTok KOC & Nhập Data (Workflow 1)

Kích hoạt khi người dùng gửi ảnh chụp màn hình kênh TikTok của KOC. Quy trình đã hoàn tất kiểm thử và được thực thi **tự động 100% đến bước cuối cùng** mà không cần hỏi lại người dùng.

---

## 1. Nguồn Dữ Liệu & File Đích (Áp dụng từ tháng 11/2026)

* **Tên file Google Sheet**: `[0] KOC Boom (File điền Data)`
* **Spreadsheet ID**: `1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw`
* **Tab đích**: **`Data KOC (11/2026)`** (sheetId: `280295617`)
* **Quy tắc xác định vị trí điền dòng**:
  * **Trường hợp 1 - Còn hàng trống phía trên dữ liệu có sẵn**: Điền lùi tuần tự từ dưới lên trên (ví dụ hiện tại dữ liệu bắt đầu từ Hàng 10, thì KOC tiếp theo điền vào Hàng 9, KOC sau đó điền Hàng 8, Hàng 7... lùi dần đến Hàng 2). Không cần chèn thêm hàng, ghi trực tiếp vào hàng trống có sẵn.
  * **Trường hợp 2 - Đã hết hàng trống (Hàng 2 đã có data)**: Chèn 1 hàng mới ngay tại **Hàng 2** (ngay dưới Header Hàng 1) đẩy toàn bộ dữ liệu cũ xuống. Nếu nhận một batch nhiều KOC cùng lúc thì tạo số hàng tương ứng và thêm theo chiều từ trên xuống dưới (KOC 1 ở Hàng 2, KOC 2 ở Hàng 3, KOC 3 ở Hàng 4...).
* **Bảo toàn các ô màu xanh cố định (Cột Auto: A, D, X, Z, AA)**:
  * Tuyệt đối **không điền dữ liệu hay format đè** lên các ô này để công thức `=ARRAYFORMULA(...)` ở dòng 1 tự động nhảy kết quả khi các ô thông tin khác được điền.
  * Giữ nguyên vẹn định dạng (font Nunito 9pt, căn lề, viền border, màu nền) và kích thước chiều cao hàng chuẩn **`32px`** (`pixelSize: 32`).
  * Quá trình ghi chỉ update hai dải ô riêng biệt: Cột B:C (`Người phụ trách`, `Ngày tìm`) và Cột E:Q (Thông tin KOC), tách biệt hoàn toàn không chạm vào Cột A và Cột D.
* **Link trực tiếp**: [Mở Sheet Data KOC (11/2026)](https://docs.google.com/spreadsheets/d/1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw/edit?gid=280295617#gid=280295617)

---

## 2. Quy Trình Thực Thi Chi Tiết (6 Bước)

### Bước 1: Đọc Ảnh & Kiểm Tra Trùng Ngay Lập Tức (Check Duplicate)
1. **Trích xuất từ ảnh**:
   * Tên hiển thị kênh (Display Name).
   * TikTok username (`@username`).
   * Tên thật / Nghệ danh (nếu KOC là celeb, diễn viên, hoa hậu, ca sĩ).
   * Lượng Followers, Likes, Bio text.
   * Các liên kết mạng xã hội khác (Instagram, Facebook, Youtube, passio, beacons, v.v.).
   * Thông tin liên hệ trong Bio (SĐT/Zalo, Email, link bio).
2. **Kiểm tra trùng trong tab `Data KOC (11/2026)`** (đối chiếu qua username, link profile TikTok, tên kênh, tên KOC):
   * 🛑 **Nếu đã điền trong vòng 1 tháng ($\le$ 30 ngày)**: **Dừng lại ngay lập tức tại bước 1**, thông báo rõ: dòng trùng, ngày tìm, người phụ trách, dự án đã liên hệ. **Tuyệt đối không chèn thêm dòng mới vào sheet**.
   * 🔄 **Nếu đã điền cách đây $\ge$ 2 tháng ($\ge$ 60 ngày)**: **Cho phép điền lại** (điền vào hàng theo quy tắc vị trí ở Mục 1, công thức ở Cột D sẽ tự đếm tăng số lần liên hệ).
   * ✅ **Nếu chưa có trong sheet**: Tiến hành các bước phân loại và điền dòng mới.

---

### Bước 2: Phân Tier & Nhóm KOC (Cột G)
Căn cứ vào số lượng follower trên ảnh, chọn **chính xác 100% theo chuỗi Dropdown**:
* **`Mega (Trên 1 TRIỆU followers)`**: Follower $> 1.000.000$ ($> 1\text{M}$).
* **`Macro (300K đến 1 TRIỆU followers)`**: Follower từ $300.000$ đến $1.000.000$ ($300\text{K} - 1\text{M}$).
* **`Micro (10K đến 300K followers)`**: Follower từ $10.000$ đến $< 300.000$ ($10\text{K} - 300\text{K}$).
* **`Nano (1K - 10K followers)`**: Follower từ $1.000$ đến $< 10.000$ ($1\text{K} - 10\text{K}$).

---

### Bước 3: Ngành / Lĩnh Vực (Cột H) & Style Content (Cột I)
Chọn **chính xác theo danh sách Dropdown** (chú ý dấu cách sau gạch chéo `/`):
* **Cột H — Ngành / lĩnh vực** (chọn 1 mục):
  * `Thời trang/ Làm đẹp` *(ưu tiên cho camp Saga)*
  * `Nghệ sĩ/ Người nổi tiếng`
  * `Gia đình/ Nhà cửa đời sống`
  * `Nhà hàng/ Ăn uống`
  * `Tài chính/ Cổ phiếu/ Bất động sản`
  * `Tiếp viên hàng không`
  * `Hàng xa xỉ`
  * `Công nghệ`
  * `Sức khỏe, Fitness`
  * `MC/Diễn viên/Ca sĩ`
  * `Couple`
  * `Model`
  * `Kinh doanh`
* **Cột I — Style Content** (chỉ chọn 1 trong 5 mục sau, tuyệt đối không dùng "Biến hình"):
  * `Daily Vlog/ Life Style`
  * `Review`
  * `Học thuật`
  * `Tips and tricks`
  * `Couple`

---

### Bước 4: Tách Bạch Kênh, Contact & Quy Chuẩn Điền "Không Có"

| Cột | Tên Cột | Quy Chuẩn Điền & Dữ Liệu |
| :---: | :--- | :--- |
| **A** | **STT (Auto)** | 🟢 **Không điền (để trống `{}`)**: Do công thức `=ARRAYFORMULA(...)` ở dòng 1 tự sinh số thứ tự lớn nhất. |
| **B** | **Người phụ trách** | Mặc định: `Thuận`. |
| **C** | **Ngày tìm** | Ngày hiện tại theo định dạng `d/m/yyyy` (ví dụ: `5/11/2026`). |
| **D** | **Liên hệ lần thứ (Auto)** | 🟢 **Không điền (để trống `{}`)**: Do công thức `=ARRAYFORMULA(...)` ở dòng 1 tự đếm số lần kênh xuất hiện. |
| **E** | **Tên kênh** | **Chỉ điền tên hiển thị TikTok**, dạng text thuần không link, **tuyệt đối KHÔNG điền kèm ID nhỏ phía sau** (ví dụ trên ảnh hiện `✨ Phi Yen Pham ✨ \| imneyy` thì chỉ điền `✨ Phi Yen Pham ✨`, bỏ phần `\| imneyy`). |
| **F** | **Tên KOC / Nghệ danh** | Điền họ tên thật hoặc nghệ danh (nếu là celeb, nghệ sĩ, hoa hậu). **Nếu không có thì bắt buộc ghi chữ `không có`**. |
| **G** | **Tệp / nhóm KOC** | Khớp chuỗi dropdown ở Bước 2 (`Macro (300K đến 1 TRIỆU followers)`, v.v.). |
| **H** | **Ngành / lĩnh vực** | Khớp chuỗi dropdown ở Bước 3 (`Thời trang/ Làm đẹp`, v.v.). |
| **I** | **Style Content** | Khớp 1 trong 5 chuỗi dropdown ở Bước 3 (`Daily Vlog/ Life Style`, v.v.). |
| **J** | **Khu vực** | Tỉnh/thành phố hợp lệ (`Hà Nội`, `Sài Gòn`, `Đà Nẵng`...). **Riêng cột khu vực nếu quét không ra KOC ở khu vực nào thì ĐỂ TRỐNG `""`** (không ghi "không có" để khớp Dropdown). |
| **K** | **Kênh TikTok** | Hyperlink đầy đủ: `https://www.tiktok.com/@<username>`. |
| **L** | **Link Facebook** | Hyperlink profile hoặc Fanpage Facebook. **Nếu không có thì bắt buộc ghi chữ `không có`**. |
| **M** | **Kênh Instagram** | Hyperlink Instagram: `https://www.instagram.com/<username>/`. **Nếu không có thì bắt buộc ghi chữ `không có`**. |
| **N** | **Kênh Youtube** | Hyperlink kênh Youtube. **Nếu không có thì bắt buộc ghi chữ `không có`**. |
| **O** | **Contact (Điền chi tiết)** | SĐT/Zalo, Email, Link Bio — **Mỗi contact bắt buộc xuống dòng riêng bằng `\n`**. **Nếu không có thì bắt buộc ghi chữ `không có`**. |
| **P** | **Thương hiệu hợp tác** | Mặc định: `Saga`. |
| **Q** | **Dự án đã liên hệ** | Mặc định: `Saga đi tiệc`. |
| **R – Y** | **Các cột Deal & Báo giá** | **Để trống** khi mới audit KOC từ ảnh (chỉ điền khi phát sinh deal). |
| **X, Z, AA–AQ** | **Cột Auto / Cột thừa cũ** | 🔴 🟢 **Tuyệt đối không đụng vào**. |

> [!IMPORTANT]
> **Quy Tắc Vàng Về Ô Thiếu Dữ Liệu**:
> Ngoại trừ **Cột J (Khu vực)** để trống `""` khi không rõ địa điểm, bất kỳ ô nào từ **Cột B đến Cột Q** thiếu thông tin (F Tên thật, L FB, M IG, N Youtube, O Contact) thì **bắt buộc ghi chữ `không có`**, tuyệt đối không bỏ trống.

---

### Bước 5: Chuẩn Định Dạng Bắt Buộc (Theo Hàng 2 & Hàng 3)

* **Font chữ**: `Nunito`
* **Cỡ chữ (Font size)**: **`9` (9pt)** *(khớp 100% với Hàng 2 và Hàng 3)*
* **Chiều cao hàng (Row height)**: Cố định **`32px`** (`pixelSize: 32`).
* **Các ô màu xanh cố định (Cột A, D, X, Z, AA)**: Giữ nguyên định dạng và kích thước, hoàn toàn không điền giá trị để ArrayFormula tự nhảy kết quả.
* **Căn lề (Alignment) & Xuống dòng (Wrap Strategy)**:
  * **Cột B, C**: Căn giữa (`CENTER`), giữa dòng (`MIDDLE`), wrap: `OVERFLOW_CELL`.
  * **Cột E, F**: Căn trái (`LEFT`), giữa dòng (`MIDDLE`), wrap: `WRAP`.
  * **Cột G, H, I, J**: Căn giữa (`CENTER`), giữa dòng (`MIDDLE`), wrap: `WRAP`.
  * **Cột K, L, M, N**: Căn trái (`LEFT`), giữa dòng (`MIDDLE`), wrap: `CLIP`.
  * **Cột O**: Căn trái (`LEFT`), giữa dòng (`MIDDLE`), wrap: `WRAP`.
  * **Cột P, Q**: Căn giữa (`CENTER`), giữa dòng (`MIDDLE`), wrap: `OVERFLOW_CELL` hoặc `WRAP`.

---

### Bước 6: Thực Thi Nhập Dữ Liệu & Báo Cáo

#### 1. Payload Mẫu Cho CLI / Script
```json
{
  "name": "Huaquynhnhu",
  "username": "_huaquynhnhu",
  "realName": "Hứa Quỳnh Như",
  "followers": 358800,
  "tier": "Macro",
  "field": "Thời trang/ Làm đẹp",
  "style": "Daily Vlog/ Life Style",
  "location": "",
  "tiktokUrl": "https://www.tiktok.com/@_huaquynhnhu",
  "facebookUrl": "không có",
  "instagramUrl": "https://www.instagram.com/_huaquynhnhu/",
  "youtubeUrl": "không có",
  "contact": "IG: _huaquynhnhu\nquynhnhuhua14.passio.eco",
  "brand": "Saga",
  "project": "Saga đi tiệc",
  "finder": "Thuận"
}
```

#### 2. Lệnh Chạy Cố Định
```bash
node scripts/run_audit.mjs
```

#### 3. Bảng Markdown Tóm Tắt Trả Về Sau Khi Điền
Sau khi điền thành công vào sheet, trả về bảng tổng kết trực quan:

| Trường Thông Tin | Giá Trị Điền |
| :--- | :--- |
| **Vị trí** | **Hàng [X] (Hàng trống tiếp theo lùi từ dưới lên / hoặc Hàng 2 mới tạo)** |
| **Tên kênh (Cột E)** | [Tên kênh] |
| **Tên KOC / Nghệ danh (Cột F)** | [Tên thật hoặc `không có`] |
| **Nhóm KOC (Cột G)** | `Macro (300K đến 1 TRIỆU followers)` |
| **Ngành / Lĩnh vực (Cột H)** | `Thời trang/ Làm đẹp` |
| **Style Content (Cột I)** | `Daily Vlog/ Life Style` |
| **Khu vực (Cột J)** | [Tỉnh/thành hoặc `(để trống)`] |
| **Kênh TikTok (Cột K)** | [Link TikTok](https://www.tiktok.com/@...) |
| **Kênh Instagram (Cột M)** | [Link Instagram](https://www.instagram.com/...) hoặc `không có` |
| **Kênh Facebook (Cột L)** | [Link FB](...) hoặc `không có` |
| **Kênh Youtube (Cột N)** | [Link YT](...) hoặc `không có` |
| **Thông tin liên hệ (Cột O)** | [Email / SĐT / Link bio] |
| **Thương hiệu & Dự án (Cột P, Q)** | `Saga` · `Saga đi tiệc` |

🔗 **Link xác nhận trực tiếp**: [Xem dòng vừa điền trên Sheet](https://docs.google.com/spreadsheets/d/1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw/edit?gid=280295617#gid=280295617)
