<script setup>
defineProps({
  title: {
    required: false,
    default: null,
    type: [null, String],
  },
  divId: {
    required: false,
    default: null,
    type: [null, String],
  },
  contentClass: {
    required: false,
    default: null,
    type: [null, String, Array, Object],
  },
})
</script>

<template>
  <section class="p-3 md:px-3 md:py-6">
    <h2 class="!text-(--bit-gray) text-2xl mb-12" v-if="$props.title">{{ $props.title }}</h2>
    <div :id="$props.divId" :class="$props.contentClass">
      <slot name="content" />
    </div>
  </section>
</template>
