<template>
	<div v-if="event" class="w-full flex-grow px-8 pt-10 text-base">
		<div class="flex gap-8 items-center justify-between">
			<p class="font-bold text-[30px]">{{ event.title }}</p>
			<div class="flex gap-2">
				<div v-if="!showGuestList" class="flex gap-2">
					<div @click="toggleGuestList"
						class="cursor-pointer flex items-center px-4 h-8 py-2 text-sm font-bold text-center bg-[#ADE0E4] rounded-xl hover:bg-[#79AEB1]">
						{{ $t('guestList.title') }}
					</div>
					<Icon @handleClick="toggleEditForm" type="button" icon="pencil" classButton="px-2.5 text-sm font-bold bg-gray-300 hover:bg-gray-400 text-gray-700" className="flex items-center justify-center h-3 w-3" />
					<Icon @handleClick="toggleDeleteConfirm" type="button" icon="trash-can" classButton="px-2.5 text-sm font-bold bg-red-300 hover:bg-red-400 text-red-700" className="flex items-center justify-center h-3 w-3" />
				</div>
				<div v-else class="flex gap-2">
					<div @click="toggleGuestList" class="cursor-pointer flex items-center px-4 h-8 py-2 text-sm font-bold text-center bg-[#ADE0E4] rounded-xl hover:bg-[#79AEB1]">
						{{ $t('guestList.goBack') }}
					</div>
					<Icon v-if="!editModeGuest" @handleClick="toggleEditGuest" type="button" icon="pencil" classButton="px-2.5 text-sm font-bold bg-gray-300 hover:bg-gray-400 text-gray-700" className="flex items-center justify-center h-3 w-3" />
					<Icon v-else @handleClick="toggleEditGuest" type="button" icon="check" classButton="text-sm font-bold bg-green-300 hover:bg-green-400 text-green-700" className="flex items-center justify-center h-8 w-8" />
				</div>
			</div>
		</div>
		<hr class="my-5 h-0.5 border-t-0 bg-gray-500 opacity-20" />
		<div class="grid grid-cols-4 w-full sm:grid-cols-12 gap-6">
			<!-- Event Details Section -->
			<div class="col-span-4 sm:col-span-3 xl:col-span-2">
				<EventDetails :event="event" :location="location" />
			</div>

			<!-- Services/Guest List Section -->
			<div class="col-span-4 relative sm:col-span-9 xl:col-span-10 p-6 pl-6 sm:pl-20">
				<div class="h-full min-h-[1em] hidden sm:block absolute left-0 w-px self-stretch bg-gradient-to-tr from-transparent via-gray-500 to-transparent opacity-20"></div>
				<div class="flex justify-between items-center">
					<h2 class="text-4xl font-bold">{{ showGuestList ? $t('guestList.title') : 'Services' }}</h2>
					<FormGuest v-if="showGuestList" :eventId="event._id" @reload="handleReload" />
				</div>
				<div v-if="!showGuestList">
					<ResumeServices :event="event" />
				</div>
				<div v-else>
					<GuestList :guestList="event.guestList" :editModeGuest="editModeGuest" @removeGuest="handleRemoveGuest" />
				</div>
			</div>
		</div>

		<!-- Modals for editing and deleting -->
		<Blur v-if="showEditForm">
			<EventForm :event="event" @handleForm="toggleEditForm" />
		</Blur>

		<Blur v-if="showDeleteConfirm">
			<DeleteAlert v-if="showDeleteConfirm" @toggleDeleteModal="toggleDeleteConfirm" @deleteEvent="deleteEvent" />
		</Blur>
	</div>
</template>

<script setup>
import { ref, onBeforeMount, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
/* COMPONENTS */
import GuestList from '@/components/events/guestList/GuestList.vue'
import FormGuest from '@/components/events/guestList/FormGuest.vue'
import ResumeServices from '@/components/events/ResumeServices.vue'
import EventForm from '@/components/events/EventForm.vue'
import DeleteAlert from '@/components/events/DeleteAlert.vue'
import EventDetails from '@/components/events/EventDetails.vue'
import Blur from '@/components/common/Blur.vue'
import Icon from '@/components/common/Icon.vue'

const router = useRouter()
const store = useStore()
const eventId = router.currentRoute.value.params.id

const event = ref(null)
const location = ref('')
const showEditForm = ref(false)
const showDeleteConfirm = ref(false)
const showGuestList = ref(false)
const editModeGuest = ref(false)

onBeforeMount(() => {
	if (eventId) {
		store.fetchEvent(eventId)
	}
})

watch(() => store.selectedEvent, (newEvent) => {
	if (newEvent) {
		event.value = newEvent
	}
})

const toggleGuestList = () => showGuestList.value = !showGuestList.value
const toggleEditForm = () => showEditForm.value = !showEditForm.value
const toggleDeleteConfirm = () => showDeleteConfirm.value = !showDeleteConfirm.value
const toggleEditGuest = () => editModeGuest.value = !editModeGuest.value
const handleReload = () => store.fetchEvent(eventId)

const handleRemoveGuest = async (guest) => {
	const res = await store.removeGuest(event.value._id, guest)
	if (res) handleReload()
}

const deleteEvent = async () => {
	const res = await store.deleteEvent(eventId)
	if (res.success) {
		router.push({ name: 'events' })
	} else {
		console.log(res.message)
	}
}

</script>
