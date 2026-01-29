<template>
  <div class="project-card">
    <PanThumb
      !hoverable
      :image="'https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png'"
    >
      <div>Hello</div>
      {{ userInfoState.title }}
    </PanThumb>
  </div>
</template>

<script setup>
import { useLoginStore } from '@/stores/user'
import PanThumb from './PanThumb.vue'

const { userInfoState } = useLoginStore()
</script>
