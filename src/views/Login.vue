<template>
	<main class="flex flex-grow justify-center items-center px-4 text-base">
		<div class="bg-white/30 border border-gray-300 shadow-custom2 rounded-lg p-6 w-full max-w-md lg:max-w-lg xl:max-w-md">
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
				<ButtonComp buttonStyle="purple" type="submit" additionalClass="text-sm lg:text-base"
					@click.prevent="handleSubmit(submit)">
					{{ $t('login') }}
				</ButtonComp>
			</Form>

			<!-- Links de Ayuda -->
			<div class="flex flex-col items-center text-sm mt-6 gap-2 text-center">
				<p>{{ $t("haveAccount") }} <router-link to="/signup" class="underline text-primary hover:text-primary-dark">{{
					$t("signup") }}</router-link></p>
			</div>
		</div>
	</main>
</template>

<script setup>
import { ref } from 'vue'
import { Form } from 'vee-validate'
import * as yup from 'yup'
import { useI18n } from 'vue-i18n'
import { useStore } from '@/store'
import getErrorMessage from '@/utils/errors'
/* COMPONENTS */
import Input from '@/components/forms/Input.vue'
import ErrorMsg from '@/components/common/ErrorMsg.vue'
import ButtonComp from '@/components/common/Button.vue'

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
		const errorMessage = getErrorMessage('auth.' + error.message)
		errorMsg.value = t(`errors.${errorMessage}`)
		showError.value = true
	}
}

const hideErrorMsg = () => {
	showError.value = false
}
</script>
