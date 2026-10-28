import axios from 'axios';
import * as cheerio from 'cheerio';

async function test() {
  const url = 'https://www.tiktok.com/@d.y.q/video/7699464090246401300';
  const res = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    }
  });
  const $ = cheerio.load(res.data);
  const scriptUniversal = $('script#__UNIVERSAL_DATA_FOR_REHYDRATION__').html();
  if (scriptUniversal) {
    const data = JSON.parse(scriptUniversal);
    const itemStruct = data?.__DEFAULT_SCOPE__?.['webapp.video-detail']?.itemInfo?.itemStruct;
    console.log('CreateTime:', itemStruct?.createTime, '-> Date:', new Date(Number(itemStruct?.createTime) * 1000).toLocaleString('vi-VN'));
    console.log('Desc:', itemStruct?.desc);
  }
}
test().catch(console.error);
