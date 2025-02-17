<script setup>
defineProps({
  homepage: {
    type: [Object, null],
    default: null,
    required: false,
  },
  blur: Boolean,
  fullscreen: Boolean,
  shadow: Boolean,
})

const gotoAbout = () => {
  const target = document.querySelector("a[href='#about_me']")
  window.scrollTo({
    top: target.offsetTop,
  })
}
</script>

<template>
  <main class="min-h-[100vh] flex justify-center items-center relative">
    <slot name="background" />
    <div
      class="flex absolute translate-x[-50%] translate-y[-50%] z-index-1 justify-center items-center flex-col"
      :class="{
        'backdrop-blur-sm px-12 py-6 rounded-xl': $props.blur,
        'w-[100vw] h-[100vh]': $props.fullscreen,
        'h-fit': !$props.fullscreen,
        'shadow-(--bit-main-shadow)': $props.shadow,
      }"
    >
      <div class="h-fit w-max-[500px] flex flex-col gap-4 text-center justify-center items-center">
        <img
          v-if="$props.homepage?.main_section?.logo"
          :src="$props.homepage?.main_section?.logo.value"
          :alt="$props.homepage?.main_section?.title.value ?? 'Main Logo'"
          class="w-full md:w-[300px]"
        />
        <!-- <h2 v-if="$props.homepage?.main_section?.title" class="text-6xl">
          {{ $props.homepage?.main_section?.title.value }}
        </h2> -->
        <p
          class="text-xl capitalize text-[var(--bit-gray)] w-full tracking-[.3em] border-y-2 border-y-[var(--bit-purple)] border-solid"
          id="services"
        ></p>
      </div>
    </div>
    <a href="#about_me" @click.prevent="gotoAbout" class="scrollDown absolute bottom-10 scale-[.6]">
      <span></span>
    </a>
  </main>
</template>

<style lang="scss" scoped>
@use '@/assets/typed.scss';

#services {
  @include typed.typed(
    'front-end developer',
    'back-end developer',
    'systems administrator',
    (
      type: 0.15,
      pause-deleted: 0.5,
    )
  );
}
</style>
