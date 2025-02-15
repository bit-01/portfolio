<script setup>
import MainSlide from '@/components/MainSlide.vue'
import MainSpaceSlide from '@/components/MainSpaceSlide.vue'
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
  <MainSlide :homepage="homepage">
    <template #background>
      <MainSpaceSlide />
    </template>
  </MainSlide>

  <section class="flex flex-col gap-3 p-3 md:px-6 md:py-12">
    <h2 id="about_me" class="text-(--bit-purple) text-2xl">&lt;about me&gt;</h2>
    <div class="flex gap-2 w-full justify-around flex-wrap">
      <p class="text-base sm:max-w-2/3 order-2 md:order-1">
        <template v-for="(par, i) in homepage?.about_me?.paragraph?.value.split('.')" :key="i">
          {{ par ? par + '.' : '' }} <br />
        </template>
      </p>
      <div class="order-1 md:order-2">
        <img
          class="max-w-[200px] rounded-md"
          :src="homepage?.about_me?.image?.thumbs?.[200]?.url"
          alt="my photo"
        />
      </div>
    </div>
    <span class="text-(--bit-purple) text-2xl font-bold uppercase">&lt;/about me&gt;</span>
  </section>
</template>

<style lang="scss" scoped></style>
