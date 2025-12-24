<template>
  <div :class="{ show: isShow }" class="header-search">
    <svg-icon id="guide-search" icon="search" class-name="search-icon" @click.stop="onShowClick" />
    <el-select
      ref="searchSelectRef"
      class="header-search-select"
      v-model="search"
      filterable
      default-first-option
      remote
      :placeholder="$t('msg.navBar.headerSearch')"
      :remote-method="querySearch"
      @change="onSelectChange"
    >
      <el-option
        v-for="opt in searchOptions"
        :key="opt.item.path"
        :label="opt.item.title.join(' > ')"
        :value="opt.item"
      />
    </el-select>
  </div>
</template>

<script lang="ts" setup>
import { filterRouters } from '@/utils/route'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Fuse from 'fuse.js'
import { generateRoutes } from './FuseData'
import { watchSwitchLang } from '@/utils/i18n'

const searchSelectRef = ref<HTMLSelectElement>()
const isShow = ref(false)
const onShowClick = () => {
  isShow.value = !isShow.value
  searchSelectRef.value.focus()
}

const search = ref('')

// 检索数据源
const router = useRouter()
let searchPool = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateRoutes(filterRoutes)
})

/**
 * 搜索库相关
 */
let fuse: Fuse<{ title: string[]; path: string }>
const initFuse = (list: Array<{ title: string[]; path: string }>) => {
  fuse = new Fuse(list, {
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
}
initFuse(searchPool.value)

// 搜索结果
const searchOptions = ref([])
// 搜索方法
const querySearch = (query: string) => {
  if (query !== '') {
    console.log(query)
    searchOptions.value = fuse.search(query)
    console.log(searchOptions.value)
  } else {
    searchOptions.value = []
  }
}

// 选中回调
const onSelectChange = (val: string) => router.push(val.path)

// 关闭 search 的处理事件
const onClose = () => {
  searchSelectRef.value?.blur()
  isShow.value = false
  searchOptions.value = []
}
/**
 * 监听 search 打开，处理 close 事件
 */
watch(isShow, (val) => {
  if (val) {
    document.body.addEventListener('click', onClose)
  } else {
    document.body.removeEventListener('click', onClose)
  }
})

// 处理国际化
watchSwitchLang(() => {
  searchPool = computed(() => {
    const filterRoutes = filterRouters(router.getRoutes())
    return generateRoutes(filterRoutes)
  })
  initFuse(searchPool.value)
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
  }
  &.show .header-search-select {
    width: 210px;
    margin-left: 10px;
  }
}
</style>
