<template>
  <div
    class="bg-white border border-gray-200 rounded-lg relative h-[200px] w-[150px] sm:h-[300px] sm:w-[200px] lg:h-[325px] lg:w-[225px] text-sm lg:text-base shadow-custom">
    <div class="bg-blue-light rounded-t-lg relative h-[180px]">
      <div class="px-3 py-1 bg-gray-600 text-white font-bold top-2 right-2 rounded-lg absolute opacity-80">
        {{ props.data.total_price }} €
      </div>
      <img class="object-cover rounded-t-lg w-full h-full mx-auto" :src="eventImage" alt="Event Image" />
    </div>
    <div class="p-4">
      <h5 class="mb-2 text-2xl font-bold tracking-tight">{{ props.data.title }}</h5>

      <div class="flex gap-2 items-center text-gray-600 mb-1">
        <Icon icon="calendar-days" />
        <p class="font-normal">{{ formatDate(props.data.event_date, store.language) }}</p>
      </div>

      <div class="flex gap-2 items-center text-gray-600 mb-1">
        <Icon icon="clock" />
        <p class="font-normal">{{ props.data.start_time }}h - {{ props.data.end_time }}h</p>
      </div>

      <div class="flex gap-2 items-center text-gray-600">
        <Icon icon="user" />
        <p class="font-normal">{{ totalGuests }}</p>
      </div>
    </div>

    <ButtonComp :to="`/events/${props.data._id}`" buttonStyle="purple"
      additionalClass="!w-auto px-2 !py-2 absolute right-4 bottom-4 inline-flex text-sm text-center items-center justify-center">
      {{ $t('eventsCard.see') }}
      <Icon icon="arrow-right" className="w-3.5 h-3.5 ml-2" />
    </ButtonComp>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { formatDate } from '@/utils'
import { useStore } from '@/store';
/* COMPONENTS */
import Icon from '@/components/common/Icon.vue'
import ButtonComp from '../common/Button.vue';

const props = defineProps({
  data: Object
})

const store = useStore()

const totalGuests = computed(() => {
  return props.data.guestList.reduce((acc, curr) => acc + curr.number, 0)
})


const eventImage = computed(() => {
  if (props.data && props.data.eventRequests) {
    const locationRequest = props.data.eventRequests.find(
      request => request.serviceId.categoryId.title == 'location' && request.state == 'confirmed'
    );

    return locationRequest ? locationRequest.serviceId.img_url : props.data.img_url;
  }
  return props.data.img_url;
});
</script>
