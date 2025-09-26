import SvgIcon from '@/components/SvgIcon/index.vue'

/**
 * 注册所有 SVG 图标
 * 使用 Vite 的 import.meta.glob 动态导入 svg 文件夹下的所有 svg 文件
 * @param {import('vue').App} app - Vue 应用实例
 */
export default (app: { component: (name: string, component: any) => void }) => {
  app.component('svg-icon', SvgIcon)

  // const svgFiles = import.meta.glob('./svg/*.svg', { eager: true })

  // Object.keys(svgFiles).forEach((key) => {
  //   const svgIcon = svgFiles[key].default
  // })
}
