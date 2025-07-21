# OpenMapTiles

このプロジェクトは `optgeo/openmaptiles-plain` の後継として、OpenMapTiles ベクトルタイルを忠実に可視化するテンプレートサイトです。

## 特徴

- **スタイル切り替え機能**: ドロップダウンメニューで複数のマップスタイルを選択可能
- **URL パラメータ対応**: `?style=build` でスタイルを直接指定
- **PMTiles 統合**: 効率的なベクトルタイル配信
- **建物の立体表示**: 3D 建物レイヤーによる立体的な地図表現
- **POI 詳細表示**: class/subclass 属性による多彩な色分け、rank による重要度表示
- **属性情報表示**: 地図クリック時にフィーチャの属性を吹き出し表示
- **GitHub Pages 対応**: 自動デプロイによる簡単な公開

## 提供スタイル

- **style.json**: 基本のグレースケールスタイル
- **green.json**: 緑色系テーマのスタイル  
- **build.json**: 建物を立体表示し、POI を多彩な色で表現するスタイル
  - 40種類以上の施設タイプに対応した色分け
  - rank による重要度フィルタリング
  - ズームレベルに応じた動的フォントサイズ

## URL パラメータ

スタイルを URL で直接指定できます：

- `https://optgeo.github.io/openmaptiles/` - デフォルト（build.json）
- `https://optgeo.github.io/openmaptiles/?style=build` - 建物3Dスタイル
- `https://optgeo.github.io/openmaptiles/?style=green` - 緑色テーマ
- `https://optgeo.github.io/openmaptiles/?style=style` - 基本スタイル

## クイックスタート

### 開発環境での実行

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

### ビルドとデプロイ

```bash
# スタイルファイルの生成
make style

# プロダクションビルド
npm run build

# GitHub Pages へのデプロイ
npm run deploy
```

## ディレクトリ構成

```
.
├── style-generation/   # Pkl スタイル定義ファイル
├── public/            # 静的アセット
├── docs/              # GitHub Pages デプロイ用
├── index.html         # メインHTML
├── main.js           # JavaScript エントリーポイント
├── style.css         # CSS スタイル
└── vite.config.js    # Vite 設定
```

## 技術仕様

詳細な技術仕様、設定、開発に関する情報は [NOTE.md](NOTE.md) を参照してください。

## ライセンス

このプロジェクトは CC0 1.0 Universal ライセンスの下で公開されています。詳細は [LICENSE](LICENSE) ファイルを参照してください。

## 関連リンク

- [OpenMapTiles schema](https://openmaptiles.org/schema/)
- [optgeo/openmaptiles-plain](https://github.com/optgeo/openmaptiles-plain) (前身プロジェクト)
- [PMTiles](https://protomaps.com/docs/pmtilesjs/)
- [Apple Pkl](https://pkl-lang.org/)

- [optgeo/openmaptiles-plain](https://github.com/optgeo/openmaptiles-plain) - 元プロジェクト
- [PMTiles Documentation](https://protomaps.com/docs/pmtilesjs/)
- [OpenMapTiles Schema](https://openmaptiles.org/schema/)
