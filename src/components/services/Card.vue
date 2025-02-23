<template>
	<div
		class="bg-white border border-gray-200 rounded-lg relative h-[200px] w-[150px] sm:h-[300px] sm:w-[200px] lg:h-[325px] lg:w-[225px] text-sm lg:text-base shadow-custom">
		<div class="bg-[#9CC0FA] rounded-t-lg relative h-[180px]">
			<Icon v-if="props.editMode" @handleClick="handleOpen" type="button" icon="pencil"
				classButton="p-2.5 z-10 absolute top-[-10px] left-[-10px] text-sm font-bold bg-gray-300 hover:bg-gray-400 text-gray-700"
				className="flex items-center justify-center h-3 w-3" />
			<div class="px-3 text-sm py-1 bg-gray-600 text-white font-bold top-2 right-2 rounded-lg absolute opacity-80">{{
				$t('categoriesList.' + props.data.categoryId.title) }} </div>
			<div
				class="px-3 text-lg py-1 bg-neutral-100 text-black font-bold bottom-2 right-2 rounded-lg absolute opacity-80">{{
				props.data.price }} €</div>
			<img class="rounded-t-lg w-full h-full object-cover mx-auto" :src="props.data.img_url" alt="" />
		</div>
		<div class="px-5 py-3	">
			<h5 class="text-lg font-bold tracking-tight">{{ props.data.title }}</h5>
			<div class="text-gray-600 mb-1">
				<!-- Dirección: se muestra si se obtuvo la ubicación -->
				<span v-if="location && location.length > 0">
					{{ location[6].long_name }} &nbsp; • &nbsp; {{ location[2].long_name }}
				</span>
				<!-- Icono de mapa con tooltip que muestra el mapa al hacer hover -->
				<div v-if="props.data.latitude != undefined && props.data.longitude != undefined"
					class="group inline-flex cursor-pointer text-sm ml-2 relative text-gray-600 font-bold rounded-lg">
					<Icon icon="map" class="h-3 w-3" />
					<div class="opacity-0 flex items-center justify-center bg-white rounded-lg p-2 absolute group-hover:opacity-100 bottom-0 ml-8 pointer-events-none z-[10] w-52">
						<Maps class="w-full" :latitude="props.data.latitude" :longitude="props.data.longitude" />
					</div>
				</div>
			</div>
			<div v-if="props.data.min_capacity && props.data.max_capacity" class="flex gap-2 items-center text-gray-600">
				<Icon icon="user" class="h-3 w-3" />
				<p class="font-normal">from {{ props.data.min_capacity }} to {{ props.data.max_capacity }}</p>
			</div>
			<div v-if="props.data.start_time && props.data.end_time" class="flex gap-2 items-center text-gray-600">
				<Icon icon="clock" class="h-3 w-3"	 />
				<p class="font-normal">{{ props.data.start_time }}h - {{ props.data.end_time }}h</p>
			</div>
		</div>
		<div v-if="currentPath == '/services'"
			class="absolute right-4 bottom-3 cursor-pointer inline-flex items-center px-3 py-2 text-sm font-bold text-center text-white bg-light rounded-lg hover:bg-dark focus:ring-4 focus:outline-none focus:ring-dark"
			@click="handleRequestTo">
			{{ $t("servicesCard.request") }}
		</div>
		<div class="absolute bottom-3 left-5 flex gap-4">
			<div @click="store.user && props.data.userId != store.user._id ? handleReviewService('up', props.data._id) : null"
				class="text-green-600 gap-1 font-bold flex text-lg items-center"
				:class="[store.user && props.data.userId != store.user._id ? 'cursor-pointer' : 'cursor-default']">
				<!-- Renderiza el ícono según si el usuario ya dio like -->
				<Icon :icon="store.user && reviews.userUp ? 'thumbs-up-fill' : 'thumbs-up'" />
				<span> {{ reviews.up }}</span>
			</div>
			<div
				@click="store.user && props.data.userId != store.user._id ? handleReviewService('down', props.data._id) : null"
				class="text-red-600 gap-1 font-bold flex text-lg items-center"
				:class="[store.user && props.data.userId != store.user._id ? 'cursor-pointer' : 'cursor-default']">
				<!-- Renderiza el ícono según si el usuario ya dio dislike -->
				<Icon :icon="store.user && reviews.userDown ? 'thumbs-down-fill' : 'thumbs-down'" />
				<span> {{ reviews.down }}</span>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
/* COMPONENTS */
import Icon from '@/components/common/Icon.vue'
import Maps from '@/components/common/Maps.vue'

const props = defineProps({
	data: Object,
	editMode: Boolean,
})

const route = useRoute()
const store = useStore()
const currentPath = route.path
const location = ref('')

const emit = defineEmits(['openForm', 'closeForm', 'update', 'requestTo'])

onBeforeMount(async () => {
	await getAddress()
	console.log(props.data)
})

const handleOpen = () => {
	emit('openForm', props.data)
}

const closeForm = () => {
	emit('closeForm')
}

const getAddress = async () => {
	console.log(props.data.latitude, props.data.longitude)
	if (props.data.latitude == undefined || props.data.longitude == undefined) return
	const res = await store.getAddress(props.data.latitude, props.data.longitude)
	if (res) {
		location.value = res
	}
}

const reviews = computed(() => {
	const dataReview = props.data.serviceReviews || []
	const result = {
		up: 0,
		down: 0,
		userUp: false,
		userDown: false
	}
	dataReview.forEach(review => {
		if (review.thumb === 'up') {
			result.up++
		} else {
			result.down++
		}
		if (store.user && review.userId == store.user._id && review.thumb == 'up') {
			result.userUp = true
		}
		if (store.user && review.userId == store.user._id && review.thumb == 'down') {
			result.userDown = true
		}
	})
	return result
})

const handleReviewService = async (thumb, service) => {
	if (store.user) {
		const res = await store.giveReview(service, thumb)
		if (res.hasOwnProperty('reviewId')) {
			await store.updateReview(res.reviewId, thumb)
		}
		emit('update')
	}
}

const handleRequestTo = () => {
	emit('requestTo', props.data)
}

</script>
