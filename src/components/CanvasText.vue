<template>
  <canvas ref="canvas" w-full h-80></canvas>
</template>
<script setup lang="ts">
  import { ref, onMounted} from 'vue'
  // let attrsin = reactive<Record<string, object>>({
  //   attrs: {}
  // })
  // const attrs = useAttrs()
  // attrsin.attrs = attrs
  const canvas = ref<HTMLCanvasElement | null>(null)
  onMounted(() => {
    const ctx = canvas.value!.getContext('2d')
    canvas.value!.width = document.documentElement.clientWidth
    const width = canvas.value!.width
    const height = canvas.value!.height
    const bgData = Array.from(new Array(400)).map(v => {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        step: Math.random() * 1.0 + 0.5
      }
    })
    const render = () => {
      ctx!.beginPath()
      ctx!.fillStyle = '#ffffff'
      ctx!.clearRect(0, 0, width, height)
      bgData.forEach(v => {
        v.y = v.y > height ? 0 : (v.y + v.step)
        ctx!.rect(v.x, v.y, 2, 2)
      })
      ctx!.fill()
      requestAnimationFrame(render)
    }
    render()
  })
</script>
