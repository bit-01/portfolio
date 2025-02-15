import { defineStore } from 'pinia'
import axi from '@/axios'
import paths from '@/paths'

export const settingsStore = defineStore('settings', {
  state: () => ({
    shared: [],
    main: [],
  }),

  getters: {
    getSharedSettings(state) {
      return state.shared
    },

    getMainSettings(state) {
      return state.main
    },
  },

  actions: {
    async fetchSharedSettings() {
      try {
        const data = await axi.get(paths.settings.shared)
        this.shared = data.data
      } catch (error) {
        alert('Error !')
        console.error(error)
      }
    },
    async fetchMainSettings() {
      try {
        const data = await axi.get(paths.settings.homepage)
        this.main = data.data
      } catch (error) {
        alert('Error !')
        console.error(error)
      }
    },
  },
})
