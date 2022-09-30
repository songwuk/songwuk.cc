import { defineBuildConfig } from 'unbuild'
export default defineBuildConfig({
  entries: [
    'src/index',
    {
      builder: 'mkdist',
      input: './src/components',
      outDir: './dist/components',
    }
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
    esbuild: {
      target: 'es2020' 
    }
  },
  externals: ['astro','i18next','@proload/core']
})
