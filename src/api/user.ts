import request from '@/utils/request'

export const feature = () => request({ url: '/user/feature' })

export const chapter = () => request({ url: '/user/chapter' })