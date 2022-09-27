<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue'
  const isMounted = ref<boolean>(false)
  const themes = ref<Array<string>>(['light', 'dark'])
  const theme = ref<string | null | undefined>(null)
  const setTheme = async (themeStatus?: string) => {
    const themsStatus = async () => {
      if(import.meta.env.SSR){
        return undefined
      }
      if(typeof localStorage !== 'undefined' && localStorage.getItem('theme')){
        return localStorage.getItem('theme')
      }
      if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'
      }
      return 'light'
    }
    theme.value = themeStatus || await themsStatus()
  }
  onMounted(async() => {
    await setTheme()
    isMounted.value = true
  })
  watch(theme, themeNew => {
    const root = document && document.documentElement
    if(themeNew === 'light'){
      root.classList.remove('dark')
    } else {
      root.classList.add('dark')
    }
  })
  const toggleTheme = () => {
    const t = theme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme',t)
    setTheme(t)
  }
</script>
<template>
  <div v-if="isMounted" className="inline-flex items-center p-[1px] rounded-3xl bg-orange-300 dark:bg-zinc-600">
    <button v-for="item,index in themes"   :key="index" aria-label="Toggle theme"
    :class="[{
      'bg-white text-black': theme === item ? true : false},
      'cursor-pointer',
      'rounded-3xl',
      'p-2',
      ]" @click="toggleTheme">
      <div flex v-if="item === 'light'" i-carbon-sun></div> 
      <div flex v-else-if="item === 'dark'" i-carbon-moon></div>
    </button>
  </div>
</template>