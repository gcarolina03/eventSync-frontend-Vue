<template>
  <div class="w-full flex-grow relative px-8 pt-10">
    <p class="font-bold text-[30px]">{{ t("requests") }}</p>
    <hr class="mb-5 h-0.5 border-t-0 bg-gray-500 opacity-20" />
    <div class="mt-4 flex justify-center">
      <div class="bg-white rounded-lg pt-6 w-[95%]">
        <div class="flex justify-between px-6">
          <!-- State Filter -->
          <div class="flex items-center gap-2">
            <span>{{ t("requestsTable.state") }}:</span>
            <StateFilter v-model="stateToShow" />
          </div>

          <!-- Search and Sort -->
          <div class="flex">
            <div class="flex items-center relative pl-3">
              <Icon icon="search" class="w-4 h-4 absolute left-6 text-gray-400" />
              <input v-model="search" type="text"
                class="w-full text-base h-10 border border-gray-400 focus:border-secondary focus:ring-0 focus:outline-none rounded-xl px-3 pl-8"
                :placeholder="t('requestsTable.searchByService') + '...'" />
            </div>
            <div class="flex items-center gap-2 relative pl-3">
              <span>{{ t("requestsTable.sortBy") }}:</span>
              <div @click="handleOrder"
                class="px-2 py-2 min-h-10 text-base border font-bold border-gray-400 cursor-pointer rounded-xl w-50 bg-gray-10 hover:bg-gray-50 flex items-center gap-2">
                {{ sortByOldest ? t('requestsTable.oldest') : t('requestsTable.newest') }}
                <Icon icon="arrow-up-and-down" className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>

        <!-- Table of Requests -->
        <div class="flex w-full flex-col gap-2 mt-6 text-lg">
          <RequestTable :requests="sortedRequests" @updateState="updateState" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import { useStore } from '@/store'
import { useI18n } from 'vue-i18n'
/* COMPONENTS */
import Icon from '@/components/common/Icon.vue'
import StateFilter from '@/components/requests/table/StateFilter.vue'
import RequestTable from '@/components/requests/table/RequestTable.vue'

const sortByOldest = ref(false)
const search = ref('')
const stateToShow = ref('all')
const store = useStore()
const { t } = useI18n()

onBeforeMount(async () => {
  await store.fetchRequests()
})

const handleOrder = () => {
  sortByOldest.value = !sortByOldest.value
}

const sortedRequests = computed(() => {
  let sorted = []
  const allRequests = [...store.requests]
  console.log(allRequests)
  if (sortByOldest.value) {
    sorted = allRequests
      .sort((a, b) => parseInt(a.eventId.event_date) - parseInt(b.eventId.event_date))
      .sort((a, b) => parseInt(a.date_of_request) - parseInt(b.date_of_request))
  } else {
    sorted = allRequests
      .sort((a, b) => parseInt(a.eventId.event_date) - parseInt(b.eventId.event_date))
      .sort((a, b) => parseInt(b.date_of_request) - parseInt(a.date_of_request))
  }
  let filtered = sorted.filter((request) =>
    request.serviceId.title.toLowerCase().includes(search.value.toLowerCase())
  )
  if (stateToShow.value !== 'all') {
    filtered = filtered.filter((request) => request.state === stateToShow.value)
  }
  return filtered
})

const updateState = async (id, state) => {
  const res = await store.updateRequest(id, state)
  console.log(res)
  if (res.success) {
    await store.fetchRequests()
  }
}
</script>