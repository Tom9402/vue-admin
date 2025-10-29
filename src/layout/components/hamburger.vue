<template>
  <div class="hamburger-container" @click="toggleClick">
    <SvgIcon class="hamburger" :icon="icon" />
  </div>
</template>

<script lang="ts" setup>
import { useSidebarStore } from '@/stores/sidebar'
import { computed } from 'vue'

const sidebarStore = useSidebarStore()

const icon = computed(() => (sidebarStore.sidebarOpened ? 'hamburger-opened' : 'hamburger-closed'))

const toggleClick = () => {
  sidebarStore.triggerSidebarOpened()
}
</script>

<style lang="scss" scoped>
.hamburger-container {
  padding: 0 16px;
  .hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
}
</style>
