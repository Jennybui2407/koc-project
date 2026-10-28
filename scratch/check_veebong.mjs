import axios from 'axios';
import * as cheerio from 'cheerio';

async function check() {
  try {
    const res = await axios.get('https://www.tiktok.com/@veebongg', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36'
      }
    });
    const $ = cheerio.load(res.data);
    const script = $('script#__UNIVERSAL_DATA_FOR_REHYDRATION__').html();
    if (script) {
      const data = JSON.parse(script);
      const items = data?.__DEFAULT_SCOPE__?.['webapp.user-detail']?.itemList || [];
      console.log('Items count:', items.length);
    }
  } catch (e) {
    console.log('Err:', e.message);
  }
}
check();
