import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as variables from '@/styles/variables.module.scss'

export const useCssVarStore = defineStore('cssVar', () => {
  console.log(variables)
  const cssVar = ref(variables)

  return { cssVar }
})
