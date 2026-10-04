# Mantela Editor - Telephone Network Mandala Editor

[![Deploy to GitHub Pages](https://github.com/tkytel/mantela-editor/actions/workflows/build.yaml/badge.svg)](https://github.com/tkytel/mantela-editor/actions/workflows/build.yaml) [![Lint](https://github.com/tkytel/mantela-editor/actions/workflows/lint.yaml/badge.svg)](https://github.com/tkytel/mantela-editor/actions/workflows/lint.yaml) [![Test](https://github.com/tkytel/mantela-editor/actions/workflows/test.yaml/badge.svg)](https://github.com/tkytel/mantela-editor/actions/workflows/test.yaml)

**Mantela Editor** は、[Mantela](https://github.com/tkytel/mantela) 記述を行うためのヘルパー UI を提供します。

## Development

[VS Code](https://code.visualstudio.com/) の [Dev containers](https://code.visualstudio.com/docs/devcontainers/tutorial) でこのプロジェクトを開いてください。

以下を実行すると、開発サーバーを起動できます。

```sh
mise run dev
```

主なタスクは以下の通りです（[mise](https://mise.jdx.dev/) と [Vite+](https://viteplus.dev/) を使用）。

```sh
mise run check   # Oxlint（型チェック込み）+ Oxfmt
mise run fix     # 自動修正
mise run test    # Storybook テスト（カバレッジ付き）
mise run build   # 本番ビルド
```

コミット前フックは `mise generate git-pre-commit -w` で導入できます。

## License

MIT
