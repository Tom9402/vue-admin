import { getUserInfo, login } from '@/api/sys'
import { TOKEN } from '@/constant'
import router from '@/router'
import { setTimeStamp } from '@/utils/auth'
import { getStorageItem, setStorageItem } from '@/utils/storage'
import md5 from 'md5'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useLoginStore = defineStore('login', () => {
  const tokenState = ref(getStorageItem(TOKEN) || '')
  const userInfoState = ref({})

  const hasUserInfo = computed(() => JSON.stringify(userInfoState.value) !== '{}')

  const userLogin = (userInfo: object) => {
    const { username, password } = userInfo

    return new Promise((resolve, reject) => {
      login({ username, password: md5(password) })
        .then((data) => {
          const { token } = data
          // 保存 token
          tokenState.value = token
          setStorageItem(TOKEN, token)

          // 保存时间戳
          setTimeStamp()

          router.push('/')
          resolve()
        })
        .catch((err) => reject(err))
    })
  }

  const getUserInfoAction = async () => {
    const res = await getUserInfo()
    userInfoState.value = res
    return res
  }

  const logout = () => {
    tokenState.value = ''
    userInfoState.value = {}
    localStorage.clear()
    router.push('/login')
  }

  return { userLogin, getUserInfoAction, userInfoState, hasUserInfo, logout }
})
