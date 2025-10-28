import type { RouteRecordRaw } from 'vue-router'

/**
 * 浏览器环境下的路径解析函数，替代Node.js的path.resolve
 * @param {string} basePath 基础路径
 * @param {string} relativePath 相对路径
 * @returns {string} 解析后的路径
 */
function resolvePath(basePath: string, relativePath: string): string {
  // 如果是绝对路径（以/开头），直接返回
  if (relativePath.startsWith('/')) {
    return relativePath
  }

  // 合并路径并处理 ../
  const baseSegments = basePath.split('/').filter(Boolean)
  const relativeSegments = relativePath.split('/').filter(Boolean)

  const resultSegments = [...baseSegments]

  for (const segment of relativeSegments) {
    if (segment === '..') {
      resultSegments.pop()
    } else if (segment !== '.') {
      resultSegments.push(segment)
    }
  }

  return '/' + resultSegments.join('/')
}

// 返回所有子路由
export function getChildrenRoutes(routes: RouteRecordRaw[]) {
  const childrenRoutes: RouteRecordRaw[] = []
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      childrenRoutes.push(...route.children)
    }
  })
  return childrenRoutes
}

/**
 * 处理脱离层级的路由：某个一级路由为其他子路由，则剔除该一级路由，保留路由层级
 * @param {*} routes router.getRoutes()
 */
export function filterRouters(routes: RouteRecordRaw[]) {
  const childrenRoutes = getChildrenRoutes(routes)

  return routes.filter((route) => !childrenRoutes.find((item) => item.path === route.path))
}

// 判断数据是否为空值
function isNull(data: any) {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
  return false
}

// 根据 routes 数据，返回对应 menu 规则数组
export function generateMenus(routes: RouteRecordRaw, basePath = '') {
  const result: any[] = []

  // 遍历路由表
  routes.forEach((item: { meta: any; children: RouteRecordRaw; path: string | undefined }) => {
    // 不存在 children、meta 直接跳过
    if (isNull(item.meta) && isNull(item.children)) return

    // 存在 children 不存在 meta，递归处理 children
    if (!isNull(item.children) && isNull(item.meta)) {
      result.push(...generateMenus(item.children, item.path))
      return
    }

    // 合并 path 作为跳转路径
    const routePath = resolvePath(basePath, item.path)

    // 路由分离之后，存在同名路由情况，需要单独处理
    let route = result.find((item) => item.path === routePath)
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: [],
      }

      // icon 与 title 必须全部存在
      if (route.meta.icon && route.meta.title) {
        // meta 存在生成 route对象，放入 arr
        result.push(route)
      }
    }

    // 存在 children 递归处理 children
    if (item.children) {
      route.children.push(...generateMenus(item.children, routePath))
    }
  })
  return result
}
