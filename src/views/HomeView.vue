<template>
	<main class="w-full flex-grow relative px-8 pt-10">
		<!-- Servicios -->
		<p class="font-bold text-base md:text-xl lg:text-4xl">{{ $t("dashboardServicesTitle") }}</p>
		<CategoriesList :categories="store.categories" direction="horizontal" />

		<template v-if="filteredServices.length == 0">
			<NoServices />
		</template>
		<template v-else>
			<Carousel :data="filteredServices" type="services" />
		</template>

		<div class="w-full flex justify-center">
			<ButtonComp buttonStyle="darkPurple" type="button" additionalClass="text-base md:text-xl !w-auto px-6 py-4 gap-2"
				:to="{ name: 'myServices' }">
				{{ $t('allServices') }}
				<Icon icon="arrow-right" />
			</ButtonComp>
		</div>

		<hr class="my-12 h-0.5 border-t-0 bg-gray-200 opacity-100 dark:opacity-50" />

		<!-- Eventos -->
		<div v-if="store.user">
			<p class="font-bold text-[30px]">{{ $t("dashboardEventsTitle") }}</p>

			<template v-if="store.events.length > 0">
				<Carousel :data="store.events" type="events" />

				<div class="w-full flex justify-center">
					<ButtonComp buttonStyle="darkPurple" type="button"
						additionalClass="text-base md:text-xl !w-auto px-6 py-4 gap-2" :to="{ name: 'events' }">
						{{ $t('viewAllEvents') }}
						<Icon icon="arrow-right" />
					</ButtonComp>
				</div>
			</template>

			<template v-else>
				<div class="mt-4 flex flex-wrap gap-8">
					<AddItem @click="goToEvents" text="Go to events." :icon="CalendarPlus" />
				</div>
			</template>
			<hr class="my-12 h-0.5 border-t-0 bg-gray-200 opacity-100 dark:opacity-50" />
		</div>

		<p class="font-bold text-center mb-12 text-[30px]">
			{{ $t("testimonialsTitle") }}
		</p>
		<Slide />
		<hr class="my-20 h-0.5 border-t-0 bg-gray-200 opacity-100 dark:opacity-50" />

	</main>
</template>

<script setup>
import { onBeforeMount, ref, computed, watch } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
/* COMPONENTS */
import Icon from '@/components/common/Icon.vue'
import CategoriesList from '@/components/categories/CategoriesList.vue'
import Carousel from '@/components/home/Carousel.vue'
import NoServices from '@/components/services/NoServices.vue'
import ButtonComp from '@/components/common/Button.vue'
import AddItem from '@/components/common/AddItem.vue'
import Slide from '@/components/home/Slide.vue'

const store = useStore()
const router = useRouter()

onBeforeMount(async () => {
	await store.fetchServices()
	await store.fetchCategories()
	if (store.user) await store.fetchEvents()
})

const activeCategory = ref('-1')

watch(() => store.activeCategory, () => {
	activeCategory.value = store.activeCategory
})


const filteredServices = computed(() => {
	if (activeCategory.value == '-1') {
		return store.services
	}
	return store.services.filter((service) => String(service.categoryId._id) === String(activeCategory.value))
})


const goToEvents = () => {
	router.push({ name: "events", query: { showForm: 'true' } })
}


</script>