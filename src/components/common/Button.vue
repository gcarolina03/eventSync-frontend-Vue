<template>
  <!-- Si la prop 'to' está definida, usamos router-link -->
  <component
    :is="to ? 'router-link' : 'button'"
    :to="to"
    :type="type"
    :class="buttonClass"
    :disabled="disabled"
  >
    <slot></slot>
  </component>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  to: {
    type: String,
    default: null,
  },
  buttonStyle: {
    type: String,
    default: 'button',
  },
  type: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  additionalClass: {
    type: String,
    default: '',
  }
});

const buttonClass = computed(() => {
  let baseClass = '';
  switch (props.buttonStyle) {
    case 'transparent':
      baseClass = 'text-white sm:border cursor-pointer font-bold border-white rounded-lg px-5 py-2.5 hover:bg-dark hover:border-dark';
      break;
    case 'white':
      baseClass = "text-primary border cursor-pointer border-white bg-white font-bold rounded-lg px-5 py-2.5 hover:bg-dark hover:border-dark hover:text-white";
      break;
    case 'purple':
      baseClass = 'w-full bg-secondary text-white py-3 rounded-lg transition-all hover:bg-secondary-dark focus:ring-2 focus:ring-secondary focus:ring-opacity-50 cursor-pointer';
      break;
    case 'menu':
      baseClass = 'block py-2 font-bold text-gray-400 hover:text-light'
      break;
    case 'menuActive':
      baseClass = 'block py-2 font-bold text-white cursor-default'
      break;
    default:
      baseClass = 'bg-gray-300 text-white py-2 px-5 rounded-lg';
  }

  return `${baseClass} ${props.additionalClass}`;
});
</script>
