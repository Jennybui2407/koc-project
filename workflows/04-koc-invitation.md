# Workflow 4: Soạn Tin Nhắn Zalo & Email Mời KOC Tham Gia Dự Án

> **Áp dụng khi**: Người dùng yêu cầu *"liên hệ [Tên KOC]"*, *"gửi tên KOC kêu liên hệ"*, *"soạn tin liên hệ"*, *"viết tin nhắn mời KOC"*, *"viết mail mời KOC"*, hoặc chỉ định mời 1 KOC cụ thể trong sheet.
> **Quy tắc thực thi**: Đã hoàn tất testing — **Tự động tra cứu, tạo Gmail Draft dạng HTML in đậm và xuất tin nhắn Zalo/IG/FB 100% không cần hỏi lại**.

---

## 1. Nguồn Dữ Liệu & Thư Viện Mẫu

| Mục | Chi tiết |
| :--- | :--- |
| **File Thư viện Mẫu** | **`[Booking KOC] TIN NHẮN & MAIL MẪU`** (ID: `1GMlmUQbsl2Dev6u0b3FIOdE1BPKWWlgiXSILC1CUcyo`) |
| **Tab Zalo** | Gồm 4 mẫu: `Z01` (KOC nhỏ), `Z02` (KOC lớn), `Z03` (Quản lý KOC nhỏ), `Z04` (Quản lý KOC lớn) |
| **Tab Email** | Gồm 5 mẫu: `E01` (KOC nhỏ), `E02` (KOC lớn), `E03` (Family/Couple), `E04` (Quản lý KOC nhỏ), `E05` (Quản lý KOC lớn) |
| **File Data KOC** | Tab **`Data KOC Saga đi tiệc`** (ID: `1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw`, gid: `1065796303`) |
| **Link SP KOC Nhỏ** | https://docs.google.com/spreadsheets/d/1w7-kSEP_EIWazCEQqNLlAxOBxBhPnXAlnibRd_aFlwc/edit?gid=0#gid=0 |
| **Link SP KOC Lớn** | https://docs.google.com/spreadsheets/d/18TcUSlDWNbVZeZ6ZYxmstdQkd55F6SkuGBTwwPsWSSM/edit?gid=1868563297#gid=1868563297 |

---

## 2. Quy Tắc Tự Động Phân Loại & Điều Hướng

Khi nhận Tên KOC (hoặc @username / STT):
1. **Đọc sheet `Data KOC Saga đi tiệc`**:
   - **Xác định Tier (Cột F)**: Nano / Review/Aff / Micro (<300K follow) $\rightarrow$ **KOC Nhỏ**; Macro / Mega (>300K follow) $\rightarrow$ **KOC Lớn**.
   - **Xác định Đối tượng**: Kiểm tra Cột G (Style Content) & Cột H (Lĩnh vực). Nếu là `Couple` / `Gia đình` $\rightarrow$ Áp dụng mẫu **Family/Couple (`E03`)**.
   - **Xác định Quản lý (Manager/Agency)**: Kiểm tra Cột J (Thông tin liên hệ) & Cột O (Ghi chú). Nếu có từ khóa quản lý (`Ms`, `Mr`, `Manager`, `For work`, `JANE`...) $\rightarrow$ Áp dụng mẫu **Quản lý (`Z03/Z04/E04/E05`)**.
2. **Kênh Tiếp Cận & Định Dạng Đầu Ra**:
   - **Nếu KOC có Email**: Tự động tạo **Bản nháp (Draft)** trong hộp thư Gmail bằng Gmail API dạng **HTML**:
     - **Tô đậm (`<b>`)** các thông tin quan trọng: Tên KOC, Thương hiệu Saga & Đồng Hồ Hải Triều, Tên Campaign, Điểm mạnh visual của KOC, Yêu cầu media kit/báo giá hoặc link chọn mẫu.
     - **Quy chuẩn bắt buộc**: Bỏ phần thông tin liên hệ nhanh (để người dùng dùng chữ ký có sẵn của Gmail), và bỏ dấu bullet ở phần link tham khảo thêm.
   - **Nếu KOC có SĐT (Zalo)**: Xuất tin nhắn Zalo chuẩn (Z01-Z04) dạng codeblock trong chat để người dùng 1-click copy gửi.
   - **Nếu KOC chỉ có Instagram / Facebook**: Xuất tin nhắn cá nhân hóa dạng DM trong chat để copy gửi trực tiếp qua IG/FB.

---

## 3. Thư Viện Mẫu Tin Nhắn Zalo

### Mẫu 1: Zalo gửi trực tiếp KOC Nhỏ (Barter Deal liền - `Z01`)
```text
Hi chị [Tên KOC] ơi, em là Thuận, người phụ trách dự án Saga Đi Tiệc của Đồng Hồ Hải Triều 🥰

Saga là thương hiệu đồng hồ nữ đính đá cao cấp thành lập tại Mỹ từ năm 1950, hiện được phân phối chính hãng độc quyền tại Việt Nam bởi Hải Triều ạ. 

Bên em đang triển khai campaign "Saga Đi Tiệc" và rất thích phong cách nữ tính, sang xịn của chị nên muốn mời chị đồng hành cùng dự án lần này ạ 💗

Dự án bên em đang triển khai theo hình thức barter deal tặng sản phẩm, chị có thể chủ động chọn mẫu mình yêu thích trong list này nha:
👉 Link chọn mẫu: https://docs.google.com/spreadsheets/d/1w7-kSEP_EIWazCEQqNLlAxOBxBhPnXAlnibRd_aFlwc/edit?gid=0#gid=0

Chị xem qua list mẫu, nếu ưng mắt thiết kế nào thì báo em để em gửi đồng hồ đến chị trải nghiệm và trao đổi cụ thể hơn nhé ạ 🥰
```

### Mẫu 2: Zalo gửi trực tiếp KOC Lớn (Không nói barter liền - `Z02`)
```text
Hi chị [Tên KOC] ơi, em là Thuận, người phụ trách dự án Saga Đi Tiệc của Đồng Hồ Hải Triều 🥰

Saga là thương hiệu đồng hồ nữ đính đá cao cấp thành lập tại Mỹ từ 1950, nổi bật với các thiết kế tinh xảo, nữ tính và cực kỳ tôn dáng khi phối đồ đi tiệc, hiện do Hải Triều phân phối chính hãng độc quyền tại Việt Nam.

Bên em đang triển khai chiến dịch "Saga Đi Tiệc" và thấy visual cùng thần thái sang trọng của chị cực kỳ ăn khớp với định vị dòng sản phẩm lần này, nên bên em rất mong muốn được mời chị đồng hành cùng dự án ạ ✨

Em gửi chị tham khảo trước các thiết kế chủ đạo bên em đang chạy cho chiến dịch nhé:
👉 Link BST: https://docs.google.com/spreadsheets/d/18TcUSlDWNbVZeZ6ZYxmstdQkd55F6SkuGBTwwPsWSSM/edit?gid=1868563297#gid=1868563297

Không biết chị [Tên KOC] có đang nhận job/hợp tác dịp này không ạ? Nếu được, em rất hy vọng có cơ hội trao đổi thêm với chị về định hướng hợp tác hoặc hình thức phù hợp nhất với chị nhé ạ 💗
```

### Mẫu 3: Zalo gửi Quản lý / Manager của KOC (`Z03`/`Z04`)
```text
Dạ em chào anh/chị [Tên Quản lý], em là Thuận, phụ trách dự án KOC của thương hiệu đồng hồ Saga (phân phối bởi Đồng Hồ Hải Triều) ạ.

Saga là thương hiệu đồng hồ nữ đính đá cao cấp từ Hoa Kỳ (1950), nổi bật với các thiết kế sang trọng, thanh lịch cho phái đẹp.

Hiện tại bên em đang triển khai chiến dịch "Saga Đi Tiệc" và nhận thấy phong cách, hình ảnh của bạn [Tên KOC] vô cùng phù hợp với thông điệp và tinh thần của dự án lần này, nên bên em rất mong muốn có cơ hội được hợp tác cùng bạn ạ.

Em gửi anh/chị tham khảo trước list sản phẩm chủ đạo trong chiến dịch:
👉 Link sản phẩm: [Link tương ứng theo tier KOC]

Anh/chị hỗ trợ cho em xin thông tin quy trình làm việc cũng như hướng hợp tác/ratecard phù hợp của bạn [Tên KOC] trong giai đoạn này với nhé ạ. Em cảm ơn anh/chị rất nhiều!
```

---

## 4. Thư Viện Mẫu Email Chuẩn

### Mẫu 1: Email gửi KOC Nhỏ (Barter Deal liền - `E01`)
```text
Tiêu đề: [LỜI MỜI ĐỒNG HÀNH CÙNG SAGA] Chiến dịch "Saga Đi Tiệc" x [Tên KOC]

Dear [Tên KOC],

Mình là Thuận, người phụ trách dự án Saga đi tiệc – thương hiệu đồng hồ nữ đính đá cao cấp được thành lập tại Hoa Kỳ năm 1950, hiện được phân phối tại Việt Nam bởi đại lý ủy quyền Đồng Hồ Hải Triều.

Trong campaign lần này, Saga mong muốn mang đến những gợi ý đồng hồ tinh tế, sang trọng, giúp phái đẹp hoàn thiện phong cách và tự tin tỏa sáng trong những buổi tiệc.

Xem chi tiết dự án: [Tại đây]

Thông qua hình ảnh và nội dung [Tên KOC] đang xây dựng, team nhận thấy phong cách của bạn rất phù hợp với tinh thần nữ tính, thanh lịch và tinh tế mà Saga hướng đến. Đặc biệt, team tin rằng những chia sẻ của bạn sẽ giúp truyền tải một cách tự nhiên cách lựa chọn đồng hồ như một điểm nhấn hoàn thiện outfit đi tiệc.

Vì vậy, team Saga rất mong muốn mời bạn đồng hành cùng dự án Saga đi tiệc lần này.

Hình thức hợp tác:
- Saga gửi tặng sản phẩm đồng hồ chính hãng để bạn trải nghiệm và sáng tạo nội dung theo định hướng campaign.
- Bạn được chủ động lựa chọn mẫu đồng hồ yêu thích trong danh sách:
👉 Link chọn mẫu: https://docs.google.com/spreadsheets/d/1w7-kSEP_EIWazCEQqNLlAxOBxBhPnXAlnibRd_aFlwc/edit?gid=0#gid=0

Mình rất mong nhận được phản hồi và có cơ hội đồng hành cùng bạn trong dự án lần này.

Tham khảo thêm về Saga Vietnam và Đồng Hồ Hải Triều:
Đồng Hồ Hải Triều: https://donghohaitrieu.com/gioi-thieu-ve-dong-ho-hai-trieu
Fanpage Facebook: https://www.facebook.com/sagavietnamofficial
Instagram: https://www.instagram.com/sagavietnamofficial/
Website Saga: https://sagavietnam.com/
Saga tại Đồng Hồ Hải Triều: https://donghohaitrieu.com/brand/saga
```

### Mẫu 2: Email gửi KOC Lớn (Không nói barter liền - `E02`)
```text
Tiêu đề: [LỜI MỜI HỢP TÁC ĐỒNG HÀNH] Chiến dịch "Saga Đi Tiệc" x [Tên KOC]

Dear [Tên KOC],

Mình là Thuận, người phụ trách dự án Saga đi tiệc – thương hiệu đồng hồ nữ đính đá cao cấp được thành lập tại Hoa Kỳ năm 1950, hiện được phân phối tại Việt Nam bởi đại lý ủy quyền Đồng Hồ Hải Triều.

Với campaign lần này, Saga mong muốn truyền tải hình ảnh chiếc đồng hồ như một điểm nhấn tinh tế, giúp phái đẹp hoàn thiện phong cách và thể hiện dấu ấn cá nhân trong những dịp dự tiệc.

Xem chi tiết dự án: [Tại đây]

Thông qua hình ảnh và nội dung [Tên KOC] đang xây dựng, team rất ấn tượng với phong cách [điền điểm nổi bật phù hợp với KOC: thanh lịch, thời thượng, sang trọng...]. Team nhận thấy hình ảnh của bạn có sự phù hợp với tinh thần thời trang mà Saga hướng đến, đồng thời có thể mang đến góc nhìn riêng về cách lựa chọn phụ kiện để hoàn thiện diện mạo khi đi tiệc.

Vì vậy, Saga rất mong có cơ hội mời bạn đồng hành cùng dự án Saga đi tiệc lần này.

Nếu quan tâm đến lời mời hợp tác, bạn có thể chia sẻ giúp mình thông tin để team có thêm thông tin trao đổi về phương án hợp tác phù hợp nhé.

Mình rất mong nhận được phản hồi và có cơ hội đồng hành cùng bạn trong dự án lần này.

Tham khảo thêm về Saga Vietnam và Đồng Hồ Hải Triều:
Đồng Hồ Hải Triều: https://donghohaitrieu.com/gioi-thieu-ve-dong-ho-hai-trieu
Fanpage Facebook: https://www.facebook.com/sagavietnamofficial
Instagram: https://www.instagram.com/sagavietnamofficial/
Website Saga: https://sagavietnam.com/
Saga tại Đồng Hồ Hải Triều: https://donghohaitrieu.com/brand/saga
```

### Mẫu 3: Email gửi Quản lý / Manager của KOC (`E04`/`E05`)
```text
Tiêu đề: [LỜI MỜI HỢP TÁC ĐỒNG HÀNH] Chiến dịch "Saga Đi Tiệc" x Talent [Tên KOC]

Kính gửi Quý Quản lý / Đại diện truyền thông của Talent [Tên KOC],

Em là Thuận, người phụ trách dự án Saga đi tiệc – thương hiệu đồng hồ nữ đính đá cao cấp được thành lập tại Hoa Kỳ năm 1950, hiện được phân phối tại Việt Nam bởi đại lý ủy quyền Đồng Hồ Hải Triều.

Trong campaign lần này, Saga mong muốn mang đến những gợi ý đồng hồ tinh tế, sang trọng, giúp phái đẹp hoàn thiện phong cách và tự tin tỏa sáng trong những buổi tiệc.

Xem chi tiết dự án: [Tại đây]

Thông qua hình ảnh và chặng đường hoạt động của [Tên KOC], team nhận thấy phong cách, thần thái sang trọng và gu thẩm mỹ của bạn vô cùng phù hợp với thông điệp và tinh thần mà Saga hướng đến trong chiến dịch lần này.

Vì vậy, team Saga rất mong muốn được gửi lời mời hợp tác đến Talent [Tên KOC] cùng đồng hành trong dự án Saga đi tiệc.

Em gửi Quý Quản lý tham khảo trước danh mục các thiết kế chủ đạo của chiến dịch:
👉 Danh sách BST Saga Đi Tiệc: [Link KOC lớn hoặc nhỏ tương ứng]

Nhờ Quý Quản lý chia sẻ giúp em thông tin về quy trình làm việc, lịch trình cũng như ratecard / định hướng hợp tác phù hợp nhất của bạn [Tên KOC] trong giai đoạn này với nhé ạ.

Em rất mong nhận được phản hồi từ Quý Quản lý và hy vọng có cơ hội hợp tác cùng bạn trong dự án lần này.

Tham khảo thêm về Saga Vietnam và Đồng Hồ Hải Triều:
Đồng Hồ Hải Triều: https://donghohaitrieu.com/gioi-thieu-ve-dong-ho-hai-trieu
Fanpage Facebook: https://www.facebook.com/sagavietnamofficial
Instagram: https://www.instagram.com/sagavietnamofficial/
Website Saga: https://sagavietnam.com/
Saga tại Đồng Hồ Hải Triều: https://donghohaitrieu.com/brand/saga
```
