<template>
  <!-- 一级 menu 菜单 -->
  <el-menu
    router
    :default-active="activeMenu"
    :unique-opened="true"
    :background-color="cssStore.cssVar.menuBg"
    :text-color="cssStore.cssVar.menuText"
    :active-text-color="cssStore.cssVar.menuActiveText"
  >
    <sidebar-item v-for="item in routes" :key="item.path" :route="item" />
  </el-menu>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { generateMenus, filterRouters } from '@/utils/route'
import SidebarItem from './SidebarItem.vue'
import { useCssVarStore } from '@/stores/cssVar'

const cssStore = useCssVarStore()

console.log(cssStore.cssVar)

// 计算高亮 menu
const route = useRoute()
const activeMenu = computed(() => {
  return route.path
})

const router = useRouter()
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateMenus(filterRoutes)
})

console.log(routes.value)
</script>
