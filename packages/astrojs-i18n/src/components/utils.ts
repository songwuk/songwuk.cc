import i18next, { t } from "i18next"
export const transformHtml = (html: string, i18nKey:string, ns:string):string =>{
  const lge = ns || i18next.language
  let inline = t(i18nKey,{ lng: lge })
  if(!i18nKey){
    console.warn(
      `WARNING(astrojs-i18n): miss a ${i18nKey}`
    )
    return html
  }
  const inlinetagRE = /<\/?[0-9]+>/g
  const htmltagRE = /<[^>]*>/g
  if(!htmltagRE.test(html)){
    return inline
  }
  const inlineRE = inline.match(inlinetagRE) as []
  const htmlRE = html.match(htmltagRE) as []
  let i = -1
  for(const htmlindex of htmlRE){
    i++
    inline = inline.replace(inlineRE[i], htmlindex)
  }
  console.log(inline, '-------')
  return inline
}