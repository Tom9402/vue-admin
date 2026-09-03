<template>
  <upload-excel :onSuccess="onSuccess" />
</template>

<script setup lang="ts">
import UploadExcel from '@/components/UploadExcel/index.vue'

// 数据解析成功后的回调
const onSuccess = (excelData) => {
  console.log(excelData)
}
</script>
