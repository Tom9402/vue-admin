<template>
  <el-submenu v-if="route.children.length > 0" :index="route.path">
    <template #title>
      <menu-item :title="route.meta.title" :icon="route.meta.icon" />
    </template>

    <!-- 循环渲染 -->
    <SidebarItem v-for="item in route.children" :key="item.path" :route="item" />
  </el-submenu>

  <!-- 渲染 item 项 -->
  <el-menu-item v-else :index="route.path">
    <menu-item :title="route.meta.title" :icon="route.meta.icon" />
  </el-menu-item>
</template>

<script lang="ts" setup>
import MenuItem from './MenuItem.vue'

const props = defineProps({
  route: {
    type: Object,
    default: () => ({}),
  },
})
</script>
