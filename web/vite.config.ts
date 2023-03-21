import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import copy from 'rollup-plugin-copy';

export default defineConfig({
  build: {
    minify: false
  },
  plugins: [
    solidPlugin({
      babel: {
        plugins: [['@babel/plugin-proposal-decorators', {version: '2022-03'}]],
      },
    }),
    copy({
      flatten: false,
      hook: 'closeBundle',
      targets: [{
        src: 'src/assets/*',
        dest: 'dist/',
      }]
    }),
  ],
});
