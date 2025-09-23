import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import 'virtual:svg-icons-register'

import InstallIcons from './icons'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

InstallIcons(app)

app.use(createPinia())
app.use(ElementPlus)
app.use(router)

// 全局注册 elements-plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
