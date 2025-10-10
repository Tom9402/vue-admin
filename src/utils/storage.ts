// 存储数据
export const setStorageItem = (key: string, value: string | object) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}

export const getStorageItem = (key: string) => {
  const data = localStorage.getItem(key)
  try {
    return JSON.parse(data || '')
  } catch (err) {
    return data
  }
}
