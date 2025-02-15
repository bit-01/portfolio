<script setup>
import { onMounted, onUnmounted } from 'vue'
import particles from '@/particles'
import { loadScript, unloadScript } from 'vue-plugin-load-script'

onMounted(() => {
  loadScript('/libs/particles.js/particles.js').then(() => {
    window.particlesJS('particles-js', particles)
  })
})
onUnmounted(() => {
  unloadScript('/libs/particles.js/particles.js')
})
</script>

<template>
  <div id="particles-js" class="w-[100vw] h-[100vh]"></div>
</template>

<style lang="scss" scoped></style>
