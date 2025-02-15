<script setup>
import { onMounted, onUnmounted } from 'vue'
import { loadScript, unloadScript } from 'vue-plugin-load-script'

onMounted(() => {
  const config = {
    numberOfNodes: 120,
    nodeEase: 'linear',
  }
  loadScript('/libs/jquery/jquery-3.7.1.min.js').then(() => {
    loadScript('/libs/polygonizr/src/polygonizr.min.js').then(() => {
      $('#polygonizr').polygonizr(config)

      $(window).resize(function () {
        let $sitelading = $('#polygonizr')
        $sitelading.polygonizr('stop')

        // Update polygonizr with the new window size.
        $sitelading.polygonizr({
          canvasHeight: $(window).height(),
          canvasWidth: $(window).width(),
        })

        $sitelading.polygonizr('refresh')
      })
    })
  })
})
onUnmounted(() => {
  unloadScript('/libs/polygonizr/src/polygonizr.min.js').then(() => {
    unloadScript('/libs/jquery/jquery-3.7.1.min.js')
  })
})
</script>

<template>
  <div id="polygonizr" class="w-[100vw] h-[100vh]"></div>
</template>

<style lang="scss" scoped></style>
