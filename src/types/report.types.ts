export interface CampaignSummary {
  totalKoc: number;
  totalVideos: number;
  statusBreakdown: Record<string, number>;
  totalViews24h: number;
  totalLikes24h: number;
  totalComments24h: number;
  totalSaves24h?: number;
  totalShares24h?: number;
  totalViews72h: number;
  topPerformingVideos: Array<{
    kocName: string;
    platform: string;
    videoUrl: string;
    views: number;
  }>;
  generatedAt: string;
}
