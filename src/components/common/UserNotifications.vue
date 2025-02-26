<template>
  <div class="relative">
    <Icon :icon="iconName" class="h-6 w-6 text-white cursor-pointer" @click="handleShow" />
    <!-- Desplegable de notificaciones -->
    <div v-if="showNotifications" class="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-50">
      <div class="py-2">
        <div v-if="computedNotifications.length">
          <div v-for="notification in computedNotifications" :key="notification._id" :class="[
            'px-4 py-2 hover:bg-gray-100 text-sm transition-colors duration-150',
            { 'bg-blue-50 font-semibold cursor-pointer': !notification.read, 'bg-white ': notification.read }
          ]" @click="marksAsRead(notification._id)">
            <div v-html="notification.computedMessage"></div>
          </div>
        </div>
        <div v-else class="px-4 py-2 text-gray-500 text-sm">
          {{ $t('notificationsEmpty') }}
        </div>
      </div>
      <div class="border-t">
        <router-link :to="{ name: 'notifications' }" class="block px-4 py-2 text-sm text-primary hover:text-dark">
          {{ $t('notificationsSeeAll') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n';
import { useStore } from '@/store';
/* COMPONENTS */
import Icon from '@/components/common/Icon.vue';

const props = defineProps({
  notifications: Array,
  showNotifications: Boolean,
  handleShow: Function
})

const store = useStore()

const iconName = computed(() => {
  if (props.notifications && props.notifications.some(notification => !notification.read)) {
    return 'bell-ring'
  }
  return 'bell'
})

const { t } = useI18n()

const computedNotifications = computed(() => {
  return props.notifications.map(notification => {
    console.log({ notification })
    console.log(notification.data.service.title)
    console.log(notification.data.event.title)
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

const marksAllAsRead = async () => {
  props.notifications.forEach(async (notification) => {
    if (!notification.read) {
      await store.markNotificationAsRead(notification._id)
    }
  })
}

const marksAsRead = async (notificationId) => {
  await store.markNotificationAsRead(notificationId)
}


</script>