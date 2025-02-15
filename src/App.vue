<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="flex gap-4">
        <RouterLink to="/">Home 1</RouterLink>
        <RouterLink to="/home2">Home 2</RouterLink>
        <RouterLink to="/home3">Home 3</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
