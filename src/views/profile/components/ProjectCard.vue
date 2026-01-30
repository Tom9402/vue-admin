<template>
  <el-card class="user-container">
    <template #header>
      <div class="header">
        <span>{{ $t('msg.profile.introduce') }}</span>
      </div>
    </template>

    <div class="user-profile">
      <!-- 头像 -->
      <div class="box-center">
        <pan-thumb
          image="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
          :height="'100px'"
          :width="'100px'"
        >
          <div>Hello</div>
          {{ userInfoState.title }}
        </pan-thumb>
      </div>
      <!-- 姓名 && 角色 -->
      <div class="box-center">
        <div class="user-name text-center">
          {{ userInfoState.username }}
        </div>
        <div class="user-role text-center text-muted">
          {{ userInfoState.title }}
        </div>
      </div>
    </div>
  </el-card>
</template>
<script setup>
import { useLoginStore } from '@/stores/user'
import PanThumb from './PanThumb.vue'

defineProps({
  features: {
    type: Array,
    default: () => [],
  },
})

const { userInfoState } = useLoginStore()
</script>

<style lang="scss" scoped>
.user-container {
  .text-muted {
    font-size: 14px;
    color: #777;
  }

  .user-profile {
    text-align: center;
    .user-name {
      font-weight: bold;
    }

    .box-center {
      padding-top: 10px;
    }

    .user-role {
      padding-top: 10px;
      font-weight: 400;
    }
  }
}
</style>
