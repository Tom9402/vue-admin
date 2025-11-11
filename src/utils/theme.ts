import rgbHex from 'rgb-hex'
import formula from '@/constant/formula.json'

/**
 * 写入新样式到 style
 * @param {*} elNewStyle  element-plus 的新样式
 * @param {*} isNewStyleTag 是否生成新的 style 标签
 */

export const writeNewStyle = (elNewStyle) => {}

/**
 * 根据主色生成色值表
 */
export const generateColors = (primaryColor: string) => {
  if (!primaryColor) return

  const colors = { primaryColor }

  Object.keys(formula).forEach((key) => {
    const value = formula[key].replace(/primary/g, primaryColor)
    colors[key] = '#' + rgbHex(colors.convert(value))
  })
}

/**
 * 根据主色值，生成最新的样式表
 */
export const generateNewStyle = async (primaryColor: string) => {
  // const colors = generateColors(primaryColor)
  // let cssText = await get
}
