import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

async function searchAll() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';

  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  for (const s of meta.data.sheets.slice(0, 10)) {
    const title = s.properties.title;
    try {
      const res = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `'${title}'!A1:Z100`,
      });
      const rows = res.data.values || [];
      for (let i = 0; i < rows.length; i++) {
        const line = (rows[i] || []).join(' ');
        if (line.toLowerCase().includes('flora216') || line.toLowerCase().includes('flora nói chậm')) {
          console.log(`Found in [${title}] row ${i + 1}: ${line}`);
        }
      }
    } catch (e) { }
  }
  console.log('Search completed.');
}

searchAll().catch(console.error);

