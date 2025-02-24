<template>
	<div class="flex flex-grow justify-center items-center px-4 text-base">
		<div class="bg-white/30 border border-gray-300 shadow-custom2 rounded-lg p-6 w-full max-w-md lg:max-w-lg xl:max-w-md">
			<h1 class="text-2xl lg:text-3xl font-medium text-center">{{ $t("authTitles.welcomeSignup") }}</h1>
			<p class="text-sm text-center">{{ $t("authTitles.subtitleSignup") }}</p>

			<Form :validation-schema="schema" v-slot="{ handleSubmit }" enctype="multipart/form-data" class="space-y-4 mt-6">
				<!-- Image profile -->
				<div class="flex justify-center">
					<img :src="avatarPreview || getDefaultAvatarUrl()" alt="Avatar Preview" class="w-16 h-16 rounded-full" />
				</div>

				<!-- firstname and lastname Input -->
				<div class="flex gap-3">
					<Field name="first_name" type="text" class="w-full h-10 border border-gray-400 focus:border-secondary focus:ring-0 focus:outline-none rounded-xl px-3" :placeholder="t('firstname') + '*'" />
					<InputComp name="last_name" type="text" :placeholder="t('lastname')" />
				</div>
				<!-- Mostrar mensaje de error de firstname debajo de ambos campos -->
				<ErrorMessage v-slot="{ message }" name="first_name">
					<div class="flex items-center text-red-500 text-sm gap-1">
						<Icon icon="exclamation-round" className="w-3 color-red-500" />
						<p>{{ message }}</p>
					</div>
				</ErrorMessage>

				<!-- Email Input -->
				<InputComp name="email" type="email" :placeholder="t('email') + '*'" />

				<!-- Password Input -->
				<InputComp name="password" type="password" :placeholder="t('password') + '*'" />
				<InputComp name="confirm_password" type="password" :placeholder="t('confirmPassword') + '*'" />

				<!-- Select file -->
				<InputComp name="avatar" accept="image/*" @fileChange="handleFileChange" type="file" />

				<!-- Error Message -->
				<ErrorMsg v-if="showError" :message="errorMsg" @hide="hideErrorMsg" />

				<!-- Submit Button -->
				<ButtonComp buttonStyle="purple" type="submit" additionalClass="text-sm lg:text-base"
					@click.prevent="handleSubmit(submit)">
					{{ $t('signup') }}
				</ButtonComp>
			</Form>

			<!-- Links de Ayuda -->
			<div class="flex flex-col items-center text-sm mt-6 gap-2 text-center">
				<p>{{ $t("alreadyRegistered") }} <router-link :to="{ name: 'login' }"
						class="underline text-primary hover:text-primary-dark">{{ $t("login") }}</router-link></p>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { Field, Form, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { useI18n } from 'vue-i18n'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
/* COMPONENTS */
import InputComp from '@/components/forms/Input.vue'
import ErrorMsg from '@/components/common/ErrorMsg.vue'
import ButtonComp from '@/components/common/Button.vue'
import Icon from '@/components/common/Icon.vue'
import { getDefaultAvatarUrl, isValidFileType } from '@/utils'
import getErrorMessage from '@/utils/errors'

const { t } = useI18n()
const store = useStore()
const router = useRouter()

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
		.min(6, t("errors.passwordLong"))
		.required(t("errors.passwordRequired")),
	confirm_password: yup.string()
		.oneOf([yup.ref('password')], t("errors.passwordMismatch"))
		.required(t("errors.passwordRequired")),
	avatar: yup.mixed()
		.test('fileSize', t('errors.fileSize'), value => {
			return !value || value.size <= 5000000; // 5MB size limit
		})
		.test("fileType", t("errors.fileInvalid"), value => {
			return !value || (value && ['image/jpeg', 'image/png'].includes(value.type))
		})
})

const handleFileChange = (event) => {
	selectedFile.value = event.target.files?.[0];
	if (selectedFile.value && isValidFileType(selectedFile.value)) {
		avatarPreview.value = URL.createObjectURL(selectedFile.value);
	} else {
		avatarPreview.value = getDefaultAvatarUrl('service');
	}
};

const submit = async (values) => {
	try {
		const res = await store.signup(values.first_name, values.last_name, values.email, values.password, selectedFile.value)
		if (res.success) {
			router.push({ name: 'home' })
		}
	} catch (error) {
		const errorMessage = getErrorMessage('auth.' + error.message)
		errorMsg.value = t(`errors.${errorMessage}`)
		showError.value = true
	}
}

const hideErrorMsg = () => {
	showError.value = false
}
</script>
