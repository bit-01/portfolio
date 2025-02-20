<script setup>
import { RouterView } from 'vue-router'
import { mdiMenu } from '@mdi/js'
import SideBar from '@/components/SideBar.vue'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { settingsStore } from './stores/settings'
import shared from './stores/data/shared'

const sideBar = ref(false)
const scroll = ref(false)
const scrollY = ref(0)
const settStore = settingsStore()

const updateScrollY = () => {
  scrollY.value = window.scrollY
}
const contacts = computed(() => settStore.getSharedSettings.contact ?? shared.contact)

onMounted(() => {
  window.addEventListener('scroll', updateScrollY)
  settStore.fetchSharedSettings()
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScrollY)
})
const gotoSection = (hashTag, navSize = 78) => {
  const dest = hashTag === 0 ? 0 : document.querySelector('#' + hashTag).offsetTop - navSize

  window.scrollTo({
    top: dest,
  })
}
watch(scrollY, (nval) => {
  scroll.value = nval > 0
})
</script>

<template>
  <header
    class="wrapper flex w-full bg-transparent fixed z-1 transition-all duration-300"
    :class="{
      'justify-between p-6 backdrop-blur-xs': scroll,
      'justify-end p-3': !scroll,
    }"
  >
    <h1
      class="text-[var(--bit-purple)] uppercase transition-all"
      :class="{
        'w-15': scroll,
        'w-[0]': !scroll,
      }"
    >
      <img src="/src/assets/logo.svg" class="w-full" />
      <span class="sr-only">Bit</span>
    </h1>
    <SideBar title="Navigation" v-model="sideBar">
      <template #trigger>
        <SvgIcon type="mdi" :path="mdiMenu" />
      </template>
      <template #content>
        <nav class="flex flex-col text-start justify-center items-start text-2xl gap-6">
          <!-- <RouterLink
            class="w-full nav-item"
            activeClass="active"
            exactActiveClass="active"
            :to="{ name: 'home' }"
          >
            Home
          </RouterLink>
          <RouterLink
            class="w-full nav-item"
            activeClass="active"
            exactActiveClass="active"
            :to="{ name: 'home' }"
          >
            About Me
          </RouterLink>
          <RouterLink
            class="w-full nav-item"
            activeClass="active"
            exactActiveClass="active"
            :to="{ name: 'home3' }"
          >
            Skills
          </RouterLink>
          <RouterLink
            class="w-full nav-item"
            activeClass="active"
            exactActiveClass="active"
            :to="{ name: 'home3' }"
          >
            Projects
          </RouterLink> -->
          <a class="w-full nav-item capitalize" @click.prevent="gotoSection(0)" href="#about_me">
            Home
          </a>
          <a
            class="w-full nav-item capitalize"
            @click.prevent="gotoSection('about_me')"
            href="#about_me"
          >
            About Me
          </a>
          <a
            class="w-full nav-item capitalize"
            @click.prevent="gotoSection('skills')"
            href="#skills"
          >
            Skills
          </a>
          <a
            class="w-full nav-item capitalize"
            @click.prevent="gotoSection('projects')"
            href="#projects"
          >
            Projects
          </a>
          <a
            class="w-full nav-item capitalize"
            @click.prevent="gotoSection('certification')"
            href="#certification"
          >
            certification
          </a>
          <a
            class="w-full nav-item capitalize"
            @click.prevent="gotoSection('contact', 0)"
            href="#contact"
          >
            contact me
          </a>
        </nav>
        <div class="border-t border-stone-500 p-3 mt-4">
          <address class="flex justify-start gap-6">
            <template v-for="(social, i) in contacts?.urls" :key="i">
              <a
                v-if="social.value"
                :href="social.value"
                target="_blank"
                class="fill-(--bit-gray) hover:fill-(--bit-purple) w-10 transition-all duration-300"
                v-html="social.options?.icon?.svg"
              ></a>
            </template>
          </address>
          <address class="flex flex-col justify-center gap-3 mt-3">
            <template v-for="(phone, i) in contacts?.phone" :key="i">
              <span v-if="phone.value">
                {{ phone.value }}
              </span>
            </template>
          </address>
        </div>
      </template>
    </SideBar>
  </header>

  <RouterView />

  <footer id="contact" class="p-6 sm:p-12 min-h-screen grid grid-cols-1 grid-rows-6">
    <div class="flex row-span-5 flex-col gap-3 justify-center items-center">
      <h2 class="text-lg sm:text-3xl">Your Vision, My Code – Let’s Make It Happen</h2>
      <p class="max-w-3/3 text-start md:max-w-2/3 md:text-center text-(--bit-gray)">
        I’m currently open to new full-stack web development opportunities! Let’s collaborate to
        turn your vision into reality with clean, efficient code and innovative solutions. Reach out
        – I’d love to hear about your project or role!
      </p>
      <address class="flex justify-center gap-6">
        <template v-for="(social, i) in contacts?.urls" :key="i">
          <a
            v-if="social.value"
            :href="social.value"
            target="_blank"
            class="fill-(--bit-gray) hover:fill-(--bit-purple) w-10 transition-all duration-300"
            v-html="social.options?.icon?.svg"
          ></a>
        </template>
      </address>
      <address class="flex flex-wrap justify-center gap-6">
        <template v-for="(phone, i) in contacts?.phone" :key="i">
          <span v-if="phone.value">
            {{ phone.value }}
          </span>
        </template>
      </address>
    </div>
    <div class="flex items-end justify-center text-center">
      <p class="mt-4 text-xs text-(--bit-gray)">
        Built with passion by me. Copyright &copy; {{ new Date().getFullYear() }}
      </p>
    </div>
  </footer>
</template>

<style scoped></style>
