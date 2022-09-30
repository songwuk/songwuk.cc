import type { InitOptions } from 'i18next'
type pathName = {
  loadPath: string
}

export type configOptions = {
  configPath: string
}
export type AstrojsI18nconfig = {
  defaultLanguage: string,
  supportedLanguages: Array<string>,
  localesPath: Record<keyof pathName ,string>,
  /**
   * i18next config. See https://www.i18next.com/overview/configuration-options
   */
   i18n?: InitOptions
}