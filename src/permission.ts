import { TOKEN } from './constant'
import router from './router'
import { getStorageItem } from './utils/storage'

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  if (getStorageItem(TOKEN)) {
    // 存在 token，进入主页
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    // 没有 token，可以进入白名单
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
