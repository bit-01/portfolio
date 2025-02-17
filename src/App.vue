<script setup>
import { RouterLink, RouterView } from 'vue-router'
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
          <RouterLink
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
            :to="{ name: 'home2' }"
          >
            Home 2
          </RouterLink>
          <RouterLink
            class="w-full nav-item"
            activeClass="active"
            exactActiveClass="active"
            :to="{ name: 'home3' }"
          >
            Home 3
          </RouterLink>
        </nav>
      </template>
    </SideBar>
  </header>

  <RouterView />
</template>

<style scoped></style>
