<template>
  <div class="flex items-center md:order-2 relative">
    <!-- Botón para abrir menú de usuario -->
    <button type="button" class="flex p-2  text-white gap-2 items-center text-sm rounded-full" @click="handleShow">
      <span class="sr-only">{{ $t('userMenu.open') }}</span>
      <Icon icon="circle-user" class="h-6 w-6" />
    </button>

    <!-- Dropdown menu -->
    <div class="z-50 absolute top-5 right-2 my-4 text-base list-none bg-white rounded-lg shadow"
      :class="{ hidden: !menu }">
      <p class="px-4 py-3 text-xs">{{ $t('userMenu.currentlyIn') }}</p>
      <div class="px-4 py-3 flex flex-row gap-4 w-[250px]">
        <img class="w-10 h-10 rounded-full" :src="user.img_url" alt="user avatar" />
        <div>
          <span class="block font-bold">{{ user.first_name }} {{ user.last_name }}</span>
          <span class="block text-sm text-gray-500">{{ user.email }}</span>
        </div>
      </div>

      <ul class="py-2">
        <li>
          <router-link :to="{ name: 'profile' }" class="block px-4 py-2 font-bold hover:text-primary" @click="handleShow">
            {{ $t('userMenu.profile') }}
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'events' }" class="block px-4 py-2 font-bold hover:text-primary" @click="handleShow">
            {{ $t('userMenu.myEvents') }}
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'myServices' }" class="block px-4 py-2 font-bold hover:text-primary" @click="handleShow">
            {{ $t('userMenu.myServices') }}
          </router-link>
        </li>
        <hr class="h-0.5 border-t-0 mx-2 bg-neutral-300" />
        <li>
          <div @click="handleLogout"
            class="cursor-pointer px-4 py-2 flex flex-row justify-between font-bold text-red-500 hover:text-red-600">
            <span>{{ $t('userMenu.logout') }}</span>
            <Icon icon="arrow-right-from-bracket" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
/* COMPONENTS */
import Icon from '@/components/common/Icon.vue'

const store = useStore()
const router = useRouter()

const props = defineProps({
  user: Object,
  handleShow: Function,
  menu: Boolean,
})

const user = store.user

const handleLogout = () => {
  store.logout()
	router.push({ name: 'home' })
}
</script>
