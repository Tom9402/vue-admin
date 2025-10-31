<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useLanguageStore } from './stores/language'

const languageStore = useLanguageStore()
</script>

<template>
  <el-config-provider :locale="languageStore.language === 'en' ? 'en' : 'zhCn'">
    <RouterView />
  </el-config-provider>
</template>

<style scoped></style>
