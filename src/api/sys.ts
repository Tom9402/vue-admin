import request from '@/utils/request'

export const login = (data: object) =>
  request({
    url: '/sys/login',
    method: 'POST',
    data,
  })

export const getUserInfo = () =>
  request({
    url: '/sys/profile',
  })
