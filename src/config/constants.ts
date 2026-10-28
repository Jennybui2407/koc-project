export const KOC_STATUSES = [
  '1. Chốt làm hợp đồng',
  '2. KB, TP, ĐĐ',
  '3. Xuất SP, xác nhận lịch',
  '4. Gửi demo',
  '5. Check final',
  '6. Nghiệm thu',
] as const;

export const METRIC_TRACKING_STATUS = {
  PENDING_24H: 'Chờ cập nhật 24h',
  UPDATED_24H: 'Đã cập nhật 24h',
  COMPLETED_72H: 'Đã hoàn thành 72h',
  FAILED: 'Lỗi cào dữ liệu',
} as const;

export const PLATFORMS = {
  TIKTOK: 'TikTok',
  FACEBOOK: 'Facebook',
  INSTAGRAM: 'Instagram',
  THREADS: 'Threads',
  UNKNOWN: 'Khác',
} as const;
