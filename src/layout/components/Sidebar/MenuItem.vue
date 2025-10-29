<template>
  <i v-if="icon.includes('el-icon')" class="sub-el-icon" :class="icon" />
  <svg-icon v-else :icon="icon" />
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
