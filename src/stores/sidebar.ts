import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSidebarStore = defineStore('sidebar', () => {
  const sidebarOpened = ref(true)

  const triggerSidebarOpened = () => {
    sidebarOpened.value = !sidebarOpened.value
  }

  return {
    sidebarOpened,
    triggerSidebarOpened,
  }
})
