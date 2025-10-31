import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import 'virtual:svg-icons-register'

import i18n from './i18n'
import InstallIcons from './icons'

import App from './App.vue'
import router from './router'
// 导入全局样式
import './styles/index.scss'
import './permission'

import './assets/main.css'
import { useLanguageStore } from './stores/language'
import { en, zhCn } from 'element-plus/es/locales.mjs'

const app = createApp(App)

InstallIcons(app)

app.use(createPinia())
const languageStore = useLanguageStore()
app.use(ElementPlus, {
  locale: languageStore.language === 'zh' ? zhCn : en,
})
app.use(router)
// 导入 i18n 插件
app.use(i18n)

// 全局注册 elements-plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
