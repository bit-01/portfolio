<script setup>
import { computed } from 'vue'
import { mdiClose } from '@mdi/js'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
    required: false,
  },
  id: String,
  title: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['update:model-value'])

const value = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:model-value', val)
  },
})
const sideBarId = computed(() => {
  return props.id ?? 'sidebar-' + Math.random().toString(16).slice(2)
})
</script>

<template>
  <!-- drawer init and show -->
  <div class="text-center">
    <button
      @click="value = !value"
      :aria-controls="sideBarId"
      type="button"
      class="text-neutral-400 bg-transparent hover:text-neutral-200 cursor-pointer"
    >
      <slot name="trigger" />
    </button>
  </div>

  <!-- drawer component -->
  <div
    :id="sideBarId"
    class="fixed top-0 left-0 z-40 w-full md:w-1/3 h-screen p-4 overflow-y-auto transition-transform bg-transparent backdrop-blur-lg"
    :class="{
      '-translate-x-full': !value,
    }"
    tabindex="-1"
    :aria-labelledby="sideBarId + '-label'"
  >
    <h5 :id="sideBarId + '-label'" class="text-2xl !text-neutral-500 uppercase">
      {{ $props.title }}
    </h5>
    <button
      type="button"
      @click="value = !value"
      :aria-controls="sideBarId"
      class="text-neutral-400 bg-transparent hover:text-neutral-200 text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center cursor-pointer"
    >
      <SvgIcon type="mdi" :path="mdiClose" size="1.5rem" />
      <span class="sr-only">Close menu</span>
    </button>
    <div class="py-4 h-full">
      <div class="space-y-2 h-full font-medium">
        <slot name="content" />
      </div>
    </div>
  </div>
  <div
    class="bg-stone-950/50 top-0 end-0 h-screen w-0 md:w-2/3 fixed z-30 transition-transform"
    :class="{
      'translate-x-full': !value,
    }"
    @click="value = false"
  ></div>
</template>
