import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: { index: 'src/index.ts' },
    format: ['cjs', 'esm'],
    target: 'es2020',
    dts: true,
    clean: true,
    sourcemap: true,
    external: ['fs'],
  },
  {
    entry: { browser: 'src/browser-index.ts' },
    format: ['cjs', 'esm'],
    target: 'es2020',
    dts: false,
    sourcemap: true,
    external: ['fs'],
  },
  {
    entry: { scribbletune: 'src/browser-index.ts' },
    format: ['iife'],
    target: 'es2020',
    globalName: 'scribble',
    sourcemap: true,
    external: ['fs'],
  },
]);
