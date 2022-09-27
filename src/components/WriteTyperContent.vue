<template>
  <div class="writetyper"></div>
</template>
<script setup lang="ts">

import { onMounted } from 'vue';
import { UnTyper } from 'untyper'

export interface Props {
  labelsText?: string
}
const props = withDefaults(defineProps<Props>(),{
  labelsText: ''
})
const languageCode = {
  'en-US':  {
    text: 'Hi I&apos;m becoming indie developer !'
  },
  'zh-CN': {
    text: '嗨，我正在成为独立开发者 !'
  },
  'fr-ca': {
    text: 'Bonjour, je deviens développeur indépendant !'
  },
  'ko': {
    text: '안녕하세요 인디 개발자가 되고 있습니다 !'
  }
}
onMounted(()=> {
  const text = document.querySelector('.writetyper') as HTMLElement || null
  const unTyper = new UnTyper(text, { speed: 100, startDelay: 0 })
  unTyper.type(props.labelsText, { delay: 200 }).go()
})
</script>