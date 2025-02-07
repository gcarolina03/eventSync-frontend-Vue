<template>
  <div class="flex flex-grow justify-center items-center px-4 mt-4 text-base">
    <div class="bg-white/30 border border-gray-300 shadow-lg rounded-lg p-6 w-full max-w-md lg:max-w-lg xl:max-w-md">
      <h1 class="text-2xl lg:text-3xl font-medium text-center">{{ $t("authTitles.welcomeSignup") }}</h1>
      <p class="text-sm text-center">{{ $t("authTitles.subtitleSignup") }}</p>

      <Form :validation-schema="schema" v-slot="{ handleSubmit }" enctype="multipart/form-data" class="space-y-4 mt-6">
        <!-- Image profile -->
        <div class="flex justify-center">
          <img 
            :src="avatarPreview || 'https://res.cloudinary.com/dhveca8ba/image/upload/v1689175163/jvpcce9vmgjqjzqcc8ec.jpg'" 
            alt="Avatar Preview" 
            class="w-16 h-16 rounded-full"
          />
        </div>

        <!-- firstname and lastname Input -->
        <div class="flex gap-3">
          <InputComp name="first_name" type="text" :placeholder="t('firstname') + '*'" />
          <InputComp name="last_name" type="text" :placeholder="t('lastname')" />
        </div>

        <!-- Email Input -->
        <InputComp name="email" type="email" :placeholder="t('email') + '*'" />

        <!-- Password Input -->
        <InputComp name="password" type="password" :placeholder="t('password') + '*'" />
        <InputComp name="confirm_password" type="password" :placeholder="t('confirmPassword') + '*'" />

        <!-- Select file -->
        <input 
          name="avatar" 
          accept="image/*" 
          @change="handleFileChange" 
          class="block w-full text-sm text-gray-500 border border-gray-200 rounded-lg cursor-pointer bg-gray-50 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white"
          type="file" 
        />
        <ErrorMessage v-slot="{ message }" name="avatar">
          <div class="flex items-center text-red-500 text-sm gap-1">
            <Icon icon="exclamation-round" className="w-3 color-red-500" />
            <p>{{ message }}</p>
          </div>
        </ErrorMessage>

        <!-- Error Message -->
        <ErrorMsg v-if="showError" :message="errorMsg" @hide="hideErrorMsg" />

        <!-- Submit Button -->
        <ButtonComp buttonStyle="purple" type="submit" additionalClass="text-sm lg:text-base" @click.prevent="handleSubmit(submit)">
          {{ $t('signup') }}
        </ButtonComp>
      </Form>

      <!-- Links de Ayuda -->
      <div class="flex flex-col items-center text-sm mt-6 gap-2 text-center">
        <p>{{ $t("alreadyRegistered") }} <router-link to="/login" class="underline text-primary hover:text-primary-dark">{{ $t("login") }}</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Form, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { useI18n } from 'vue-i18n'
import { useStore } from '@/store'
/* COMPONENTS */
import InputComp from '@/components/forms/Input.vue'
import ErrorMsg from '@/components/common/ErrorMsg.vue'
import ButtonComp from '@/components/common/Button.vue'


const { t } = useI18n()
const store = useStore()

const showError = ref(false)
const errorMsg = ref('')
const avatarPreview = ref(null)
const selectedFile = ref(null)

const schema = yup.object({
  first_name: yup.string()
    .min(3, t("errors.firstNameShort"))
    .required(t("errors.firstNameRequired")),
  email: yup.string()
    .email(t("errors.emailInvalid"))
    .required(t("errors.emailRequired")),
  password: yup.string()
    .min(8, t("errors.passwordLong"))
    .required(t("errors.passwordRequired")),
  confirm_password: yup.string()
    .oneOf([yup.ref('password')], t("errors.passwordMismatch"))
    .required(t("errors.passwordRequired")),
  avatar: yup.mixed()
    .test("fileType", t("errors.fileInvalid"), value => {
      return !value || (value && ['image/jpeg', 'image/png'].includes(value.type))
    })
})

const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    selectedFile.value = file
    avatarPreview.value = URL.createObjectURL(file)
  }
}

const submit = async (values) => {
  try {
    const res = await store.signup(values.first_name, values.last_name, values.email, values.password, selectedFile.value)
    console.log({ res })    
  } catch (error) {
    console.log({ error })
    let err = 'default'
    switch (error.message) {
      case "User already exists":
        err = "emailExists"
        break;
      case "Failed to signup":
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
