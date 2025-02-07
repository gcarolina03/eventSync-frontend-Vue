<template>
  <div class="relative w-full">
    <Field :name="name" :type="isPassword && isVisible ? 'text' : type" class="w-full h-10 border border-gray-800 rounded px-3" :placeholder="placeholder" />
    <div v-if="isPassword" class="absolute inset-y-0 right-0 mr-4 flex items-center cursor-pointer" @click="toggleVisibility">
      <Icon icon="eye" v-if="isVisible" class="text-gray-400" />
      <Icon icon="eye-slash" v-else class="text-gray-400" />
    </div>
  </div>
  <!-- Mostrar mensaje de error -->
   <ErrorMessage v-slot="{ message }" :name="name">
    <div class="flex items-center text-red-500 text-sm gap-1">
      <Icon icon="exclamation-round" className="w-3 color-red-500" />
      <p>{{ message }}</p>
    </div>
  </ErrorMessage>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import { Field, ErrorMessage } from 'vee-validate'
import Icon from '@/components/common/Icon.vue'

const props = defineProps({
  name: String,
  type: {
    type: String,
    default: 'text'
  },
  placeholder: String
})

const isPassword = props.type == 'password'
const isVisible = ref(false)

const toggleVisibility = () => {
  isVisible.value = !isVisible.value
}
</script>
