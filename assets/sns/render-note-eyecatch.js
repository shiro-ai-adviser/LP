// temaru 公式note の記事アイキャッチ（1280x670・note の推奨サイズ）。2026-11-10 v2。
//   v1 は3枚とも公式noteヘッダーと同じ光る背景・グラデ文字にしたら、城主に「統一しなくていい。逆にAI感が出てる」と言われた。
//   v2 は1枚ずつ別の作り：光らせない・グラデにしない・平らな色と文字と簡単な図だけ。
//   書くのは記事の中身だけ。「垢BANされない」は書かない。実装で見つけた細かい条件も書かない。
//   使い方: NODE_PATH=<playwrightのnode_modules> node render-note-eyecatch.js <logo-navy.png> <logo-white.png> <出力フォルダ>
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const [logoNavy, logoWhite, outDir] = process.argv.slice(2);
const B = p => 'data:image/png;base64,' + fs.readFileSync(p).toString('base64');
const BASE = `*{margin:0;padding:0;box-sizing:border-box}
body{width:1280px;height:670px;overflow:hidden;position:relative;font-family:"Hiragino Sans","Hiragino Kaku Gothic ProN",sans-serif}`;

// 1. BUYMA API：白地に黒の大きな問いかけ＋蛍光ペン。右に線だけの小さな図
const p1 = () => `<style>${BASE}
body{background:#ffffff;color:#111}
.t{position:absolute;left:84px;top:118px;font-size:76px;font-weight:800;line-height:1.3;letter-spacing:-.01em}
.mk{background:linear-gradient(transparent 62%,#ffe45c 62%)}
.s{position:absolute;left:88px;top:400px;font-size:30px;font-weight:600;color:#555}
.logo{position:absolute;left:88px;bottom:70px;height:38px}
.fig{position:absolute;right:84px;top:150px;width:260px;display:flex;flex-direction:column;align-items:center;gap:14px}
.box{width:230px;height:84px;border:3px solid #111;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:30px;font-weight:800}
.arr{font-size:26px;font-weight:700;color:#1a5fd0;display:flex;flex-direction:column;align-items:center;line-height:1.2}
.arr b{font-size:46px;line-height:1}
</style>
<div class="t">BUYMA API って、<br><span class="mk">出品者</span>に関係ある？</div>
<div class="s">パーソナルショッパーAPIを、出品する側の目線で</div>
<img class="logo" src="${B(logoNavy)}">
<div class="fig"><div class="box">ツール</div><div class="arr"><b>↓</b>公式の窓口</div><div class="box">BUYMA</div></div>`;

// 2. BUYMA 自動化：紺一色に白文字。作業ごとの ○△× をメモのように並べる
const p2 = () => `<style>${BASE}
body{background:#14284b;color:#fff}
.t{position:absolute;left:84px;top:92px;font-size:72px;font-weight:800;line-height:1.3}
.list{position:absolute;left:88px;top:330px;display:grid;grid-template-columns:repeat(2,420px);gap:18px 40px}
.row{display:flex;align-items:center;gap:18px;font-size:34px;font-weight:700;border-bottom:2px solid rgba(255,255,255,.25);padding-bottom:10px}
.m{width:52px;text-align:center;font-size:40px;font-weight:800}
.ok{color:#7fe0a8}.mid{color:#ffd166}.ng{color:#ff8f8f}
.logo{position:absolute;right:84px;bottom:56px;height:34px;opacity:.9}
</style>
<div class="t">BUYMAの自動化、<br>どこまで任せていい？</div>
<div class="list">
  <div class="row"><span class="m ok">○</span>出品の入力</div>
  <div class="row"><span class="m mid">△</span>在庫の更新</div>
  <div class="row"><span class="m mid">△</span>注文と発送</div>
  <div class="row"><span class="m ng">×</span>仕入れの判断</div>
</div>
<img class="logo" src="${B(logoWhite)}">`;

// 3. 出品の自動化：薄い灰の地に、3つのやり方を札で並べる。API連携の札だけ縁を太く
//   2026-11-10 城主「画面の自動操作は垢BANリスク高いって差別化を書いて」。根拠はBUYMAガイドの「運営を妨げる自動出品ツールは規約で禁止」
const p3 = () => `<style>${BASE}
body{background:#eef1f5;color:#1b1f27}
.t{position:absolute;left:84px;top:70px;font-size:64px;font-weight:800}
.cards{position:absolute;left:84px;top:200px;width:1112px;display:grid;grid-template-columns:repeat(3,1fr);gap:28px}
.c{background:#fff;border:2px solid #d3d9e2;border-radius:14px;padding:30px 26px;height:300px;display:flex;flex-direction:column;gap:16px}
.c .n{font-size:24px;font-weight:700;color:#7a8394}
.c .h{font-size:38px;font-weight:800;line-height:1.3}
.c .d{font-size:26px;font-weight:600;color:#4a5260;line-height:1.5}
.c.us{border:4px solid #1a5fd0}
.c.us .n{color:#1a5fd0}
.c .d b{font-weight:800}
.c.warn .d b{color:#c62828}
.c.us .d b{color:#1a5fd0}
.logo{position:absolute;right:84px;bottom:52px;height:32px}
</style>
<div class="t">出品の自動化、3つのやり方</div>
<div class="cards">
  <div class="c"><div class="n">1</div><div class="h">公式アプリ</div><div class="d">スマホで<br>手早く入力</div></div>
  <div class="c warn"><div class="n">2</div><div class="h">画面の<br>自動操作</div><div class="d"><b>垢BANのリスクが高い</b><br>パスワードも預ける</div></div>
  <div class="c us"><div class="n">3</div><div class="h">API連携</div><div class="d"><b>BUYMA公式の窓口</b><br>パスワード不要</div></div>
</div>
<img class="logo" src="${B(logoNavy)}">`;

// 4. 自動出品ツールの選び方（狙う語「BUYMA 自動」）：生成りの紙に、手書きのチェック表のような並び。左に題、右に確認4つ
const p4 = () => `<style>${BASE}
body{background:#f7f1e3;color:#24201a}
.k{position:absolute;left:84px;top:84px;display:flex;gap:12px}
.k span{font-size:24px;font-weight:700;border:2px solid #24201a;border-radius:999px;padding:6px 18px}
.t{position:absolute;left:84px;top:170px;font-size:66px;font-weight:800;line-height:1.32}
.t em{font-style:normal;color:#b3261e}
.logo{position:absolute;left:88px;bottom:62px;height:34px}
.chk{position:absolute;right:76px;top:120px;width:470px;background:#fffdf7;border:2px solid #d9cfb8;border-radius:6px;padding:30px 30px 18px;transform:rotate(1.2deg)}
.chk .h{font-size:24px;font-weight:700;color:#7a6f5c;margin-bottom:10px}
.r{display:flex;align-items:center;gap:16px;font-size:31px;font-weight:700;padding:14px 0;border-bottom:2px dashed #e2d8c2}
.r:last-child{border-bottom:0}
.b{width:34px;height:34px;border:3px solid #24201a;border-radius:4px;position:relative;flex:none}
.b::after{content:"";position:absolute;left:8px;top:-6px;width:12px;height:24px;border:solid #b3261e;border-width:0 5px 5px 0;transform:rotate(40deg)}
</style>
<div class="k"><span>買う</span><span>頼む</span><span>自作する</span></div>
<div class="t">BUYMA<br>自動出品ツール、<br>選ぶ前の<em>7つ</em>の確認</div>
<img class="logo" src="${B(logoNavy)}">
<div class="chk"><div class="h">申し込む前に聞くこと（抜粋）</div>
  <div class="r"><span class="b"></span>公式APIを使うか</div>
  <div class="r"><span class="b"></span>パスワードを預けるか</div>
  <div class="r"><span class="b"></span>PCは開いたままか</div>
  <div class="r"><span class="b"></span>壊れたら誰が直すか</div>
</div>`;

const ARTICLES = [
  { file: 'temaru-note-eyecatch-01-api.png', html: p1 },
  { file: 'temaru-note-eyecatch-02-jidouka.png', html: p2 },
  { file: 'temaru-note-eyecatch-03-shuppin.png', html: p3 },
  { file: 'temaru-note-eyecatch-04-erabikata.png', html: p4 },
];

(async () => {
  const br = await chromium.launch({ channel: 'chrome' });
  const pg = await br.newPage({ viewport: { width: 1280, height: 670 } });
  for (const a of ARTICLES) {
    await pg.setContent('<!doctype html><html><head><meta charset="utf-8"></head><body>' + a.html() + '</body></html>');
    await pg.evaluate(() => Promise.all([...document.images].map(i => i.decode())));
    // 文字や図が枠からはみ出していないか
    const over = await pg.evaluate(() => [...document.body.querySelectorAll('*')].filter(e => { const r = e.getBoundingClientRect(); return r.width && (r.right > 1280 || r.bottom > 670 || r.left < 0); }).map(e => e.className || e.tagName));
    if (over.length) throw new Error(a.file + ': 枠からはみ出している ' + over.join(','));
    await pg.screenshot({ path: path.join(outDir, a.file) });
    console.log('🖼 ' + a.file);
  }
  await br.close();
})().catch(e => { console.error('❌ ' + e.message); process.exit(1); });
