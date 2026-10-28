import { PlatformType } from '../types/metrics.types.js';

export function detectPlatform(url: string): PlatformType {
  const lower = url.toLowerCase();
  if (lower.includes('tiktok.com') || lower.includes('vt.tiktok.com') || lower.includes('tt.site')) {
    return 'TikTok';
  }
  if (lower.includes('facebook.com') || lower.includes('fb.watch')) {
    return 'Facebook';
  }
  if (lower.includes('instagram.com')) {
    return 'Instagram';
  }
  if (lower.includes('threads.com') || lower.includes('threads.net')) {
    return 'Threads';
  }
  return 'Khác';
}

export function formatNumber(num?: number): string {
  if (num === undefined || num === null || isNaN(num)) return '-';
  return new Intl.NumberFormat('vi-VN').format(num);
}

export function formatDateTime(date: Date = new Date()): string {
  return date.toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    hour12: false,
  });
}
