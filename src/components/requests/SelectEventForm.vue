<template>
  <div
    class="select-event-form rounded-lg relative bg-white border border-gray-300 p-6 w-full max-w-md lg:max-w-lg xl:max-w-md shadow-custom">
    <!-- Botón para cerrar el formulario -->
    <button @click="emit('handleForm')"
      class="bg-white cursor-pointer rounded-md p-2 inline-flex absolute items-center justify-center top-4 right-4 text-gray-400 hover:text-gray-500 hover:bg-gray-100">
      <Icon icon="x-mark" class="h-6 w-6" />
    </button>

    <h1 class="text-3xl font-medium">{{ $t("requestsForm.title") }}</h1>
    <p class="text-sm">{{ $t("requestsForm.subtitle") }}</p>

    <!-- Campo de búsqueda -->
    <input v-model="search" type="text" :placeholder="t('requestsForm.searchEvent') + '*'"
      class="w-full h-10 border border-gray-400 focus:border-secondary focus:ring-0 focus:outline-none rounded-xl px-3" />

    <!-- Lista de eventos -->
    <div class="event-list overflow-y-auto h-48 mt-4">
      <NoEvents v-if="filteredEvents.length == 0" />
      <div v-else v-for="event in filteredEvents" :key="event._id" @click="handleCreateRequest(event._id)"
        class="p-2 border-b hover:bg-blue-100 cursor-pointer">
        <div>
          {{ event.title }}
          <div class="text-xs text-gray-500">
            {{ formatDate(event.event_date) }} / {{ event.start_time }}h - {{ event.end_time }}h
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import { formatDate } from '@/utils'
import { useI18n } from 'vue-i18n'
/* COMPONENTS */
import NoEvents from '@/components/requests/NoEvents.vue'
import Icon from '@/components/common/Icon.vue'

const props = defineProps({
  service: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const store = useStore()
const { t } = useI18n()
const search = ref('')

onBeforeMount(async () => {
  await store.fetchEvents()
})

const emit = defineEmits(['handleForm'])

const filteredEvents = computed(() => {
  if (search.value === '') return store.events
  const filteredEvents = store.events.filter(event =>
    event.title.toLowerCase().includes(search.value.toLowerCase())
  )

  return filteredEvents
})

const handleCreateRequest = async (eventId) => {
  const res = await store.createRequest(eventId, props.service._id)
  if (res.success) {
    router.push({ name: 'event', params: { id: eventId } })
  } else {
    console.log(res.message)
  }
}

</script>
