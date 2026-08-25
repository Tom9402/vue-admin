<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useLanguageStore } from './stores/language'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { generateNewStyle, writeNewStyle } from './utils/theme'
import { useThemeStore } from './stores/theme'
import { watchSwitchLang } from './utils/i18n'
import { getStorageItem } from './utils/storage'
import { TOKEN } from './constant'
import { useLoginStore } from './stores/user'

const languageStore = useLanguageStore()

// 保持缓存的主题色
const themeStore = useThemeStore()
generateNewStyle(themeStore.mainColor).then((newStyTxt) => writeNewStyle(newStyTxt))

// 监听语言变化，重新获取个人信息
watchSwitchLang(() => {
  if (getStorageItem(TOKEN)) {
    useLoginStore().getUserInfoAction()
  }
})
</script>

<template>
  <el-config-provider :locale="languageStore.language === 'en' ? en : zhCn">
    <RouterView />
  </el-config-provider>
</template>
