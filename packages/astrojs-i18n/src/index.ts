import type { AstroIntegration } from 'astro';
import { deeplyStringifyObject, getUserConfig } from './utils'
import { fileURLToPath } from 'url'
import { readFile } from'fs/promises'
import fg from 'fast-glob'
import type { AstrojsI18nconfig } from './types' 
export default function(options?: any): AstroIntegration {
  const customConfigPath = options?.configPath;
  return {
    name: 'astrojs-i18n',
    hooks: {
      'astro:config:setup': async ({config, injectScript}) => {
        const userConfig = await getUserConfig(config.root, customConfigPath)
        if(!userConfig?.value){ 
          throw new Error(
            `[astrojs-i18n]: Could not read a config file at ${JSON.stringify(
              customConfigPath
            )}`
          );
        }
        const astrojsI18nconfig = userConfig?.value as AstrojsI18nconfig
        if(astrojsI18nconfig.defaultLanguage === '' || !astrojsI18nconfig.defaultLanguage){
          throw new Error(
            `[astrojs-i18n]: you must set a baseLanguage in your astrojsI18nconfig`
          );
        }
        if(astrojsI18nconfig.supportedLanguages.length === 0){
          astrojsI18nconfig.supportedLanguages = [...astrojsI18nconfig.defaultLanguage]
        }
        if(!astrojsI18nconfig.supportedLanguages.includes(astrojsI18nconfig.defaultLanguage)){
          astrojsI18nconfig.supportedLanguages.unshift(astrojsI18nconfig.defaultLanguage)
        }
        if(!astrojsI18nconfig.localesPath || !astrojsI18nconfig.localesPath.loadPath){
          throw new Error(
            "[astrojs-i18n]: you must set a `localesPath.loadPath` in your astrojsI18nconfig"
          );
        }
         // set i18next supported and fallback languages (same as supportedLocales)
        astrojsI18nconfig.i18n = {
          ...astrojsI18nconfig.i18n,
          'supportedLngs':  [...(astrojsI18nconfig.supportedLanguages as string[])],
          'fallbackLng':  [...(astrojsI18nconfig.supportedLanguages as string[])]
        }
        const cwd = fileURLToPath(new URL(config.root.href).href) 
        const filesRoot = astrojsI18nconfig.localesPath.loadPath;
        const files = await fg(filesRoot, {
          cwd,
          absolute: true,
          dot: true,
        })
        let imports = `import i18next from 'i18next'\n`
        let i18n = `i18next`;
        astrojsI18nconfig.i18n.resources = {}
        if(files.length > 0){
          for (const file of files) {
            const arrFile = file.split('/')
            const data =  await readFile(file, {encoding:'utf-8'})
            const nameFile = arrFile[arrFile.length -1].split('.')[0]
            console.log(nameFile, '-----')
            // imports += `import ${nameFile} from '${file}'\n`
            astrojsI18nconfig.i18n.resources[nameFile] =  {
              translation: JSON.parse(data)
            }
          }
        }
        console.log(astrojsI18nconfig.i18n)
        i18n +=`.init(${deeplyStringifyObject(
          astrojsI18nconfig.i18n
        )},function(err, t){
          if (err) return console.error(err)
          console.log('i18next is ready...', t)
          console.log('en---', t('seo.title', { lng: 'en' }))
          console.log('zh---', t('seo.title', { lng: 'zh' }))
        })`
        injectScript('page-ssr', imports + i18n)
      }
    }
  }
}