<script setup>
import MainSlide from '@/components/MainSlide.vue'
import MainParticlesSlide from '@/components/MainParticlesSlide.vue'
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
  <MainSlide :homepage="homepage" :blur="true" :shadow="true">
    <template #background>
      <MainParticlesSlide />
    </template>
  </MainSlide>
</template>

<style lang="scss" scoped></style>
