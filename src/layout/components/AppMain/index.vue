<template>
  <div class="app-main">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { generateTitle } from '@/utils/i18n'
import { isTags } from '@/utils/tags'
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const appStore = useAppStore()

// 生成 title
const getTitle = (route: { path: string; meta: { title: string } }) => {
  let title = ''
  if (!route.meta) {
    // 处理无 meta 的路由
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  } else {
    title = generateTitle(route.meta.title)
  }
  return title
}

// 监听路由变化
watch(
  route,
  (to, from) => {
    if (!isTags(to.path)) return

    const { fullPath, meta, name, params, path, query } = to
    appStore.addTagsViewList({
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: getTitle(to),
    })
  },
  { immediate: true },
)
</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 100px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
