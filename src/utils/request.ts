import axios from 'axios'
import { ElMessage } from 'element-plus'
import { getStorageItem } from './storage'
import { TOKEN } from '@/constant'
import { isCheckTimeout } from './auth'
import { useLoginStore } from '@/stores/user'

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
})

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

  return config
})

service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data
    if (success) {
      return data
    } else {
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    ElMessage.error(error.message)
    return Promise.reject(error)
  },
)

export default service
