<template>
  <div
    class="rounded-lg relative bg-white border border-gray-300 p-6 w-full max-w-md lg:max-w-lg xl:max-w-md shadow-custom">
    <!-- Cerrar formulario -->
    <button @click="closeForm"
      class="bg-white cursor-pointer rounded-md p-2 inline-flex absolute items-center justify-center top-4 right-4 text-gray-400 hover:text-gray-500 hover:bg-gray-100">
      <Icon icon="x-mark" class="h-6 w-6" />
    </button>

    <!-- Título -->
    <h1 class="text-3xl font-medium">{{ editStatus ? $t('updateEventTitle') : $t('newEventTitle') }}</h1>
    <p class="text-sm">{{ editStatus ? $t('updateEventSubtitle') : $t('newEventSubtitle') }}</p>

    <!-- FORMULARIO -->
    <Form :validation-schema="schema" v-slot="{ handleSubmit }" class="space-y-3 mt-5">
      <!-- Title Input -->
      <InputComp name="title" type="text" :placeholder="t('title') + '*'" />

      <!-- Date Input -->
      <div class="flex flex-col w-full">
        <span class="text-gray-600 text-xs">{{ t('date') + '*' }}</span>
        <InputComp name="date" type="date" :disabled="editStatus" />
      </div>

      <!-- Time Input -->
      <div class="flex gap-5">
        <div class="flex flex-col w-full">
          <span class="text-gray-600 text-xs">{{ $t('startTime') + '*' }}</span>
          <Field name="start" type="time" class="w-full h-10 border border-gray-800 rounded px-3" />
        </div>
        <div class="flex flex-col w-full">
          <span class="text-gray-600 text-xs">{{ $t('endTime') + '*' }}</span>
          <Field name="end" type="time" class="w-full h-10 border border-gray-800 rounded px-3" />
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
        {{ editStatus ? $t('buttons.update') : $t('buttons.start') }}
      </ButtonComp>
    </Form>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { Field, Form, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { useI18n } from 'vue-i18n'
import { useStore } from '@/store'
import { formatDate } from '@/utils'
import { useRouter } from 'vue-router'
import getErrorMessage from '@/utils/errors'
/* COMPONENTS */
import InputComp from '@/components/forms/Input.vue'
import ButtonComp from '@/components/common/Button.vue'
import ErrorMsg from '@/components/common/ErrorMsg.vue'
import Icon from '@/components/common/Icon.vue'

const props = defineProps({
  event: Object || null
})

const emit = defineEmits(['submitSuccess', 'closeForm'])

const { t } = useI18n()
const store = useStore()

const showError = ref(false)
const errorMsg = ref('')
const editStatus = ref(false)

const schema = yup.object({
  title: yup.string().min(4, t('errors.titleInvalid')).required(t('errors.titleRequired')),
  date: yup.date().min(new Date(), t('errors.dateInvalid')).required(t('errors.dateRequired')),
  start: yup.string().required(t('errors.startTimeRequired')),
  end: yup.string().required(t('errors.endTimeRequired')).test('is-greater', t('errors.endTimeBefore'), function (value) {
    return value > this.parent.start
  })
})

// Verifica si es edición y carga los datos
watchEffect(() => {
  if (props.event) {
    title.value = props.event.title
		date.value = formatDate(props.event.event_date, store.language)
    start.value = props.event.start_time
    end.value = props.event.end_time
    editStatus.value = true
  }
})

const hideErrorMsg = () => {
  showError.value = false
}

const closeForm = () => {
	emit('closeForm')
}

const submit = async (values) => {
  try {
    const res = await store.createEvent({
			userId: store.user._id,
      title: values.title,
      event_date: values.date,
      start_time: values.start,
      end_time: values.end
    })

		if (res.success) {
			emit('submitSuccess')
    }

    console.log({ res })
  } catch (error) {
    const errorMessage = getErrorMessage('form.' + error.message)
    errorMsg.value = t(`errors.${errorMessage}`)
    showError.value = true
  }
} 
</script>