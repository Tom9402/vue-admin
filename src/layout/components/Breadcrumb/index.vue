<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>
      <a href="/">活动管理</a>
    </el-breadcrumb-item>
    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    <el-breadcrumb-item>Dashboard</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 生成数组数据
const breadcrumbData = ref([])
const getBreadcrumbData = () => {
  breadcrumbData.value = route.matched.filter((item) => item.meta && item.meta.title)
}

// 监听路由变化
watch(
  route,
  () => {
    getBreadcrumbData()
  },
  {
    immediate: true,
  },
)
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 10px;

  :deep .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
