import fetch from 'node-fetch';

async function getVideos() {
  const res = await fetch("https://www.tiktok.com/@doha_20.07", {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
  });
  const html = await res.text();
  // search for playCount or diggCount or video ids
  const plays = [...html.matchAll(/"playCount":\s*(\d+)/g)].map(m => parseInt(m[1]));
  console.log("Plays found:", plays);
  const reViews = [...html.matchAll(/>(\d+(\.\d+)?[KM]?)\s*<\/strong>/g)].map(m => m[1]);
  console.log("Strong tags:", reViews);
}

getVideos();

