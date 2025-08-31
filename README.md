# LGTM Maker

## 概要

LGTM Makerは、画像に「LGTM」テキストを合成し、Markdownで共有できるWebアプリケーションです。コードレビューやプルリクエストで使用する画像を簡単に作成できます。

[T3 Stack](https://create.t3.gg/)をベースに、Claude Code対応などを追加した型安全なフルスタック開発環境で構築されています。

## 主な機能

- 画像アップロード・URL指定による画像読み込み
- 画像に「LGTM」テキストを自動合成
- 短縮URL生成とMarkdown形式での出力
- 生成画像のプレビュー表示

## Tech Stack

### プリインストールされたTech Stack

- **[Next.js](https://nextjs.org)** - フルスタックReactフレームワーク
  - App Router、SSR/SSG、API Routesを統合したモダンなWeb開発環境
  - ファイルベースルーティングと自動画像最適化
  
- **[TypeScript](https://www.typescriptlang.org)** - 型安全なJavaScript
  - 静的型チェックによる開発時のエラー検出と IDE支援
  - 大規模開発での保守性とチーム開発効率の向上
  
- **[Tailwind CSS](https://tailwindcss.com)** - ユーティリティファーストCSSフレームワーク
  - 事前定義されたクラスによる高速なUIスタイリング
  - レスポンシブデザインとデザインシステムの一貫性
  
- **[tRPC](https://trpc.io)** - End-to-End型安全なAPI通信
  - サーバーからクライアントまで完全な型安全性を実現
  - React QueryベースのReactフックとZodスキーマ検証
  
- **[Biome](https://biomejs.dev/ja/)** - 高速Linter & Formatter
  - ESLint + Prettierの代替として10-100倍高速（Rust製）
  - コードフォーマットとリンティングを統合、Tailwind CSSクラス名ソート機能付き
  
- **[Zod](https://zod.dev)** - TypeScript-firstスキーマ検証
  - スキーマから自動的にTypeScript型を生成
  - APIの入出力データの実行時型安全性とバリデーション
  
- **[Lefthook](https://github.com/evilmartians/lefthook)** - 軽量Gitフック管理
  - コミット時の自動コードフォーマットと品質チェック
  - 高速実行（Go製）と並列タスク処理
  
- **[Vitest](https://vitest.dev)** - 高速ユニットテストフレームワーク
  - Viteベースの瞬時テスト実行とHMRサポート
  - Jest互換APIとネイティブTypeScriptサポート
  
- **[Playwright](https://playwright.dev)** - モダンE2Eテストフレームワーク
  - Chromium、Firefox、Safariでの並列実ブラウザテスト
  - 強力なデバッグツールとCI/CD統合
  
- **[Shadcn/UI](https://ui.shadcn.com)** - カスタマイズ可能UIコンポーネント
  - Copy & Paste方式で完全にカスタマイズ可能
  - Radix UI基盤でアクセシビリティ対応とTailwind CSS統合

### LGTM Maker固有の技術
- **[@resvg/resvg-js](https://github.com/yisibl/resvg-js)** - SVGからPNG変換
- **短縮URL生成機能** - メモリベースの高速URL短縮システム

**アーキテクチャの特徴**: TypeScript + Next.js + tRPCによるフルスタック型安全性、高速開発ツールチェーン、包括的テスト環境

## セットアップ

### bunをインストール

```bash
curl -fsSL https://bun.sh/install | bash
```

詳しくは[公式サイト](https://bun.sh/docs/installation)を参照してください。

### リポジトリのクローン

```bash
git clone {このリポジトリのURL}
```

### リモートリポジトリの設定

```bash
git remote set-url origin {利用するリモートリポジトリのURL}
```

### パッケージのインストール

```bash
bun install
```

### Playwrightのブラウザインストール

```bash
bunx playwright install
```

### lefthookの設定

```bash
bunx lefthook install
```

### 開発サーバーの起動

```bash
bun run dev
```

## 使用方法

1. **画像の選択**
   - ファイルアップロード: ローカルの画像ファイルをアップロード
   - URL指定: インターネット上の画像URLを入力

2. **LGTM画像の生成**
   - 「作る」ボタンをクリックして画像を生成
   - 自動的にMarkdownがクリップボードにコピーされます

3. **共有**
   - 生成されたMarkdownをGitHub等に貼り付けて使用
   - 画像をクリックすると拡大表示されます

## ディレクトリ構造

```
lgtm-maker/
├── __tests__/            # ユニットテストファイル
├── .github/              # GitHub関連設定
│   ├── workflows/        # GitHub Actions CI/CD設定
│   └── dependabot.yml    # Dependabot設定
├── .next/                # Next.jsビルドファイル（git管理対象外）
├── docs/                 # プロジェクト文書
├── e2e/                  # E2Eテストファイル
├── public/               # 静的ファイル
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── _components/  # アプリケーション固有のコンポーネント
│   │   ├── api/          # APIルート定義
│   │   ├── s/[shortId]/  # 短縮URL展開ページ
│   │   └── ...           # 各ページのルート
│   ├── components/       # 再利用可能なUIコンポーネント
│   │   └── ui/           # Shadcn/UIコンポーネント
│   ├── lib/              # ユーティリティ関数
│   ├── server/           # サーバーサイドロジック
│   │   ├── api/          # tRPC API定義
│   │   ├── lgtm/         # LGTM画像生成ロジック
│   │   └── lib/          # サーバーユーティリティ
│   ├── styles/           # グローバルスタイル
│   └── trpc/             # tRPC設定
├── .env.example          # 環境変数の例
├── biome.jsonc           # Biome設定
├── lefthook.yml          # Git hooksの設定
├── next.config.js        # Next.js設定
├── package.json          # プロジェクト依存関係
├── playwright.config.ts  # Playwright設定
├── postcss.config.js     # PostCSS設定（Tailwind CSS用）
├── tsconfig.json         # TypeScript設定
└── vitest.config.ts      # Vitest設定
```

## API エンドポイント

### `/api/trpc/lgtm.generate`

LGTM画像を生成します。

**入力**:
```typescript
{
  fileBase64?: string; // Base64エンコードされた画像データ
  fileName?: string;   // ファイル名（オプション）
  url?: string;        // 画像URL（オプション）
}
```

**出力**:
```typescript
{
  imageUrl: string;    // Data URL形式の生成画像
  shortUrl: string;    // 短縮URL
  markdown: string;    // Markdownフォーマット
  meta: {
    shortId: string;   // 短縮ID
  };
}
```

### `/s/[shortId]`

短縮URLから元の画像にリダイレクトします。

## 主要設定ファイルの詳細

### TypeScript設定 (tsconfig.json)

厳格な型チェックを有効にし、Next.jsとの連携を最適化する設定が含まれています。以下のような特徴があります：

- `strict: true` による厳格な型チェック
- パスエイリアスでの `~/*` を `./src/*` へのマッピング
- 最新のJavaScript機能の有効化

### Biome設定 (biome.jsonc)

Rust製の高速なLinter兼Formatterです。ESLintとPrettierの代替として機能し、以下の特徴があります：

- 一貫したコードスタイル強制
- パフォーマットとリンティングの統合
- Tailwind CSSのクラス名の自動ソート機能

コード品質をチェックするコマンド：
```bash
bun run check
```

コードを自動修正するコマンド：
```bash
bun run check:write
```

### tRPC設定 (src/trpc/*)

型安全なAPI通信を実現します。主な設定は以下の通りです：

- `src/server/api/routers/` - 各APIルートの定義場所
- `src/server/api/root.ts` - 全APIルートの集約
- `src/trpc/react.tsx` - クライアント側でのtRPC設定

新しいAPIエンドポイントを追加する場合は、`src/server/api/routers/`に新しいルーターファイルを作成し、`root.ts`に登録します。

### CI/CD設定 (.github/workflows/ci_cd.yml)

GitHub Actionsを使用したCI/CDパイプラインが設定されています：

- **リント**: Biomeによるコード品質チェック
- **ユニットテスト**: Vitestによるテスト実行
- **E2Eテスト**: Playwrightによるブラウザテスト
- **デプロイ**: コメントアウト解除でVercelへの自動デプロイが可能

### Lefthook設定 (lefthook.yml)

Git操作時に自動実行されるスクリプトを設定しています：

- コミット前にBiomeによる自動フォーマット

### Dependabot設定 (.github/dependabot.yml)

依存パッケージの自動更新を行います：

- npm/bunパッケージを毎週チェック
- GitHub Actionsの更新を毎週チェック
- 更新PRは同時に最大10件まで

## 開発ガイド

### 開発コマンド

```bash
# 開発サーバー起動
bun run dev

# プロダクションビルド
bun run build

# プロダクションサーバー起動
bun run start

# コード品質チェック
bun run check

# 自動フォーマット
bun run check:write

# 型チェック
bun run typecheck

# ユニットテスト実行
bun run test

# E2Eテスト実行
bun run test:e2e

# Playwrightブラウザインストール
bunx playwright install
```

### コンポーネント追加（Shadcn/UI）

UIコンポーネントを追加する場合は、shadcn/uiを使用します：

```bash
bunx --bun shadcn@latest add button
```

追加したコンポーネントは `src/components/ui/` に配置され、自由にカスタマイズできます。

### 新しいページの追加

Next.jsのApp Routerを使用しているため、`src/app/` ディレクトリに新しいディレクトリを作成し、`page.tsx` ファイルを追加することで新しいページを作成できます：

```
src/app/dashboard/page.tsx
```

これで `/dashboard` というURLでアクセス可能になります。

### APIエンドポイントの追加（tRPC）

tRPCを使用することで、型安全なバックエンドAPIを構築できます。詳細な開発方法については、CLAUDE.mdの詳細な説明を参照してください。

### テスト

#### ユニットテスト（Vitest）

`__tests__` ディレクトリ内に、テスト対象と同じディレクトリ構造でテストファイルを作成します。命名規則は `*.test.ts` または `*.test.tsx` です。

```bash
bun run test        # すべてのテストを実行
bun run test:watch  # ウォッチモードでテスト実行
```

#### E2Eテスト（Playwright）

`e2e` ディレクトリにテストファイルを作成します。命名規則は `*.spec.ts` です。

```bash
bun run test:e2e        # すべてのE2Eテストを実行
bun run test:e2e:ui     # UIモードでテスト実行
```

## その他の機能

### Biome（Linter/Formatter）

```bash
bun run check       # コード品質チェック
bun run check:write # 問題を自動修正
```

### Git Hooks（Lefthook）

コミット前にBiomeによる自動フォーマットが実行されます。特別な操作は不要です。設定は `lefthook.yml` で変更できます。

## Vercelへのデプロイ設定

Vercelへのデプロイは本来Vercel側でVercelアプリをGithubにインストールすることによって簡単に実現できますが、チーム開発を行う場合は、仮に全員がチームで課金されていない場合、課金されていないメンバーのPush時のデプロイは失敗してしまいます。
そのため、一人がVercelで発行するTokenを使ってGitHub Actionsによってデプロイを行えるようにしています。

### デプロイの有効化

デプロイを有効にするには、`.github/workflows/ci_cd.yml`ファイル内の`deploy_preview`と`deploy_production`ジョブのコメントアウトを解除します。

### 必要なVercel情報の取得

1. Vercelダッシュボードにログインします
2. デプロイしたいプロジェクトを選択（または新規作成）します
3. プロジェクトのページ > 「Settings」 > 「General」 > 「Project ID」をコピーします（`VERCEL_PROJECT_ID`として使用）
4. チームのページ > 「Settings」 > 「General」 > 「Team ID」をコピーします（`VERCEL_ORG_ID`として使用）
5. トークンを取得します:
   - 個人の「Account Settings」 > 「Tokens」タブ > 「Create」をクリックします
   - トークンに名前を付け（例：「hoge PJ GitHub CI/CD」）、必要な権限を付与します
   - 作成されたトークンをコピーします（`VERCEL_TOKEN`として使用）

### GitHub Repository Secretsの設定

1. GitHubリポジトリページに移動します
2. 「Settings」 > 「Secrets and variables」 > 「Actions」を選択します
3. 「New repository secret」をクリックして以下の項目を追加します:
   - `VERCEL_PROJECT_ID`: コピーしたProject ID
   - `VERCEL_ORG_ID`: コピーしたOrganization ID
   - `VERCEL_TOKEN`: 作成したVercelトークン

### Dependabotに対する権限設定

Dependabotにもこれらの秘密情報へのアクセスを許可するには:

1. GitHubリポジトリページで「Settings」 > 「Secrets and variables」 > 「Dependabot」を選択します
2. 「New repository secret」をクリックして同様に3つの秘密情報を追加します:
   - `VERCEL_PROJECT_ID`
   - `VERCEL_ORG_ID`
   - `VERCEL_TOKEN`

これにより、CI/CDパイプラインとDependabotの両方がVercelへのデプロイに必要なアクセス権を持ちます。

## Claude Code対応

このプロジェクトは[Claude Code](https://claude.ai/code)に対応しています。Claude Codeは、Anthropic社が開発したAIコーディングアシスタントで、コマンドラインから直接利用できます。

### Claude Codeの設定

1. **Claude Codeのインストール**
   ```bash
   npm install -g @anthropic-ai/claude-code
   ```

2. **GitHub CLIのインストール（必須）**
   
   カスタムコマンドがGitHub CLIを使用するため、GitHub CLIのインストールが必要です：
   
   ```bash
   # macOS (Homebrew)
   brew install gh
   
   # Ubuntu/Debian
   sudo apt install gh
   
   # Windows (Chocolatey)
   choco install gh
   
   # その他のプラットフォーム
   # https://cli.github.com/ からダウンロード
   ```
   
   GitHub CLIの認証設定：
   
   ```bash
   gh auth login
   ```

3. **認証設定**
   ```bash
   claude
   ```
   初回実行時に認証が必要です。Anthropic Console、Claude App（Pro/Maxプラン）、またはAmazon Bedrock/Google Vertex AIでの認証が可能です。

4. **プロジェクト初期化**
   ```bash
   claude /init
   ```
   このコマンドでプロジェクト用のCLAUDE.mdファイルが自動生成されます。

### 利用可能なカスタムコマンド

このプロジェクトには、開発効率を向上させるカスタムコマンドが含まれています：

#### 核となるワークフローコマンド（5つ）

##### `/create-issue [問題/要望の説明]`
**用途**: GitHub Issueの作成  
**引数**: 問題や機能要求の具体的な説明文  
**実行例**:
```bash
/create-issue "Login button doesn't work on mobile Safari"
/create-issue "Add user profile photo upload feature"
/create-issue "Update installation docs for Windows users"
```

##### `/work-on-issue [Issue番号]`
**用途**: Issue解決のための8段階ワークフロー実行  
**引数**: 作業対象のGitHub Issue番号  
**実行例**:
```bash
/work-on-issue 123
/work-on-issue 456
```

##### `/refactor-code [対象コード/モジュールの説明]`
**用途**: 体系的なコードリファクタリング  
**引数**: リファクタリング対象の説明（ファイルパス、モジュール名、または機能名）  
**実行例**:
```bash
/refactor-code "auth module"
/refactor-code "src/components/UserProfile.tsx"
/refactor-code "database connection logic"
```

##### `/create-pr [PR内容の説明]`
**用途**: 現在の変更からPull Request作成  
**引数**: PRのタイトルとなる変更内容の説明  
**実行例**:
```bash
/create-pr "Fix authentication bug in login form"
/create-pr "Add dark mode support"
/create-pr "Improve database query performance"
```

##### `/review-pr [PR番号]`
**用途**: Pull Requestの包括的レビュー  
**引数**: レビュー対象のPull Request番号  
**実行例**:
```bash
/review-pr 789
/review-pr 101
```

### GitHubテンプレート

このプロジェクトには、構造化されたIssueとPR作成のためのテンプレートファイルが含まれています：

#### Issueテンプレート（`.github/ISSUE_TEMPLATE/`）
- **`bug_report.yml`** - バグレポート用の詳細なテンプレート
- **`feature_request.yml`** - 機能要望用のテンプレート
- **`documentation.yml`** - ドキュメント改善用のテンプレート

#### PRテンプレート（`.github/PULL_REQUEST_TEMPLATE/`）
- **`pull_request_template.md`** - Pull Request用の標準テンプレート

これらのテンプレートはClaude Codeのカスタムコマンドから自動的に参照され、一貫した品質のIssueとPRを作成できます。

### Claude Codeの基本的な使い方

1. **対話的なコーディング**
   ```bash
   claude
   ```
   対話モードでプロジェクトについて質問したり、コード修正を依頼できます。

2. **ヘッドレスモード**
   ```bash
   claude -p "TypeScriptのエラーを修正してください"
   ```
   非対話モードでタスクを実行できます。

3. **ファイル参照**
   ```bash
   # 特定のファイルを参照
   > @src/components/ui/button.tsx の実装を説明してください
   
   # ディレクトリ参照
   > @src/app の構造を教えてください
   ```

### 推奨ワークフロー

#### 開発者のカスタマージャーニー
1. **開始**: `/project:start-work` で今日の作業を計画
2. **Issue作成**: `/project:create-issue` で明確な要件定義
3. **開発実行**: `/project:work-on-issue` で体系的な実装
4. **レビュー**: `/project:review-pr` で品質保証
5. **日常管理**: `/project:daily-workflow` でルーチン作業

#### 開発フェーズ
1. **理解フェーズ**: 要件分析と計画立案
2. **環境準備**: 開発環境セットアップとブランチ作成
3. **調査フェーズ**: 既存コード理解とコンテキスト把握
4. **実装フェーズ**: プロジェクト標準に従ったコード作成
5. **品質保証**: テスト実行とコード品質確認
6. **文書化**: ドキュメント更新とレビュー準備
7. **レビュー・改善**: フィードバック対応と実装改善
8. **完了**: コードマージとクリーンアップ

詳細な使い方については、[Claude Code公式ドキュメント](https://docs.anthropic.com/en/docs/claude-code/overview)を参照してください。