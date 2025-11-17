<template>
  <div class="app-wrapper" :class="[sidebarStore.sidebarOpened ? 'openSidebar' : 'hideSidebar']">
    <!-- 左侧 menu -->
    <Sidebar
      id="guide-sidebar"
      class="sidebar-container"
      :style="{ backgroundColor: themeStore.mainColor }"
    />
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部的 navbar -->
        <Navbar />
        <TagsView />
      </div>
      <!-- 内容区 -->
      <AppMain />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebar'
import { useThemeStore } from '@/stores/theme'

import Navbar from './components/Navbar/index.vue'
import Sidebar from './components/Sidebar/index.vue'
import AppMain from './components/AppMain/index.vue'
import TagsView from './components/tagsView.vue'

const sidebarStore = useSidebarStore()

const themeStore = useThemeStore()
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@import '@/styles/variables.module.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width $sideBarDuration;
}

.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
}

.sidebar-container {
  background-color: $menuBg; /* 直接在 CSS 中应用颜色 */
}
</style>
