import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import copy from 'rollup-plugin-copy';
import run from 'rollup-plugin-shell';

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
    run({
      hook: 'buildEnd',
      commands: [
        'yarn build:theme-default'
      ]
    })
  ],
});
