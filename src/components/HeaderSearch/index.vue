<template>
  <div :class="{ show: isShow }" class="header-search">
    <svg-icon icon="search" class-name="search-icon" @click.stop="onShowClick" />
    <el-select
      ref="searchSelectRef"
      class="header-search-select"
      v-model="search"
      filterable
      default-first-option
      remote
      placeholder="请输入搜索内容"
      :remote-method="querySearch"
      @change="onSelectChange"
    >
      <el-option v-for="opt in 5" :key="opt" :label="opt" :value="opt" />
    </el-select>
  </div>
</template>

<script lang="ts" setup>
import { filterRouters, generateMenus } from '@/utils/route'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Fuse from 'fuse.js'

const searchSelectRef = ref<HTMLSelectElement>()
const isShow = ref(false)
const onShowClick = () => {
  isShow.value = !isShow.value
  searchSelectRef.value.focus()
}

const search = ref('')
const querySearch = () => console.log('querySearch')

// 选中回调
const onSelectChange = (val: string) => {
  console.log('onSelectChange', val)
}

// 检索数据源
const router = useRouter()
const searchPool = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  console.log(generateMenus(filterRoutes))
  return generateMenus(filterRoutes)
})

/**
 * 搜索库相关
 */
const fuse = new Fuse(searchPool.value, {
  // 是否按优先级排序
  shouldSort: true,
  // 匹配长度超过该值才会被认为是匹配的
  minMatchCharLength: 1,
  // 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
  // name: 搜索的键
  // weight: 对应的权重
  keys: [
    {
      name: 'title',
      weight: 0.7,
    },
    {
      name: 'path',
      weight: 0.3,
    },
  ],
})
</script>

<style scoped lang="scss">
.header-search {
  font-size: 0 !important;
  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
}
.header-search-select {
  font-size: 18px;
  transition: width 0.3s ease-in-out;
  width: 0;
  overflow: hidden;
  background: transparent;
  border-radius: 0;
  display: inline-block;
  vertical-align: middle;
  :deep(.el-input__inner) {
    border-radius: 0;
    border: 0;
    padding-left: 0;
    padding-right: 0;
    box-shadow: none !important;
    border-bottom: 1px solid #d9d9d9;
    vertical-align: middle;
  }
  &.show .header-search-select {
    width: 210px;
    margin-left: 10px;
  }
}
</style>
