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

  // 是否有用户信息
  const hasUserInfo = computed(() => JSON.stringify(userInfoState.value) !== '{}')

  const userLogin = (userInfo: object) => {
    const { username, password } = userInfo

    return new Promise((resolve, reject) => {
      login({ username, password: md5(password) })
        .then(res => {
          const { token } = res.data
          // 保存 token
          tokenState.value = token
          setStorageItem(TOKEN, token)

          // 保存登录时间
          setTimeStamp()

          const redirect = router.currentRoute.value.query.redirect
          router.push(typeof redirect === 'string' && redirect !== '/login' ? redirect : '/')
          resolve()
        })
        .catch((err) => reject(err))
    })
  }

  const getUserInfoAction = async () => {
    const res = await getUserInfo()
    userInfoState.value = res.data
    return res
  }

  const logout = () => {
    const redirect = router.currentRoute.value.fullPath
    tokenState.value = ''
    userInfoState.value = {}
    localStorage.clear()
    router.push({ path: '/login', query: { redirect } })
  }

  return { userLogin, getUserInfoAction, userInfoState, hasUserInfo, logout }
})
