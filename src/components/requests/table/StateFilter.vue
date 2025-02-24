<template>
  <ul class="items-center text-sm text-gray-900 bg-white border border-gray-400 rounded-xl sm:flex">
    <li v-for="(option, index) in options" :key="option.value" :class="['w-full border-b border-gray-400 sm:border-b-0', index === options.length - 1 ? 'sm:rounded-r-xl' : 'sm:border-r']">
      <div class="flex items-center px-3 py-3">
        <input :id="option.id" type="radio" :value="option.value" v-model="internalValue" name="list-state" class="w-4 h-4 text-secondary bg-gray-100 border-gray-300" />
        <label :for="option.id" class="w-full ml-2 font-semibold text-gray-900">
          {{ option.label }}
        </label>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { defineEmits, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  modelValue: { type: String, default: 'all' }
})

const emit = defineEmits(['update:modelValue'])
const { t } = useI18n()

const internalValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const options = computed(() => [
  { id: 'all-list', value: 'all', label: t('requestsStatus.all') },
  { id: 'confirmed-list', value: 'confirmed', label: t('requestsStatus.confirmed') },
  { id: 'pending-list', value: 'pending', label: t('requestsStatus.pending') },
  { id: 'cancelled-list', value: 'cancelled', label: t('requestsStatus.cancelled') }
])
</script>
