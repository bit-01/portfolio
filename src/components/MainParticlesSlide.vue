<script setup>
import { onMounted, onUnmounted } from 'vue'
import particles from '@/particles'
import { loadScript, unloadScript } from 'vue-plugin-load-script'

onMounted(() => {
  if (import.meta.env.VITE_ENV === 'local') {
    loadScript('/libs/particles.js/particles.js').then(() => {
      window.particlesJS('particles-js', particles)
    })
  } else {
    loadScript('/portfolio/libs/particles.js/particles.js').then(() => {
      window.particlesJS('particles-js', particles)
    })
  }
})
onUnmounted(() => {
  if (import.meta.env.VITE_ENV === 'local') {
    unloadScript('/libs/particles.js/particles.js')
  } else {
    unloadScript('/portfolio/libs/particles.js/particles.js')
  }
})
</script>

<template>
  <div id="particles-js" class="w-[100vw] h-[100vh]"></div>
</template>

<style lang="scss" scoped></style>
