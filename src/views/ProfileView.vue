<template>
	<div class="flex flex-grow items-center rounded-lg text-base"
		:class="[showEditForm ? 'justify-center gap-12' : 'flex-col']">
		<!-- Header -->
		<div v-show="!showEditForm" class="w-full bg-blue-light2 text-white h-40"></div>

		<!-- Profile Info Section -->
		<div class="flex flex-col items-center mt-4 relative">
			<img class="w-32 h-32 rounded-full " :class="[showEditForm ? '' : 'absolute top-[-95px]']" :src="avatarPreview || getDefaultAvatarUrl()" alt="user avatar" />

			<div class="mt-10 flex flex-col items-center">
				<!-- User Name and Email -->
				<div class="relative">
					<Icon v-if="!showEditForm" @handleClick="toggleEditForm" type="button" icon="pencil"
						classButton="text-sm font-bold bg-gray-600 hover:bg-gray-800 text-gray-700"
						className="flex items-center justify-center h-3 w-3 absolute top-1/2 transform -translate-y-1/2 right-[-30px]" />
					<h2 class="text-3xl font-semibold">{{ user.first_name }} {{ user.last_name }}</h2>
				</div>
				<p class="text-2xl text-gray-600">{{ user.email }}</p>

				<!-- Stats -->
				<div class="flex mt-4">
					<div v-for="(detail, index) in userDetails" :key="index" class="text-center text-md min-w-28" :class="[index != userDetails.length - 1 ? 'w-full border-r-2 border-neutral-500 border-opacity-40' : '']">
						<p class="font-semibold text-xl">{{ detail.value }}</p>
						<p class="text-md text-neutral-500">{{ detail.label }}</p>
					</div>
				</div>

				<!-- Buttons -->
				<div v-if="!showEditForm" class="flex gap-8 mt-6">
					<ButtonComp buttonStyle="purple" additionalClass="min-w-32 text-center" type="button" :to="{ name: 'events' }">
						{{ $t('events') }}
					</ButtonComp>
					<ButtonComp buttonStyle="white" additionalClass="min-w-32 text-center !border-secondary" type="button" :to="{ name: 'myServices' }">
						{{ $t('services') }}
					</ButtonComp>
				</div>
			</div>
		</div>

		<!-- formulario -->
		<Form v-if="showEditForm" :initial-values="initialValues" :validation-schema="schema" v-slot="{ handleSubmit }" class="">
			<!-- Título del formulario -->
			<div class="flex justify-between items-center mb-6">
				<h2 class=" font-semibold">Basic Info</h2>
				<div class="flex gap-3 text-sm">
					<ButtonComp @click="toggleEditForm" buttonStyle="white" additionalClass="min-w-20 text-center !border-secondary" type="button">
						{{ $t('buttons.cancel') }}
					</ButtonComp>
					<ButtonComp buttonStyle="purple" additionalClass="min-w-20 text-center" type="button" @click.prevent="handleSubmit(submit)">
						{{ $t('buttons.save') }}
					</ButtonComp>
				</div>
			</div>

			<!-- Formulario -->
			<div class="flex flex-col gap-4 border-t-[0.5px] border-neutral-500 border-opacity-40 pt-8">
				<!-- firstname and lastname Input -->
				<div class="flex gap-3">
					<Field name="first_name" type="text" class="w-full h-10 border border-gray-400 focus:border-secondary focus:ring-0 focus:outline-none rounded-xl px-3" :placeholder="t('firstname') + '*'" />
					<InputComp name="last_name" type="text" :placeholder="t('lastname')" />
				</div>

				<!-- Email Input -->
				<InputComp name="email" type="email" disabled="true" :placeholder="t('email') + '*'" />

				<!-- Password Input -->
				<InputComp name="password" type="password" :placeholder="t('password') + '*'" />
				<InputComp name="confirm_password" type="password" :placeholder="t('confirmPassword') + '*'" />

				<!-- Select file -->
				<InputComp name="avatar" accept="image/*" @fileChange="handleFileChange" type="file" />
			</div>
		</Form>
	</div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useStore } from '@/store';
import { useI18n } from 'vue-i18n';
import { Field, Form } from 'vee-validate';
import * as yup from 'yup';
import { getDefaultAvatarUrl } from '@/utils';
import getErrorMessage from '@/utils/errors';
/* COMPONENTS */
import ButtonComp from '@/components/common/Button.vue';
import Icon from '@/components/common/Icon.vue';
import InputComp from '@/components/forms/Input.vue';

const store = useStore()
const { t } = useI18n()

const user = ref(store.user)
const userDetails = computed(() => [
	{
		label: t('events'),
		value: user.value.eventsCreated.length,
		link: { name: 'events' }
	},
	{
		label: t('services'),
		value: user.value.servicesCreated.length,
		link: { name: 'myServices' }
	}
])

const showEditForm = ref(false)
const avatarPreview = ref(user.img_url)
const selectedFile = ref(null)
const showError = ref(false)
const errorMsg = ref('')

const initialValues = computed(() => {
	return store.user ? {
		first_name: store.user.first_name,
		last_name: store.user.last_name,
		email: store.user.email,
		password: '',
		confirm_password: '',
		avatar: ''
	} : {
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		confirm_password: '',
		avatar: ''
	}
})

const schema = yup.object({
	first_name: yup.string()
		.min(3, t("errors.firstNameShort"))
		.required(t("errors.firstNameRequired")),
	password: yup.string()
		.notRequired(),
	confirm_password: yup.string()
		.test('password-match', t("errors.passwordMismatch"), function (value) {
			const { password } = this.parent;
			if (password && value) {
				return value == password;
			}
			return true;
		})
		.test('password-required', t("errors.passwordRequired"), function (value) {
			const { password } = this.parent;
			if (password && !value) {
				return false;
			}
			return true;
		}),
	avatar: yup.mixed()
		.test('fileSize', t('errors.fileSize'), value => {
			return !value || value.size <= 5000000; // 5MB size limit
		})
		.test("fileType", t("errors.fileInvalid"), value => {
			return !value || (value && ['image/jpeg', 'image/png'].includes(value.type))
		})
});

const handleFileChange = (event) => {
	selectedFile.value = event.target.files?.[0];
	if (selectedFile && isValidFileType(selectedFile)) {
		avatarPreview.value = URL.createObjectURL(selectedFile);
	} else {
		avatarPreview.value = getDefaultAvatarUrl();
	}
};

const toggleEditForm = () => {
	showEditForm.value = !showEditForm.value
}

const submit = async (values) => {
	try {
		const data = {
			first_name: values.first_name,
			last_name: values.last_name,
			password: values.password,
			avatar: selectedFile.value,
		}
		const res = await store.updateProfile(data)
		if (res.success) {
			store.fetchProfile()
		}
	} catch (error) {
		const errorMessage = getErrorMessage('auth.' + error.message)
		errorMsg.value = t(`errors.${errorMessage}`)
		showError.value = true
	}
}

watch(() => store.user, () => {
	user.value = store.user
})

</script>
