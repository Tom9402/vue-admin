import { DEFAULT_COLOR, MAIN_COLOR } from '@/constant'
import { getStorageItem, setStorageItem } from '@/utils/storage'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as variables from '@/styles/variables.module.scss'
import { generateColors } from '@/utils/theme'

export const useThemeStore = defineStore('theme', () => {
  const mainColor = ref(getStorageItem(MAIN_COLOR) || DEFAULT_COLOR)

  const cssVar = ref({
    ...variables,
    ...generateColors(mainColor.value),
  })

  const setMainColor = (color: string) => {
    cssVar.value = {
      ...variables,
      ...generateColors(color),
    }
    // 设置主颜色
    mainColor.value = color
    setStorageItem(MAIN_COLOR, color)
  }

  return { mainColor, setMainColor, cssVar }
})
