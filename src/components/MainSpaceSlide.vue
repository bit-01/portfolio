<script setup>
import renderDots from '@/dots'
import { onMounted } from 'vue'

onMounted(() => {
  renderDots()
})
</script>

<template>
  <canvas id="main" class="w-[100vw] h-[100vh]"></canvas>
</template>
