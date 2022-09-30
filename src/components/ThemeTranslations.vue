<script setup lang="ts">
import i18next, { changeLanguage } from 'i18next'
const changeFn = () => {
  console.log(i18next)
  // changeLanguage('zh')
}
</script>
<template>
 <div @click="changeFn" i-carbon-translate class="inline-flex cursor-pointer"></div>
</template>
