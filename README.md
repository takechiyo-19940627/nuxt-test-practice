# nuxt-test-practice

Nuxt / Vue.js でのフロントエンドテストを学習するためのリポジトリ。題材として、最小限の TODO アプリ（追加・完了切替・削除・フィルタ・残件数表示）を実装している。アプリ自体の機能を増やすことが目的ではなく、**複数コンポーネントを組み合わせた統合テストを書きやすい粒度** にすることを目的にしている。

## 技術スタック

- フレームワーク: Nuxt 4.4 / Vue 3.5 / TypeScript
- UI: NuxtUI 4.7
- スタイル: Tailwind CSS 4
- テスト: vitest 4 / @nuxt/test-utils / @vue/test-utils / happy-dom / playwright-core
- パッケージマネージャ: pnpm

## セットアップ

```bash
pnpm install
pnpm dev                    # http://localhost:3000
pnpm exec vitest            # 全プロジェクトのテストを実行
pnpm build && pnpm preview  # 本番ビルド + プレビュー
```

`package.json` の `scripts` に `"test": "vitest"` を追加すれば `pnpm test` で動かせる。

## ディレクトリ構成

```
app/
  app.vue
  pages/index.vue          # TodoForm / TodoFilter / TodoList を組み合わせる統合点
  components/
    TodoForm.vue           # 追加フォーム（UInput + UButton）
    TodoFilter.vue         # all / active / completed の3択（URadioGroup）
    TodoList.vue           # 一覧 + 空状態
    TodoItem.vue           # 1件（UCheckbox + 削除ボタン）
  composables/useTodos.ts  # useState ベースの状態管理
  types/todo.ts            # Todo / TodoFilter 型
test/
  unit/                    # composable / 純粋ロジックの単体テスト（node 環境）
  nuxt/                    # コンポーネント / ページの統合テスト（nuxt 環境）
  e2e/                     # ブラウザ越しの E2E（playwright）
vitest.config.ts           # 上記 3 プロジェクトを定義
```

## テスト方針

### テストトロフィーを参考にする

Kent C. Dodds の [Test Trophy](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications) を採用する。Static（型・lint）を土台に、Unit は薄く、**Integration を主役**、E2E は Happy Path の最小限、というバランスで書く。

理由はシンプルで、フロントエンドの大半のバグは「個別の関数が壊れている」ではなく「コンポーネントの組み合わせや状態遷移が壊れている」ことに起因するため。1 つのコンポーネントを isolation で検証するより、ユーザーが触る単位（ページ）でフローを通すテストの方が、リファクタに強く・実バグも見つけやすい。

### vitest プロジェクトと 3 層の対応

`vitest.config.ts` で 3 つのプロジェクトに分割している。各層がどのプロジェクトで動くかを揃えておくと、ファイル配置だけでテストの粒度が伝わる。

| プロジェクト | 環境       | 対象            | 主な目的                                          |
| ------------ | ---------- | --------------- | ------------------------------------------------- |
| `unit`       | `node`     | `test/unit/**`  | composable / 純粋関数のロジック検証               |
| `nuxt`       | `nuxt`     | `test/nuxt/**`  | コンポーネント / ページの統合テスト               |
| `e2e`        | `node`     | `test/e2e/**`   | アプリ起動 → ブラウザ操作の Smoke（Playwright）   |

### 各層の責務と書き方の原則

**unit（`test/unit/**`）**
入力 → 出力のみを検証する。Vue / DOM には依存させない。例：`useTodos().addTodo('')` が `false` を返し state を変えないこと、`filteredTodos` が `filter` に追従すること。乱数や時刻のような非決定要素は `vi.spyOn` でスタブする。

**nuxt（`test/nuxt/**`）— 主役**
ユーザーが触る単位でテストする。ページ全体を `mountSuspended(IndexPage)`（`@nuxt/test-utils/runtime`）で立ち上げ、`getByRole('textbox', { name: /new todo/i })` で入力 → `getByRole('button', { name: /add todo/i })` をクリック → リストが 1 件増える、までを 1 ケースで通す。子コンポーネント単体のテストは薄く保ち、責務に閉じた検証（props 反映、emit 中継）だけに留める。

**e2e（`test/e2e/**`）**
「アプリが起動して画面が出る」「Happy Path が一度通る」程度の Smoke のみ。詳細なロジックや分岐は下層に任せる。

### テスト容易性の規約

このリポジトリで一貫させたいルール（実装側も含めて守る）。

- **セレクタ優先順位**: `aria-label` / `role` ＞ `data-testid` ＞ CSS クラス
- 視覚クラス（`line-through`、`opacity-60` など）を直接 assert しない。完了状態は `aria-checked` や `UCheckbox` の `model-value` 経由で見る。Tailwind のクラス入れ替えで壊れるテストは脆い
- `data-testid` は動的識別子（例：`todo-item-${id}`、`todo-checkbox-${id}`）に絞る。静的要素は role / label で取る
- Nuxt 環境のテストは `mountSuspended` に統一する。`@vue/test-utils` の `mount` 直使用は避ける（Nuxt の auto-import や `useState` を必要とする実装に拡張したときに動かなくなるため）
- 非決定要素（`crypto.randomUUID()`、`Date.now()`）は `vi.spyOn` でスタブ可能にしておく

## 現状チェックリスト

「目指す姿」と現状の差分。

実装済み

- [x] `app/`: types / composable / 4 コンポーネント / index ページ
- [x] `vitest.config.ts`: `unit` / `nuxt` / `e2e` の 3 プロジェクト分割
- [x] `test/nuxt/components/TodoItem.test.ts`
- [x] `test/nuxt/components/TodoList.test.ts`

これから書く（学習のメイントピック）

- [ ] `test/unit/composables/useTodos.test.ts` — 純粋ロジック（`addTodo` の空文字弾き、`filteredTodos`、`remainingCount`）
- [ ] `test/nuxt/pages/index.test.ts` — **統合テスト（主役）**。フォーム入力 → 追加 → チェック → 残数減少 → フィルタ切替の一連フロー
- [ ] `test/nuxt/components/TodoForm.test.ts` — `submit` emit の発火（空文字は emit しない）
- [ ] `test/nuxt/components/TodoFilter.test.ts` — `update:modelValue` emit
- [ ] `TodoItem.test.ts` / `TodoList.test.ts` に emit 検証を追加
- [ ] `test/e2e/smoke.test.ts` — 最低限の Happy Path
