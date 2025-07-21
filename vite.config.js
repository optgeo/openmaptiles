import { defineConfig } from 'vite';

export default defineConfig({
    root: '.',
    build: {
        outDir: 'docs',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: 'index.html'
            },
            output: {
                entryFileNames: 'main.js',
                assetFileNames: 'main.[ext]' // CSS ファイルを main.css として生成
            }
        }
    },
    server: {
        host: '0.0.0.0',
        open: true,
        port: 3000
    },
    base: './',
    assetsInclude: ['**/*.json'],
    esbuild: {
        target: 'es2020',
        minifyIdentifiers: true,
        minifySyntax: true
    }
});
