export const validatePwd = (i18n) => {
  return (rule, value: string, callback: () => void) => {
    if (value.length < 6) {
      callback(new Error(i18n.t('msg.login.passwordRule')))
    } else {
      callback()
    }
  }
}
