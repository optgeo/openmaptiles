import maplibregl from 'maplibre-gl';
import { Protocol } from 'pmtiles';

// PMTiles プロトコルをMapLibre GL JSに登録
let protocol = new Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);

// URLクエリパラメータからスタイルを取得
const urlParams = new URLSearchParams(window.location.search);
const styleParam = urlParams.get('style');
const defaultStyle = styleParam ? `./${styleParam}.json` : './build.json';

const map = new maplibregl.Map({
    container: 'map',
    style: defaultStyle,
    center: [24.8328, 60.1865], // Aalto University Otaniemi Campus, Finland
    zoom: 14,
    hash: true, // URLのハッシュを使用してズームと中心を保存
});

map.addControl(new maplibregl.NavigationControl());
map.addControl(new maplibregl.FullscreenControl());
map.addControl(new maplibregl.GlobeControl());

const dropdown = document.createElement('select');
dropdown.id = 'styleSwitcher';
document.body.appendChild(dropdown);

const styles = ['style.json', 'green.json', 'build.json'];
styles.forEach(style => {
    const option = document.createElement('option');
    option.value = style;
    option.textContent = style;
    dropdown.appendChild(option);
});

// ドロップダウンの初期値を設定
const currentStyleName = styleParam ? `${styleParam}.json` : 'build.json';
dropdown.value = currentStyleName;

dropdown.addEventListener('change', () => {
    const selectedStyle = dropdown.value;
    const styleName = selectedStyle.replace('.json', '');
    
    // マップのスタイルを変更
    map.setStyle(`./${selectedStyle}`);
    
    // URLパラメータを更新
    const newUrl = new URL(window.location);
    newUrl.searchParams.set('style', styleName);
    window.history.replaceState({}, '', newUrl);
});

// マップクリック時に属性を吹き出し表示（すべてのフィーチャを表示）
map.on('click', (e) => {
    const features = map.queryRenderedFeatures(e.point);
    if (features.length > 0) {
        const popupContent = features.map(feature => {
            return `<strong>${feature.layer.id}</strong><br>${JSON.stringify(feature.properties, null, 2)}`;
        }).join('<hr>');

        const popup = new maplibregl.Popup({ closeOnClick: true })
            .setLngLat(e.lngLat)
            .setHTML(popupContent)
            .addTo(map);
    }
});
