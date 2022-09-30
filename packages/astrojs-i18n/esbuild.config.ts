import { build } from 'esbuild'
build({
  entryPoints: {
    'index': './src/index',
  },
  outdir: "path",
  bundle: true,
  platform: 'node',
  format: "esm",
  minify: true,
  external: ['esbuild','astro','i18next','@proload/core'],
  banner: {
    js: `
    import module2 from 'module';
    import path2 from 'path';
    import * as url2 from 'url';
    const require = module2.createRequire(import.meta.url);
    const __filename = url2.fileURLToPath(import.meta.url);
    const __dirname = path2.dirname(__filename);
    `,
  },
  sourcemap: false,
  sourcesContent: false,
  allowOverwrite: true,
})