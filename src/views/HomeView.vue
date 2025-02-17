<script setup>
import MainSlide from '@/components/MainSlide.vue'
import MainSpaceSlide from '@/components/MainSpaceSlide.vue'
import PageSection from '@/components/PageSection.vue'
import { settingsStore } from '@/stores/settings'
import { computed, onMounted } from 'vue'

const settStore = settingsStore()
const homepage = computed(() => {
  return settStore.getMainSettings.settings
})
const cats = computed(() => {
  return settStore.getMainSettings.categories
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
      <p class="sm:max-w-2/3 order-2 md:order-1 text-base/7">
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

  <PageSection
    title="skills"
    content-class="mt-6 grid-cols-1 sm:grid grid-cols-3 gap-2 "
    div-id="skills"
  >
    <template #content>
      <div
        v-for="(cat, i) in cats"
        :key="i"
        class="flex flex-col gap-3 justify-start items-center"
        :class="{ 'border-l border-r [border-image:var(--bit-divide-skill)]': i % 2 !== 0 }"
      >
        <object type="image/svg+xml" class="w-fit" :data="cat.icon_full_path"></object>
        <h3 class="!text-(--bit-gray)">{{ cat.short_name }}</h3>
        <ul>
          <li v-for="(type, k) in cat.skills" :key="k" class="mb-4 capitalize">
            <span class="font-bold">{{ k }}:</span>
            <ul>
              <li v-for="(skill, i) in type" :key="i">
                {{ skill.name }}
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </template>
  </PageSection>
</template>

<style lang="scss" scoped></style>
