const whiteList = ['/login', '/404', '/401', '/import']

/**
 * path 是否需要被缓存
 * @param {*} path
 * @returns
 */
export const isTags = (path: string) => {
  return !whiteList.includes(path)
}
