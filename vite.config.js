import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    root: 'src/View',
    plugins: [
        react(),
        svgr(),
    ],
    assetsInclude: ['**/*.svg'], // Ensure SVG files are included as assets
});
