<script setup>
import MainPolygonizrSlide from '@/components/MainPolygonizrSlide.vue'
import MainSlide from '@/components/MainSlide.vue'
import { settingsStore } from '@/stores/settings'
import { computed, onMounted } from 'vue'

const settStore = settingsStore()
const homepage = computed(() => {
  return settStore.getMainSettings.settings
})

onMounted(() => {
  settStore.fetchMainSettings()
})
</script>

<template>
  <MainSlide :homepage="homepage" fullscreen blur>
    <template #background>
      <MainPolygonizrSlide />
    </template>
  </MainSlide>
</template>

<style lang="scss" scoped></style>
