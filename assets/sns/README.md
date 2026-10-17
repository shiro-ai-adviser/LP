# temaru の X アカウント（@temaru_buyma）の素材と文面

2026-10-17 開設。窓口メールは `temaru.support@gmail.com`。

## 訴求の主軸（城主 10-17）

**主軸は「BUYMA公式API対応」**。ほかに伝えるのは「BUYMA出品支援ツール」と「2週間無料」だけでよい（城主 10-17「情報量は少なくていい」）。取り込み→確認→出品の流れと時間（1商品数分）は自己紹介や固定ポストで。
- 「垢BANされません」とは書かない。書くのは事実だけ（BUYMAが用意した正規の流れで出品する／ブラウザを勝手に動かす自動操作は使わない）。
- 時間の数字は実測の範囲で書く。10-15〜17 の操作記録（客4人・48件）で、取り込みから出品までの中央値は4.6分、速い4分の1は3分以内だった。だから「2〜3分」ではなく「数分」と書く。
- 無い機能は書かない。LP の「似た商品は複製するだけ」は、今のコードに無い（10-17 確認）。

## いま使っているもの

| 欄 | 中身 |
|---|---|
| アイコン | `temaru-icon-v2.png`（紺地に白の temaru。丸の幅いっぱいまで大きくした） |
| ヘッダー | `temaru-x-header-v6.png`（1500×500。白帯＝temaru｜BUYMA出品支援ツール、主役＝BUYMA 公式API対応、金の帯＝2週間無料。それ以外は載せない） |
| 名前 | `temaru（テマル）｜BUYMA出品支援ツール` |
| ウェブサイト | `https://temaru.shiro-hq.com/?from=ie63yu9f&utm_source=x&utm_medium=social&utm_campaign=profile`（招待コード `8V7MWK`＝申込が「ご紹介（X）」と残る・無料30日。Instagram は `?from=9y7zfo2i&utm_source=instagram&…`。表の正本は `../../流入計測_UTMリンク.md`） |

自己紹介（120字）:

```
BUYMA公式API対応の出品支援ツール「temaru（テマル）」公式。
フォローで届くこと👇
・BUYMAの仕様変更と公式APIの最新情報
・出品作業を短くする小ワザ
・temaruの新機能
正規の流れで出品、自動操作は使いません｜2週間無料
```

固定ポスト（重み237/280。LPの40秒動画を添付すると強い）:

```
BUYMAの出品、まだ1商品ずつ手で入力していますか？

temaruは、BUYMA公式APIに対応した出品支援ツールです。
商品情報を取り込んで、確認して、出品するだけ。
ブラウザを勝手に動かす自動操作は使いません。

2週間無料で試せます👇
https://temaru.shiro-hq.com/?utm_source=x&utm_medium=social&utm_campaign=post
```

## ヘッダーの作り方

- 実際の表示幅は約600px（0.4倍）。**文字は38px以上だけ使う**（v3 は上の一言と英字が読めなかった）。左下はプロフィールアイコンが重なるので空ける。
- 背景 `temaru-x-header-bg-fal.png` は fal.ai で生成した（`--brand temaru`・LP の `al-hero.png` を参照・生成記録は同名の `.fal.json`）。文字は描かせず、`render-x-header-v5.js` で重ねて書き出す。

```sh
NODE_PATH=<playwright の node_modules> node render-x-header-v6.js temaru-x-header-bg-fal.png <temaru-logo.png> temaru-x-header-v6.png
```

v1〜v5 と文字入りアイコン（navy/white）は経緯として残している。v5 は「対応」と金のメダルで要素が多かった。
