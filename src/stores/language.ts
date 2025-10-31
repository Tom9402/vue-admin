import { LANG } from '@/constant'
import { getStorageItem, setStorageItem } from '@/utils/storage'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLanguageStore = defineStore('language', () => {
  const language = ref(getStorageItem(LANG) || 'zh')

  function setLanguage(lang: string) {
    language.value = lang
    setStorageItem(LANG, lang)
  }

  return {
    language,
    setLanguage,
  }
})
