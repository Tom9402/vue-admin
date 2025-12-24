<template>
  <div
    v-if="isExternal"
    class="svg-external-icon svg-icon"
    :class="className"
    :style="styleExternalIcon"
    :id="id"
  />
  <svg v-else class="svg-icon" :class="className" aria-hidden="true" :id="id">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { isExternal as external } from '@/utils/validate'

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: '',
  },
})
const isExternal = computed(() => external(props.icon))

// 外部图表样式
const styleExternalIcon = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`,
}))

// 项目内图标
const iconName = computed(() => `#icon-${props.icon}`)
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
