// temaru X ヘッダー v6（1500x500）。城主 10-17「公式API対応が一番目立って、BUYMA出品支援ツール・2週間無料が伝わればいい。情報量は少なく」
//   実際の表示幅は約600px（0.4倍）なので、文字は 38px 以上だけ使う（表示で15px以上）。
//   使い方: NODE_PATH=<playwrightのnode_modules> node render5.js <bg.png（gen/bg1.png）> <logo.png> <出力.png>
const fs = require('fs');
const { chromium } = require('playwright');
const [bg, logo, out] = process.argv.slice(2);
const B = p => 'data:image/png;base64,' + fs.readFileSync(p).toString('base64');
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1500px;height:500px;overflow:hidden;position:relative;color:#fff;background:#0b2350;white-space:nowrap;
  font-family:"Hiragino Sans","Hiragino Kaku Gothic ProN",sans-serif}
.bg{position:absolute;left:0;top:-57px;width:1500px}
.shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(5,14,36,0) 45%,rgba(5,14,36,.35) 62%,rgba(5,14,36,.55) 100%)}
.titleband{position:absolute;left:770px;top:30px;width:800px;height:92px;background:linear-gradient(90deg,rgba(255,255,255,.97),rgba(232,242,255,.93));transform:skewX(-20deg);box-shadow:0 10px 30px rgba(0,10,40,.35)}
.title{position:absolute;left:808px;top:30px;height:92px;display:flex;align-items:center;gap:14px;color:#0b2350}
.title .logo{height:44px;filter:brightness(0) saturate(100%) invert(11%) sepia(46%) saturate(2600%) hue-rotate(205deg)}
.title .bar{width:3px;height:46px;background:#0b2350;opacity:.5}
.title .t{font-size:34px;font-weight:900;letter-spacing:.02em}
.darkband{position:absolute;left:735px;top:140px;width:860px;height:340px;background:linear-gradient(90deg,rgba(3,10,30,.9),rgba(6,22,58,.86));transform:skewX(-20deg);border-top:2px solid rgba(110,200,255,.7)}
.head{position:absolute;left:806px;top:168px;font-size:46px;font-weight:900;letter-spacing:.08em;color:#cfe6ff}
.big{position:absolute;left:792px;top:226px;font-size:110px;font-weight:900;line-height:1;letter-spacing:-.01em;
  background:linear-gradient(180deg,#fff 0%,#c4e7ff 40%,#3aa3ff 100%);-webkit-background-clip:text;color:transparent;filter:drop-shadow(0 6px 16px rgba(30,130,255,.7))}
.pill{position:absolute;left:806px;top:378px;height:80px;padding:0 34px;border-radius:40px;display:flex;align-items:center;
  background:linear-gradient(180deg,#ffe58a,#e2aa2a);box-shadow:0 0 0 3px rgba(255,240,190,.5),0 10px 26px rgba(0,0,0,.45);
  color:#3a2600;font-size:50px;font-weight:900;letter-spacing:.04em}
</style></head><body>
<img class="bg" src="${B(bg)}"><div class="shade"></div>
<div class="titleband"></div>
<div class="title"><img class="logo" src="${B(logo)}"><div class="bar"></div><div class="t">BUYMA出品支援ツール</div></div>
<div class="darkband"></div>
<div class="head">BUYMA</div>
<div class="big">公式API対応</div>
<div class="pill">2週間無料</div>
</body></html>`;
(async () => {
  const br = await chromium.launch({ channel: 'chrome' });
  const pg = await br.newPage({ viewport: { width: 1500, height: 500 } });
  await pg.setContent(html);
  await pg.evaluate(() => Promise.all([...document.images].map(i => i.decode())));
  await pg.screenshot({ path: out });
  // X の実際の表示幅（600px）で見た時の確認用
  await pg.setViewportSize({ width: 1500, height: 500 });
  await br.close();
})().catch(e => { console.error(e); process.exit(1); });
