<template>
  <!-- element-plus 图标 -->
  <el-icon v-if="icon.includes('User')" class="sub-el-icon" :class="icon">
    <component :is="icon" />
  </el-icon>
  <!-- 其他图标 -->
  <div v-else><svg-icon :icon="icon"></svg-icon></div>
  <span>{{ title }}</span>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
})
</script>
