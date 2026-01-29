<template>
  <div>Chapter</div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  project: {
    type: Object,
    default: () => ({}),
  },
})
</script>
