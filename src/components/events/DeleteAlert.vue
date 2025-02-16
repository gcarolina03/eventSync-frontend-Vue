<template>
	<div class="flex flex-grow justify-center items-center px-4 text-base">
		<div
			class="bg-white/30 border border-gray-300 shadow-custom2 rounded-lg p-6 w-full max-w-md lg:max-w-lg xl:max-w-md">
			<div @click="toggleDeleteModal"
				class="bg-white cursor-pointer rounded-md p-2 inline-flex absolute items-center justify-center top-4 right-4 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
				<span class="sr-only">Close menu</span>
				<Icon icon="x-mark" className="h-6 w-6" />
			</div>
			<span class="mb-3.5 flex items-center justify-center">
				<Icon icon="trash-can" className="text-gray-400 w-8 h-8" />
			</span>
			<p class="text-center font-bold text-2xl text-gray-700">{{ $t('deleteEvent.title') }}</p>
			<span class="mb-8 flex items-center justify-center italic text-sm px-2 rounded relative">
				{{ $t('deleteEvent.alert') }}
			</span>
			<div class="flex justify-center items-center space-x-4">
				<div @click="toggleDeleteModal"
					class="cursor-pointer py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10">
					{{ $t('deleteEvent.cancel') }}
				</div>
				<div @click="deleteEvent"
					class="cursor-pointer py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300">
					{{ $t('deleteEvent.delete') }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { defineEmits } from 'vue'
/* COMPONENTS */
import Icon from '@/components/common/Icon.vue';

const emit = defineEmits(['deleteEvent', 'toggleDeleteModal'])

const deleteEvent = () => {
	emit('deleteEvent')
}

const toggleDeleteModal = () => {
	emit('toggleDeleteModal')
}
</script>
