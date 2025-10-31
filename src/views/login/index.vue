<template>
  <div class="login-container">
    <el-form class="login-form" :model="loginForm" :rules="loginRules" ref="loginFormRef">
      <div class="title-container">
        <h3 class="title">{{ $t('msg.login.title') }}</h3>
        <lang-select class="lang-select" effect="light" />
      </div>

      <el-form-item prop="username">
        <svg-icon icon="user" />
        <el-input v-model="loginForm.username" placeholder="username" name="username" type="text" />
      </el-form-item>

      <el-form-item prop="password">
        <svg-icon icon="password" />
        <el-input
          v-model="loginForm.password"
          :type="pwdType"
          placeholder="password"
          name="password"
        />
        <span class="show-pwd">
          <svg-icon :icon="pwdType === 'password' ? 'eye' : 'eye-open'" @click="onChangePwdType" />
        </span>
      </el-form-item>

      <el-button
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        :loading="loading"
        @click="handleLogin"
      >
        {{ $t('msg.login.loginBtn') }}
      </el-button>

      <div class="tips" v-html="$t('msg.login.desc')"></div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { validatePwd } from './rules'
import { useLoginStore } from '@/stores/user'
import LangSelect from '@/components/LangSelect/index.vue'
import { useI18n } from 'vue-i18n'

const pwdType = ref('password')

const loginForm = ref({ username: 'super-admin', password: '123456' })

const i18n = useI18n()
const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: i18n.t('msg.login.usernameRule'),
    },
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePwd(i18n),
    },
  ],
})

const onChangePwdType = () => {
  if (pwdType.value === 'password') {
    pwdType.value = 'text'
  } else {
    pwdType.value = 'password'
  }
}

const loginStore = useLoginStore()
const loading = ref(false)
const loginFormRef = ref(null)
const handleLogin = () =>
  loginFormRef.value.validate((valid) => {
    if (!valid) return

    loading.value = true
    loginStore
      .userLogin(loginForm.value)
      .catch((err) => console.log(err))
      .finally(() => (loading.value = false))
  })
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    :deep(.el-input__wrapper) {
      background-color: transparent;
      box-shadow: none;
    }

    :deep(.el-input) {
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        border-radius: 0px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }
  }

  .svg-icon {
    margin-left: 10px;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
