<script setup>
import { RouterView } from 'vue-router'
import { mdiMenu } from '@mdi/js'
import SideBar from '@/components/SideBar.vue'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const sideBar = ref(false)
const scroll = ref(false)
const scrollY = ref(0)

const updateScrollY = () => {
  scrollY.value = window.scrollY
}
onMounted(() => {
  window.addEventListener('scroll', updateScrollY)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScrollY)
})
const gotoSection = (hashTag) => {
  const dest = hashTag === 0 ? 0 : document.querySelector('#' + hashTag).offsetTop - 78

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
          <a class="w-full nav-item" @click.prevent="gotoSection(0)" href="#about_me"> Home </a>
          <a class="w-full nav-item" @click.prevent="gotoSection('about_me')" href="#about_me">
            About Me
          </a>
          <a class="w-full nav-item" @click.prevent="gotoSection('skills')" href="#skills">
            Skills
          </a>
          <a class="w-full nav-item" @click.prevent="gotoSection('projects')" href="#projects">
            Projects
          </a>
          <a
            class="w-full nav-item"
            @click.prevent="gotoSection('certification')"
            href="#certification"
          >
            certification
          </a>
          <a class="w-full nav-item" @click.prevent="gotoSection('contact')" href="#contact">
            contact me
          </a>
        </nav>
      </template>
    </SideBar>
  </header>

  <RouterView />
</template>

<style scoped></style>
