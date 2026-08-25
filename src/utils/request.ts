import axios from 'axios'
import { ElMessage } from 'element-plus'
import { getStorageItem } from './storage'
import { TOKEN } from '@/constant'
import { isCheckTimeout } from './auth'
import { useLoginStore } from '@/stores/user'
import { useLanguageStore } from '@/stores/language'

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
})

// Uncaught ReferenceError: Cannot access 'useLoginStore' before initialization
// const { logout } = useLoginStore()

service.interceptors.request.use((config) => {
  config.headers.icode = 'helloqianduanxunlianying'
  const token = getStorageItem(TOKEN)
  if (token) {
    // 检查是否超时
    if (isCheckTimeout()) {
      // 超时处理
      const { logout } = useLoginStore()
      logout()
      return Promise.reject(new Error('token超时'))
    }

    config.headers.Authorization = `Bearer ${token}`
  }
  // 配置接口国际化
  config.headers['Accept-Language'] = useLanguageStore().language

  return config
})

service.interceptors.response.use(
  (response) => {
    const { success, message } = response.data
    if (success) {
      return response.data
    } else {
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    // token超时
    const outOfTimeState = error.response && error.response.data && error.response.data.code === 401

    if (outOfTimeState) {
      const { logout } = useLoginStore()
      logout()
    }

    // 错误提示
    ElMessage.error(error.message)
    return Promise.reject(error)
  },
)

export default service
