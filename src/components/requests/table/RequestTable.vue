<template>
  <div class="relative overflow-x-auto sm:rounded-lg">
    <table class="w-full text-left text-gray-500">
      <thead class="text-gray-400">
        <tr>
          <th class="py-10">{{ $t('requestsTable.service') }}</th>
          <th class="py-10">{{ $t('requestsTable.eventTitle') }}</th>
          <th class="py-5">{{ $t('requestsTable.requestDate') }}</th>
          <th class="py-5">{{ $t('requestsTable.eventDate') }}</th>
          <th class="py-5">{{ $t('requestsTable.guests') }}</th>
          <th class="py-5">{{ $t('requestsTable.user') }}</th>
          <th class="py-5">{{ $t('requestsTable.status') }}</th>
          <th class="py-5">{{ $t('requestsTable.actions') }}</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="requests.length == 0">
          <tr class="bg-white border-b hover:bg-gray-50">
            <td colspan="8" class="px-6 py-4 text-center font-bold text-gray-900">
              {{ $t('requestsTable.noRequests') }}
            </td>
          </tr>
        </template>
        <template v-else>
          <tr v-for="request in requests" :key="request._id" class="bg-white border-b hover:bg-gray-50">
            <td class="py-4 font-bold text-gray-900">{{ request.serviceId.title }}</td>
            <td class=" py-4">{{ request.eventId.title }}</td>
            <td class=" py-4">{{ formatDate(request.date_of_request) }}</td>
            <td class=" py-4">{{ formatDate(request.eventId.event_date) }}</td>
            <td class=" py-4">{{ getGuestCount(request.eventId.guestList) }}</td>
            <td class=" py-4">
              {{ request.eventId.userId.first_name }} {{ request.eventId.userId.last_name }}
            </td>
            <td :colspan="request.state !== 'pending' ? '2' : '1'" class=" py-4">
              <div class="flex">
                <div :class="[
                  'flex items-center px-3 py-2 text-sm font-bold text-center text-white rounded-lg',
                  request.state === 'pending'
                    ? 'bg-yellow-700'
                    : request.state === 'confirmed'
                      ? 'bg-green-700'
                      : 'bg-red-800'
                ]">
                  {{ $t('requestsStatus.' + request.state) }}
                </div>
              </div>
            </td>
            <td v-if="request.state == 'pending'" class="py-4">
              <div class="flex gap-2">
                <Icon icon="check" @handleClick="$emit('updateState', request._id, 'confirmed')" classButton="cursor-pointer p-2 text-sm rounded-lg font-bold bg-green-300 hover:bg-green-400 text-green-700 items-center" className="flex items-center justify-center h-4 w-4" />
                <Icon icon="x-mark" @handleClick="$emit('updateState', request._id, 'cancelled')" classButton="cursor-pointer p-2 text-sm rounded-lg font-bold bg-red-300 hover:bg-red-400 text-red-700 "
                  className="flex items-center justify-center h-4 w-4" />
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
/* COMPONENTS */
import Icon from '@/components/common/Icon.vue'
import { formatDate } from '@/utils'

const props = defineProps({
  requests: { type: Array, default: () => [] }
})

const getGuestCount = (guestList) => guestList.reduce((acc, curr) => acc + curr.number, 0)
</script>
