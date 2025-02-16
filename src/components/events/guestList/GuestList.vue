<template>
	<!-- GUEST LIST AREA -->
	<div class="w-full flex flex-col mt-4 text-left text-gray-500">
		<div class="flex flex-row items-center font-bold text-gray-400 py-5 mt-10">
			<div class="w-4/5">
				{{ $t('guestList.guestName') }}
			</div>
			<div class="w-3/5">
				{{ $t('guestList.guestPhone') }}
			</div>
			<div class="w-1/5 max-w-25">
				{{ $t('guestList.guestNumber') }}
			</div>
			<div v-if="editModeGuest" class="w-1/5 max-w-20 text-right">
				{{ $t('buttons.action') }}
			</div>
		</div>
		<div v-for="(guest, idx) in guestList" :key="guest._id"
			class="bg-white border-b hover:bg-gray-50 flex w-full items-center h-12">
			<div class="w-4/5 font-bold text-gray-900 whitespace-nowrap">
				{{ guest.name }}
			</div>
			<div class="w-3/5">
				{{ guest.phone }}
			</div>
			<div class="w-1/5 max-w-25">
				{{ guest.number }}
			</div>
			<div v-if="editModeGuest" class="w-1/5 max-w-20 flex justify-end" @click="removeGuest(guest._id)">
				<Icon type="button" icon="trash-can" classButton="px-2.5 py-2.5 text-sm font-bold bg-red-300 hover:bg-red-400 text-red-700" className="flex items-center justify-center h-3 w-3" />
			</div>
		</div>
	</div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import Icon from '@/components/common/Icon.vue';

const props = defineProps({
	guestList: {
		type: Array,
		required: true
	},
	editModeGuest: {
		type: Boolean,
		required: true
	},
})

const emit = defineEmits(['removeGuest'])

const removeGuest = (guestId) => {
	emit('removeGuest', guestId)
}
</script>
