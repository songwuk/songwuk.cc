<template>
  <div class="writetyper"></div>
</template>
<script setup lang="ts">

import { onMounted } from 'vue';
import { UnTyper } from 'untyper'

export interface Props {
  textStatus?: boolean
  textContent: string
}
const props = withDefaults(defineProps<Props>(),{
  textStatus: true,
  textContent: ''
})
onMounted(async ()=> {
  const text = document.querySelector('.writetyper') as HTMLElement || null
  const unTyper = new UnTyper(text, { speed: 100, startDelay: 100, animate: { cancel: true }})
  if(props.textStatus) {
    unTyper.add(props.textContent,{ delay: 100 })
    unTyper.go()
  }
})
</script>
