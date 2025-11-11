<template>
  <el-dropdown v-bind="$attrs" trigger="hover" class="theme" @command="handleSetTheme">
    <svg-icon icon="change-theme" />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">
          {{ $t('msg.theme.themeColorChange') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- 颜色选择弹窗 -->
  <SelectColor v-model:modelValue="selectColorVisible" />
</template>

<script lang="ts" setup>
import SelectColor from './components/SelectColor.vue'
import { ref } from 'vue'

const selectColorVisible = ref(false)

const handleSetTheme = (command: string) => {
  if (command === 'color') {
    selectColorVisible.value = true
  }
}
</script>
