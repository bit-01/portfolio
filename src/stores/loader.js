import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoaderStore = defineStore('loader', () => {
  const value = ref(false)
  const timer = ref(false)
  function start() {
    timer.value = true
    value.value = true
  }
  function stop() {
    value.value = false
    setTimeout(() => {
      timer.value = false
    }, 500)
  }

  return { value, timer, start, stop }
})
