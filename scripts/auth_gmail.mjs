import http from 'http';
import url from 'url';
import fs from 'fs';
import { google } from 'googleapis';

const OAUTH_KEYS_PATH = '/Users/buingocthuan05/.config/google-drive-mcp/gcp-oauth.keys.json';
const TOKENS_PATH = '/Users/buingocthuan05/.config/google-drive-mcp/tokens.json';

const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/documents',
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/presentations',
  'https://www.googleapis.com/auth/gmail.compose',
];

async function runAuth() {
  if (!fs.existsSync(OAUTH_KEYS_PATH)) {
    console.error('OAuth keys not found at', OAUTH_KEYS_PATH);
    process.exit(1);
  }

  const keysRaw = JSON.parse(fs.readFileSync(OAUTH_KEYS_PATH, 'utf8'));
  const creds = keysRaw.installed || keysRaw.web;

  const port = 8085;
  const redirectUri = `http://localhost:${port}`;

  const oauth2Client = new google.auth.OAuth2(
    creds.client_id,
    creds.client_secret,
    redirectUri
  );

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: SCOPES,
  });

  const server = http.createServer(async (req, res) => {
    try {
      const parsedUrl = url.parse(req.url, true);
      const code = parsedUrl.query.code;

      if (code) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>Xác thực thành công!</h1><p>Bạn có thể đóng tab này và quay lại Antigravity.</p>');

        const { tokens } = await oauth2Client.getToken(code);
        console.log('\n[SUCCESS] Đã nhận token mới kèm quyền Gmail Compose!');

        let existingTokens = { defaultAccount: 'default', accounts: {} };
        if (fs.existsSync(TOKENS_PATH)) {
          existingTokens = JSON.parse(fs.readFileSync(TOKENS_PATH, 'utf8'));
        }

        const defaultAccount = existingTokens.defaultAccount || 'default';
        existingTokens.accounts[defaultAccount] = {
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token || existingTokens.accounts[defaultAccount]?.refreshToken,
          expiryDate: tokens.expiry_date,
          tokenType: tokens.token_type || 'Bearer',
          scope: tokens.scope,
        };

        fs.writeFileSync(TOKENS_PATH, JSON.stringify(existingTokens, null, 2), 'utf8');
        console.log('[SUCCESS] Đã lưu token vào:', TOKENS_PATH);

        server.close();
        process.exit(0);
      } else {
        res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('Không tìm thấy authorization code.');
      }
    } catch (e) {
      console.error('Lỗi khi lấy token:', e);
      res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('Lỗi xác thực: ' + e.message);
    }
  });

  server.listen(port, () => {
    console.log('\n======================================================');
    console.log('Vui lòng mở đường link sau trên trình duyệt để cấp quyền:');
    console.log('\n' + authUrl + '\n');
    console.log('======================================================\n');
  });
}

runAuth().catch(console.error);
