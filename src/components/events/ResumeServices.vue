<template>
	<!-- SERVICES AREA -->
	<div class="mt-4 flex flex-wrap gap-8">
		<AddItem @handleClick="goToServices" :text="$t('searchServices')">
			<template #icon>
				<Icon icon="search"
					className="fill-gray-500 mb-4 h-[2em] w-[2em] sm:h-[3em] sm:w-[3em] lg:h-[3.5em] lg:w-[3.5em]" />
			</template>
		</AddItem>
		<CardRequest v-for="request in event.eventRequests" :key="request._id" :request="request" />
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router'
/* COMPONENTS */
import Icon from '@/components/common/Icon.vue'
import AddItem from '@/components/common/AddItem.vue'
import CardRequest from '@/components/requests/Card.vue'

const props = defineProps({
	event: {
		type: Object,
		required: true
	}
})

const router = useRouter()

const goToServices = () => {
	router.push({ name: 'services' })
}
</script>