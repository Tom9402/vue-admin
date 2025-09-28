import { login } from '@/api/sys'
import { TOKEN } from '@/constant'
import { getStorageItem, setStorageItem } from '@/utils/storage'
import md5 from 'md5'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoginStore = defineStore('login', () => {
  const tokenState = ref(getStorageItem(TOKEN) || '')

  const userLogin = (userInfo: object) => {
    const { username, password } = userInfo

    return new Promise((resolve, reject) => {
      login({ username, password: md5(password) })
        .then((data) => {
          const { token } = data
          tokenState.value = token
          setStorageItem(TOKEN, token)
          resolve()
        })
        .catch((err) => reject(err))
    })
  }

  return { userLogin }
})
