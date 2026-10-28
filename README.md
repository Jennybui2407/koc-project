# 🚀 KOC Campaign Automation System

Hệ thống tự động hóa quản trị chiến dịch KOC tích hợp **Google Workspace (Drive, Sheets, Docs)** và bộ cào chỉ số video mạng xã hội (**TikTok, Facebook Reels, Instagram Reels, Threads**).

---

## 🎯 Tính năng nổi bật

1. **Đồng bộ chỉ số tự động theo chu kỳ**:
   - **Mốc 24 Giờ**: Tự động tính toán thời gian từ lúc KOC lên bài để quét số liệu View, Tim, Comment ban đầu.
   - **Mốc 3 Ngày (72 Giờ)**: Tự động quét số liệu tích lũy sau 3 ngày và tính tỷ lệ tăng trưởng `% Tăng View`.
2. **Quản lý đa nền tảng**: Hỗ trợ nhận diện và bóc tách chỉ số từ các link TikTok (cả dạng link rút gọn `vt.tiktok.com`, `tt.site`), Facebook Reels, Instagram, Threads.
3. **Xuất báo cáo nghiệm thu tự động ra Google Docs**: Tự động tổng hợp số liệu tổng quan, tỷ lệ hoàn thành hợp đồng, top video viral và xuất ra tài liệu Google Doc định dạng chuẩn đẹp.
4. **Hỗ trợ chạy thủ công (CLI) & Chạy ngầm định kỳ (Cron Scheduler)**.

---

## 📁 Cấu trúc thư mục

```text
KOC/
├── .env                          # Biến môi trường (Sheet ID, OAuth paths)
├── package.json                  # Dependencies & npm scripts
├── tsconfig.json                 # Cấu hình TypeScript
│
├── src/
│   ├── config/                   # Cấu hình tập trung (env.ts, constants.ts)
│   ├── types/                    # Định nghĩa kiểu dữ liệu TypeScript
│   ├── services/
│   │   ├── google/               # Tích hợp Google Workspace (auth, sheets, docs)
│   │   ├── scrapers/             # Bộ cào dữ liệu TikTok, Meta (FB/IG/Threads)
│   │   └── reporter/             # Tổng hợp dữ liệu & template báo cáo Docs
│   ├── jobs/
│   │   ├── sync-metrics.job.ts   # Logic kiểm tra mốc 24h & 3 ngày
│   │   ├── weekly-report.job.ts  # Xuất báo cáo Google Docs
│   │   └── scheduler.ts          # Cron scheduler chạy ngầm
│   ├── cli/                      # Giao diện dòng lệnh
│   └── utils/                    # Logger, formatters, nhận diện domain
```

---

## 🛠 Hướng dẫn sử dụng

### 1. Đồng bộ chỉ số video (Mốc 24h & 3 ngày)
Chạy lệnh quét và cập nhật các video đến hạn vào tab `Metrics Tracking`:
```bash
npm run sync
```
*(Nếu muốn ép buộc quét tất cả các link: `npm run start -- sync --force`)*

### 2. Xuất báo cáo nghiệm thu ra Google Docs
Tự động tổng hợp toàn bộ chiến dịch và tạo ngay một file Google Doc mới:
```bash
npm run export
```

### 3. Chạy Scheduler nền tự động (Cron Daemon)
Chạy dịch vụ ngầm tự động quét mỗi tiếng một lần và xuất báo cáo hàng tuần:
```bash
npm run cron
```
