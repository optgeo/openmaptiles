# OpenMapTiles - Technical Specifications / 技術仕様書

## Project Overview / プロジェクト概要

This project is developed as a successor to `optgeo/openmaptiles-plain`, aimed at faithful visualization of OpenMapTiles vector tiles. It features style switching, 3D building display, and detailed POI classification.

このプロジェクトは `optgeo/openmaptiles-plain` の後継として開発され、OpenMapTiles ベクトルタイルの忠実な可視化を目的としています。スタイル切り替え機能、3D建物表示、POI詳細分類を特徴とします。

## Technology Stack / 技術スタック

### Frontend / フロントエンド

- **MapLibre GL JS v5.6.1**: Open-source map rendering library / オープンソースの地図レンダリングライブラリ
- **PMTiles v3.0.0**: Efficient vector tile delivery format / 効率的なベクトルタイル配信フォーマット
- **Vite v5.0.0**: Fast build tool with GitHub Pages support / 高速ビルドツール、GitHub Pages 対応

### Style Definition / スタイル定義

- **Apple Pkl**: Type-safe style definition language / 型安全なスタイル定義言語
- **OpenMapTiles Schema**: Standard schema for vector tiles with building height attributes support / ベクトルタイルの標準スキーマ、建物高さ属性対応
- **MSX 16-color Palette**: Semantic color classification system / MSX 16色パレット: セマンティックな色分け体系

## Architecture / アーキテクチャ

### File Structure / ファイル構成

```text
style-generation/
├── style.pkl     # Basic style definition (grayscale) / 基本スタイル定義（グレースケール）
├── green.pkl     # Green theme style / 緑色テーマスタイル
└── build.pkl     # 3D building + detailed POI display style / 3D建物 + POI詳細表示スタイル

public/ (development) · docs/ (deployment) / public/（開発用）・docs/（デプロイ用）
├── style.json    # Generated basic style / 生成された基本スタイル
├── green.json    # Generated green style / 生成された緑色スタイル
├── build.json    # Generated 3D building style / 生成された3D建物スタイル
├── index.html    # Main HTML file / メインHTMLファイル
├── main.js       # JavaScript entry point / JavaScript エントリーポイント
└── style.css     # CSS stylesheet / CSS スタイルシート
```

### PMTiles Integration / PMTiles 統合

- **Data Source / データソース**: <https://tile.openstreetmap.jp/static/planet.pmtiles>
- **Protocol Registration / プロトコル登録**: PMTiles protocol registered in main.js / main.js でPMTilesプロトコルを登録
- **Vite Configuration / Vite設定**: CDN loading for bundle size optimization / CDNからの読み込みでバンドルサイズ最適化

## Key Features / 主要機能

### 1. Style Switching System / スタイル切り替えシステム

#### URL Parameter Support / URL パラメータ対応

- `?style=build` : 3D buildings + detailed POI display / 3D建物 + POI詳細表示
- `?style=green` : Green theme / 緑色テーマ
- `?style=style` : Basic grayscale / 基本グレースケール

#### Dropdown Menu / ドロップダウンメニュー

- Dynamic style list generation with JavaScript / JavaScript で動的にスタイル一覧を生成
- Runtime switching with `map.setStyle()` / `map.setStyle()` による実行時切り替え

### 2. 3D Building Display (build.pkl) / 3D建物表示（build.pkl）

#### Utilizing OpenMapTiles Attributes / OpenMapTiles 属性活用

```json
{
  "type": "fill-extrusion",
  "paint": {
    "fill-extrusion-height": ["get", "render_height"],
    "fill-extrusion-base": ["get", "render_min_height"],
    "fill-extrusion-color": "#ddd"
  }
}
```

### 3. Detailed POI Classification System / POI詳細分類システム

#### MSX 16-color Palette Application / MSX 16色パレット適用

- Color coding for 40+ facility types / 40種類以上の施設タイプを色分け
- Hierarchical classification by class/subclass attributes / class/subclass 属性による階層的分類
- Semantic color assignment / セマンティックな色の割り当て

#### Importance Filtering / 重要度フィルタリング

- Display control by rank attribute / rank 属性による表示制御
- Display rank 1-2 POIs at zoom level 14+ / ズームレベル 14+ で rank 1-2 のPOIを表示
- Display rank 3-4 POIs at zoom level 16+ / ズームレベル 16+ で rank 3-4 のPOIを表示

#### Dynamic Font Sizing / 動的フォントサイズ

Font size adjusts based on text length rather than importance:

テキストの長さに基づいてフォントサイズを調整（重要度ではなく）：

```json
{
  "text-size": {
    "case": [
      [">=", ["length", ["get", "name"]], 20], 6,
      [">=", ["length", ["get", "name"]], 15], 8,
      [">=", ["length", ["get", "name"]], 10], 10,
      12
    ]
  }
}
```

## Build Process / ビルドプロセス

### Makefile Automation / Makefile による自動化

```makefile
style-generation/%.json: style-generation/%.pkl
    pkl eval --format json $< > $@

public/%.json: style-generation/%.json
    cp $< $@

docs/%.json: style-generation/%.json
    cp $< $@
```

### Development and Deployment Flow / 開発・デプロイフロー

1. **Pkl → JSON Conversion / Pkl → JSON 変換**: Generate style files with `make style` / `make style` でスタイルファイル生成
2. **Development Server / 開発サーバー**: Local verification with `npm run dev` / `npm run dev` でローカル確認
3. **Build / ビルド**: Execute Vite build with `npm run build` / `npm run build` でViteビルド実行
4. **Deploy / デプロイ**: Automatic deployment to GitHub Pages / GitHub Pages へ自動デプロイ
    type = "background"
    paint {
      ["background-color"] = "#f8f8f8"
    }
  }
  // 他のレイヤー定義...
}
```

### 建物立体表示

建物レイヤーでは `fill-extrusion` タイプを使用し、OpenMapTiles の属性を活用して高さを決定：

```pkl
paint {
  ["fill-extrusion-height"] = new {
    "case"
    new { "has"; "render_height" }; new { "get"; "render_height" }
    new { "has"; "levels" }; new { "*"; new { "to-number"; new { "get"; "levels" } }; 3 }
    5  // デフォルト高さ
  }
  ["fill-extrusion-base"] = new {
    "case"
    new { "has"; "render_min_height" }; new { "get"; "render_min_height" }
    0
  }
}
```

## Development Workflow / 開発ワークフロー

### Development Environment / 開発環境

```bash
# Install dependencies / 依存関係インストール
npm install

# Generate styles / スタイル生成
make style

# Start development server / 開発サーバー起動
npm run dev
```

### Build and Deploy / ビルドとデプロイ

```bash
# Production build / プロダクションビルド
npm run build

# Deploy to GitHub Pages / GitHub Pages デプロイ
npm run deploy
```

### Makefile Tasks / Makefile タスク

- `make style`: Generate JSON from all Pkl files / 全 Pkl ファイルから JSON を生成
- `make build`: Execute npm run build / npm run build の実行
- `make clean`: Clean up generated files / 生成ファイルのクリーンアップ

## Vite Configuration Details / Vite 設定の詳細

### Important Configuration Items / 重要な設定項目

```javascript
export default defineConfig({
  build: {
    outDir: 'docs',
    rollupOptions: {
      output: {
        entryFileNames: 'main.js',
        assetFileNames: 'main.[ext]'
      }
    }
  },
  base: './',
  assetsInclude: ['**/*.json']
});
```

- `outDir: 'docs'`: Output destination for GitHub Pages / GitHub Pages 用の出力先
- `base: './'`: Relative path base / 相対パスベース
- `assetFileNames`: Output CSS as `main.css` / CSS を `main.css` として出力
      output: {
        entryFileNames: 'main.js',
        assetFileNames: 'main.[ext]'
      }
    }
  },
  base: './',
  assetsInclude: ['**/*.json']
});
```

- `outDir: 'docs'`: GitHub Pages 用の出力先
- `base: './'`: 相対パスベース
- `assetFileNames`: CSS を `main.css` として出力

## Feature Implementation / 機能実装

### Style Switching / スタイル切り替え

```javascript
const styles = ['style.json', 'green.json', 'build.json'];
dropdown.addEventListener('change', () => {
    map.setStyle(`./${dropdown.value}`);
});
```

### Attribute Information Display / 属性情報表示

```javascript
map.on('click', (e) => {
    const features = map.queryRenderedFeatures(e.point);
    if (features.length > 0) {
        const popupContent = features.map(feature => {
            return `<strong>${feature.layer.id}</strong><br>
                    ${JSON.stringify(feature.properties, null, 2)}`;
        }).join('<hr>');
        
        new maplibregl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(popupContent)
            .addTo(map);
    }
});
```

## Deployment / デプロイメント

### GitHub Actions

Automatic deployment configured in `.github/workflows/deploy.yml`:

`.github/workflows/deploy.yml` で自動デプロイを設定：

```yaml
- run: npm install
- run: npm run build
- run: make style
- name: Deploy
  uses: peaceiris/actions-gh-pages@v3
```

### Static Hosting Support / 静的ホスティング対応

- Relative path based configuration / 相対パス基準の設定
- Output to `docs/` directory / `docs/` ディレクトリへの出力
- CSS/JS optimization and bundling / CSS/JS の最適化とバンドル

## Troubleshooting / トラブルシューティング

### Common Issues / よくある問題

1. **PMTiles Protocol Error / PMTiles プロトコルエラー**
   - Remove `external: ['pmtiles']` from Vite configuration / `external: ['pmtiles']` を Vite 設定から削除
   - Verify protocol registration / プロトコル登録の確認

2. **CSS Not Applied / CSS が適用されない**
   - Check MapLibre GL CSS CDN loading / MapLibre GL CSS の CDN 読み込み確認
   - Verify `main.css` generation / `main.css` の生成確認

3. **Build Size Warning / ビルドサイズ警告**
   - Large bundle size due to PMTiles bundling / PMTiles バンドルによる大容量化
   - Consider code splitting / コード分割の検討

### Debugging Methods / デバッグ方法

```javascript
// Debug PMTiles requests / PMTiles リクエストのデバッグ
maplibregl.addProtocol("pmtiles", (tileParams, callback) => {
    console.log('PMTiles request:', tileParams);
    return protocol.tile(tileParams, callback);
});

// Verify attribute information / 属性情報の確認
map.on('click', (e) => {
    const features = map.queryRenderedFeatures(e.point);
    console.log('Features:', features);
});
```

## Performance Optimization / パフォーマンス最適化

### Style Optimization / スタイル最適化

- **Compact Pkl Syntax**: 73% code reduction in style.pkl (302→82 lines) / **コンパクトなPkl記法**: style.pklで73%のコード削減（302→82行）
- **One-line Layer Definitions**: Simplified layer syntax for better maintainability / **1行レイヤー定義**: メンテナンス性向上のためのシンプルなレイヤー記法
- **Minimize number of layers**: Layer consolidation / **レイヤー数の最小化**: レイヤーの統合
- **Remove unnecessary properties**: Optimized property usage / **不要なプロパティの削除**: プロパティ使用の最適化
- **Zoom level-specific display control**: Performance-aware rendering / **ズームレベル別の表示制御**: パフォーマンスを考慮したレンダリング

### Text Rendering Optimization / テキストレンダリング最適化

- **Length-based Font Sizing**: Dynamic font sizes based on text length for better readability / **文字数ベースのフォントサイズ**: 可読性向上のための文字数による動的フォントサイズ
- **Automatic Line Wrapping**: POI text with `text-max-width` for proper display / **自動改行**: POIテキストの適切表示のための`text-max-width`設定
- **Boundary Filtering**: Exclude maritime and disputed boundaries for cleaner maps / **境界線フィルタリング**: より見やすい地図のための海上・係争境界の除外

### Data Optimization / データ最適化

- PMTiles tile level configuration / PMTiles のタイル化レベル設定
- Attribute data optimization / 属性データの最適化
- Layer-specific data separation / レイヤー別データ分離

## Related Technologies / 関連技術

### Apple Pkl

- Type-safe style description / 型安全なスタイル記述
- JSON output compatibility / JSON 出力による互換性
- Modular configuration management / モジュラーな設定管理
- Compact syntax for maintainable code / メンテナンス可能なコードのためのコンパクト記法

### OpenMapTiles Schema

- Building height attributes: `render_height`, `render_min_height` / 建物高さ属性: `render_height`, `render_min_height`
- POI classification: `class`, `subclass` / POI 分類: `class`, `subclass`
- Rank information: `rank` / ランク情報: `rank`
- Boundary attributes: `maritime`, `disputed` for filtering / 境界属性: フィルタリング用の`maritime`, `disputed`

### MapLibre GL JS

- Open-source map library / オープンソースの地図ライブラリ
- High-speed rendering with WebGL / WebGL による高速レンダリング
- Pluggable architecture / プラグイン可能なアーキテクチャ
- Advanced filtering capabilities / 高度なフィルタリング機能

## Maintenance and Optimization History / メンテナンスと最適化履歴

### July 2025 / 2025年7月

- **Code Optimization**: Reduced style.pkl from 302 to 82 lines (73% reduction) / **コード最適化**: style.pklを302行から82行に削減（73%削減）
- **POI Font Improvements**: Implemented length-based font sizing with automatic line wrapping / **POIフォント改善**: 文字数ベースのフォントサイズと自動改行を実装
- **Boundary Filtering**: Enhanced filtering to exclude maritime and disputed boundaries / **境界線フィルタリング**: 海上・係争境界を除外するフィルタリングを強化
- **File Structure Cleanup**: Organized JSON generation to public/ and docs/ directories only / **ファイル構成整理**: JSON生成をpublic/とdocs/ディレクトリのみに整理

## Related Links / 関連リンク

- [OpenMapTiles schema](https://openmaptiles.org/schema/)
- [optgeo/openmaptiles-plain](https://github.com/optgeo/openmaptiles-plain) (predecessor project / 前身プロジェクト)
- [PMTiles](https://protomaps.com/docs/pmtilesjs/)
- [Apple Pkl](https://pkl-lang.org/)
- [MapLibre GL JS](https://maplibre.org/maplibre-gl-js-docs/)
- [MSX Color Palette Reference](https://www.msx.org/wiki/MSX_Colour_Palette)
