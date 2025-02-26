<template>
	<div class="p-6 flex flex-col justify-between">
		<div class="flex flex-col">
			<div class="flex flex-col items-center">
				<img :src="eventImage" class="w-40 h-40 bg-[#9CC0FA] rounded-full mb-4 shrink-0 object-cover" />
				<div class="mt-2 flex flex-wrap gap-4 text-center">
					<span v-if="location.length > 0">
						{{ location[6].long_name }} • {{ location[2].long_name }}
					</span>
				</div>
			</div>
			<div class="flex flex-col mt-4 gap-2">
				<!-- Loop through event details -->
				<div v-for="(detail, index) in eventDetails" :key="index"
					class="flex gap-2 items-center justify-between text-gray-600 mb-1">
					<p class="font-normal flex gap-2 items-center">
						<Icon :icon="detail.icon" />
						{{ $t(detail.label) }}
					</p>
					<p class="font-bold">{{ detail.value }}</p>
				</div>
			</div>
		</div>
		<div class="bottom-5 flex flex-row text-lg justify-between my-10">
			<p class="font-normal flex gap-2 text-gray-600 items-center">
				<Icon icon="card" />
				{{ $t('eventDetails.total') }}:
			</p>
			<p class="right-0 font-bold">{{ event.total_price }} €</p>
		</div>
		<Maps v-if="location.length > 0" :latitude="latitude" :longitude="longitude" />
	</div>
</template>

<script setup>
import { defineProps, ref, computed, watch } from 'vue'
import { formatDate } from '@/utils'
/* COMPONENTS */
import Icon from '@/components/common/Icon.vue'
import { useStore } from '@/store'
import Maps from '@/components/common/Maps.vue'

const props = defineProps({
	event: {
		type: Object,
		required: true
	},
})

const store = useStore()
const latitude = ref('')
const longitude = ref('')
const location = ref([])
const addressLoad = ref(false)

const eventDetails = computed(() => [
	{
		icon: 'calendar-days',
		label: 'eventDetails.date',
		value: formatDate(props.event.event_date, store.language)
	},
	{
		icon: 'clock',
		label: 'eventDetails.time',
		value: `${props.event.start_time}h - ${props.event.end_time}h`
	},
	{
		icon: 'user',
		label: 'eventDetails.guests',
		value: props.event.guestList.reduce((acc, curr) => acc + curr.number, 0)
	}
])

watch(addressLoad, async () => {
	if (props.event && addressLoad.value) {
		const res = await store.getAddress()
		if (res) {
			location.value = res
		}

		setAddress()
		addressLoad.value = false
	}
})

const setAddress = () => {
	if (props.event) {
		props.event.eventRequests.forEach(request => {
			if (request.serviceId.categoryId.title == 'location' && request.state == 'confirmed') {
				latitude.value = request.serviceId.latitude
				longitude.value = request.serviceId.longitude
			}
		})
	}
}

const eventImage = computed(() => {
  if (props.event && props.event.eventRequests) {
    const locationRequest = props.event.eventRequests.find(
      request => request.serviceId.categoryId.title == 'location' && request.state == 'confirmed'
    );

    return locationRequest ? locationRequest.serviceId.img_url : props.event.img_url;
  }
  return props.event.img_url;
});
</script>
