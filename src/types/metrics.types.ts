export type PlatformType = 'TikTok' | 'Facebook' | 'Instagram' | 'Threads' | 'Khác';

export interface VideoMetricData {
  views: number;
  likes: number;
  comments: number;
  saves: number;
  shares: number;
  crawledAt: string;
}

export interface MetricRow {
  rowNumber: number;
  stt: string;
  kocName: string;
  platform: PlatformType;
  videoUrl: string;
  postDate: string;
  views24h?: number;
  likes24h?: number;
  comments24h?: number;
  saves24h?: number;
  shares24h?: number;
  updated24h?: string;
  views72h?: number;
  likes72h?: number;
  comments72h?: number;
  saves72h?: number;
  shares72h?: number;
  updated72h?: string;
  growthPercent?: string;
  status: string;
  notes?: string;
}
