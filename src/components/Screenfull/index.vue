<template>
  <svg-icon
    id="guide-full"
    :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
    @click="onToggle"
  />
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import screenfull from 'screenfull'

const isFullscreen = ref(false)

// 监听变化
const change = () => (isFullscreen.value = screenfull.isFullscreen)

// 切换事件
const onToggle = () => screenfull.toggle()

// 设置监听器
onMounted(() => screenfull.on('change', change))

// 移除监听器
onUnmounted(() => screenfull.off('change', change))
</script>
