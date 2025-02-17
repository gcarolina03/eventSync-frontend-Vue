<template>
  <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
    <span class="block sm:inline"> {{ message }}.</span>
    <span class="absolute top-2 right-2" @click="hideError">
      <Icon icon="x-mark" class="h-6 w-6 text-red-500 cursor-pointer" />
    </span>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import Icon from '@/components/common/Icon.vue'

const props = defineProps({
  message: { 
    type: String,
    required: true
  }
})

const emit = defineEmits(['hide'])

const hideError = () => {
  emit('hide')
}
</script>
