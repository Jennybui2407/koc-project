---
trigger: always_on
---

# Quy Tắc Phân Tích Ảnh Chụp Màn Hình TikTok KOC

Khi người dùng gửi ảnh chụp kênh TikTok của KOC: làm đúng theo `work-flow.md` ở root project.

Điểm chính:
- File đích: `[0] KOC Boom (File điền Data)` → tab `Data KOC Saga đi tiệc`.
- Tự động điền thẳng vào dòng trống đầu tiên của sheet Data KOC Saga đi tiệc mà KHÔNG cần hỏi lại hay chờ xác nhận.
- Kiểm tra trùng trước khi thêm (nếu trùng thì dừng ngay lập tức tại bước 1).
- Không ghi vào tab `Tracking KOC` (chỉ khi KOC đã "Chốt book").
