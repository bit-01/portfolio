<script setup>
import MainParticlesSlide from '@/components/MainParticlesSlide.vue'
import MainSlide from '@/components/MainSlide.vue'
import PageSection from '@/components/PageSection.vue'
import { settingsStore } from '@/stores/settings'
import { computed, onMounted } from 'vue'
import { mdiOpenInNew, mdiCertificateOutline, mdiMenuDown } from '@mdi/js'
import { useLoaderStore } from '@/stores/loader'
import PageLoader from '@/components/PageLoader.vue'
import { formatDate } from '@/utils'
import CertAccordion from '@/components/CertAccordion.vue'

const settStore = settingsStore()
const loaderStore = useLoaderStore()

const homepage = computed(() => {
  return settStore.getMainSettings.settings
})
const cats = computed(() => {
  return settStore.getMainSettings.categories
})
const projects = computed(() => {
  return settStore.getMainSettings.projects
})
const certifications = computed(() => {
  return settStore.getMainSettings.certificates
})

onMounted(() => {
  loaderStore.start()

  settStore.fetchMainSettings().then(() => {
    loaderStore.stop()
  })
})
</script>

<template>
  <PageLoader />
  <MainSlide :homepage="homepage">
    <template #background>
      <MainParticlesSlide />
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
    content-class="grid grid-cols-1 sm:grid-cols-3 justify-between gap-y-15 "
    id="skills"
  >
    <template #content>
      <div
        v-for="(cat, i) in cats"
        :key="i"
        class="flex flex-col gap-3 justify-start items-center"
        :class="{
          'sm:border-l sm:border-r [border-image:var(--bit-divide-skill)]': i % 2 !== 0,
        }"
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

  <PageSection
    id="projects"
    title="projects"
    content-class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-15 p-2 sm:p-6"
  >
    <template #content>
      <template v-for="(project, i) in projects" :key="i">
        <div class="w-full h-full aspect-square">
          <figure
            class="group text-center flex gap-2 flex-col w-full h-full transition-all duration-700 hover:scale-110 hover:bg-(--bit-purple) rounded-lg"
          >
            <img
              class="object-cover w-max-[500px] h-10/12 w-full rounded-lg group-hover:rounded-b-none"
              :src="
                project.cover_image
                  ? project?.cover_image.thumbnails_paths[500].url
                  : 'https://ui-avatars.com/api/?name=' +
                    project.name +
                    '&color=5c5cff&background=1a1a1a'
              "
              :alt="project.name + ' cover'"
              loading="lazy"
            />
            <figcaption class="capitalize">
              {{ project.name }}
            </figcaption>
            <div
              class="hidden group-hover:flex p-2 justify-between items-center capitalize underline"
            >
              <a v-if="project.url" :href="project.url" target="_blank">
                <span class="flex">
                  Visit Website <sup><SvgIcon type="mdi" :path="mdiOpenInNew" class="w-3" /></sup>
                </span>
              </a>
              <span v-else></span>
              <!-- <RouterLink :to="'#'">more information</RouterLink> -->
            </div>
          </figure>
        </div>
      </template>
    </template>
  </PageSection>

  <PageSection
    id="certification"
    title="certification"
    content-class="flex flex-col flex-wrap gap-3 sm:gap-12 "
  >
    <template #content>
      <CertAccordion
        :cert="cert"
        v-for="(cert, i) in certifications"
        :key="i"
        class="border-b [border-image:linear-gradient(90deg,#5c5cff_10%,transparent_60%)_1]"
      >
        <template #trigger="{ open }">
          <div class="flex flex-wrap sm:flex-nowrap gap-2 items-center justify-start">
            <SvgIcon type="mdi" class="w-17 h-auto" :path="mdiCertificateOutline" />
            <div class="flex justify-between w-full">
              <div class="text-start">
                <div class="gap-3 flex w-full items-center justify-start">
                  <h3 class="text-(--bit-gray) text-lg">
                    {{ cert.name }}
                  </h3>
                  <time class="!text-xs">{{
                    formatDate(cert.issue_date, false, undefined, {
                      month: 'long',
                      year: 'numeric',
                    })
                  }}</time>
                </div>
                <p class="text-sm text-(--bit-gray)">{{ cert.university }}</p>
              </div>
              <div class="flex flex-col items-end">
                <SvgIcon
                  type="mdi"
                  :path="mdiMenuDown"
                  class="w-10 transition-transform"
                  :class="{ 'rotate-180 ': open }"
                />
              </div>
            </div>
          </div>
        </template>
        <template #body>
          <div class="flex flex-wrap gap-3">
            <span
              v-for="(ski, k) in cert.skills"
              :key="k"
              class="inline-flex items-center rounded-md bg-gray-50/10 px-2 py-1 text-xs font-medium text-(--bit-gray) ring-1 ring-gray-600/20 ring-inset uppercase"
            >
              {{ ski.name }}
            </span>
          </div>
          <div class="flex flex-col gap-3">
            <p v-if="cert.description" class="text-sm text-(--bit-white)">{{ cert.description }}</p>
            <a
              v-if="cert.verification_link"
              :href="cert.verification_link"
              target="_blank"
              class="capitalize underline"
            >
              <span class="flex">
                Verify <sup><SvgIcon type="mdi" :path="mdiOpenInNew" class="w-3" /></sup>
              </span>
            </a>
          </div>
        </template>
      </CertAccordion>
    </template>
  </PageSection>
</template>

<style lang="scss" scoped></style>
