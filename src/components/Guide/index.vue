<template>
  <div>
    <el-tooltip :content="$t('msg.navBar.guide')">
      <svg-icon icon="guide" />
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'

const { t } = useI18n()

let driverInstance = null

onMounted(() => {
  driverInstance = driver({
    allowClose: false,
    doneBtnText: t('msg.guide.close'),
    prevBtnText: t('msg.guide.prev'),
    nextBtnText: t('msg.guide.next'),
  })
})
</script>

<style scoped></style>
