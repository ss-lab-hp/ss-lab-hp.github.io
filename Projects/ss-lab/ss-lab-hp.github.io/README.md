# スマートシステム研究室サイト 運用マニュアル

## 基本的な流れ

```
VSCodeで編集 → ローカルで確認 → GitHubにpush → サイトに反映
```

---

## ローカル確認の方法

```bash
cd ss-lab
python3 -m http.server 8000
```
ブラウザで http://localhost:8000 を開く。
確認が終わったら Ctrl+C で停止。


---

## 共通ヘッダー・フッター（メニュー）を編集する

メニュー項目（日本語/英語）、研究室名、住所（フッター）などの共通部分は **`js/site-config.js`** にまとめています。  
ここだけ編集すれば、全ページに反映されます。

- メニュー：`SS_SITE_CONFIG.nav.ja` / `SS_SITE_CONFIG.nav.en`
- ヒーロー帯の文言：`SS_SITE_CONFIG.heroBand`
- フッター：`SS_SITE_CONFIG.footer`

※ 共通部分を描画する処理は `js/site-render.js`、SEO補助は `js/seo-runtime.js` にあります（通常は触らなくてOK）。


## ① お知らせを追加する（一番よくある作業）

**ファイル：** `index.html`（日本語）、`en/index.html`（英語）

VSCodeで `index.html` を開いて、`news-table` の中に `<tr>` を1行追加するだけ。

```html
<!-- ↓ この行を一番上に追加（新しいものが上に来るように） -->
<tr>
  <td class="date">2026.03.01</td>
  <td class="content">ここにお知らせのテキストを書く。</td>
</tr>

<!-- リンクにしたい場合 -->
<tr>
  <td class="date">2026.03.01</td>
  <td class="content"><a href="https://..." target="_blank">論文が採択されました。</a></td>
</tr>
```

英語版（`en/index.html`）も同様に更新する。

---

## ② メンバーを更新する

**ファイル：** `people/index.html`（日本語）、`en/people/index.html`（英語）

該当する学年のリストを直接編集する。

```html
<ul style="list-style:disc;padding-left:1.5em;font-size:14px;line-height:2;">
  <li>新しい学生の名前</li>  ← 追加
  <li>既存の学生の名前</li>
</ul>
```

---

## ③ ギャラリーを更新する（JSONファイルを編集）

### 手順

**1. 写真をフォルダに入れる**
```
images/gallery/2024/photo_name.jpg
```
ファイル名はアルファベット・数字・ハイフンのみ推奨（日本語不可）。
サイズは **長辺1200px程度** にリサイズしておくと軽くなる。
Macの「プレビュー」アプリ → 「ツール」→「サイズを調整」で簡単にできる。

**2. `gallery-data.json` を編集する**

```json
[
  {
    "year": "2024",
    "file": "images/gallery/2024/photo_name.jpg",
    "title": "研究室ゼミ",
    "date": "2024.06.15",
    "caption": "前期ゼミの様子。活発な議論が行われました。"
  },
  {
    "year": "2024",
    "file": "images/gallery/2024/another_photo.jpg",
    "title": "歓迎会",
    "date": "2024.04.10",
    "caption": "新メンバー歓迎会"
  }
]
```

**注意点：**
- エントリは `,` で区切る（最後のエントリの後は不要）
- `year` が同じものは自動でグループ化される
- 新しい年を追加するときは `"year": "2025"` に変えるだけ

---

## ④ リンクを追加する

**ファイル：** `link/index.html`、`en/link/index.html`

```html
<li><a href="https://..." target="_blank" rel="noopener">リンク先の名前</a></li>
```

---

## ⑤ GitHubにpushする

```bash
cd ss-lab
git add .
git commit -m "お知らせを追加"
git push
```

数分後にサイトに反映される。

---

## VSCode で便利な設定

**おすすめ拡張機能：**
- `Live Server` → 保存するたびにブラウザが自動リロードされる
- `Japanese Language Pack` → VSCodeのメニューが日本語になる

**Live Server の使い方：**
1. VSCodeで `index.html` を右クリック
2. 「Open with Live Server」を選択
3. 保存するたびにブラウザが自動で更新される

---

## ファイル構成（参考）

```
ss-lab/
├── index.html              # 日本語ホーム ★お知らせはここ
├── gallery-data.json       # ギャラリー管理ファイル ★写真追加はここ
├── research/index.html     # 研究内容（日本語）
├── people/index.html       # メンバー（日本語） ★学生更新はここ
├── publications/index.html # 研究業績（日本語）
├── gallery/index.html      # ギャラリー（触らなくていい）
├── joinus/index.html       # 募集（日本語）
├── access/index.html       # 連絡先（日本語）
├── generative-ai-policy/index.html  # AIポリシー
├── link/index.html         # リンク（日本語）
├── en/                     # 英語ページ一式（同じ構成）
├── css/style.css           # デザイン（触らなくていい）
└── images/                 # 画像ファイル
    ├── shao.jpg
    ├── s1.jpg（トップのヒーロー画像）
    ├── r1.jpg〜r3-en.jpg（研究内容の画像）
    └── gallery/
        └── 2024/           # ギャラリー写真をここに入れる
```
