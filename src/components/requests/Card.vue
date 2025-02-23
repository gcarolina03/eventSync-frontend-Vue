<template>
  <div
    class="bg-white border border-gray-200 rounded-lg relative h-[200px] w-[150px] sm:h-[300px] sm:w-[200px] lg:h-[325px] lg:w-[225px] text-sm lg:text-base shadow-custom">
    <div class="bg-[#9CC0FA] rounded-t-lg relative h-[180px]">
      <div class="px-3 text-sm py-1 bg-gray-600 text-white font-bold top-2 left-2 rounded-lg absolute opacity-80">
        {{ $t('categoriesList.' + request.serviceId.categoryId.title) }}
      </div>
      <div
        class="px-3 text-lg py-1 bg-neutral-100 text-black font-bold bottom-2 right-2 rounded-lg absolute opacity-80">
        {{ request.serviceId.price }} €
      </div>
      <img class="rounded-t-lg w-full h-full object-cover mx-auto" :src="request.serviceId.img_url" alt="" />
    </div>
    <div class="p-5">
      <h5 class="text-lg font-bold tracking-tight">
        {{ request.serviceId.title }}
      </h5>
      <div class="flex gap-2 items-center text-gray-600 mb-4">
        <span v-if="location && location.length">
          {{ location[6].long_name }} &nbsp; • &nbsp; {{ location[2].long_name }}
        </span>
      </div>
      <div v-if="request.serviceId.min_capacity && request.serviceId.max_capacity"
        class="flex gap-2 items-center text-gray-600">
        <Icon icon="user" class="h-3 w-3" />
        <p class="font-normal">
          from {{ request.serviceId.min_capacity }} to {{ request.serviceId.max_capacity }}
        </p>
      </div>
      <div v-if="request.serviceId.start_time && request.serviceId.end_time"
        class="flex gap-2 items-center text-gray-600">
        <Icon icon="clock" class="h-3 w-3" />
        <p class="font-normal">
          {{ request.serviceId.start_time }}h - {{ request.serviceId.end_time }}h
        </p>
      </div>
    </div>
    <div>
      <div :class="['absolute right-4 bottom-3 inline-flex items-center px-3 py-2 text-sm font-bold text-center text-white rounded-lg focus:outline-none', request.state == 'pending' ? 'bg-yellow-700' : request.state == 'confirmed' ? 'bg-green-700' : 'bg-red-800']">
        {{ $t('requestsStatus.' + request.state) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useStore } from '@/store'
/* COMPONENTS */
import Icon from '@/components/common/Icon.vue'

const props = defineProps({
  request: {
    type: Object,
    required: true
  }
})

const store = useStore()
const request = props.request
const location = ref([])
const handleGetAddress = async () => {
  if (!request.serviceId.latitude || !request.serviceId.longitude) return
  const res = await store.getAddress(request.serviceId.latitude, request.serviceId.longitude)
  if (res) {
    location.value = res
  }
}

onBeforeMount(async () => {
  await handleGetAddress()
})
</script>
