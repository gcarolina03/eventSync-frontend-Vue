<template>
	<div
		class="rounded-lg relative bg-white border border-gray-300 p-6 w-full max-w-md lg:max-w-lg xl:max-w-md shadow-custom">
		<!-- Close Icon -->
		<button @click="closeForm"
			class="bg-white cursor-pointer rounded-md p-2 inline-flex absolute items-center justify-center top-4 right-4 text-gray-400 hover:text-gray-500 hover:bg-gray-100">
			<Icon icon="x-mark" class="h-6 w-6" />
		</button>

		<h1 class="text-3xl font-medium">{{ props.editMode ? $t('serviceForm.updateService') : $t('serviceForm.newService')
			}}
		</h1>
		<p class="text-sm">{{ props.editMode ? $t('serviceForm.updateServiceSubtitle') :
			$t('serviceForm.newServiceSubtitle') }}
		</p>

		<Form :initial-values="initialValues" :validation-schema="schema" v-slot="{ handleSubmit, errors, values }"
			enctype="multipart/form-data" class="space-y-4 mt-6">
			<!-- Avatar -->
			<div class="flex justify-center">
				<img :src="avatarPreview || getDefaultAvatarUrl('service')" alt="Avatar Preview"
					class="w-16 h-16 rounded-full" />
			</div>

			<!-- Title Service -->
			<InputComp name="title" type="text" :placeholder="t('title') + '*'" />

			<!-- Category -->
			<div class="relative">
				<Field name="category" as="select"
					class="w-full h-10 border border-gray-400 focus:border-secondary focus:ring-0 focus:outline-none rounded-xl px-3">
					<option value="-1" selected="selected">{{ $t('serviceForm.category') }}</option>
					<option v-for="category in store.categories" :key="category._id" :value="category._id">
						{{ $t('categoriesList.' + category.title) }}
					</option>
				</Field>
				<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
					<Icon icon="arrow-down" class="h-4 w-4" />
				</div>
				<ErrorMessage v-slot="{ message }" name="category">
					<div class="flex items-center text-red-500 text-sm gap-1 mt-2">
						<Icon icon="exclamation-round" className="w-3 color-red-500" />
						<p>{{ message }}</p>
					</div>
				</ErrorMessage>
			</div>

			<!-- Conditional Fields for Certain Category -->
			<div v-if="values.category == store.locationCategoryId">
				<div class="flex gap-5">
					<div class="flex flex-col w-full">
						<span class="text-gray-600 text-xs">{{ $t('serviceForm.minCapacity') }}*</span>
						<Field name="min" type="number" min="1"
							class="w-full h-10 border border-gray-400 focus:border-secondary focus:ring-0 focus:outline-none rounded-xl px-3"
							:placeholder="t('serviceForm.minCapacity') + '*'" />
					</div>
					<div class="flex flex-col w-full">
						<span class="text-gray-600 text-xs">{{ $t('serviceForm.maxCapacity') }}*</span>
						<Field name="max" type="number" min="1"
							class="w-full h-10 border border-gray-400 focus:border-secondary focus:ring-0 focus:outline-none rounded-xl px-3"
							:placeholder="t('serviceForm.maxCapacity') + '*'" />
					</div>
				</div>
				<!-- Mostrar mensaje de error de capacidad debajo de ambos campos -->
				<ErrorMessage v-slot="{ message }" name="min">
					<div class="flex items-center text-red-500 text-sm gap-1  mt-2">
						<Icon icon="exclamation-round" className="w-3 color-red-500" />
						<p>{{ message }}</p>
					</div>
				</ErrorMessage>
				<ErrorMessage v-slot="{ message }" name="max">
					<div class="flex items-center text-red-500 text-sm gap-1  mt-2">
						<Icon icon="exclamation-round" className="w-3 color-red-500" />
						<p>{{ message }}</p>
					</div>
				</ErrorMessage>

				<!-- Time -->
				<div class="flex gap-5">
					<div class="flex flex-col w-full">
						<span class="text-gray-600 text-xs">{{ $t('serviceForm.startTime') }}*</span>
						<Field name="start" type="time"
							class="w-full h-10 border border-gray-400 focus:border-secondary focus:ring-0 focus:outline-none rounded-xl px-3"
							:placeholder="t('serviceForm.startTime') + '*'" />
					</div>
					<div class="flex flex-col w-full">
						<span class="text-gray-600 text-xs">{{ $t('serviceForm.endTime') }}*</span>
						<Field name="end" type="time"
							class="w-full h-10 border border-gray-400 focus:border-secondary focus:ring-0 focus:outline-none rounded-xl px-3"
							:placeholder="t('serviceForm.endTime') + '*'" />
					</div>
				</div>
				<ErrorMessage v-slot="{ message }" name="start">
					<div class="flex items-center text-red-500 text-sm gap-1  mt-2">
						<Icon icon="exclamation-round" className="w-3 color-red-500" />
						<p>{{ message }}</p>
					</div>
				</ErrorMessage>
				<ErrorMessage v-slot="{ message }" name="end">
					<div class="flex items-center text-red-500 text-sm gap-1 mt-2">
						<Icon icon="exclamation-round" className="w-3 color-red-500" />
						<p>{{ message }}</p>
					</div>
				</ErrorMessage>
			</div>

			<!-- Address -->
			<GMapAutocomplete @place_changed="handlePlaceChanged">
				<input type="text"
					class="w-full h-10 border border-gray-400 focus:border-secondary focus:ring-0 focus:outline-none rounded-xl px-3"
					placeholder="Enter address" />
			</GMapAutocomplete>
			<Maps v-if="latitude && longitude" :latitude="latitude" :longitude="longitude" />

			<!-- Price -->
			<InputComp name="price" type="number" min="1" step="0.01" :placeholder="t('serviceForm.price')" />

			<!-- File Upload -->
			<InputComp type="file" name="avatar" accept="image/*" @fileChange="handleFileChange" />

			<!-- Error -->
			<ErrorMsg v-if="showError" :message="errorMsg" @hide="hideErrorMsg" />

			<!-- Submit Button -->
			<ButtonComp buttonStyle="purple" type="button" additionalClass="text-sm lg:text-base"
				@click.prevent="handleSubmit(submit)">
				{{ props.editMode ? $t('buttons.update') : $t('buttons.publish') }}
			</ButtonComp>
		</Form>
	</div>
</template>

<script setup>
import { defineProps, ref, onBeforeMount, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { getDefaultAvatarUrl, isValidFileType } from '@/utils'
import getErrorMessage from '@/utils/errors'
import { useI18n } from 'vue-i18n'
/* COMPONENTS */
import Maps from '@/components/common/Maps.vue'
import ErrorMsg from '@/components/common/ErrorMsg.vue'
import InputComp from '@/components/forms/Input.vue'
import Icon from '@/components/common/Icon.vue'
import ButtonComp from '@/components/common/Button.vue'

const props = defineProps({
	service: Object || null,
	editMode: Boolean
})

const emit = defineEmits(['submitSuccess', 'closeForm'])

const { t } = useI18n()
const router = useRouter()
const store = useStore()

const avatarPreview = ref(null)
const selectedFile = ref(null)
const errorMsg = ref('')
const showError = ref(false)
const latitude = ref(null)
const longitude = ref(null)

onBeforeMount(async () => {
	await store.fetchCategories()
	console.log(props.service)
	if (props.editMode) {
		latitude.value = props.service.latitude;
		longitude.value = props.service.longitude;
	}
})


const initialValues = computed(() => {
	return props.service ? {
		title: props.service.title,
		min: props.service.min_capacity,
		max: props.service.max_capacity,
		start: props.service.start_time,
		end: props.service.end_time,
		price: props.service.price,
		category: props.service.categoryId._id,
		avatar: '',
	}	: {
		title: '',
		min: '',
		max: '',
		start: '',
		end: '',
		price: '',
		avatar: '',
		category: '-1',
	}
})

const schema = yup.object({
	title: yup
		.string()
		.min(5, t('errors.titleMinLength'))
		.required(t('errors.titleRequired')),
	category: yup
		.string()
		.notOneOf(['-1'], t('errors.categoryRequired')),
	min: yup
		.number()
		.transform((value, originalValue) => originalValue === '' ? undefined : value)
		.when('category', {
			is: (cat) => cat == '679fae9b2fde9e5bbd6ceeee',
			then: (schema) =>
				schema
					.required(t('errors.minCapacityRequired'))
					.min(1, t('errors.minCapacity')),
			otherwise: (schema) => schema.notRequired(),
		}),
	max: yup
		.number()
		.transform((value, originalValue) => originalValue === '' ? undefined : value)
		.when('category', {
			is: (cat) => cat == '679fae9b2fde9e5bbd6ceeee',
			then: (schema) =>
				schema
					.required(t('errors.maxCapacityRequired'))
					.min(1, t('errors.maxCapacity'))
					.test('max-greater-than-min', t('errors.maxGreaterThanMin'), function (value) {
						const { min, category } = this.parent;
						if (category != '679fae9b2fde9e5bbd6ceeee') {
							return true;
						}
						return value > min;
					}),
			otherwise: (schema) => schema.notRequired(),
		}),
	start: yup
		.string()
		.transform((value, originalValue) => originalValue === '' ? undefined : value)
		.when('category', {
			is: (cat) => cat == '679fae9b2fde9e5bbd6ceeee', // Location
			then: (schema) =>
				schema
					.required(t('errors.startRequired')),
			otherwise: (schema) =>
				schema.notRequired(),
		}),
	end: yup
		.string()
		.transform((value, originalValue) => originalValue === '' ? undefined : value)
		.when('category', {
			is: (cat) => cat == '679fae9b2fde9e5bbd6ceeee', // Location
			then: (schema) =>
				schema
					.required(t('errors.endRequired'))
					.test('end-greater-than-start', t('errors.endGreaterThanStart'), function (value) {
						const { start, category } = this.parent;
						if (category != '679fae9b2fde9e5bbd6ceeee') {
							return true;
						}
						return value > start;
					}),
			otherwise: (schema) =>
				schema.notRequired(),
		}),
	price: yup
		.number()
		.min(1, t('errors.priceMin'))
		.required(t('errors.priceRequired')),
	avatar: yup
		.mixed()
		.test('fileSize', t('errors.fileSize'), value => {
			return !value || value.size <= 5000000; // 5MB size limit
		})
		.test("fileType", t("errors.fileInvalid"), value => {
			return !value || (value && ['image/jpeg', 'image/png'].includes(value.type))
		})
})

function handlePlaceChanged(autocomplete) {
	if (autocomplete && autocomplete.geometry && autocomplete.geometry.location) {
		latitude.value = autocomplete.geometry.location.lat()
		longitude.value = autocomplete.geometry.location.lng()
	} else {
		latitude.value = null
		longitude.value = null
	}
}

const handleFileChange = (event) => {
	selectedFile.value = event.target.files?.[0];
	if (selectedFile.value && isValidFileType(selectedFile.value)) {
		avatarPreview.value = URL.createObjectURL(selectedFile.value);
	} else {
		avatarPreview.value = getDefaultAvatarUrl('service');
	}
};

const submit = async (values) => {
	if (props.editMode) {
		await handleUpdateService(values)
		consele.log(values)
		console.log(props)
	} else {
		await handleCreateService(values)
	}
}

const showErrorMsg = () => {
	showError.value = true
	setTimeout(() => { showError.value = false }, 4000)
}

const hideErrorMsg = () => {
	showError.value = false
}

const closeForm = () => {
	emit('closeForm')
}

const handleCreateService = async (values) => {
	const formData = new FormData();
	formData.append('title', values.title);
	formData.append('categoryId', values.category);
	formData.append('min_capacity', values.min);
	formData.append('max_capacity', values.max);
	formData.append('price', values.price);
	formData.append('start_time', values.start);
	formData.append('end_time', values.end);
	if (latitude.value && longitude.value) {
		formData.append('latitude', latitude.value);
		formData.append('longitude', longitude.value);
	}
	if (selectedFile.value) {
		formData.append('avatar', selectedFile.value);
	}
	try {
		const res = await store.createService(formData)
		if (res.success) {
			emit('submitSuccess')
		}
	} catch (error) {
		console.log(error)
		const errorMessage = getErrorMessage('form.' + error.message)
		errorMsg.value = t(`errors.${errorMessage}`)
		showErrorMsg()
	}
}

const handleUpdateService = async (values) => {
	const formData = new FormData();
	formData.append('title', values.title);
	formData.append('categoryId', values.category);
	formData.append('min_capacity', values.min);
	formData.append('max_capacity', values.max);
	formData.append('price', values.price);
	formData.append('start_time', values.start);
	formData.append('end_time', values.end);
	if (latitude.value && longitude.value) {
		formData.append('latitude', latitude.value);
		formData.append('longitude', longitude.value);
	}
	if (selectedFile.value) {
		formData.append('avatar', selectedFile.value);
	}

	try {
		const res = await store.updateService(props.service._id, formData)
		if (res.success) {
			console.log(res)
			emit('submitSuccess')
		}
	} catch (error) {
		const errorMessage = getErrorMessage('form.' + error.message)
		errorMsg.value = t(`errors.${errorMessage}`)
		showErrorMsg()
	}
}
</script>
