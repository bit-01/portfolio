<script setup>
import { useLoaderStore } from '@/stores/loader'
import { computed } from 'vue'

const loaderStore = useLoaderStore()

const loader = computed(() => loaderStore.value)
const timer = computed(() => loaderStore.timer)
</script>

<template>
  <div
    class="fixed z-1 top-0 left-0 w-screen h-screen bg-(--bit-black) justify-center items-center transition-opacity ease-in duration-500"
    :class="{
      'opacity-100': loader,
      'opacity-0': !loader,
      flex: timer,
      hidden: !timer,
    }"
  >
    <div class="loader h-fit"></div>
    <div class="sr-only">Loading...</div>
  </div>
</template>

<style lang="css">
.loader {
  display: block;
  --height-of-loader: 4px;
  --loader-color: #5c5cff;
  width: 130px;
  height: var(--height-of-loader);
  border-radius: 30px;
  background-color: rgba(0, 0, 0, 0.2);
  position: relative;
}

.loader::before {
  content: '';
  position: absolute;
  background: var(--loader-color);
  top: 0;
  left: 0;
  width: 0%;
  height: 100%;
  border-radius: 30px;
  animation: moving 3s ease-in-out infinite;
}

@keyframes moving {
  50% {
    width: 100%;
  }

  100% {
    width: 0;
    right: 0;
    left: unset;
  }
}
</style>
