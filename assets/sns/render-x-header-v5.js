// temaru X ヘッダー v5（1500x500）。主役＝BUYMA公式API対応（城主 10-17）。2週間無料は金のメダルで添える。
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
.title{position:absolute;left:812px;top:30px;height:92px;display:flex;align-items:center;gap:18px;color:#0b2350}
.title .logo{height:50px;filter:brightness(0) saturate(100%) invert(11%) sepia(46%) saturate(2600%) hue-rotate(205deg)}
.title .bar{width:3px;height:46px;background:#0b2350;opacity:.5}
.title .t{font-size:40px;font-weight:900;letter-spacing:.02em}
.darkband{position:absolute;left:735px;top:140px;width:860px;height:340px;background:linear-gradient(90deg,rgba(3,10,30,.9),rgba(6,22,58,.86));transform:skewX(-20deg);border-top:2px solid rgba(110,200,255,.7)}
.head{position:absolute;left:800px;top:160px;font-size:60px;font-weight:900;letter-spacing:.02em;color:#fff;text-shadow:0 3px 12px rgba(0,60,160,.6)}
.big{position:absolute;left:790px;top:232px;font-size:176px;font-weight:900;line-height:1;
  background:linear-gradient(180deg,#fff 0%,#c4e7ff 40%,#3aa3ff 100%);-webkit-background-clip:text;color:transparent;filter:drop-shadow(0 6px 16px rgba(30,130,255,.7))}
.medal{position:absolute;left:1240px;top:262px;width:210px;height:210px;border-radius:50%;
  background:radial-gradient(circle at 35% 30%,#2a3f6b,#0b1633 70%);
  box-shadow:0 0 0 5px #e9b949,0 0 0 9px rgba(255,215,110,.35),0 10px 30px rgba(0,0,0,.5);
  display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1.05}
.gold{background:linear-gradient(180deg,#fff7d6 0%,#ffd76a 38%,#d9a21e 72%,#fff0b0 100%);-webkit-background-clip:text;color:transparent;font-weight:900}
</style></head><body>
<img class="bg" src="${B(bg)}"><div class="shade"></div>
<div class="titleband"></div>
<div class="title"><img class="logo" src="${B(logo)}"><div class="bar"></div><div class="t">BUYMA出品ツール</div></div>
<div class="darkband"></div>
<div class="head">BUYMA公式API</div>
<div class="big">対応</div>
<div class="medal"><div class="gold" style="font-size:52px">2週間</div><div class="gold" style="font-size:78px">無料</div></div>
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
