import i18n from '@/i18n'
import { useLanguageStore } from '@/stores/language'
import { watch } from 'vue'

export function generateTitle(title: string) {
  return i18n.global.t(`msg.route.${title}`)
}

/**
 *
 * @param  {...any} cbs 所有的回调
 */
export const watchSwitchLang = (...cbs: ((lang: string) => void)[]) => {
  const languageStore = useLanguageStore()
  watch(
    () => languageStore.language,
    () => cbs.forEach((cb) => cb(languageStore.language)),
  )
}
