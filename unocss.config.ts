import {
  defineConfig,
  presetIcons,
  presetAttributify,
  presetUno,
  transformerDirectives
} from 'unocss'

export default defineConfig({
  theme:{
    fontFamily: {
      "ubuntu":"'Ubuntu', 'Verdana', 'sans-serif'"
    }
  },
  transformers: [
    transformerDirectives()
  ],
  presets: [
    presetUno(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetAttributify()
  ]
})