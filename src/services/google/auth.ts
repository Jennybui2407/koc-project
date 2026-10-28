import { google } from 'googleapis';
import fs from 'fs';
import { config } from '../../config/env.js';
import { logger } from '../../utils/logger.js';

let cachedClient: any = null;

export async function getGoogleAuthClient() {
  if (cachedClient) return cachedClient;

  try {
    if (!fs.existsSync(config.googleOAuthPath)) {
      throw new Error(`OAuth credentials not found at ${config.googleOAuthPath}`);
    }
    if (!fs.existsSync(config.googleTokensPath)) {
      throw new Error(`Tokens file not found at ${config.googleTokensPath}`);
    }

    const credsRaw = JSON.parse(fs.readFileSync(config.googleOAuthPath, 'utf8'));
    const creds = credsRaw.installed || credsRaw.web;
    const tokensRaw = JSON.parse(fs.readFileSync(config.googleTokensPath, 'utf8'));
    const defaultAccount = tokensRaw.defaultAccount || 'default';
    const account = tokensRaw.accounts[defaultAccount];

    if (!account) {
      throw new Error(`No credentials found for account "${defaultAccount}" in tokens.json`);
    }

    const oauth2Client = new google.auth.OAuth2(
      creds.client_id,
      creds.client_secret,
      creds.redirect_uris ? creds.redirect_uris[0] : 'http://localhost'
    );

    oauth2Client.setCredentials({
      access_token: account.accessToken,
      refresh_token: account.refreshToken,
      expiry_date: account.expiryDate,
      token_type: account.tokenType || 'Bearer',
      scope: account.scope,
    });

    // Handle token refresh automatically
    oauth2Client.on('tokens', (newTokens) => {
      logger.info('Google OAuth token refreshed. Saving to tokens.json...');
      if (newTokens.access_token) {
        account.accessToken = newTokens.access_token;
      }
      if (newTokens.refresh_token) {
        account.refreshToken = newTokens.refresh_token;
      }
      if (newTokens.expiry_date) {
        account.expiryDate = newTokens.expiry_date;
      }
      tokensRaw.accounts[defaultAccount] = account;
      fs.writeFileSync(config.googleTokensPath, JSON.stringify(tokensRaw, null, 2), 'utf8');
    });

    cachedClient = oauth2Client;
    return oauth2Client;
  } catch (error: any) {
    logger.error('Failed to initialize Google Auth client:', error.message);
    throw error;
  }
}
