# OpenMapTiles

This project is a successor to `optgeo/openmaptiles-plain`, providing a template site for faithful visualization of OpenMapTiles vector tiles.

このプロジェクトは `optgeo/openmaptiles-plain` の後継として、OpenMapTiles ベクトルタイルを忠実に可視化するテンプレートサイトです。

## Features / 特徴

- **Style Switching**: Select multiple map styles via dropdown menu / **スタイル切り替え機能**: ドロップダウンメニューで複数のマップスタイルを選択可能
- **URL Parameter Support**: Direct style specification with `?style=build` / **URL パラメータ対応**: `?style=build` でスタイルを直接指定
- **PMTiles Integration**: Efficient vector tile delivery / **PMTiles 統合**: 効率的なベクトルタイル配信
- **3D Building Display**: Three-dimensional map representation with 3D building layers / **建物の立体表示**: 3D 建物レイヤーによる立体的な地図表現
- **Detailed POI Display**: Colorful classification by class/subclass attributes, importance display by rank / **POI 詳細表示**: class/subclass 属性による多彩な色分け、rank による重要度表示
- **Attribute Information Display**: Feature attributes displayed in popup on map click / **属性情報表示**: 地図クリック時にフィーチャの属性を吹き出し表示
- **GitHub Pages Support**: Easy publishing with automatic deployment / **GitHub Pages 対応**: 自動デプロイによる簡単な公開

## Available Styles / 提供スタイル

- **style.json**: Basic grayscale style / 基本のグレースケールスタイル
- **green.json**: Green-themed style / 緑色系テーマのスタイル  
- **build.json**: 3D buildings with colorful POI representation / 建物を立体表示し、POI を多彩な色で表現するスタイル
  - Color coding for 40+ facility types / 40種類以上の施設タイプに対応した色分け
  - Importance filtering by rank / rank による重要度フィルタリング
  - Dynamic font sizing based on zoom level / ズームレベルに応じた動的フォントサイズ

## URL Parameters / URL パラメータ

Styles can be specified directly via URL: / スタイルを URL で直接指定できます：

- `https://optgeo.github.io/openmaptiles/` - Default (build.json) / デフォルト（build.json）
- `https://optgeo.github.io/openmaptiles/?style=build` - 3D Building Style / 建物3Dスタイル
- `https://optgeo.github.io/openmaptiles/?style=green` - Green Theme / 緑色テーマ
- `https://optgeo.github.io/openmaptiles/?style=style` - Basic Style / 基本スタイル

## Quick Start / クイックスタート

### Running in Development Environment / 開発環境での実行

```bash
# Install dependencies / 依存関係のインストール
npm install

# Start development server / 開発サーバーの起動
npm run dev
```

### Build and Deploy / ビルドとデプロイ

```bash
# Generate style files / スタイルファイルの生成
make style

# Production build / プロダクションビルド
npm run build

# Deploy to GitHub Pages / GitHub Pages へのデプロイ
npm run deploy
```

## Directory Structure / ディレクトリ構成

```text
.
├── style-generation/   # Pkl style definition files / Pkl スタイル定義ファイル
├── public/            # Static assets / 静的アセット
├── docs/              # GitHub Pages deployment / GitHub Pages デプロイ用
├── index.html         # Main HTML / メインHTML
├── main.js           # JavaScript entry point / JavaScript エントリーポイント
├── style.css         # CSS styles / CSS スタイル
└── vite.config.js    # Vite configuration / Vite 設定
```

## Technical Specifications / 技術仕様

For detailed technical specifications, configuration, and development information, see [NOTE.md](NOTE.md).

詳細な技術仕様、設定、開発に関する情報は [NOTE.md](NOTE.md) を参照してください。

## License / ライセンス

This project is released under the CC0 1.0 Universal License. See the [LICENSE](LICENSE) file for details.

このプロジェクトは CC0 1.0 Universal ライセンスの下で公開されています。詳細は [LICENSE](LICENSE) ファイルを参照してください。

## 関連リンク

- [OpenMapTiles schema](https://openmaptiles.org/schema/)
- [optgeo/openmaptiles-plain](https://github.com/optgeo/openmaptiles-plain) (前身プロジェクト)
- [PMTiles](https://protomaps.com/docs/pmtilesjs/)
- [Apple Pkl](https://pkl-lang.org/)

- [optgeo/openmaptiles-plain](https://github.com/optgeo/openmaptiles-plain) - 元プロジェクト
- [PMTiles Documentation](https://protomaps.com/docs/pmtilesjs/)
- [OpenMapTiles Schema](https://openmaptiles.org/schema/)
