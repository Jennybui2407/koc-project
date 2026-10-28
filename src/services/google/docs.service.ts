import { google } from 'googleapis';
import { getGoogleAuthClient } from './auth.js';
import { logger } from '../../utils/logger.js';

export async function createGoogleDocReport(title: string, contentHtml: string): Promise<string> {
  const auth = await getGoogleAuthClient();
  const drive = google.drive({ version: 'v3', auth });

  logger.info(`Đang tạo file Google Doc báo cáo: "${title}"...`);

  // Drive API v3 can import HTML directly into a native Google Doc format!
  const res = await drive.files.create({
    requestBody: {
      name: title,
      mimeType: 'application/vnd.google-apps.document',
    },
    media: {
      mimeType: 'text/html',
      body: contentHtml,
    },
    fields: 'id, name, webViewLink',
  });

  const fileId = res.data.id || '';
  const webLink = res.data.webViewLink || `https://docs.google.com/document/d/${fileId}`;
  logger.success(`Đã tạo Google Doc thành công! ID: ${fileId} | Link: ${webLink}`);
  return webLink;
}
