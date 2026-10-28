import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export const config = {
  googleOAuthPath: process.env.GOOGLE_OAUTH_PATH || path.join(process.env.HOME || '', '.config/google-drive-mcp/gcp-oauth.keys.json'),
  googleTokensPath: process.env.GOOGLE_TOKENS_PATH || path.join(process.env.HOME || '', '.config/google-drive-mcp/tokens.json'),
  spreadsheetId: process.env.SPREADSHEET_ID || '1-gMFNOq7Z0XXEjC3bXN41XMUNDGW0teC5xGmRizQfgE',
  trackingSheetName: process.env.TRACKING_SHEET_NAME || 'Tracking KOC',
  metricsSheetName: process.env.METRICS_SHEET_NAME || 'Metrics Tracking',
  cronSchedule: process.env.CRON_SCHEDULE || '0 * * * *',
  requestTimeoutMs: Number(process.env.REQUEST_TIMEOUT_MS) || 15000,
};
