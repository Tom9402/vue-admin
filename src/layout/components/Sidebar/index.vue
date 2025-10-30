<template>
  <div class="">
    <div class="logo-container">
      <el-avatar
        :size="logoHeight"
        shape="square"
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
      />
      <h1 class="logo-title" v-if="sidebarStore.sidebarOpened">Vue Admin</h1>
    </div>
    <el-scrollbar>
      <sidebar-menu />
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { useSidebarStore } from '@/stores/sidebar'
import SidebarMenu from './SidebarMenu.vue'

const logoHeight = 44
const sidebarStore = useSidebarStore()
</script>

<style scoped lang="scss">
.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: v-bind(logoHeight) + 'px';
  padding: 10px 0 22px 0;
  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }
}
</style>
