import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant'
import { setStorageItem, getStorageItem } from '@/utils/storage'
/**
 * 获取时间戳
 */
export function getTimeStamp() {
  return getStorageItem(TIME_STAMP)
}
/**
 * 设置时间戳
 */
export function setTimeStamp() {
  setStorageItem(TIME_STAMP, Date.now())
}
/**
 * 是否超时
 */
export function isCheckTimeout() {
  // 当前时间戳
  const currentTime = Date.now()
  // 缓存时间戳
  const timeStamp = getTimeStamp()
  return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
}
