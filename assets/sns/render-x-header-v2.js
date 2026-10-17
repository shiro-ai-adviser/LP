// temaru X ヘッダー v2（1500x500）。むくさん型＝斜めの面＋大きな2ブロック＋小さな英字。人物なし・画像生成なし。
//   使い方: NODE_PATH=<playwrightのnode_modules> node render2.js <al-hero.png> <logo-white.png> <出力.png>
const fs = require('fs');
const { chromium } = require('playwright');
const [hero, logo, out] = process.argv.slice(2);
const HERO = 'data:image/png;base64,' + fs.readFileSync(hero).toString('base64');
const LOGO = 'data:image/png;base64,' + fs.readFileSync(logo).toString('base64');

// al-hero.png（1731x909）から切り出す。crop(x,y,w,h,表示倍率)
const crop = (x, y, w, h, s, cls = '') =>
  `<div class="crop ${cls}" style="width:${Math.round(w * s)}px;height:${Math.round(h * s)}px">
     <img src="${HERO}" style="left:${-Math.round(x * s)}px;top:${-Math.round(y * s)}px;width:${Math.round(1731 * s)}px"></div>`;

// ビルの影（右奥）。高さはばらばらに
let city = '';
const hs = [210, 300, 250, 360, 280, 420, 330, 260, 390, 300, 240, 350, 270, 310, 230, 380, 290, 250];
hs.forEach((h, i) => { city += `<i style="left:${560 + i * 52}px;height:${h}px;width:${34 + (i % 3) * 10}px"></i>`; });

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1500px;height:500px;overflow:hidden;position:relative;color:#fff;
  font-family:"Hiragino Sans","Hiragino Kaku Gothic ProN",sans-serif;
  background:radial-gradient(900px 500px at 18% 45%,#1f5fbf 0%,rgba(31,95,191,0) 60%),
             linear-gradient(115deg,#050d1f 0%,#0b2350 45%,#0a1a3c 70%,#050c1d 100%)}
.city{position:absolute;inset:0;opacity:.35}
.city i{position:absolute;bottom:0;background:linear-gradient(#2a4f8f,#0b1d40);
  box-shadow:inset 0 0 0 1px rgba(140,190,255,.12)}
.city i:after{content:"";position:absolute;inset:14px 8px;
  background:repeating-linear-gradient(0deg,rgba(255,220,150,.18) 0 3px,transparent 3px 14px)}
.ray{position:absolute;height:2px;background:linear-gradient(90deg,rgba(120,200,255,0),rgba(150,215,255,.9),rgba(120,200,255,0));transform:rotate(-24deg);filter:blur(.4px)}
.slab{position:absolute;transform:skewX(-22deg)}
.crop{position:relative;overflow:hidden;border-radius:12px}
.crop img{position:absolute}
.win{position:absolute;left:165px;top:34px;transform:perspective(900px) rotateY(16deg) rotateZ(-2deg);
  box-shadow:0 0 0 2px rgba(255,255,255,.65),0 0 60px 10px rgba(80,170,255,.55),0 30px 60px rgba(0,0,0,.5)}
.card{position:absolute;box-shadow:0 0 0 2px rgba(255,255,255,.7),0 0 30px 4px rgba(90,180,255,.5),0 12px 26px rgba(0,0,0,.45)}
.trail{position:absolute;left:30px;top:210px;width:250px;height:70px;border-radius:50%;
  background:radial-gradient(closest-side,rgba(150,220,255,.75),rgba(150,220,255,0));filter:blur(6px);transform:rotate(-12deg)}
.tag{position:absolute;left:640px;top:28px;font-size:21px;letter-spacing:.42em;color:#cfe3ff;font-weight:600}
.titleband{position:absolute;left:600px;top:76px;width:960px;height:104px;
  background:linear-gradient(90deg,rgba(255,255,255,.96),rgba(225,238,255,.9));transform:skewX(-22deg)}
.title{position:absolute;left:650px;top:84px;height:88px;display:flex;align-items:center;gap:26px;color:#0b2350}
.title .logo{height:62px}
.title .bar{width:3px;height:56px;background:#0b2350;opacity:.55}
.title .t{font-size:46px;font-weight:900;letter-spacing:.03em}
.darkband{position:absolute;left:560px;top:196px;width:1000px;height:270px;
  background:linear-gradient(90deg,rgba(4,12,32,.92),rgba(8,26,64,.86));transform:skewX(-22deg);
  border-top:2px solid rgba(110,190,255,.55)}
.sep{position:absolute;left:1000px;top:212px;width:3px;height:236px;background:linear-gradient(rgba(140,200,255,0),rgba(140,200,255,.85),rgba(140,200,255,0));transform:skewX(-22deg)}
.blk{position:absolute;top:212px;text-align:left}
.blk .s{font-size:30px;font-weight:800;letter-spacing:.04em;color:#e8f2ff}
.blk .big{font-weight:900;line-height:1;margin-top:6px;letter-spacing:-.01em}
.blue{background:linear-gradient(180deg,#ffffff 0%,#bfe4ff 40%,#3fa6ff 100%);-webkit-background-clip:text;color:transparent;
  filter:drop-shadow(0 4px 10px rgba(30,120,255,.55))}
.gold{background:linear-gradient(180deg,#fff7d6 0%,#ffd76a 38%,#d9a21e 70%,#fff0b0 100%);-webkit-background-clip:text;color:transparent;
  filter:drop-shadow(0 4px 10px rgba(255,190,60,.45))}
.blk .en{margin-top:16px;font-size:14px;letter-spacing:.5em;color:#9fc2ea;font-weight:600}
.glow{position:absolute;height:3px;border-radius:2px}
.vert{position:absolute;right:30px;top:36px;font-size:13px;letter-spacing:.3em;line-height:1;color:#a9c8ee;font-weight:600}
</style></head><body>
<div class="city">${city}</div>
<div class="ray" style="left:-60px;top:120px;width:700px"></div>
<div class="ray" style="left:420px;top:40px;width:520px;opacity:.6"></div>
<div class="ray" style="left:900px;top:470px;width:600px;opacity:.5"></div>
<div class="slab" style="left:470px;top:0;width:60px;height:500px;background:linear-gradient(rgba(40,120,255,.0),rgba(40,120,255,.55),rgba(40,120,255,0))"></div>

<div class="trail"></div>
<div class="win">${crop(592, 168, 430, 498, 0.8)}</div>
<div class="card" style="left:44px;top:96px;transform:rotate(-8deg)">${crop(98, 283, 138, 192, 0.62)}</div>
<div class="card" style="left:66px;top:236px;transform:rotate(5deg)">${crop(263, 310, 116, 176, 0.6)}</div>

<div class="tag">取り込んで、確認して、出品するだけ。</div>
<div class="titleband"></div>
<div class="title"><img class="logo" src="${LOGO}" style="filter:brightness(0) saturate(100%) invert(11%) sepia(46%) saturate(2600%) hue-rotate(205deg)"><div class="bar"></div><div class="t">BUYMA出品ツール</div></div>

<div class="darkband"></div>
<div class="sep"></div>
<div class="blk" style="left:668px">
  <div class="s">BUYMA公式API</div>
  <div class="big blue" style="font-size:132px">対応</div>
  <div class="glow" style="width:300px;margin-top:10px;position:relative;background:linear-gradient(90deg,rgba(80,170,255,0),#59b4ff,rgba(80,170,255,0))"></div>
  <div class="en">OFFICIAL API</div>
</div>
<div class="blk" style="left:1066px">
  <div class="s">まずは</div>
  <div class="big"><span class="gold" style="font-size:132px">2</span><span class="gold" style="font-size:64px">週間</span><span class="blue" style="font-size:64px;margin-left:8px">無料</span></div>
  <div class="glow" style="width:330px;margin-top:10px;position:relative;background:linear-gradient(90deg,rgba(255,200,80,0),#ffcf5a,rgba(255,200,80,0))"></div>
  <div class="en">FREE TRIAL</div>
</div>
<div class="vert">IMPORT × CHECK × LIST</div>
</body></html>`;

(async () => {
  const br = await chromium.launch({ channel: 'chrome' });
  const pg = await br.newPage({ viewport: { width: 1500, height: 500 } });
  await pg.setContent(html);
  await pg.evaluate(() => Promise.all([...document.images].map(i => i.decode())));
  await pg.screenshot({ path: out });
  await br.close();
})().catch(e => { console.error(e); process.exit(1); });
