import axios from 'axios';
import * as cheerio from 'cheerio';

async function test() {
  const url = 'https://www.tiktok.com/@d.y.q';
  const res = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      'Accept-Language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7',
    },
    timeout: 15000,
  });
  
  const $ = cheerio.load(res.data);
  const scriptUniversal = $('script#__UNIVERSAL_DATA_FOR_REHYDRATION__').html();
  if (scriptUniversal) {
    const data = JSON.parse(scriptUniversal);
    const userDetail = data?.__DEFAULT_SCOPE__?.['webapp.user-detail'];
    console.log('User stats:', JSON.stringify(userDetail?.userInfo?.stats, null, 2));
    console.log('User profile:', JSON.stringify(userDetail?.userInfo?.user, null, 2));
    
    // Check itemModule / videos
    const items = data?.__DEFAULT_SCOPE__?.['webapp.user-detail']?.itemList || [];
    console.log('Items length:', items.length);
  } else {
    console.log('No universal data');
  }
}

test().catch(e => console.error(e.message));
