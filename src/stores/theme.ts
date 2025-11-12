import { DEFAULT_COLOR, MAIN_COLOR } from '@/constant'
import { getStorageItem, setStorageItem } from '@/utils/storage'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as variables from '@/styles/variables.module.scss'

export const useThemeStore = defineStore('theme', () => {
  const mainColor = ref(getStorageItem(MAIN_COLOR) || DEFAULT_COLOR)

  // const cssVar = ref({
  //   ...variables,
  // })

  const setMainColor = (color: string) => {
    mainColor.value = color
    setStorageItem(MAIN_COLOR, color)
  }

  return { mainColor, setMainColor, variables }
})
