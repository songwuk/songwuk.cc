# astrojs-i18n

<p><span style="font-size:20px">🚨</span>The current project is not perfect, please use it with caution</p>
<p><span style='font-size:20px'>🏓</span> The project will be improved in the future</p>

# why I use&nbsp;?
<p style="font-size:22px">
  more simple and more fast, and
  My personal website needs to be internationalized, So I want to develop this project
</p>

## Usage 
- 1.create `astro.i18n.config.mjs`
```ts
const config = {
  defaultLanguage: "en",
  supportedLanguages: ['en','zh'],
  localesPath:{
    loadPath: "./src/locales/*.json",
  },
  i18n: {
    debug: false
  },
}
export default config;
```

- 2.write in astro.config.mjs
```ts
import i18n from 'astrojs-i18n'
export default defineConfig({
  integrations: [i18n()]
})
```
- 3.use in astro components 
```ts
import { t, changeLanguage } from 'i18next'
changeLanguage('en')
t('title')
```

## Inspired by 
- [astro-i18next](https://github.com/yassinedoghri/astro-i18next)
