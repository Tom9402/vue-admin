import { createI18n } from 'vue-i18n'

import mZhLocale from './lang/zh.js'
import mEnLocale from './lang/en.js'
import { getStorageItem } from '@/utils/storage.js'

const messages = {
  en: {
    msg: {
      ...mEnLocale,
    },
  },
  zh: {
    msg: {
      ...mZhLocale,
    },
  },
}

const i18n = createI18n({
  locale: getStorageItem('language') || 'zh',
  messages,
  // 使用 Composition API 模式
  legacy: false,
  // 全局注册 $t 函数
  globalInjection: true,
})

export default i18n
