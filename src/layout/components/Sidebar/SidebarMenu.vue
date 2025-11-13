<template>
  <!-- 一级 menu 菜单 -->
  <el-menu
    router
    :collapse="!sidebarStore.sidebarOpened"
    :default-active="activeMenu"
    :unique-opened="true"
    :background-color="themeStore.mainColor"
    :text-color="themeStore.cssVar.menuText"
    :active-text-color="themeStore.cssVar.menuActiveText"
  >
    <sidebar-item v-for="item in routes" :key="item.path" :route="item" />
  </el-menu>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { generateMenus, filterRouters } from '@/utils/route'
import SidebarItem from './SidebarItem.vue'
import { useSidebarStore } from '@/stores/sidebar'
import { useThemeStore } from '@/stores/theme'

const sidebarStore = useSidebarStore()
const themeStore = useThemeStore()
console.log(themeStore)

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
</script>
