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

  const changeTagsView = ({ index, tag }) => {
    tagsViewList.value[index] = tag
    setStorageItem(TAGS_VIEW, tagsViewList.value)
  }

  /**
   * 删除 tag
   * @param {type: 'other'||'right'||'index', index: index} payload
   */
  const removeTagsView = (payload) => {
    const { type, index } = payload

    switch (type) {
      case 'other':
        tagsViewList.value.splice(index + 1, tagsViewList.value.length - index + 1)
        tagsViewList.value.splice(0, index)
        break
      case 'right':
        tagsViewList.value.splice(index + 1, tagsViewList.value.length - index + 1)
        break
      case 'left':
        tagsViewList.value.splice(0, index)
        break
      case 'index':
        tagsViewList.value.splice(index, 1)
        break
    }

    setStorageItem(TAGS_VIEW, tagsViewList.value)
  }

  return { tagsViewList, addTagsViewList, changeTagsView, removeTagsView }
})
