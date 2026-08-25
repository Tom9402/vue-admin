<template>
  <el-timeline>
    <el-timeline-item
      v-for="item in chapterData"
      :key="item.id"
      :timestamp="item.timestamp"
      placement="top"
    >
      <el-card>
        <h4>
          {{ item.content }}
        </h4>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>

<script setup>
import { ref } from 'vue'
import { chapter } from '@/api/user'
import { watchSwitchLang } from '@/utils/i18n'

defineProps({
  project: {
    type: Object,
    default: () => ({})
  }
})

const chapterData = ref([])

const getChapter = async () => {
  const res = await chapter()
  chapterData.value = res.data
}
getChapter()

// 监听语言变化
watchSwitchLang(getChapter)
</script>
