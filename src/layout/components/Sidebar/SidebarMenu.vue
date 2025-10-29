<template>
  <!-- 一级 menu 菜单 -->
  <el-menu
    router
    :uniqueOpened="true"
    :background-color="cssVar.menuBg"
    :text-color="cssVar.menuText"
    :active-text-color="cssVar.menuActiveText"
  >
    <SidebarItem v-for="item in routes" :key="item.path" :route="item" />
  </el-menu>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { generateMenus, filterRouters } from '@/utils/route'
import SidebarItem from './SidebarItem.vue'
import { useCssVarStore } from '@/stores/cssVar'

const cssVar = useCssVarStore()

const router = useRouter()
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateMenus(filterRoutes)
})

console.log(routes.value)
</script>
