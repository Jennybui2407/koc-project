import axios from 'axios';
import * as cheerio from 'cheerio';

const vids = [
  '7699347107378892052',
  '7699092582634097941',
  '7698969278623698196',
  '7698603889989389588',
  '7698347895342288149',
  '7697482189205769473',
  '7696881845761215765',
];

async function checkDates() {
  for (const id of vids) {
    try {
      const url = `https://www.tiktok.com/@diqueengdaily/video/${id}`;
      const res = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36'
        },
        timeout: 10000
      });
      const $ = cheerio.load(res.data);
      const scriptUniversal = $('script#__UNIVERSAL_DATA_FOR_REHYDRATION__').html();
      if (scriptUniversal) {
        const data = JSON.parse(scriptUniversal);
        const item = data?.__DEFAULT_SCOPE__?.['webapp.video-detail']?.itemInfo?.itemStruct;
        const time = Number(item?.createTime);
        const date = new Date(time * 1000).toLocaleString('vi-VN');
        const views = item?.stats?.playCount;
        console.log(`Video ${id}: Date = ${date}, Views = ${views}, Desc = ${item?.desc?.substring(0, 30)}`);
      }
    } catch (e) {
      console.log(`Error ${id}:`, e.message);
    }
  }
}

checkDates();
