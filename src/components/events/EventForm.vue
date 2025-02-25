<template>
  <div
    class="rounded-lg relative bg-white border border-gray-300 p-6 w-full max-w-md lg:max-w-lg xl:max-w-md shadow-custom">
    <!-- Cerrar formulario -->
    <button @click="closeForm"
      class="bg-white cursor-pointer rounded-md p-2 inline-flex absolute items-center justify-center top-4 right-4 text-gray-400 hover:text-gray-500 hover:bg-gray-100">
      <Icon icon="x-mark" class="h-6 w-6" />
    </button>

    <!-- Título -->
    <h1 class="text-3xl font-medium">{{ props.editStatus ? $t('updateEventTitle') : $t('newEventTitle') }}</h1>
    <p class="text-sm">{{ props.editStatus ? $t('updateEventSubtitle') : $t('newEventSubtitle') }}</p>

    <!-- FORMULARIO -->
    <Form :initial-values="initialValues" :validation-schema="schema" v-slot="{ handleSubmit }" class="space-y-3 mt-5">
      <!-- Title Input -->
      <InputComp name="title" type="text" :placeholder="t('title') + '*'" />

      <!-- Date Input -->
      <div class="flex flex-col w-full">
        <span class="text-gray-600 text-xs">{{ t('date') + '*' }}</span>
        <InputComp name="date" type="date" :disabled="props.editStatus" />
      </div>

      <!-- Time Input -->
      <div class="flex gap-5">
        <div class="flex flex-col w-full">
          <span class="text-gray-600 text-xs">{{ $t('startTime') + '*' }}</span>
          <Field name="start" type="time" class="w-full h-10 border border-gray-400 focus:border-secondary focus:ring-0 focus:outline-none rounded-xl px-3" />
        </div>
        <div class="flex flex-col w-full">
          <span class="text-gray-600 text-xs">{{ $t('endTime') + '*' }}</span>
          <Field name="end" type="time" class="w-full h-10 border border-gray-400 focus:border-secondary focus:ring-0 focus:outline-none rounded-xl px-3" />
        </div>
      </div>
      <!-- Time errors -->
      <ErrorMessage v-slot="{ message }" name="start">
        <div class="flex items-center text-red-500 text-sm gap-1">
          <Icon icon="exclamation-round" className="w-3 color-red-500" />
          <p>{{ message }}</p>
        </div>
      </ErrorMessage>
      <ErrorMessage v-slot="{ message }" name="end">
        <div class="flex items-center text-red-500 text-sm gap-1">
          <Icon icon="exclamation-round" className="w-3 color-red-500" />
          <p>{{ message }}</p>
        </div>
      </ErrorMessage>

      <!-- Error Message -->
      <ErrorMsg v-if="showError" :message="errorMsg" @hide="hideErrorMsg" />

      <ButtonComp buttonStyle="purple" type="submit" additionalClass="text-sm lg:text-base"
        @click.prevent="handleSubmit(submit)">
        {{ props.editStatus ? $t('buttons.update') : $t('buttons.start') }}
      </ButtonComp>
    </Form>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Field, Form, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { useI18n } from 'vue-i18n'
import { useStore } from '@/store'
import { formatDate } from '@/utils'
import getErrorMessage from '@/utils/errors'
/* COMPONENTS */
import InputComp from '@/components/forms/Input.vue'
import ButtonComp from '@/components/common/Button.vue'
import ErrorMsg from '@/components/common/ErrorMsg.vue'
import Icon from '@/components/common/Icon.vue'

const props = defineProps({
  event: Object || null,
  editStatus: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submitSuccess', 'closeForm'])

const { t } = useI18n()
const store = useStore()

const showError = ref(false)
const errorMsg = ref('')

const initialValues = computed(() => {
	return props.event ? {
		title: props.event.title,
		date: formatDate(props.event.event_date, 'edit'),
    start: props.event.start_time,
    end: props.event.end_time,
	}	: {
    title: '',
    date: '',
    start: '',
    end: '',
	}
})

const schema = yup.object({
  title: yup.string().min(4, t('errors.titleInvalid')).required(t('errors.titleRequired')),
  date: yup.date()
    .min(props.editStatus ? new Date(0) : new Date(), t('errors.dateInvalid'))
    .required(t('errors.dateRequired')),
  start: yup.string().required(t('errors.startTimeRequired')),
  end: yup.string().required(t('errors.endTimeRequired')).test('is-greater', t('errors.endTimeBefore'), function (value) {
    return value > this.parent.start
  })
})

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

const submit = async (values) => {
  if (props.editStatus) {
    await handleUpdateEvent(values)
  } else {
    await handleCreateEvent(values)
  }
} 

const handleCreateEvent = async (values) => {
  const formData = new FormData();
  formData.append('title', values.title);
  formData.append('event_date', values.date);
  formData.append('start_time', values.start);
  formData.append('end_time', values.end);
  try {
    const res = await store.createEvent(formData)
    if (res.success) {
      emit('submitSuccess')
    }
  } catch (error) {
    const errorMessage = getErrorMessage('form.' + error.message)
    errorMsg.value = t(`errors.${errorMessage}`)
    showErrorMsg()
  }
}

const handleUpdateEvent = async (values) => {
  const formData = new FormData();
  formData.append('title', values.title);
  formData.append('start_time', values.start);
  formData.append('end_time', values.end);
  try {
    const res = await store.updateEvent(props.event._id, formData)
    if (res.success) {
      emit('submitSuccess')
    }
  } catch (error) {
    const errorMessage = getErrorMessage('form.' + error.message)
    errorMsg.value = t(`errors.${errorMessage}`)
    showErrorMsg()
  }
}
</script>