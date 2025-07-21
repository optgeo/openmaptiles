# OpenMapTiles - 技術仕様書

## プロジェクト概要

このプロジェクトは `optgeo/openmaptiles-plain` の後継として開発され、OpenMapTiles ベクトルタイルの忠実な可視化を目的としています。スタイル切り替え機能、3D建物表示、POI詳細分類を特徴とします。

## 技術スタック

### フロントエンド
- **MapLibre GL JS v5.6.1**: オープンソースの地図レンダリングライブラリ
- **PMTiles v3.0.0**: 効率的なベクトルタイル配信フォーマット
- **Vite v5.0.0**: 高速ビルドツール、GitHub Pages 対応

### スタイル定義
- **Apple Pkl**: 型安全なスタイル定義言語
- **OpenMapTiles Schema**: ベクトルタイルの標準スキーマ、建物高さ属性対応
- **MSX 16色パレット**: セマンティックな色分け体系

## アーキテクチャ

### ファイル構成

```text
style-generation/
├── style.pkl     # 基本スタイル定義（グレースケール）
├── green.pkl     # 緑色テーマスタイル
└── build.pkl     # 3D建物 + POI詳細表示スタイル

public/（開発用）・docs/（デプロイ用）
├── style.json    # 生成された基本スタイル
├── green.json    # 生成された緑色スタイル
├── build.json    # 生成された3D建物スタイル
├── index.html    # メインHTMLファイル
├── main.js       # JavaScript エントリーポイント
└── style.css     # CSS スタイルシート
```

### PMTiles 統合

- **データソース**: <https://tile.openstreetmap.jp/static/planet.pmtiles>
- **プロトコル登録**: main.js でPMTilesプロトコルを登録
- **Vite設定**: CDNからの読み込みでバンドルサイズ最適化

## 主要機能

### 1. スタイル切り替えシステム

#### URL パラメータ対応

- `?style=build` : 3D建物 + POI詳細表示
- `?style=green` : 緑色テーマ
- `?style=style` : 基本グレースケール

#### ドロップダウンメニュー

- JavaScript で動的にスタイル一覧を生成
- `map.setStyle()` による実行時切り替え

### 2. 3D建物表示（build.pkl）

#### OpenMapTiles 属性活用

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

### 3. POI詳細分類システム

#### MSX 16色パレット適用

- 40種類以上の施設タイプを色分け
- class/subclass 属性による階層的分類
- セマンティックな色の割り当て

#### 重要度フィルタリング

- rank 属性による表示制御
- ズームレベル 14+ で rank 1-2 のPOIを表示
- ズームレベル 16+ で rank 3-4 のPOIを表示

#### 動的フォントサイズ

```json
{
  "text-size": {
    "type": "exponential",
    "stops": [[14, 10], [18, 16]]
  }
}
```

## ビルドプロセス

### Makefile による自動化

```makefile
style-generation/%.json: style-generation/%.pkl
	pkl eval --format json $< > $@

public/%.json: style-generation/%.json
	cp $< $@

docs/%.json: style-generation/%.json
	cp $< $@
```

### 開発・デプロイフロー

1. **Pkl → JSON 変換**: `make style` でスタイルファイル生成
2. **開発サーバー**: `npm run dev` でローカル確認
3. **ビルド**: `npm run build` でViteビルド実行
4. **デプロイ**: GitHub Pages へ自動デプロイ
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

## 開発ワークフロー

### 開発環境

```bash
# 依存関係インストール
npm install

# スタイル生成
make style

# 開発サーバー起動
npm run dev
```

### ビルドとデプロイ

```bash
# プロダクションビルド
npm run build

# GitHub Pages デプロイ
npm run deploy
```

### Makefile タスク

- `make style`: 全 Pkl ファイルから JSON を生成
- `make build`: npm run build の実行
- `make clean`: 生成ファイルのクリーンアップ

## Vite 設定の詳細

### 重要な設定項目

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

- `outDir: 'docs'`: GitHub Pages 用の出力先
- `base: './'`: 相対パスベース
- `assetFileNames`: CSS を `main.css` として出力

## 機能実装

### スタイル切り替え

```javascript
const styles = ['style.json', 'green.json', 'build.json'];
dropdown.addEventListener('change', () => {
    map.setStyle(`./${dropdown.value}`);
});
```

### 属性情報表示

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

## デプロイメント

### GitHub Actions

`.github/workflows/deploy.yml` で自動デプロイを設定：

```yaml
- run: npm install
- run: npm run build
- run: make style
- name: Deploy
  uses: peaceiris/actions-gh-pages@v3
```

### 静的ホスティング対応

- 相対パス基準の設定
- `docs/` ディレクトリへの出力
- CSS/JS の最適化とバンドル

## トラブルシューティング

### よくある問題

1. **PMTiles プロトコルエラー**
   - `external: ['pmtiles']` を Vite 設定から削除
   - プロトコル登録の確認

2. **CSS が適用されない**
   - MapLibre GL CSS の CDN 読み込み確認
   - `main.css` の生成確認

3. **ビルドサイズ警告**
   - PMTiles バンドルによる大容量化
   - コード分割の検討

### デバッグ方法

```javascript
// PMTiles リクエストのデバッグ
maplibregl.addProtocol("pmtiles", (tileParams, callback) => {
    console.log('PMTiles request:', tileParams);
    return protocol.tile(tileParams, callback);
});

// 属性情報の確認
map.on('click', (e) => {
    const features = map.queryRenderedFeatures(e.point);
    console.log('Features:', features);
});
```

## パフォーマンス最適化

### スタイル最適化
- レイヤー数の最小化
- 不要なプロパティの削除
- ズームレベル別の表示制御

### データ最適化
- PMTiles のタイル化レベル設定
- 属性データの最適化
- レイヤー別データ分離

## 関連技術

### Apple Pkl
- 型安全なスタイル記述
- JSON 出力による互換性
- モジュラーな設定管理

### OpenMapTiles Schema
- 建物高さ属性: `render_height`, `render_min_height`
- POI 分類: `class`, `subclass`
- ランク情報: `rank`

### MapLibre GL JS
- オープンソースの地図ライブラリ
- WebGL による高速レンダリング
- プラグイン可能なアーキテクチャ
    console.log("Requesting tile:", tileParams);
    protocol.tile(tileParams, callback);
});
```

## パフォーマンス最適化

- PMTiles による効率的なタイル配信
- Vite によるバンドル最適化
- レイヤー描画順序の最適化
- 最小ズームレベルの適切な設定

## 今後の拡張予定

- 追加スタイルの実装
- インタラクティブ機能の強化
- パフォーマンスの更なる最適化
- モバイル対応の改善
