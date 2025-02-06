<template>
  <div class="flex justify-center items-center px-4">
    <div class="rounded-lg bg-white/30 border transform translate-y-[-50%] absolute top-[50%] border-gray-300 bg-opacity-50 p-5 w-9/12 lg:w-2/5 xl:w-1/5 pt-[80px] px-10 shadow-lg max-sm:px-8">
      <h1 class="text-2xl lg:text-3xl font-medium text-center">{{ $t("authTitles.welcomeLogin") }}</h1>
      <p class="text-sm text-center">{{ $t("authTitles.subtitleLogin") }}</p>

      <!-- FORMULARIO -->
      <Form :validation-schema="schema" v-slot="{ handleSubmit }" class="space-y-4 mt-6">
        <!-- Email Input -->
        <Input name="email" type="text" :placeholder="t('email') + '*'" />
        <!-- Password Input -->
        <Input name="password" type="password" :placeholder="t('password') + '*'" />
        <!-- Error Message -->
        <ErrorMsg v-if="showError" :message="errorMsg" @hide="hideErrorMsg" />
        <!-- Submit Button -->
        <button 
          class="w-full bg-secondary text-white py-3 rounded-lg font-medium transition-all hover:bg-secondary-dark focus:ring-2 focus:ring-secondary focus:ring-opacity-50"
          type="submit" 
          @click.prevent="handleSubmit(submit)"
        >
          {{ $t('login') }}
        </button>
      </Form>

      <!-- Links de Ayuda -->
      <div class="flex flex-col items-center text-sm mt-6 gap-2 text-center">
        <p>{{ $t("haveAccount") }} <router-link to="/signup" class="underline text-primary hover:text-primary-dark">{{ $t("signup") }}</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Form } from 'vee-validate'
import * as yup from 'yup'
import { useI18n } from 'vue-i18n'
import { useStore } from '@/store'
import Input from '@/components/forms/Input.vue'
import ErrorMsg from '@/components/common/ErrorMsg.vue'

const { t } = useI18n()
const store = useStore()

const showError = ref(false)
const errorMsg = ref('')

const schema = yup.object({
  email: yup.string()
    .email(t("errors.emailInvalid"))
    .required(t("errors.emailRequired")),
  password: yup.string()
    .min(6, t("errors.passwordLong"))
    .required(t("errors.passwordRequired")),
})

const submit = async (values) => {
  try {
    const res = await store.login(values.email, values.password)
    console.log({ res })    
  } catch (error) {
    let err = 'default'
    switch (error.message) {
      case "User not found":
      case "Incorrect password":
        err = "login"
        break;
      case "Failed to login!":
      default:
        err = "default"
        break;
    }
    errorMsg.value = t('errors.' + err)
    showError.value = true
  }
}

const hideErrorMsg = () => {
  showError.value = false
}
</script>
