<template>
  <div class="flex-grow w-full relative px-8 pt-10">
    <p class="font-bold text-[30px]">{{ $t('yourEvents') }}</p>
    <hr class="my-4  h-0.5 border-t-0 bg-gray-500 opacity-20" />

		<div class="mt-4 flex flex-wrap gap-8">
			<AddItem @handleClick="openForm" :text="$t('createNewEvent')">
				<template #icon>
					<Icon icon="calendar-plus"
						className="fill-gray-500 mb-4 h-[2em] w-[2em] sm:h-[3em] sm:w-[3em] lg:h-[3.5em] lg:w-[3.5em]" />
				</template>
			</AddItem>

      <Card v-for="event in store.events" :key="event._id" :data="event" />
    </div>

    <Blur v-if="showForm">
      <EventForm @closeForm="closeForm" :event="selectedEvent" @submitSuccess="handleFormSubmitted" />
    </Blur>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted } from 'vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
/* COMPONENTS */
import Card from '@/components/events/Card.vue'
import AddItem from '@/components/common/AddItem.vue'
import Icon from '@/components/common/Icon.vue'
import Blur from '@/components/common/Blur.vue'
import EventForm from '@/components/events/EventForm.vue'

const store = useStore()
const route = useRoute()
const showForm = ref(false)
const selectedEvent = ref(store.selectedEvent)

onBeforeMount(async () => {
  await store.fetchEvents()
})

onMounted(() => {
	if (route.query.showForm == 'true') {
		openForm()
	}
})

const openForm = (event = null) => {
  store.selectedEvent = event
  showForm.value = true
}

const closeForm = () => {
  store.selectedEvent = null
  showForm.value = false
}

const handleFormSubmitted = async () => {
	await store.fetchEvents()
	closeForm()
}

</script>