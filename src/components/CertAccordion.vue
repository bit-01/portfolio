<script setup>
import { ref } from 'vue'

const bodyEl = ref(null)
const open = ref(false)
const toggle = () => {
  if (bodyEl.value.style.height && bodyEl.value.style.height !== '0px') {
    open.value = false
    bodyEl.value.style.height = '0'
  } else {
    open.value = true
    bodyEl.value.style.height = bodyEl.value.scrollHeight + 15 + 'px'
  }
}
</script>

<template>
  <div class="flex flex-col gap-3 relative">
    <button class="cursor-pointer" @click="toggle" type="button">
      <div>
        <slot name="trigger" :open="open" />
      </div>
    </button>
    <div
      ref="bodyEl"
      :class="[
        'flex flex-col gap-3 h-0 overflow-hidden transition-all duration-300 ease-in-out overflow-scroll',
      ]"
    >
      <slot name="body" :open="open" />
    </div>
  </div>
</template>
