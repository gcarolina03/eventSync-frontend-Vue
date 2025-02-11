<template>
  <div @click="props.onClick"
    class="bg-white border border-gray-200 relative items-center flex cursor-pointer justify-center rounded-lg h-[200px] w-[150px] sm:h-[300px] sm:w-[200px] lg:h-[325px] lg:w-[225px] shadow-custom">
    <div
      class="w-[90%] h-[92%] absolute bg-gray-300 text-white items-center p-4 text-center flex flex-col justify-center rounded-lg opacity-30">
      <slot name="icon"></slot>
      <p class="text-gray-500 font-bold text-3xl sm:text-4xl lg:text-5xl">{{ props.text }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  onClick: Function,
  text: String
})
</script>
