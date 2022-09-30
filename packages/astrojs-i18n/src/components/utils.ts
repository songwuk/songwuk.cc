import i18next, { t, changeLanguage } from "i18next"
export const transformHtml = (html: string,i18nKey:string,ns:string):string =>{
  const lge = ns || i18next.language
  changeLanguage(lge)
  const line = t(i18nKey)
  console.log(html,line)
  return line
}