<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useLanguageStore } from './stores/language'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'

const languageStore = useLanguageStore()
</script>

<template>
  <el-config-provider :locale="languageStore.language === 'en' ? en : zhCn">
    <RouterView />
  </el-config-provider>
</template>

<style scoped></style>
