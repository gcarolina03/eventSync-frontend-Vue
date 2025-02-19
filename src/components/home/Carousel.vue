<template>
	<div class="carousel mt-12 mb-4 mx-auto">
		<div class="relative">
			<div class="flex justify-between absolute top left w-full h-[220px] sm:h-[320px] lg:h-[345px]">
				<button @click="movePrev" :disabled="isDisabled('prev')"
					class="hover:bg-dark text-white w-10 h-full text-center opacity-75 hover:opacity-80 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-500">
					<Icon icon="arrow-left" class="h-8 w-20 -ml-5" />
					<span class="sr-only">Prev</span>
				</button>

				<button @click="moveNext" :disabled="isDisabled('next')"
					class="hover:bg-dark text-white w-10 h-full text-center opacity-75 hover:opacity-80 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-500">
					<Icon icon="arrow-right" class="h-8 w-20 -ml-5" />
					<span class="sr-only">Next</span>
				</button>
			</div>

			<div ref="carousel"
				class="carousel-container relative flex gap-8 overflow-hidden h-[220px] sm:h-[320px] lg:h-[345px] scroll-smooth snap-x snap-mandatory touch-pan-x z-0">
				<template v-for="resource in props.data" :key="resource._id">
					<div class="carousel-item text-center relative snap-start">
						<CardServices v-if="type == 'services'" :data="resource" />
						<CardEvents v-else-if="type == 'events'" :data="resource" />
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
/* COMPONENTS */
import CardServices from '@/components/services/Card.vue'
import CardEvents from '@/components/events/Card.vue'
import Icon from '@/components/common/Icon.vue'

const props = defineProps({
	data: {
		type: Array,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
})

const carousel = ref(null)
const currentIndex = ref(0)
const maxScrollWidth = ref(0)

const movePrev = () => {
	if (currentIndex.value > 0) {
		currentIndex.value--
	}
}

const moveNext = () => {
	if (
		carousel.value &&
		carousel.value.offsetWidth * currentIndex.value <= maxScrollWidth.value
	) {
		currentIndex.value++
	}
}

const isDisabled = (direction) => {
	if (direction === 'prev') {
		return currentIndex.value <= 0
	}
	if (direction === 'next' && carousel.value) {
		return (
			carousel.value.offsetWidth * currentIndex.value >= maxScrollWidth.value
		)
	}
	return false
}

onMounted(() => {
	if (carousel.value) {
		maxScrollWidth.value =
			carousel.value.scrollWidth - carousel.value.offsetWidth
	}
})

watch(currentIndex, (newIndex) => {
	if (carousel.value) {
		carousel.value.scrollLeft = carousel.value.offsetWidth * newIndex
	}
})
</script>
