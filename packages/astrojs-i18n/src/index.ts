import type { AstroIntegration } from 'astro';
import I18nCore from './core';
import type { configOptions } from './types'
export default function (options?: configOptions): AstroIntegration {
  const customConfigPath = options?.configPath;
  return {
    name: 'astrojs-i18n',
    hooks: {
      'astro:config:setup': async ({config, injectScript}) => {
        const importi18n = await I18nCore(config,customConfigPath)
        injectScript('page-ssr', importi18n)
      }
    }
  }
}