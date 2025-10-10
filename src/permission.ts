import { TOKEN } from './constant'
import router from './router'
import { useLoginStore } from './stores/user'
import { getStorageItem } from './utils/storage'

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  const { userInfoState, getUserInfoAction, hasUserInfo } = useLoginStore()
  if (getStorageItem(TOKEN)) {
    // 存在 token，进入主页
    if (to.path === '/login') {
      next('/')
    } else {
      // 获取用户信息
      if (!hasUserInfo.value) {
        await getUserInfoAction()
      }
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
