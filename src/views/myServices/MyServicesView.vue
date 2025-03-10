<template>
	<div class="w-full flex-grow relative px-8 pt-10">
		<div class="flex gap-8 items-center justify-between">
			<p class="font-bold text-[30px]">{{ $t("myServices") }}</p>
			<div class="flex gap-2">
				<Icon v-if="!editMode" @handleClick="handleEdit" type="button" icon="pencil" classButton="p-2 px-3 text-sm font-bold bg-gray-300 hover:bg-gray-400 text-gray-700"
					className="flex items-center justify-center h-3 w-3" />
				<Icon v-else @handleClick="handleEdit" type="button" icon="check" classButton="text-sm font-bold bg-green-300 hover:bg-green-400 text-green-700 p-2"
					className="flex items-center justify-center h-4 w-4" />

				<router-link :to="{ name: 'requests' }"
					class="text-base font-bold flex items-center px-6 h-9 text-white text-center bg-[#1CA987] rounded-lg hover:bg-[#23826B]">
					{{ $t('requests') }}
				</router-link>
			</div>
		</div>

		<hr class="m4-5 h-0.5 border-t-0 bg-gray-500 opacity-20" />

		<div class="mt-4 flex flex-wrap gap-8">
			<AddItem @handleClick="openForm" :text="$t('publishNewService')">
				<template #icon>
					<Icon icon="circle-plus"
						className="fill-gray-500 mb-4 h-[2em] w-[2em] sm:h-[3em] sm:w-[3em] lg:h-[3.5em] lg:w-[3.5em]" />
				</template>
			</AddItem>

			<Card v-for="service in store.myServices" :key="service._id" :data="service" @openForm="openForm"
				@closeForm="closeForm" :editMode="editMode" />
		</div>

		<Blur v-if="showForm">
			<ServiceForm @closeForm="closeForm" :service="selectedService" @submitSuccess="handleFormSubmitted"
				:editMode="editMode" />
		</Blur>
	</div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useStore } from '@/store'
/* COMPONENTS */
import Card from '@/components/services/Card.vue'
import AddItem from '@/components/common/AddItem.vue'
import Icon from '@/components/common/Icon.vue'
import Blur from '@/components/common/Blur.vue'
import ServiceForm from '@/components/services/ServiceForm.vue'

const store = useStore()

const showForm = ref(false)
const selectedService = ref(null)
const editMode = ref(false)

onBeforeMount(async () => {
	await store.fetchMyServices()
})

const openForm = (service = null) => {
	selectedService.value = service
	showForm.value = true
}

const closeForm = () => {
	selectedService.value = null
	showForm.value = false
}

const handleFormSubmitted = async () => {
	await store.fetchMyServices()
	closeForm()
}

const handleEdit = () => {
	editMode.value = !editMode.value
}
</script>
