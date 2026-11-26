# Hướng Dẫn Vận Hành Agent KOC

Tất cả quy trình thực thi **bắt buộc tuân thủ theo [work-flow.md](./work-flow.md)** và các tài liệu trong thư mục [workflows/](./workflows/).

## 0. Nguyên Tắc Tự Động Hóa Tuyệt Đối (Không Hỏi Lại Khi Đã Testing)
Tất cả các workflow và bước đã được testing/thống nhất thành công (Workflow 1, 2, 3, 4, 5, 6, 7) khi có yêu cầu hoặc trigger, Agent **bắt buộc thực thi tự động 100% đến bước cuối cùng mà KHÔNG cần hỏi lại xác nhận** của người dùng. Chỉ hỏi lại khi thiếu thông tin quan trọng mà trong sheet không có (ví dụ: sản phẩm lạ không có trong bảng giá).

---

## 1. Khi Nhận Ảnh Chụp Màn Hình TikTok KOC ([Workflow 1](./workflows/01-tiktok-koc-audit.md))
1. **Đọc ảnh & Kiểm tra trùng ngay (Bước 1)**:
   - Trích xuất: Tên kênh hiển thị, @username, Tên thật/nghệ danh (nếu celeb), Followers, Bio, Link MXH (FB/IG/Youtube), Contact.
   - **Kiểm tra trùng ngay lập tức** trong tab **`Data KOC (11/2026)`** (ID `1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw`, sheetId `280295617`):
     - **Nếu đã điền trong vòng 1 tháng ($\le$ 30 ngày)**: **Dừng lại ngay lập tức tại bước 1**, thông báo rõ KOC đã trùng (dòng cũ, ngày tìm, người tìm, dự án), **không chèn dòng mới**.
     - **Nếu đã điền cách đây $\ge$ 2 tháng ($\ge$ 60 ngày)**: **Cho phép điền lại** (điền vào hàng trên cùng).
2. **Nếu CHƯA TRÙNG (hoặc $\ge$ 2 tháng)**:
   - Tier (Cột G): Khớp đúng chuỗi Dropdown: `Mega (Trên 1 TRIỆU followers)` · `Macro (300K đến 1 TRIỆU followers)` · `Micro (10K đến 300K followers)` · `Nano (1K - 10K followers)`.
   - Ngành/lĩnh vực (Cột H): Khớp chuỗi Dropdown có dấu cách sau slash (`Thời trang/ Làm đẹp`, `Nghệ sĩ/ Người nổi tiếng`...).
   - Style Content (Cột I): Khớp 1 trong 5 mục Dropdown (`Daily Vlog/ Life Style`, `Review`, `Học thuật`, `Tips and tricks`, `Couple`).
   - Tách bạch kênh: Cột E = Chỉ điền Tên hiển thị kênh (text thuần không link, tuyệt đối không kèm ID nhỏ như `| imneyy`); Cột F = Tên thật/Nghệ danh (nếu celeb); Cột K = Link TikTok; Cột L = Link FB; Cột M = Link IG; Cột N = Link Youtube.
   - Contact (Cột O): SĐT/Zalo, Email, Link Bio — **mỗi contact bắt buộc xuống dòng riêng (`\n`)**.
   - Thương hiệu (Cột P) = `Saga` · Dự án (Cột Q) = `Saga đi tiệc` (mặc định).
   - Địa điểm / Khu vực (Cột J): Điền khi rõ tỉnh/thành phố hợp lệ (`Sài Gòn`, `Hà Nội`, `Đà Nẵng`...). **Riêng cột khu vực này nếu quét không ra KOC ở khu vực nào thì ĐỂ TRỐNG** (không ghi "không có" để khớp chuẩn dropdown).
   - **Quy tắc bắt buộc "không có"**: Ngoại trừ Cột J (để trống khi không rõ), bất kỳ ô nào từ **Cột B đến Cột Q** thiếu thông tin (F Tên thật, L FB, M IG, N Youtube, O Contact) thì **bắt buộc ghi chữ `không có`**, tuyệt đối không bỏ trống.
   - **Cột công thức & ô màu xanh cố định (A, D, X, Z, AA)**: Tuyệt đối không điền giá trị và không format đè lên các ô này để công thức `=ARRAYFORMULA(...)` ở dòng 1 tự nhảy. Quá trình ghi chỉ update hai cụm riêng Cột B:C và Cột E:Q.
   - **Vị trí & Định dạng**: Điền lùi tuần tự từ dưới lên trên vào các hàng trống có sẵn (ví dụ Hàng 9 -> 8 -> 7... đến Hàng 2). Khi hết hàng trống (Hàng 2 đã có data) thì mới tạo thêm hàng mới ngay tại **Hàng 2** (dưới Header); nếu thêm nhiều KOC cùng lúc thì thêm theo chiều từ trên xuống (Hàng 2, 3, 4...). Toàn bộ ô dùng chuẩn **Font Nunito, cỡ chữ 9pt** và chiều cao hàng cố định **`32px`**.
   - **Thực thi không hỏi quyền**: Tuyệt đối không dùng `node -e "..."` hay lệnh shell thay đổi. Ghi payload vào `scratch/current_koc.json` và chạy **duy nhất 1 lệnh cố định**: `node scripts/run_audit.mjs` (tự động check trùng -> điền vào sheet -> đọc xác nhận).
   - Trả về bảng Markdown tóm tắt thông tin đã điền cùng link xác nhận sau khi hoàn tất.

---

## 2. Khi Nhận Yêu Cầu Report Chỉ Số ([Workflow 2](./workflows/02-koc-metrics-tracking.md))
Trigger keywords: *"report các chỉ số"*, *"report chỉ số"*, *"cào view"*, *"cào số"*, *"sync metrics"*, *"cập nhật số liệu"*.
1. **Chạy ngay lập tức** không cần hỏi lại xác nhận.
2. Tự động kiểm tra cột `Link air` trong tab `Tracking KOC`, nếu có link mới chưa có bên tab `Metrics Tracking` thì tự chèn dòng đồng bộ sang trước (trạng thái: `Đang theo dõi 72h`).
3. Cào đầy đủ 5 chỉ số: **View**, **Tim**, **Comment**, **Lưu trữ**, **Share**.
4. Ghi tự động vào mốc 72h (sau 3 ngày đăng):
   - >= 72h (hoặc chưa hoàn thành): Ghi vào Mốc 72h (cột L:Q), cập nhật trạng thái `Đã hoàn thành 72h`.
   - Nếu yêu cầu "report tất cả" / "force all": ép cào cập nhật toàn bộ mốc 72h.
   - *(Đã loại bỏ hoàn toàn việc cào/report mốc 24h)*.
5. File đích: **`[Booking KOC] Tracking sheet`** → tab **`Metrics Tracking`** (ID: `1-gMFNOq7Z0XXEjC3bXN41XMUNDGW0teC5xGmRizQfgE`).
6. Trả bảng Markdown tóm tắt tổng quan vào chat sau khi hoàn thành.
7. Chỉ xuất file Google Doc báo cáo khi người dùng yêu cầu *"xuất báo cáo"*.

---

## 3. Khi Nhận Yêu Cầu Soạn Tin Đề Xuất Deal KOC ([Workflow 3](./workflows/03-koc-deal-proposal.md))
Trigger keywords: *"viết tin nhắn deal"*, *"soạn tin duyệt deal"*, *"viết proposal deal"*, *"deal KOC gửi group"*, hoặc gửi thông tin deal KOC (Tên KOC + Sản phẩm + SOW sơ bộ).
1. **Tra cứu KOC**: Dựa vào Tên/@username/STT, tự tra cứu trong tab `Data KOC Saga đi tiệc` (`1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw`) để lấy followers, tier, style, link TikTok.
2. **Tra cứu Giá SP**: Quét file Bảng giá (`1WYeRjjw_NL-PVQ5URrmKeE7DjqdRduC1aqDoRcvNNfw`, gid `0`) để lấy giá niêm yết, tự tính **Chi phí giá vốn = 30% × Giá niêm yết** (nếu không thấy thì hỏi lại giá).
3. **Chuẩn hóa nội dung**:
   - Lời chào: `Hi các chị @Liên Kim @Bích Anh Nguyễn Ngọc hiện tại em đang deal với 1 bạn cho Camp Saga đi tiệc, em nhờ chị xem check giúp em với ạ`
   - Kịch bản & Đánh giá: Trau chuốt từ brief/nhận xét ngắn của người dùng.
   - SOW: Bao gồm chi tiết các video deal và câu mặc định: `Bao gồm: Hashtag, tag brand, link sản phẩm/bio; Brand được toàn quyền SDHA`
4. **Tự động cập nhật sheet**: Ghi `Đã deal SOW - Chờ duyệt` vào **Cột K (`Tình trạng liên hệ`)** ở đúng dòng KOC trong tab `Data KOC Saga đi tiệc`.
5. **Trả kết quả**: Trả về khối văn bản codeblock trong chat để 1-click copy gửi group + link sheet xác nhận.

---

## 4. Khi Nhận Yêu Cầu Soạn Tin Nhắn & Email Mời KOC ([Workflow 4](./workflows/04-koc-invitation.md))
Trigger keywords: *"liên hệ [Tên KOC]"*, *"gửi tên KOC kêu liên hệ"*, *"soạn tin liên hệ"*, *"viết tin nhắn mời KOC"*, *"soạn tin mời hợp tác"*, *"viết mail mời KOC"*, *"tin nhắn zalo mời KOC"*, hoặc chỉ định gửi tên 1 KOC cụ thể yêu cầu liên hệ.
1. **Phân loại KOC**:
   - **KOC Nhỏ** (< 300K follow / Nano, Micro): Tiếp cận thân thiện, trực tiếp, **nói thẳng barter deal tặng sản phẩm**, link mẫu: `https://docs.google.com/spreadsheets/d/1w7-kSEP_EIWazCEQqNLlAxOBxBhPnXAlnibRd_aFlwc/edit?gid=0#gid=0`.
   - **KOC Lớn** (> 300K follow / Macro, Mega / Nghệ sĩ): Lịch sự, tôn trọng vị thế, **KHÔNG nói barter liền**, khen visual/style, link mẫu: `https://docs.google.com/spreadsheets/d/18TcUSlDWNbVZeZ6ZYxmstdQkd55F6SkuGBTwwPsWSSM/edit?gid=1868563297#gid=1868563297`, mở cửa offer hình thức hợp tác phù hợp.
   - **Quản lý / Manager**: Trang trọng, chuyên nghiệp, nêu rõ Brand, Campaign, tên Talent muốn mời, xin quy trình/báo giá hoặc trao đổi hình thức hợp tác.
2. **Kênh & Format**:
   - **Zalo / IG / FB**: Ngắn gọn, thân thiện, chia đoạn thoáng, dùng emoji tinh tế, dễ đọc và phản hồi nhanh trên điện thoại.
   - **Email**: Tự động tạo bản nháp (Draft) dạng HTML trực tiếp vào hộp thư Gmail, **tô đậm (bold)** các thông tin quan trọng (Tên KOC, Saga & Hải Triều, điểm mạnh visual, yêu cầu hợp tác/báo giá/chọn mẫu). Bỏ phần thông tin liên hệ nhanh (để dùng chữ ký Gmail sẵn có) và bỏ bullet ở phần link tham khảo thêm. Tiêu đề chuẩn theo mẫu E01-E05.
3. **Cá nhân hóa theo KOC cụ thể**: Nếu người dùng gọi tên một KOC có trong sheet `Data KOC Saga đi tiệc`, tự động tra cứu để trích xuất tên, link kênh, phân loại KOC lớn/nhỏ và xuất ngay bộ tin nhắn Zalo/IG/FB + tự động tạo Gmail Draft dạng HTML in đậm đẹp mắt.

---

## 5. Khi Nhận Yêu Cầu Tìm Kiếm & Khai Thác KOC Tự Động ([Workflow 5](./workflows/05-koc-discovery.md))
Trigger keywords: *"tìm giúp tôi [n] KOC"*, *"quét KOC đi tiệc"*, *"tự tìm KOC"*, *"tìm thêm KOC [tier]"*, *"discovery KOC"*.
1. **Thực thi tự động 100%**: Khai thác ứng viên từ hashtag/từ khóa đi tiệc + Đào sâu KOC đề xuất tương tự từ các kênh chuẩn trong sheet.
2. **Cơ cấu Tier**: Cân bằng 40% Micro (30K–300K), 40% Nano (10K–30K, map `Review/Aff`), 20% Macro (>300K–1M).
3. **Bộ lọc hạt nhân**:
   - Có video OOTD đi tiệc / cưới hỏi / trang sức / GRWM trong 30 ngày gần nhất.
   - Avg View không ghim $\ge$ **10.000 view** (hoặc >15% follower).
   - Có thông tin liên hệ trong Bio (Email/SĐT/Zalo/Bio link).
4. **Kiểm tra trùng & Nhập sheet**: Quét kiểm tra trùng trước (bỏ qua nếu đã có). Điền thẳng vào dòng trống đầu tiên trong tab `Data KOC Saga đi tiệc`, tuân thủ **chuẩn định dạng hàng 92** (Font Nunito 10, wrap `WRAP`, để trống Cột I nếu không có tỉnh/thành).
5. **Báo cáo**: Xuất bảng Markdown tổng kết danh sách KOC tìm được kèm link dòng trên sheet.

---

## 6. Khi Nhận Yêu Cầu Tìm Kiếm & Đề Xuất Nghệ Sĩ Nam - Kính Hải Triều ([Workflow 6](./workflows/06-kinh-hai-trieu-male-artist.md))
Trigger keywords: *"tìm nghệ sĩ nam"*, *"nghệ sĩ nam cho Kính Hải Triều"*, *"booking Kính Hải Triều"*, *"celeb nam đeo kính"*, *"talent nam mắt kính"*.
1. **Phân nhóm phong cách**:
   - **Quý ông Lịch lãm / Tri thức (Gentleman)**: Gương mặt góc cạnh, phong thái chín chắn, sơ mi/suit, fit gọng Titan, kính kim loại thanh mảnh, kính râm Aviator/Wayfarer (Cartier, Montblanc, Ray-Ban, Seiko...).
   - **Trẻ trung / Trendy / Phá cách (Modern Creative)**: Visual sắc nét, gu streetwear/unisex thời thượng, fit gọng Acetate dày bản, kính tròng màu, kính mắt mèo nam (Gentle Monster, Bolon, Oakley...).
2. **Bộ lọc chất lượng**:
   - Hình ảnh sạch, đời tư tốt, không vướng scandal.
   - Có bài đăng/hoạt động đều đặn trong 30–60 ngày gần nhất, tương tác tự nhiên.
   - Đường nét khuôn mặt và sống mũi "ăn kính" (tôn dáng gọng kính).
   - Có thông tin liên hệ booking rõ ràng (Quản lý/Email/SĐT).
3. **Đầu ra**: Báo cáo bảng Markdown tổng hợp đầy đủ thông tin: Họ tên/Nghệ danh, Lĩnh vực, Phân nhóm phong cách, Kênh & Followers, Đặc điểm gương mặt/Visual fit, Gợi ý dòng kính Kính Hải Triều phù hợp, Thông tin liên hệ Booking và Đánh giá Brand Fit.

---

## 7. Khi Nhận Yêu Cầu Mời & Soạn Mail Nghệ Sĩ - Kính Hải Triều ([Workflow 7](./workflows/07-kinh-hai-trieu-artist-invitation.md))
Trigger keywords: *"mời nghệ sĩ Kính Hải Triều"*, *"gửi mail cho nghệ sĩ [Tên]"*, *"soạn mail booking nghệ sĩ Kính Hải Triều"*, *"viết mail mời nghệ sĩ trải nghiệm showroom"*.
1. **Nguồn dữ liệu & Mẫu**:
   - File mẫu: `Tin nhắn & Mail Mẫu Nghệ Sĩ` (ID: `1SgqBZ1bnNrNx-66Caw-PYM06NiP6SBVRm5IQlacjtRA`, tab **`Kính NS`**, gid: `1765150608`).
   - Tiêu đề chuẩn: `KÍNH HẢI TRIỀU x [TÊN NGHỆ SĨ VIẾT HOA] | LỜI MỜI HỢP TÁC TRẢI NGHIỆM TẠI CỬA HÀNG`.
   - Link Proposal: `https://proposal-kinh-hai-trieu.my.canva.site/2026-06-25-proposal-k-nh-h-i-tri-u`.
   - Người liên hệ trong thư: **`Thuận`** ("Em là Thuận...", "Thuận rất sẵn lòng...", "Thân mến, Thuận.").
2. **Quy tắc tự động hóa 100%**:
   - Khóa 100% câu chữ theo mẫu cũ trong sheet `Kính NS`, chỉ thay thế Tên Nghệ Sĩ và đại từ xưng hô tương ứng (Nam xưng `anh`, Nữ xưng `chị`).
   - Mở đầu thư: Mặc định `Dear [Tên Nghệ Sĩ],`; nếu ghi rõ gửi Quản lý thì dùng `Dear team và [Tên Nghệ Sĩ],`.
   - Địa chỉ nhận (`To:`): Tự điền nếu có trong chat/sheet, nếu không có thì để trống trường `To:` để người dùng tự gõ trong Gmail.
   - Tự động tạo bản nháp **Gmail Draft** vào hộp thư và xuất bản xem trước vào chat.

---

## 8. Quy Tắc Ghi Nhận Workflow Mới
Mỗi khi hoàn thành hoặc thống nhất một quy trình làm việc/thao tác mới với người dùng, **bắt buộc phải chủ động hỏi**:
> *"Bạn có muốn tạo/lưu workflow cho quy trình này vào file `work-flow.md` để tự động hóa và ghi nhớ cho các lần sau không?"*
