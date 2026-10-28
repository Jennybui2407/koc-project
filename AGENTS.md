# Hướng Dẫn Vận Hành Agent KOC

Tất cả quy trình thực thi **bắt buộc tuân thủ theo [work-flow.md](./work-flow.md)** và các tài liệu trong thư mục [workflows/](./workflows/).

## 0. Nguyên Tắc Tự Động Hóa Tuyệt Đối (Không Hỏi Lại Khi Đã Testing)
Tất cả các workflow và bước đã được testing thành công (Workflow 1, 2, 3, 4) khi có yêu cầu hoặc trigger, Agent **bắt buộc thực thi tự động 100% đến bước cuối cùng mà KHÔNG cần hỏi lại xác nhận** của người dùng. Chỉ hỏi lại khi thiếu thông tin quan trọng mà trong sheet không có (ví dụ: sản phẩm lạ không có trong bảng giá).

---

## 1. Khi Nhận Ảnh Chụp Màn Hình TikTok KOC ([Workflow 1](./workflows/01-tiktok-koc-audit.md))
1. **Đọc ảnh & Kiểm tra trùng ngay (Bước 1)**:
   - Trích xuất: Tên KOC, @username, Followers.
   - **Kiểm tra trùng ngay lập tức** trong tab `Data KOC Saga đi tiệc` theo @username và tên (kiểm tra thêm tab cũ để cảnh báo lịch sử nếu có).
   - **Nếu TRÙNG trong sheet**: **Dừng lại ngay lập tức tại bước 1**, thông báo rõ KOC đã trùng (dòng cũ, tên, người tìm, nhóm KOC), **không tính view và không điền**.
2. **Nếu CHƯA TRÙNG**:
   - Tier: **Nano** 1K–30K (map dropdown cột F: `Review/Aff`) · **Micro** 30K–300K (`Micro`) · **Macro** >300K–1M (`Macro`) · **Mega** >1M (`Mega`).
   - Avg View 7 ngày = Tổng view video 7 ngày / số video. **Tuyệt đối KHÔNG tính các video được ghim ("Đã ghim") nếu không nằm trong 7 ngày đăng** (nếu không rõ ngày: bỏ qua toàn bộ video ghim, dùng 6–9 video mới nhất không ghim, ghi rõ số video).
   - Mở kênh TikTok, xem video 7 ngày gần nhất để chọn **Style Content** và **Lĩnh vực** (đúng giá trị dropdown).
   - **Tự động điền ngay** vào dòng trống đầu tiên trong tab **`Data KOC Saga đi tiệc`** (file **`[0] KOC Boom (File điền Data)`**, ID `1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw`, gid `1065796303`) mà **không cần hỏi lại xác nhận**. Người tìm Data mặc định: `Thuận`.
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

## 5. Quy Tắc Ghi Nhận Workflow Mới
Mỗi khi hoàn thành hoặc thống nhất một quy trình làm việc/thao tác mới với người dùng, **bắt buộc phải chủ động hỏi**:
> *"Bạn có muốn tạo/lưu workflow cho quy trình này vào file `work-flow.md` để tự động hóa và ghi nhớ cho các lần sau không?"*
