import { TAGS_VIEW } from '@/constant'
import { getStorageItem, setStorageItem } from '@/utils/storage'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const tagsViewList = ref(getStorageItem(TAGS_VIEW) || [])

  const addTagsViewList = (tag: { path: string; name: string }) => {
    const isFind = tagsViewList.value.find((item: { path: string }) => item.path === tag.path)
    // 处理重复
    if (!isFind) {
      tagsViewList.value.push(tag)
      setStorageItem(TAGS_VIEW, tagsViewList.value)
    }
  }

  return { tagsViewList, addTagsViewList }
})
