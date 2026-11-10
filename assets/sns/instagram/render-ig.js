// temaru Instagram 最初の3投稿（1080x1350・4:5）。背景＝fal.ai 生成 bg-portrait.png（文字なし）。文字は HTML で重ねる。
//   プロフィールの格子は 3:4 で左右を約34pxずつ切る → 文字は x 70〜1010 に収める。
//   使い方: NODE_PATH=<playwrightのnode_modules> node render-ig.js <bg-portrait.png> <temaru-logo-white.png> <出力フォルダ>
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const [bg, logo, outDir] = process.argv.slice(2);
const B = p => 'data:image/png;base64,' + fs.readFileSync(p).toString('base64');
const base = `*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1350px;overflow:hidden;position:relative;color:#fff;background:#06173a;white-space:nowrap;
  font-family:"Hiragino Sans","Hiragino Kaku Gothic ProN",sans-serif}
.bg{position:absolute;left:-4px;top:0;width:1088px}
.fade{position:absolute;left:0;right:0;top:640px;bottom:0;background:linear-gradient(rgba(4,14,40,0),rgba(4,14,40,.55) 30%,rgba(4,14,40,.8))}
.logo{position:absolute;left:50%;transform:translateX(-50%);height:64px}
.c{position:absolute;left:0;right:0;text-align:center}
.blue{background:linear-gradient(180deg,#fff 0%,#c4e7ff 40%,#3aa3ff 100%);-webkit-background-clip:text;color:transparent;filter:drop-shadow(0 6px 18px rgba(30,130,255,.7))}
.gold{background:linear-gradient(180deg,#fff7d6 0%,#ffd76a 38%,#d9a21e 72%,#fff0b0 100%);-webkit-background-clip:text;color:transparent;filter:drop-shadow(0 6px 18px rgba(255,190,60,.5))}
.sub{font-size:46px;font-weight:800;letter-spacing:.06em;color:#dbeaff}`;
const posts = {
  '01_公式API対応': `
    <div class="c sub" style="top:760px">BUYMA出品支援ツール</div>
    <div class="c blue" style="top:840px;font-size:150px;font-weight:900;line-height:1">公式API</div>
    <div class="c blue" style="top:1000px;font-size:150px;font-weight:900;line-height:1">対応</div>
    <img class="logo" style="top:1210px" src="${B(logo)}">`,
  '02_出品は3ステップ': `
    <div class="c" style="top:740px;font-size:76px;font-weight:900;letter-spacing:.03em">出品は、3ステップ。</div>
    <div style="position:absolute;left:150px;top:880px;display:flex;flex-direction:column;gap:34px">
      ${['商品情報を取り込む', '内容を確認する', '出品する'].map((t, i) => `<div style="display:flex;align-items:center;gap:30px">
        <div style="width:84px;height:84px;border-radius:50%;background:linear-gradient(180deg,#5cc0ff,#1f7fe0);display:flex;align-items:center;justify-content:center;font-size:48px;font-weight:900;box-shadow:0 6px 18px rgba(30,130,255,.55)">${i + 1}</div>
        <div style="font-size:60px;font-weight:800">${t}</div></div>`).join('')}
    </div>
    <img class="logo" style="top:1236px;height:52px" src="${B(logo)}">`,
  '03_2週間無料': `
    <div class="c sub" style="top:740px">まずは</div>
    <div class="c gold" style="top:810px;font-size:190px;font-weight:900;line-height:1">2週間</div>
    <div class="c gold" style="top:1010px;font-size:120px;font-weight:900;line-height:1">無料</div>
    <div class="c" style="top:1170px;font-size:42px;font-weight:700;color:#dbeaff">プロフィールのリンクから試せます</div>
    <img class="logo" style="top:1252px;height:48px" src="${B(logo)}">`,
};
(async () => {
  const br = await chromium.launch({ channel: 'chrome' });
  const pg = await br.newPage({ viewport: { width: 1080, height: 1350 } });
  for (const [name, inner] of Object.entries(posts)) {
    await pg.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${base}</style></head><body>
      <img class="bg" src="${B(bg)}"><div class="fade"></div>${inner}</body></html>`);
    await pg.evaluate(() => Promise.all([...document.images].map(i => i.decode())));
    await pg.screenshot({ path: path.join(outDir, `temaru_ig_${name}.png`) });
  }
  await br.close();
})().catch(e => { console.error(e); process.exit(1); });
