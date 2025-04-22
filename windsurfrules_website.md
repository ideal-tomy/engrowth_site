# Windsurf Cascade ウェブサイト開発指示書

あなたは高度な問題解決能力を持つAIアシスタント、Windsurf Cascadeです。以下の指示と要件定義に基づいて、効率的かつ正確にウェブサイトを設計・実装してください。

## 基本動作原則

1. **要件定義の理解と遵守**
   - 要件定義を注意深く読み取り、忠実に実装する
   - 不明点がある場合は、具体的な質問を行う
   - 指示された範囲内でのみ設計・実装を行う
   - 要件にない機能は追加しない

# 要件定義書：Engrowth 静的サイト再構築プロジェクト

## 1. プロジェクト概要
- **目的**  
  - 現行 WordPress サイトを離脱し、静的 HTML/CSS/JavaScript で再構築  
  - 表示の安定性・パフォーマンス向上、プラグイン依存の解消  
  - クライアント候補に「信頼できるきれいなサイト」をアピール  
- **背景**  
  - プラグインやテーマ干渉でカスタマイズが困難  
  - 今後の更新負荷軽減と高速化を両立させるため静的化を選定  

## 2. サイト構成（サイトマップ）
/ ├─ about/ # エングロースとは（Vision） ├─ service/ │ ├─ business/ # ビジネスパーソン向け │ ├─ students/ # 学生向けサービス │ └─ vision/ # 社会貢献・ミッション ├─ contact/ # お問い合わせフォーム └─ assets/ # CSS, JS, 画像など共通リソース

## プロジェクト要件

## 3. ページごとの要件

### 3.1 トップページ `/`
- **ヘッダー**  
  - ロゴ  
  - グローバルナビ（Home / About / Business / Students / Vision / Contact）  
- **ヒーローセクション**  
  - キービジュアル＋キャッチコピー  
- **強み紹介**  
  - “Engrowth が英会話に強い３つの理由” のカード  
- **サービスリンク**  
  - Business / Students / Vision へのカードリンク  
- **フッター**  
  - コピーライト / SNS アイコン / サイトマップリンク  

### 3.2 About `/about`
- **タイトル＋リード文**（“エングロースとは” 説明文）  
- **3 ボタン**（Business / Students / Vision）  
- **共通フッター**  

### 3.3 Business `/service/business`
- **ページタイトル**  
- **グローバルビジネス必須スキル紹介**  
- **導入効果・事例**  
- **CTA**（資料請求・無料相談）  
- **共通フッター**  

### 3.4 Students `/service/students`
- **ページタイトル**  
- **次世代リーダーとの学び合い**  
- **留学支援・実績紹介**  
- **CTA**（お問い合わせ）  
- **共通フッター**  

### 3.5 Vision `/service/vision`
- **ページタイトル**  
- **社会貢献ミッション紹介**（Mission / Vision）  
- **ESG・SDGs への取り組み**  
- **CTA**（お問い合わせ）  
- **共通フッター**  

### 3.6 Contact `/contact`
- **ページタイトル**  
- **お問い合わせフォーム**（Netlify Forms or Formspree）  
- **会社情報**（所在地・電話番号・メールアドレス）  
- **共通フッター**  

## 4. 非機能要件

### 4.1 技術スタック
- **HTML5**：セマンティックタグ  
- **CSS3**：Flexbox / Grid, CSS変数  
- **JavaScript**：必要最小限（ハンバーガーメニューなど）  
- **Webフォント**：Playfair Display（見出し） / Josefin Sans（本文）  
- **アイコン**：SVG または Font Awesome  

### 4.2 レスポンシブ対応
- **モバイルファースト**（320px～）  
- **ブレークポイント**：480px / 768px / 1024px  

### 4.3 パフォーマンス
- 画像：WebP & CDN 配信  
- CSS/JS：minify & gzip 圧縮  
- 遅延読み込み（下部画像のみ）  

### 4.4 SEO 対策
- 適切な `<title>` / `<meta name="description">`  
- 構造化データ（JSON-LD）  
- `alt` 属性、見出し階層の遵守  

### 4.5 アクセシビリティ
- コントラスト比 WCAG AA 達成  
- キーボード操作対応  
- フォームに `aria-` 属性追加  

### 4.6 アニメーション
GSAP 3 / SplitType / Locomotive‑scroll / Barba.js を採用し、0.6 s 以内の繊細なモーションのみ実装

### 4.7デザインシステム

カラー・タイポグラフィ・スペーシングを CSS カスタムプロパティでトークン化

Figma で Design‑Token JSON をエクスポート → :root に自動反映

## 5. 開発フロー
1. GitHub リポジトリ作成  
2. ブランチ戦略（`main` ← `feature/home` / `feature/about` …）  
3. ページごとにマークアップ & CSS モジュール化  
4. CI/CD 設定（GitHub Actions → GitHub Pages／Vercel）  
5. ステージングで動作確認 → 本番公開  

## 6. デザインガイドとコンポーネント仕様

### 6.1 カラーシステム

```css
:root {
  /* ブランドカラー */
  --color-primary: #b80000;      /* ワインレッド（メインカラー） */
  --color-primary-light: #d40000; /* ホバー・アクティブ状態 */
  --color-primary-dark: #900000;  /* プレス状態 */
  --color-secondary: #333333;     /* テキスト・見出し */
  --color-accent: #d4af37;        /* ゴールド（アクセント） */
  
  /* グレースケール */
  --color-grey-900: #111111;      /* 最も暗いテキスト */
  --color-grey-700: #333333;      /* 標準テキスト */
  --color-grey-500: #555555;      /* 補足テキスト */
  --color-grey-300: #cccccc;      /* ボーダー */
  --color-grey-100: #f5f5f5;      /* 背景アクセント */
  --color-grey-50: #fafafa;       /* 薄い背景 */

  /* 背景色 */
  --color-bg: #ffffff;            /* 標準背景 */
  --color-bg-alt: #f9f9f9;        /* 代替背景 */
  
  /* 機能色 */
  --color-success: #00b050;       /* 成功 */
  --color-warning: #ffa000;       /* 警告 */
  --color-error: #d32f2f;         /* エラー */
  --color-info: #2979ff;          /* 情報 */
}
```

**実装ルール:**
1. すべての色指定は必ずCSS変数を使用すること
2. 重要な要素は必ずプライマリカラーに統一
3. アクセントカラー（ゴールド）は強調したい箇所のみに使用

### 6.2 タイポグラフィシステム

```css
:root {
  /* フォントファミリー */
  --font-heading: 'Playfair Display', serif;  /* 見出し用 */
  --font-body: 'Inter', sans-serif;          /* 本文用 */
  --font-sub: 'Poppins', sans-serif;         /* UI要素・補足用 */
  
  /* フォントサイズ */
  --text-xs: 0.75rem;   /* 12px */
  --text-sm: 0.875rem;  /* 14px */
  --text-base: 1rem;    /* 16px */
  --text-lg: 1.125rem;  /* 18px */
  --text-xl: 1.25rem;   /* 20px */
  --text-2xl: 1.5rem;   /* 24px */
  --text-3xl: 1.875rem; /* 30px */
  --text-4xl: 2.25rem;  /* 36px */
  --text-5xl: 3rem;     /* 48px */
  
  /* 行の高さ */
  --leading-none: 1;      /* 行の高さなし */
  --leading-tight: 1.25;  /* 密集した行の高さ */
  --leading-normal: 1.5;  /* 通常の行の高さ */
  --leading-loose: 1.8;   /* 広い行の高さ */
  
  /* レタースペーシング */
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
}
```

**実装ルール:**
1. 見出しには必ず `--font-heading` を使用
2. 本文には必ず `--font-body` を使用
3. 見出しサイズは階層に応じて統一（H1: --text-5xl, H2: --text-4xl, H3: --text-3xl）
4. すべての見出しに `font-feature-settings: "liga" 1, "dlig" 1;` を適用

### 6.3 共通コンポーネント仕様

#### ヘッダー
- 固定位置（スクロール時も画面上部に固定）
- 白背景 + 下部境界線（--color-grey-300）
- ロゴ左、ナビゲーション右配置
- モバイル時はハンバーガーメニュー（右上に配置）
- ナビゲーションリンクは均等配置、アクティブページは下線装飾
- 高さ: 80px（デスクトップ）, 60px（モバイル）

```html
<header class="header">
  <div class="header-content">
    <div class="logo">...</div>
    <nav class="global-nav">...</nav>
    <button class="menu-toggle">...</button>
  </div>
</header>
```

#### ページヘッダー（各ページ共通）
- サイト共通のページタイトルエリア
- 背景: グラデーション または 画像背景（オーバーレイ付き）
- 見出し: 中央配置、--font-heading, --text-5xl
- 下部に装飾ライン（--color-primary, 幅100px, 高さ3px）

```html
<section class="page-header">
  <div class="container">
    <h2 class="page-title">ページタイトル</h2>
  </div>
</section>
```

#### テーブル
- ヘッダー: プライマリカラー背景（#b80000）、白文字
- 交互の行: #f5f5f5 / #ffffff
- 全体をbox-shadowで囲む
- 角丸: 8px
- セル内の余白: 15-20px

```html
<div style="overflow: hidden; border-radius: 8px; box-shadow: var(--shadow-soft);">
  <table style="width: 100%; border-collapse: collapse;">
    <tr style="background-color: var(--color-primary); color: white;">...</tr>
    <tr style="background-color: #f5f5f5;">...</tr>
    <tr>...</tr>
  </table>
</div>
```

#### アコーディオン
- 各項目は独立したカード形式
- 境界線ではなく影（box-shadow）でセパレート
- 左側に色付きのアクセントバー（--color-primary, 幅5px）
- ヘッダーに展開/折りたたみアイコン（+/-）
- トランジション: 高さの変化はスムーズに（0.3s ease）

```html
<div class="accordion-item">
  <div class="accordion-header" onclick="toggleAccordion(this)">
    <h3>タイトル</h3>
    <span class="accordion-icon">+</span>
  </div>
  <div class="accordion-content">...</div>
</div>
```

#### ボタン
- プライマリボタン: --color-primary 背景、白文字
- セカンダリボタン: 白背景、--color-primary 境界線と文字
- 角丸: 4px
- パディング: 12px 24px
- ホバー効果: 暗くなる（brightness: 0.9）
- トランジション: 0.3s ease all

```html
<a href="#" class="btn btn-primary">プライマリボタン</a>
<a href="#" class="btn btn-secondary">セカンダリボタン</a>
```

#### カード
- 白背景
- 角丸: 8px
- 影: var(--shadow-soft)
- 内部パディング: 25-30px
- 画像を含む場合は上部に配置、角丸処理

```html
<div class="card">
  <div class="card-image">...</div>
  <div class="card-content">...</div>
</div>
```

#### フッター
- 背景: --color-grey-900（暗め）
- 文字色: 白（ロゴ、リンク）、--color-grey-300（テキスト）
- 3カラムレイアウト（ロゴ+説明、リンク、SNS）
- コピーライト部分は横線で区切り、セパレート

```html
<footer class="footer">
  <div class="container">
    <div class="footer-content">...</div>
    <div class="copyright">...</div>
  </div>
</footer>
```

### 6.4 レイアウト・スペーシング

```css
:root {
  /* シャドウ */
  --shadow-soft: 0 4px 6px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.1);
  --shadow-medium: 0 10px 15px rgba(0,0,0,0.07), 0 4px 6px rgba(0,0,0,0.05);
  --shadow-hard: 0 20px 25px rgba(0,0,0,0.15), 0 10px 10px rgba(0,0,0,0.1);
  
  /* スペーシング */
  --space-xs: 0.25rem;   /* 4px */
  --space-sm: 0.5rem;    /* 8px */
  --space-md: 1rem;      /* 16px */
  --space-lg: 1.5rem;    /* 24px */
  --space-xl: 2rem;      /* 32px */
  --space-2xl: 3rem;     /* 48px */
  --space-3xl: 4rem;     /* 64px */
  
  /* セクション間隔 */
  --section-space: 90px;  /* セクション間の標準間隔 */
  
  /* コンテナ */
  --container-max: 1200px; /* 最大コンテナ幅 */
  --container-padding: 20px; /* 左右パディング */
}
```

**実装ルール:**
1. すべてのページで同じセクション間隔を使用する
2. コンテナ幅は統一（max-width: var(--container-max)）
3. セクションの背景色は交互に変える（白/薄灰色）
4. 重要なセクションには必ず装飾的な区切り線を追加

### 6.5 レスポンシブデザイン

1. **ブレークポイント**
   - モバイル: ~767px
   - タブレット: 768px~1023px
   - デスクトップ: 1024px~

2. **グリッドシステム**
   - デスクトップでは3~4カラム
   - タブレットでは2カラム
   - モバイルでは1カラム

3. **フォントサイズ調整**
   - モバイルでは見出しサイズを80%に縮小

4. **コンポーネント調整**
   - テーブル: モバイルではスクロール可能なコンテナで包む
   - ナビゲーション: モバイルではドロワーメニュー
   - 余白: モバイルでは縮小（--section-space: 60px）

3. マイクロインタラクション

箇所	実装ライブラリ	効果
ヒーロー見出し	SplitType + GSAP	文字が1文字ずつフェードアップ
スクロール	locomotive‑scroll (慣性スクロール)	滑らかな高級サイト特有の動き
セクション遷移	Barba.js	ページ遷移を 0.4 s フェードで繋ぎ “アプリ的” 体験
---

4. レイアウトグリッド
コンテナ幅は 1440 px 基準、12‑column

セクション上下の ホワイトスペースは viewport 高さの 12–15 %

画像比率は 3:2 か cinematic 21:9 を混ぜ、余白 > 枠線 > 影 の順で情報階層を強調
以上の固定ルールとプロジェクト要件に基づいて、質の高いウェブサイトを設計・実装してください。
--