<template>
	<div class="relative w-full">
		<Field :name="name" :type="isPassword && isVisible ? 'text' : type" :class="inputClass" :placeholder="placeholder"
			:accept="accept" @change="checkChange" :min="min" :step="step" :disabled="disabled" :value="modelValue" />
		<div v-if="isPassword" class="absolute inset-y-0 right-0 mr-4 flex items-center cursor-pointer"
			@click="togglePasswordVisibility">
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
import { ref, defineProps, computed } from 'vue'
import { Field, ErrorMessage } from 'vee-validate'
import Icon from '@/components/common/Icon.vue'

const props = defineProps({
	name: String,
	type: {
		type: String,
		default: 'text'
	},
	placeholder: String,
	accept: {
		type: String,
		default: ''
	},
	additionalClass: {
		type: String,
		default: ''
	},
	disabled:{
		type: Boolean,
		default: false
	},
	min: {
		type: String,
		default: ''
	},
	step: {
		type: String,
		default: ''
	},
	modelValue: {
		type: String,
		default: ''
	}
})

const isPassword = props.type == 'password'
const isVisible = ref(false)

const togglePasswordVisibility = () => {
	isVisible.value = !isVisible.value;
};

const inputClass = computed(() => {
	let baseClass = '';
	switch (props.type) {
		case 'file':
			baseClass = 'block w-full h-10 text-sm text-gray-500 border border-gray-400 rounded-xl cursor-pointer bg-gray-50 file:h-10 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-secondary file:text-white';
			break;
		case 'text':
		case 'password':
		case 'number':
		default:
			baseClass = 'w-full h-10 border border-gray-400 focus:border-secondary focus:ring-0 focus:outline-none rounded-xl px-3';
			break;
	}

	return `${baseClass} ${props.additionalClass}`;
});

const emit = defineEmits(['fileChange']);

const checkChange = (event) => {
	emit('fileChange', event)
}
</script>
