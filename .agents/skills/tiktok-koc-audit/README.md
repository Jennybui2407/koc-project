# 📦 Hướng Dẫn Cài Đặt & Sử Dụng: Skill TikTok KOC Audit Trên Antigravity IDE

Từ bước **gửi Gmail cấp quyền GitHub**, lấy mã **Google AI Studio**, đến cách **dán ảnh chụp màn hình TikTok tự động điền vào Google Sheet `Data KOC (11/2026)`**.

---

## 1. Tóm Tắt: Skill Này Giúp Gì Cho Bạn?

Thay vì phải nhìn ảnh chụp màn hình TikTok rồi gõ tay từng cột vào file **`[0] KOC Boom` (tab `Data KOC 11/2026`)**, với Skill này bạn **chỉ cần chụp màn hình kênh TikTok và dán vào khung chat Antigravity IDE**. AI sẽ tự làm hết mọi việc trong 3–5 giây:
1. **Tự đọc ảnh & lấy đủ thông tin**: Tự lấy Tên kênh, link TikTok, số lượng Followers, link Facebook/Instagram/Youtube, SĐT/Zalo/Email trong tiểu sử (Bio) và Tỉnh/Thành phố.
2. **Tự kiểm tra trùng trước khi điền**:
   * **Nếu đã có người nhập trong vòng 30 ngày qua**: AI tự động dừng ngay và báo rõ trùng ở dòng nào, ai tìm, ngày nào — không điền đè vào Sheet.
   * **Nếu đã nhập từ 2 tháng trước ($\ge 60$ ngày)**: Cho phép điền lại để liên hệ lại.
3. **Tự điền đúng dòng & giữ nguyên công thức Sheet**:
   * Tự điền lùi từ dưới lên vào các dòng trống đang có sẵn (ví dụ dòng 9 $\rightarrow$ 8 $\rightarrow$ 7... $\rightarrow$ 2); khi hết dòng trống mới tự tạo dòng mới ở dòng 2.
   * Tự chọn đúng mục Dropdown, chỗ nào không có thông tin tự ghi chữ `không có`, bảo vệ nguyên vẹn các ô công thức màu xanh (STT, số lần liên hệ) và giữ chuẩn chữ Nunito 9pt, độ cao dòng 32px.

---

## 2. Cơ Chế Hoạt Động (Hiểu Đơn Giản Trong 4 Bước)

| Bước | Chuyện gì diễn ra? |
| :--- | :--- |
| **Bước 1: Bạn dán ảnh vào chat** | Bạn chụp màn hình kênh TikTok của 1 hoặc nhiều KOC rồi dán thẳng vào ô chat của Antigravity IDE. |
| **Bước 2: AI đọc ảnh & kiểm tra trùng** | AI đọc toàn bộ chữ trên ảnh và dò trên tab `Data KOC (11/2026)` xem kênh này đã có ai nhập trong 30 ngày qua chưa. |
| **Bước 3: Tự điền vào Google Sheet** | Nếu chưa trùng, AI tự điền thông tin KOC vào dòng trống tiếp theo trên Sheet, giữ nguyên vẹn các cột công thức màu xanh. |
| **Bước 4: Báo kết quả cho bạn** | AI gửi lại bảng tóm tắt ngay trong khung chat kèm đường link để bạn bấm vào xem dòng vừa nhảy trên Google Sheet. |

---

## 3. Hướng Dẫn Cho Người LẦN ĐẦU Dùng Antigravity IDE
*(Không cần biết lập trình hay gõ lệnh kỹ thuật — chỉ cần làm theo 5 bước dưới đây, phần cài đặt đã có AI tự làm khi bạn copy câu mẫu dán vào chat!)*

### Bước 1: Tạo tài khoản GitHub & Gửi Gmail cho Thuận cấp quyền (Bắt buộc)
Vì kho chứa bộ công cụ trên GitHub là kho nội bộ (Private), bạn cần được cấp quyền trước khi tải về:
1. Truy cập [https://github.com](https://github.com) $\rightarrow$ bấm **Sign up** để đăng ký 1 tài khoản GitHub bằng Gmail công việc của bạn (nếu đã có tài khoản GitHub thì bỏ qua bước đăng ký).
2. **Nhắn tin gửi địa chỉ Gmail (hoặc tên tài khoản GitHub) của bạn cho Thuận** để Thuận thêm bạn vào dự án trên GitHub và cấp quyền chỉnh sửa Google Sheet `[0] KOC Boom`.
3. Sau khi Thuận báo đã thêm, bạn mở hộp thư Gmail $\rightarrow$ tìm email thư mời từ GitHub $\rightarrow$ bấm nút **"Accept Invitation"** (Chấp nhận lời mời) là tài khoản của bạn đã có quyền tải bộ công cụ.

### Bước 2: Cài phần mềm Antigravity IDE & Lấy mã Google AI Studio
1. Tải và cài đặt phần mềm **Antigravity IDE** lên máy tính, sau đó mở phần mềm và đăng nhập tài khoản Google của bạn.
2. **Lấy mã kết nối AI (Google AI Studio API Key)**:
   * Mở trình duyệt web, truy cập trang: [https://aistudio.google.com](https://aistudio.google.com)
   * Đăng nhập bằng tài khoản Gmail của bạn.
   * Nhìn góc trái màn hình, bấm vào nút **"Get API key"** $\rightarrow$ bấm tiếp nút **"Create API key"**.
   * Bấm nút **"Copy"** để sao chép đoạn mã vừa hiện ra (đoạn mã bắt đầu bằng chữ `AIza...`).
3. Dán mã API Key vào Antigravity IDE (nếu phần mềm yêu cầu nhập Key, hoặc bạn giữ mã đó để gửi cho AI tự lưu giúp).

### Bước 3: Nhờ AI tự tải bộ công cụ từ GitHub về máy cho bạn
1. Mở khung **Chat** ở phía bên phải màn hình Antigravity IDE.
2. Bạn **KHÔNG cần** tự gõ lệnh kỹ thuật. Hãy **copy nguyên câu dưới đây** dán vào khung Chat của Antigravity rồi nhấn **Enter**:
   ```text
   Hãy tải (clone) bộ công cụ KOC từ link GitHub https://github.com/Jennybui2407/koc-project.git về máy tính giúp tôi (lưu vào thư mục KOC trên Desktop). Nếu máy chưa đăng nhập GitHub thì hướng dẫn tôi bấm đăng nhập trên trình duyệt, tải xong thì nhắc tôi mở thư mục đó lên nhé.
   ```
3. Khi Antigravity hiện nút hỏi xác nhận (**Allow / Approve**), bạn bấm chọn **"Always Allow"** (Luôn cho phép). Nếu cửa sổ đăng nhập GitHub bật lên, bạn chỉ cần bấm **"Sign in with your browser"** $\rightarrow$ chọn tài khoản GitHub đã được Thuận cấp quyền ở Bước 1.
4. Sau khi AI báo đã tải xong, bạn bấm vào menu **File** (góc trên bên trái Antigravity) $\rightarrow$ chọn **Open Folder...** $\rightarrow$ chọn thư mục **`KOC`** trên Desktop.

### Bước 4: Nhờ AI tự cài đặt Skill & Kết nối Google Sheet (Chỉ làm 1 lần)
1. Sau khi đã mở thư mục `KOC`, bạn **copy nguyên câu dưới đây** dán vào khung Chat rồi nhấn **Enter**:
   ```text
   Hãy tự động cài đặt toàn bộ thư viện, môi trường và kết nối Google Sheet cho skill tiktok-koc-audit trong thư mục này giúp tôi. Nếu thiếu phần mềm nào trên máy thì tự cài giúp tôi luôn, đến bước đăng nhập Google thì bật trình duyệt lên cho tôi bấm nhé.
   ```
2. Nếu AI hiện nút hỏi quyền chạy, bạn cứ bấm **"Always Allow"** (Luôn cho phép).
3. Khi cửa sổ trình duyệt Google tự động bật lên $\rightarrow$ Bạn chọn tài khoản Gmail công việc của mình $\rightarrow$ bấm **Cho phép (Allow)** là hoàn tất 100% việc cài đặt!

### Bước 5: Cách dùng hàng ngày (Chỉ cần Chụp & Dán ảnh)
1. Mở trang TikTok của KOC $\rightarrow$ Chụp ảnh màn hình (trên Mac bấm `Cmd + Shift + 4`, trên Windows bấm `Win + Shift + S`).
2. **Dán thẳng ảnh vừa chụp (`Cmd + V` hoặc `Ctrl + V`) vào khung Chat Antigravity IDE** rồi nhấn **Enter** (không cần gõ chữ gì thêm).
3. Chờ 3–5 giây, AI sẽ tự kiểm tra trùng, tự điền vào Google Sheet `Data KOC (11/2026)` và gửi bảng kết quả kèm link Sheet ngay trong chat cho bạn!

> 💡 **Mẹo nhỏ cực tiện khi dùng**:
> * Bạn có thể dán **3–5 ảnh chụp màn hình của nhiều KOC khác nhau** vào cùng 1 tin nhắn, AI sẽ tự điền lần lượt từng bạn vào Sheet.
> * Mặc định cột Người phụ trách ghi tên `Thuận`. Nếu bạn muốn đổi thành tên mình, khi dán ảnh chỉ cần gõ kèm: *"Điền người phụ trách là [Tên bạn] nhé"*.

---

## 4. Hướng Dẫn Cho Người ĐÃ CÓ Sẵn Antigravity IDE Trên Máy

Nếu máy bạn đã cài sẵn Antigravity IDE và Google AI Studio rồi, bạn chỉ cần làm 2 bước sau:

### Bước 1: Đưa Gmail cho Thuận thêm vào GitHub (nếu chưa có quyền)
1. Gửi Gmail đăng ký GitHub của bạn cho Thuận để Thuận add vào kho GitHub nội bộ.
2. Mở Gmail bấm **"Accept Invitation"** từ thư mời của GitHub.

### Bước 2: Nhờ AI tự kéo từ GitHub về và kích hoạt Skill
1. Mở khung Chat của Antigravity IDE.
2. **Copy nguyên câu dưới đây** dán vào khung Chat rồi nhấn **Enter**:
   ```text
   Hãy kéo (clone hoặc pull) bản mới nhất từ GitHub https://github.com/Jennybui2407/koc-project.git về máy, tự động cài đặt đầy đủ thư viện và kích hoạt skill tiktok-koc-audit giúp tôi để tôi dán ảnh TikTok dùng được ngay.
   ```
3. Bấm **"Always Allow"** khi AI xin phép chạy. Nếu máy bạn chưa đăng nhập quyền Google Sheet lần nào, AI sẽ bật trình duyệt cho bạn bấm **Allow** tài khoản Gmail 1 lần là xong.

---

## 5. Câu Hỏi Thường Gặp Khi Sử Dụng

| Tình huống | Giải thích & Câu chat để nhờ AI xử lý |
| :--- | :--- |
| **AI báo không tải được từ GitHub (`Repository not found` / `Permission denied`)?** | Do Gmail/tài khoản GitHub của bạn chưa được Thuận add vào, hoặc bạn chưa mở Gmail bấm **"Accept Invitation"**. Hãy nhắn Thuận kiểm tra lại nhé. |
| **AI báo KOC bị trùng và không điền vào Sheet?** | Nghĩa là KOC này đã có người trong team điền vào Sheet trong vòng 30 ngày qua. AI tự động chặn lại để bạn không mất công liên hệ trùng. |
| **Có cập nhật mới trên GitHub thì làm sao lấy về?** | Bạn chỉ cần gõ vào khung chat: *"Hãy cập nhật (git pull) bản mới nhất từ GitHub về máy giúp tôi"* là AI tự cập nhật xong trong 2 giây. |
| **AI báo lỗi hết hạn đăng nhập Google Sheet?** | Bạn chỉ cần gõ vào khung chat: *"Mở lại đăng nhập Google giúp tôi"*, AI sẽ bật lại bảng đăng nhập trên trình duyệt để bạn bấm Cho phép (Allow). |
| **Làm sao để AI không hiện nút hỏi xác nhận (Allow) nữa?** | Khi nút Allow hiện ra ở khung chat, bạn bấm vào mũi tên nhỏ cạnh nút Allow và chọn **"Always Allow"** (Luôn cho phép). |
