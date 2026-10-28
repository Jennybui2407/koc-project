import axios from 'axios';
import * as cheerio from 'cheerio';

async function check() {
  try {
    const res = await axios.get('https://www.tiktok.com/@van.anhng_', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36',
        'Accept-Language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7',
      },
      timeout: 15000,
    });
    const $ = cheerio.load(res.data);
    const script = $('script#__UNIVERSAL_DATA_FOR_REHYDRATION__').html();
    if (script) {
      const data = JSON.parse(script);
      console.log('Script parsed. Scope keys:', Object.keys(data?.__DEFAULT_SCOPE__ || {}));
      const userDetail = data?.__DEFAULT_SCOPE__?.['webapp.user-detail'];
      console.log('User stats:', userDetail?.userInfo?.stats);
      const items = userDetail?.itemList || [];
      console.log('Items count:', items.length);
    } else {
      console.log('No universal data');
    }
  } catch (e) {
    console.log('Err:', e.message);
  }
}
check();
