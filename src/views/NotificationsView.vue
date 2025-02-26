<template>
  <div class="w-full flex-grow p-4">
    <div class="flex justify-between">
      <h1 class="text-2xl font-bold mb-4">{{ $t("notificationsTitle") }}</h1>
      <div @click="marksAllAsRead" class="text-primary cursor-pointer"> Marcar todas como leidas</div>
    </div>
    <div>
      <div v-if="computedNotifications.length > 0">
        <div v-for="notification in computedNotifications" :key="notification._id"
          :class="['border-b py-2', { 'bg-blue-50 font-bold': !notification.read }]">
          <!-- Se muestra el mensaje formateado (interpretado como HTML) -->
          <div v-html="notification.computedMessage"></div>
          <div class="text-xs text-gray-500">
            {{ formatDate(notification.createdAt) }}
          </div>
        </div>
        <!-- Controles de paginación -->
        <div class="flex justify-center items-center mt-4 space-x-2">
          <button :disabled="page === 1" @click="prevPage" class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">
            {{ $t('previous') }}
          </button>
          <span>{{ $t('Page') }} {{ page }} {{ $t('of') }} {{ pagination.pages }}</span>
          <button :disabled="page === pagination.pages" @click="nextPage"
            class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">
            {{ $t('next') }}
          </button>
        </div>
      </div>
      <div v-else class="text-center text-gray-500">
        {{ $t('notificationsEmpty') }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, computed } from 'vue'
import { useStore } from '@/store'
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

const store = useStore()
const { t } = useI18n()

const pagination = ref({ total: 0, page: 1, pages: 1 })
const page = ref(1)
const limit = store.limit

const formatDate = (date) => {
  return dayjs(date).format('DD/MM/YYYY HH:mm')
}

const computedNotifications = computed(() => {
  return store.notifications.map(notification => {
    const params = {
      serviceTitle: notification.data.service.title || '',
      eventTitle: notification.data.event.title || ''
    }
    return {
      ...notification,
      computedMessage: t(`notifications.${notification.message}`, params)
    }
  })
})

const fetchNotifications = async () => {
  try {
    const res = await store.fetchAllNotifications(page.value, limit)
    if(res.success) {
      pagination.value = res.pagination
    }
  } catch (error) {
    console.error('Error fetching notifications:', error)
  } 
}

const nextPage = () => {
  if (page.value < pagination.value.pages) {
    page.value++
    fetchNotifications()
  }
}

const prevPage = () => {
  if (page.value > 1) {
    page.value--
    fetchNotifications()
  }
}

onBeforeMount( async() => {
  await fetchNotifications()
})

const marksAllAsRead = async () => {
  store.notifications.forEach(async (notification) => {
    if (!notification.read) {
      await store.markNotificationAsRead(notification._id)
    }
  })
}
</script>
