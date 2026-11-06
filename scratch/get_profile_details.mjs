import fetch from 'node-fetch';

async function getProfileInfo(handle) {
  const url = `https://www.tiktok.com/@${handle}`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7'
      }
    });
    const html = await res.text();

    // Extract title
    const titleMatch = html.match(/<title>([^<]*)<\/title>/);
    const title = titleMatch ? titleMatch[1] : '';

    // Extract meta description
    const descMatch = html.match(/<meta name="description" content="([^"]*)"/);
    const desc = descMatch ? descMatch[1] : '';

    return { handle, title, desc: desc.slice(0, 200) };
  } catch (e) {
    return { handle, error: e.message };
  }
}

async function run() {
  const handles = ['tikkaisweird', 'levihbtt', 'dlinguyen', '_chanh_day_', 'thanhlamstu'];
  for (const h of handles) {
    console.log(await getProfileInfo(h));
  }
}

run();

