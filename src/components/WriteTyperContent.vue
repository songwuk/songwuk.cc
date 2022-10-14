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
  // 'zh-CN': {
  //   text: '嗨，我正在成为独立<span style="color: rgb(253,186,116)">开发者 !</span>'
  // },
  'en-US':  {
    text: 'Hi I&apos; becoming indie <span style="color: rgb(253,186,116)">developer !</span>'
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
        unTyper.add(textLine,{ delay: 100 })
      } else {
        unTyper.add(textLine,{ delay: 100 })
      }
    });
    unTyper.go()
  }
})
</script>