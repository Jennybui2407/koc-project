import fetch from 'node-fetch';

async function test() {
  const res = await fetch("https://www.tiktok.com/@doha_20.07", {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
  });
  const html = await res.text();
  const scriptMatch = html.match(/<script id="__UNIVERSAL_DATA_FOR_REHYDRATION__"[^>]*>([\s\S]*?)<\/script>/);
  if (scriptMatch) {
    const data = JSON.parse(scriptMatch[1]);
    const userDetail = data["__DEFAULT_SCOPE__"]?.["webapp.user-detail"]?.userInfo;
    console.log("userInfo bioLink:", JSON.stringify(userDetail?.user?.bioLink));
    console.log("userInfo signature:", JSON.stringify(userDetail?.user?.signature));
    console.log("itemList length:", data["__DEFAULT_SCOPE__"]?.["webapp.user-detail"]?.itemList?.length);
    const itemList = data["__DEFAULT_SCOPE__"]?.["webapp.user-detail"]?.itemList || [];
    itemList.slice(0, 10).forEach(item => {
      console.log("video:", item.id, "stats:", item.stats, "desc:", item.desc);
    });
  } else {
    console.log("No script match found");
  }
}

test();

