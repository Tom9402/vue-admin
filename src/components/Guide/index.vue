<template>
  <div>
    <el-tooltip :content="$t('msg.navBar.guide')">
      <svg-icon id="guide-start" icon="guide" @click="onClick" />
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'

import steps from './step'

const i18n = useI18n()

const { t } = i18n

let driverInstance = null

onMounted(() => {
  driverInstance = driver({
    doneBtnText: t('msg.guide.close'),
    prevBtnText: t('msg.guide.prev'),
    nextBtnText: t('msg.guide.next'),
  })
})

const onClick = () => {
  driverInstance.setSteps(steps(i18n))
  driverInstance.drive()
}
</script>

<style scoped></style>
