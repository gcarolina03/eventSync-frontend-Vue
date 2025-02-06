<template>
  <div class="bg-white border border-gray-200 rounded-lg relative h-[400px] w-[300px] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
    <div class="bg-[#9CC0FA] rounded-t-lg relative h-[180px]">
      <div v-if="editMode" @click="edit(data)" class="cursor-pointer z-10 absolute top-[-10px] left-[-10px] gap-2 h-8 py-2 text-sm rounded-lg font-bold bg-gray-300 hover:bg-gray-400 text-gray-700 px-4">
        <Icon name="pencil" />
      </div>
      <div class="px-3 text-sm py-1 bg-gray-600 text-white font-bold top-2 left-2 rounded-lg absolute opacity-80">{{ data.categoryId.title }}</div>
      <div class="px-3 text-lg py-1 bg-neutral-100 text-black font-bold bottom-2 right-2 rounded-lg absolute opacity-80">{{ data.price }} €</div>
      <img class="rounded-t-lg w-full h-full object-cover mx-auto" :src="data.img_url" alt="" />
    </div>
    <div class="p-5">
      <h5 class="text-lg font-bold tracking-tight">{{ data.title }}</h5>
      <div class="text-gray-600 mb-4">
        <!-- <span v-if="location.length > 0">{{ location[6].long_name }} • {{ location[2].long_name }}</span>
        <div class="group inline-flex cursor-pointer text-sm ml-2 relative text-black font-bold rounded-lg">
          <Icon name="map" />
          <div class="opacity-0 w-28 flex items-center justify-center bg-black rounded-lg p-2 absolute group-hover:opacity-100 bottom-0 ml-8 pointer-events-none z-[10]">
            <Maps :latitude="data.latitude" :longitude="data.longitude" />
          </div>
        </div> -->
      </div>
      <div v-if="data.min_capacity && data.max_capacity" class="flex gap-2 items-center text-gray-600">
        <Icon name="user" />
        <p class="font-normal">from {{ data.min_capacity }} to {{ data.max_capacity }}</p>
      </div>
      <div v-if="data.start_time && data.end_time" class="flex gap-2 items-center text-gray-600">
        <Icon name="clock" />
        <p class="font-normal">{{ data.start_time }}h - {{ data.end_time }}h</p>
      </div>
    </div>
    <div v-if="currentPath === '/services'" class="absolute right-4 bottom-3 cursor-pointer inline-flex items-center px-3 py-2 text-sm font-bold text-center text-white bg-light rounded-lg hover:bg-dark focus:ring-4 focus:outline-none focus:ring-dark" @click="requestTo(data)">
      {{ $t("servicesCard.request")}}
    </div>
    <div class="absolute bottom-3 left-5 flex gap-4">
      <div @click="giveReviewService('up', data._id)" class="text-green-600 gap-1 font-bold flex text-lg items-center" :class="user ? 'cursor-pointer' : ''">
        <Icon name="thumbs-up" v-if="user && reviewsCount().userUp" />
        <Icon name="thumbs-up-fill" v-else-if="user && !reviewsCount().userUp" />
        <Icon name="thumbs-up" v-else />
        <span>{{ reviewsCount().up }}</span>
      </div>
      <div @click="giveReviewService('down', data._id)" class="text-red-600 gap-1 font-bold flex text-lg items-center" :class="user ? 'cursor-pointer' : ''">
        <Icon name="thumbs-down" v-if="user && reviewsCount().userDown" />
        <Icon name="thumbs-down-fill" v-else-if="user && !reviewsCount().userDown" />
        <Icon name="thumbs-down" v-else />
        <span>{{ reviewsCount().down }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import Icon from '@/components/common/Icon.vue'


defineProps({
  data: Object,
  editMode: Boolean,
  edit: Function,
  requestTo: Function,
})

const currentPath = useRoute().path

const { user, giveReview, updateReview } = useStore()

const location = ref('')

const reviewsCount = () => {
  const dataReview = data.serviceReviews
  const reviews = {
    up: 0,
    down: 0,
    userUp: false,
    userDown: false
  }
  dataReview.forEach((review) => {
    review.thumb === 'up' ? reviews.up++ : reviews.down++
    if (props.user && review.userId === props.user._id) {
      if (review.thumb === 'up') reviews.userUp = true
      if (review.thumb === 'down') reviews.userDown = true
    }
  })
  return reviews
}

const giveReviewService = async (thumb, service) => {
  if (props.user) {
    const res = await giveReview(service, thumb)
    if (res.hasOwnProperty('reviewId')) {
      await updateReview(res.reviewId, thumb)
    }
  }
}


</script>
