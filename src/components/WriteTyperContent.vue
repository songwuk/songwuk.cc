<template>
  <div class="writetyper"></div>
</template>
<script setup lang="ts">

import { onMounted } from 'vue';
import { UnTyper } from 'untyper'

export interface Props {
  textStatus?: boolean
}
const props = withDefaults(defineProps<Props>(),{
  textStatus: true
})
const languageCode:Record<string,any> = {
  'fr-ca': {
    text: 'Bonjour, je deviens développeur indépendant !'
  },
  'ko': {
    text: '안녕하세요 인디 개발자가 되고 있습니다 !'
  },
  'zh-CN': {
    text: '嗨，我正在成为独立开发者 !'
  },
  'en-US':  {
    text: 'Hi I am becoming indie developer !'
  },
}
onMounted(async ()=> {
  const text = document.querySelector('.writetyper') as HTMLElement || null
  const unTyper = new UnTyper(text, { speed: 100, startDelay: 2000 })
  if(props.textStatus) {
    const keys = Object.keys(languageCode) as string[];
    let i = 0
    keys.forEach(async (key) => {
      i++
      const textLine = languageCode[key].text
      const len = textLine.length
      if(i === keys.length){
        unTyper.type(textLine,{ delay: 1000 })
      } else {
        unTyper.type(textLine,{ delay: 1000 }).delete(len)
      }
    });
    unTyper.go()
  }
})
</script>