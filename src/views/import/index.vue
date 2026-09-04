<template>
  <upload-excel :onSuccess="onSuccess" />
</template>

<script setup lang="ts">
import { userBatchImport } from '@/api/user-manage'
import UploadExcel from '@/components/UploadExcel/index.vue'
import router from '@/router'
import { formatDate, USER_RELATIONS } from '@/views/import/utils'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()

/*
 * 筛选数据
 */
const generateData = results => {
  const arr = []
  results.forEach(item => {
    const userInfo = {}
    Object.keys(item).forEach(key => {
      if (USER_RELATIONS[key] === 'openTime') {
        userInfo[USER_RELATIONS[key]] = formatDate(item[key])
        return
      }
      userInfo[USER_RELATIONS[key]] = item[key]
    })
    arr.push(userInfo)
  })
  return arr
}
// 数据解析成功后的回调
const onSuccess = async ({ header, results }) => {
  const data = generateData(results)
  // 8. 调用批量导入接口
  await userBatchImport(data)
  ElMessage.success({
    message: results.length + i18n.t('msg.excel.importSuccess'),
    type: 'success'
  })
  router.push('/user/manage')
}
</script>
