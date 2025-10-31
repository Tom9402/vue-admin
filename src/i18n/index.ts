import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    message: {
      hello: 'hello world',
    },
  },
  zh: {
    message: {
      hello: '你好，世界',
    },
  },
}

const locale = 'en'

const i18n = createI18n({
  locale,
  messages,
  // 使用 Composition API 模式
  legacy: false,
  // 全局注册 $t 函数
  globalInjection: true,
})

export default i18n
