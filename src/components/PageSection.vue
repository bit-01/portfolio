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
  id: {
    required: false,
    default: null,
    type: [null, String],
  },
  contentClass: {
    required: false,
    default: null,
    type: [null, String, Array, Object],
  },
  footerClass: {
    required: false,
    default: null,
    type: [null, String, Array, Object],
  },
})
</script>

<template>
  <section :id="$props.id" class="p-3 md:px-3 md:py-6">
    <h2 class="!text-(--bit-gray) text-2xl mb-14 capitalize" v-if="$props.title">
      {{ $props.title }}
    </h2>
    <div :id="$props.divId" :class="$props.contentClass">
      <slot name="content" />
    </div>
    <div v-if="$slots.footer" :class="footerClass">
      <slot name="footer" />
    </div>
  </section>
</template>
