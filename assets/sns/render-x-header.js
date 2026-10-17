// temaru X ヘッダー（1500x500）を HTML で組んで PNG にする。素材はLPと同じもの。
//   使い方: NODE_PATH=<playwrightのnode_modules> node render.js <hero.png> <logo.png> <出力.png> [preview.png]
const fs = require('fs');
const { chromium } = require('playwright');
const [hero, logo, out, preview] = process.argv.slice(2);
const b64 = p => 'data:image/png;base64,' + fs.readFileSync(p).toString('base64');

// 下地の絵（1731x909）の x0〜1040・y150〜909 を高さ500に収める
const S = 500 / 759;
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1500px;height:500px;background:#fcf6f0;font-family:"Hiragino Sans","Hiragino Kaku Gothic ProN",sans-serif;color:#16334c;overflow:hidden;position:relative}
.art{position:absolute;left:${1500 - Math.round(1040 * S) - 20}px;top:0;width:${Math.round(1040 * S)}px;height:500px;overflow:hidden}
.art img{position:absolute;left:0;top:${-Math.round(150 * S)}px;width:${Math.round(1731 * S)}px}
.art:after{content:"";position:absolute;inset:0 auto 0 0;width:90px;background:linear-gradient(90deg,#fcf6f0,rgba(252,246,240,0))}
.txt{position:absolute;left:96px;top:78px;width:700px}
.logo{width:250px;display:block;margin-bottom:30px}
h1{font-size:48px;font-weight:800;line-height:1.32;letter-spacing:.02em}
.sub{margin-top:18px;font-size:24px;font-weight:700;color:#0a86c7;letter-spacing:.03em}
</style></head><body>
<div class="art"><img src="${b64(hero)}"></div>
<div class="txt">
  <img class="logo" src="${b64(logo)}">
  <h1>取り込んで、確認して、<br>出品するだけ。</h1>
  <div class="sub">BUYMAの出品作業を、1商品数分に。</div>
</div>
</body></html>`;

(async () => {
  const br = await chromium.launch({ channel: 'chrome' });
  const pg = await br.newPage({ viewport: { width: 1500, height: 500 } });
  await pg.setContent(html);
  await pg.evaluate(() => Promise.all([...document.images].map(i => i.decode())));
  await pg.screenshot({ path: out });
  if (preview) {
    // X の表示を模した確認用：左下にプロフィールアイコン（直径約200px・下へはみ出す）を重ねる
    await pg.setViewportSize({ width: 1500, height: 600 });
    await pg.evaluate(() => {
      document.body.style.height = '600px';
      document.body.style.background = '#fff';
      const bg = document.createElement('div');
      bg.style.cssText = 'position:absolute;left:0;top:500px;width:1500px;height:100px;background:#fff';
      const ic = document.createElement('div');
      ic.style.cssText = 'position:absolute;left:24px;top:400px;width:200px;height:200px;border-radius:50%;background:#1e3452;border:5px solid #fff';
      document.body.append(bg, ic);
    });
    await pg.screenshot({ path: preview });
  }
  await br.close();
})().catch(e => { console.error(e); process.exit(1); });
