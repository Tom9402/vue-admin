<template>
  <el-dropdown trigger="click" class="international" @command="handleSelectLang">
    <div>
      <el-tooltip :content="$t('msg.navBar.lang')" :effect="effect">
        <svg-icon id="guide-lang" icon="language" />
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="zh" :disabled="language === 'zh'">中文</el-dropdown-item>
        <el-dropdown-item command="en" :disabled="language === 'en'">English</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useLanguageStore } from '@/stores/language'
import { ElMessage } from 'element-plus'
import { computed } from 'vue'

defineProps({
  effect: {
    type: String,
    default: 'dark',
    validator: (val: string) => ['dark', 'light'].includes(val),
  },
})

const languageStore = useLanguageStore()

const language = computed(() => languageStore.language)

const i18n = useI18n()
const handleSelectLang = (lang: string) => {
  i18n.locale.value = lang
  languageStore.setLanguage(lang)
  ElMessage.success(i18n.t('msg.toast.switchLangSuccess'))
}
</script>
