## プロジェクト概要

このリポジトリは optgeo/openmaptiles-plain の後継であり、ベクトルタイル（OpenMapTiles）を忠実に可視化するテンプレートサイト optgeo/openmaptiles を構築するためのものです。

---

## 実装要件

### 1. ベース構成

- optgeo/openmaptiles-plain の内容を全て踏襲する。
- Vite 関係の混乱が起こらないように、ファイルをそのままコピーすること。
- リポジトリ名は optgeo/openmaptiles とする。

### 2. スタイル生成

- style-generation フォルダの style.pkl から public/style.json や docs/style.json を生成する。
- 同様に、style-generation/AAA.pkl から public/AAA.pkl と docs/AAA.pk を生成するように Makefile でルールづけを行う。

### 3. スタイル切り替え機能

- optgeo/openmaptiles では多数の style.json ファイルが生成される。
- main.js において、style.json を切り替える機能を実装する。
- ドロップダウンメニューで style.json ファイルを選択すると、map.setStyle でスタイルを入れ替える。

---

## 開発・運用

- 開発・ビルド・デプロイ・設定などは optgeo/openmaptiles-plain の README や Makefile を参照し、同様に実装する。
- デプロイ先は docs/ ディレクトリ（GitHub Pages 用）。
- コードや設定はシンプルかつ明快に保つこと。

---

## Copilot への指示

- optgeo/openmaptiles-plain の設計・技術スタックを忠実に踏襲してください。
- ただし、スタイル切り替え機能（ドロップダウンメニューで style.json を選択し、map.setStyle で切り替え）を追加してください。
- Apple Pkl でのスタイル定義、Vite ビルド、Makefile、GitHub Pages デプロイなどはそのまま流用可能です。

---

## 参考

- [optgeo/openmaptiles-plain](https://github.com/optgeo/openmaptiles-plain)
- [pmtiles.js ドキュメント](https://protomaps.com/docs/pmtilesjs/)
- [OpenMapTiles schema](https://openmaptiles.org/schema/)

---

**上記をもとに、初期実装および保守運用に役立つよう設計・実装してください。**
