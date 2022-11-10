<template>
  <div class="absolute w-full h-80"  ref="getBlock">
    <img class="relative h-auto left-1/2 top-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 opacity-50" src='/placeholder-about.jpg' />
  </div>
  <canvas ref="canvas"></canvas>
</template>
<script setup lang="ts">
  import { ref, onMounted} from 'vue'
  // let attrsin = reactive<Record<string, object>>({
  //   attrs: {}
  // })
  // const attrs = useAttrs()
  // attrsin.attrs = attrs
  const canvas = ref<HTMLCanvasElement | null>(null)
  const getBlock = ref<HTMLDivElement | null>(null)

  onMounted(() => {
    const ctx = canvas.value?.getContext('2d')!
    const {clientWidth: width, clientHeight:height} = getBlock.value!
    const scale = 2
    canvas.value!.width = width * scale
    canvas.value!.height = height * scale
    canvas.value!.style.width = (canvas.value!.width / scale ) + 'px'
    canvas.value!.style.height = (canvas.value!.height / scale) + 'px'
    const markwidth = width * scale
    const markHeight = height * scale
    const bgData = Array.from(new Array(400)).map(v => {
      return {
        x: Math.random() * markwidth,
        y: Math.random() * markHeight,
        step: Math.random() * 1.0 + 1
      }
    })
    const theme = (() => {
      if(typeof localStorage !== 'undefined' && localStorage.getItem('theme')){
        return localStorage.getItem('theme')
      }
      if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'
      }
      return 'light'
    })()
    let fillColor = theme !== 'light' ? '#ffffff': '#000000'
    if(typeof window !== undefined){
      const root = document.querySelector('html') || document.body
      const observer = new MutationObserver((mutations: MutationRecord[]) => {
        const attrs = getAttrs(mutations)
        if(attrs){
          attrs.forEach(attr => {
           if(!attr.getAttribute('class')){
            fillColor = '#000000'
           } else {
            fillColor = '#ffffff'
           }
          })
        }
      });
      observer.observe(root, {
        childList: false,
        attributes: true,
        subtree: false
      })
    }
    
    const render = () => {
      ctx!.beginPath()
      ctx!.fillStyle = fillColor
      ctx!.clearRect(0, 0, markwidth, markHeight)
      bgData.forEach(v => {
        v.y = v.y > markHeight ? 0 : (v.y + v.step)
        ctx!.rect(v.x, v.y, 2*scale, 2*scale)
      })
      ctx!.fill()
      requestAnimationFrame(render)
    }
    render()
  })
  function getAttrs(mutations: MutationRecord[]) {
    return mutations.reduce((elemet: Set<Element>, mutation: MutationRecord)=> {
      if(mutation.target instanceof Element){
        if(!elemet.has(mutation.target)){
          elemet.add(mutation.target)
        }
      }
      return elemet
    }, new Set<Element>())
  }
</script>
