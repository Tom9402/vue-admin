<template>
  <i v-if="icon.includes('el-icon')" class="sub-el-icon" :class="icon" />
  <svgIcon v-else :icon="icon" />
  <span>{{ title }}</span>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
})
</script>
